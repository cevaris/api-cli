import * as program from 'commander';

function parseCSV(value: string) {
    return value.split(',');
}

// https://api.adviceslip.com/advice
// https://api.adviceslip.com/advice/{id}
// https://api.adviceslip.com/advice/search/{query}
program
    .command('advice')
    .description('prints advice form Advice API')
    .option('-i --ids <ids>', 'print advice with given ids (csv)', parseCSV)
    .option('-s --search <query>', 'search for advice via query')
    .action((p) => {
        console.log('loading advice for', p.ids, p.search);
    });

program.parse(process.argv);