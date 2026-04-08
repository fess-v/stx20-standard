import { STX20Validator } from './validator';

interface Transaction {
  sender: string;
  recipient: string;
  memo: string;
  blockHeight: number;
}

interface TokenState {
  ticker: string;
  maxSupply: number;
  limitPerMint: number;
  currentSupply: number;
  balances: { [address: string]: number };
}

export class STX20Indexer {
  // Local state of all deployed tokens
  private tokens: { [ticker: string]: TokenState } = {};

  public processBlock(transactions: Transaction[]) {
    transactions.forEach((tx) => {
      const validation = STX20Validator.validate(tx.memo);

      if (!validation.isValid) return;

      const { op, ticker, amount } = validation;

      if (op === 'Deploy') {
        this.handleDeploy(tx);
      } else if (op === 'Mint') {
        this.handleMint(tx, ticker!, amount!);
      } else if (op === 'Transfer') {
        this.handleTransfer(tx, ticker!, amount!);
      }
    });
  }

  private handleDeploy(tx: Transaction) {
    // Structure: d{ticker}{supply};{limit}
    const body = tx.memo.slice(1);
    const [tickerAndSupply, limit] = body.split(';');
    const tickerMatch = tickerAndSupply.match(/^([A-Z]{3,8})/);
    
    if (tickerMatch) {
      const ticker = tickerMatch[1];
      const supply = parseInt(tickerAndSupply.slice(ticker.length));

      // Rule: First ticker issuance reserves its claim
      if (!this.tokens[ticker]) {
        this.tokens[ticker] = {
          ticker,
          maxSupply: supply,
          limitPerMint: parseInt(limit),
          currentSupply: 0,
          balances: {},
        };
      }
    }
  }

  private handleMint(tx: Transaction, ticker: string, amountStr: string) {
    const token = this.tokens[ticker];
    const amount = parseInt(amountStr);

    if (token && amount <= token.limitPerMint) {
      const remaining = token.maxSupply - token.currentSupply;
      if (remaining <= 0) return;

      // Rule: Partially honor the mint if it exceeds max supply
      const actualMint = Math.min(amount, remaining);
      
      token.currentSupply += actualMint;
      token.balances[tx.recipient] = (token.balances[tx.recipient] || 0) + actualMint;
    }
  }

  private handleTransfer(tx: Transaction, ticker: string, amountStr: string) {
    const token = this.tokens[ticker];
    const amount = parseInt(amountStr);

    if (token && (token.balances[tx.sender] || 0) >= amount) {
      token.balances[tx.sender] -= amount;
      token.balances[tx.recipient] = (token.balances[tx.recipient] || 0) + amount;
    }
  }

  public getBalances(address: string) {
    const userBalances: any = {};
    for (const ticker in this.tokens) {
      if (this.tokens[ticker].balances[address]) {
        userBalances[ticker] = this.tokens[ticker].balances[address];
      }
    }
    return userBalances;
  }
}
