import * as program from 'commander';
import { advice } from './command/advice';

function parseCSV(value: string) {
    return value.split(',');
}

// https://api.adviceslip.com/advice
// https://api.adviceslip.com/advice/{id}
// https://api.adviceslip.com/advice/search/{query}
program
    .command('advice')
    .description('prints advice form Advice API')
    .option('-i --ids <ids>', 'fetch advice by ids', parseCSV)
    .option('-q --query <query>', 'query for advice')
    .action(p => advice(p.ids, p.query));

program.parse(process.argv);