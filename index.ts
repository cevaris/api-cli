import * as program from 'commander';
import { advice } from './src/command/advice';
import { weather } from './src/command/weather';

function parseCSV(value: string) {
    return value.split(',');
}

function parseColonSV(value: string) {
    return value.split(':');
}

program
    .command('advice')
    .description('prints advice form Advice API')
    .option('-i --ids <ids>', 'fetch advice by ids', parseCSV)
    .option('-q --query <query>', 'query for advice')
    .action(p => advice(p.ids, p.query));

program
    .command('weather')
    .description('prints weather of given location(s)')
    .option('-l --locations <locations>', 'list of locations', parseColonSV)
    .action(p => weather(p.locations));

program.parse(process.argv);