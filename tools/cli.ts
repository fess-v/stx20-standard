import { Command } from 'commander';
import { STX20Validator } from './validator';
import { STX20Indexer } from './indexer-logic';

const program = new Command();

program
  .name('stx20-tool')
  .description('CLI toolkit for validating and indexing STX20 protocol inscriptions')
  .version('1.0.0');

// Command: Verify a single memo string
program
  .command('verify')
  .description('Verify if a memo string is STX20 compliant')
  .argument('<memo>', 'The memo string to validate')
  .action((memo: string) => {
    const result = STX20Validator.validate(memo);
    if (result.isValid) {
      console.log(`✅ Valid STX20 ${result.op}`);
      console.log(`   Ticker: ${result.ticker}`);
      if (result.amount) console.log(`   Amount: ${result.amount}`);
    } else {
      console.log(`❌ Invalid Memo`);
      result.errors.forEach(err => console.log(`   - ${err}`));
    }
  });

// Command: Simulate a mini-block for indexing
program
  .command('simulate')
  .description('Simulate indexing a deployment and a mint')
  .action(() => {
    const indexer = new STX20Indexer();
    const mockBlock = [
      { sender: 'SP123...', recipient: 'SP123...', memo: 'dSTXS21000000;1000', blockHeight: 1 },
      { sender: 'SP456...', recipient: 'SP789...', memo: 'mSTXS1000', blockHeight: 2 }
    ];

    console.log('--- Simulating STX20 Indexing ---');
    indexer.processBlock(mockBlock);
    
    const balance = indexer.getBalances('SP789...');
    console.log('Resulting State for SP789...:', balance);
  });

program.parse();
