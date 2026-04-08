/**
 * STX20 Protocol Validator
 * Ensures memo strings adhere to the 34-character limit and protocol rules.
 */

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
  op?: 'Deploy' | 'Mint' | 'Transfer';
  ticker?: string;
  amount?: string;
}

export class STX20Validator {
  private static readonly MAX_LENGTH = 34;

  public static validate(memo: string): ValidationResult {
    const result: ValidationResult = {
      isValid: true,
      errors: [],
    };

    // 1. Length Check
    if (memo.length > this.MAX_LENGTH) {
      result.isValid = false;
      result.errors.push(`Length exceeds 34 characters (Current: ${memo.length})`);
    }

    // 2. Operation Type Check (First char must be lowercase d, m, or t)
    const opType = memo[0];
    if (!['d', 'm', 't'].includes(opType)) {
      result.isValid = false;
      result.errors.push("Invalid operation: Must start with 'd' (Deploy), 'm' (Mint), or 't' (Transfer)");
    } else {
      result.op = opType === 'd' ? 'Deploy' : opType === 'm' ? 'Mint' : 'Transfer';
    }

    // 3. Ticker & Data Validation
    // Extract everything after the operation code
    const body = memo.slice(1);
    
    // Tickers are 3-8 uppercase alphabetic characters
    const tickerMatch = body.match(/^([A-Z]{3,8})/);
    
    if (!tickerMatch) {
      result.isValid = false;
      result.errors.push("Invalid Ticker: Must be 3-8 uppercase alphabetic characters immediately after the operation.");
    } else {
      result.ticker = tickerMatch[1];
      const remaining = body.slice(result.ticker.length);

      if (result.op === 'Deploy') {
        // Deploy Structure: {op}{ticker}{total_supply};{limit_per_mint}
        if (!remaining.includes(';')) {
          result.isValid = false;
          result.errors.push("Deploy operation missing ';' separator between supply and limit.");
        }
      } else {
        // Mint/Transfer Structure: {op}{ticker}{amount}
        const amountMatch = remaining.match(/^(\d+)$/);
        if (!amountMatch && remaining.length > 0) {
          result.isValid = false;
          result.errors.push("Invalid Amount: Must be a positive integer.");
        } else {
          result.amount = remaining;
        }
      }
    }

    return result;
  }
}

// Simple Test Runner
const testMemos = [
  "dstxs21000000;1000", // Valid Deploy
  "mstxs1000",          // Invalid (ticker must be uppercase)
  "mSTXS1000",          // Valid Mint
  "tSTXS90",            // Valid Transfer
  "mSTXSTXSTX100"       // Invalid (Ticker > 8 chars)
];

console.log("--- STX20 TypeScript Validator ---");
testMemos.forEach(m => {
  const report = STX20Validator.validate(m);
  console.log(`${report.isValid ? 'PASS' : 'FAIL'} [${m}] ${report.errors.join(', ')}`);
});
