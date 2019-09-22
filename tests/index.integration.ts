import { exec } from 'child_process';
import { promisify } from 'util';
import { EOL as NEW_LINE } from 'os';
import { shuffle } from './helper';

const execPromise = promisify(exec);

describe('advice api', () => {
    it('test query command successfully returns ordered advice', async () => {
        const response = await execPromise('./bin/advice --query mother');

        const expected: string = [
            'Advice(031): Never let your Mother cut your hair.',
            'Advice(208): Play is the true mother of invention.'
        ].join(NEW_LINE);

        expect(response.stdout).toEqual(expected);
    });

    it('test query command returns no advice for an unknown search term', async () => {

        const expected = [
            'Error: Failed to search for Advice containing aaa',
            '{\"message\":{\"type\":\"notice\",\"text\":\"No advice slips found matching that search term.\"'
        ].join(NEW_LINE);

        const response = await execPromise('./bin/advice --query aaa');
        expect(response.stderr).toContain(expected);
    });

    it('test ids command successfully returns ordered advice', async () => {
        const ids = shuffle([10, 30, 100]).join(',')
        const response = await execPromise(`./bin/advice --ids ${ids}`);

        const expected: string = [
            'Advice(010): Never pay full price for a sofa at DFS.',
            'Advice(030): When in doubt, just take the next small step.',
            'Advice(100): Everybody makes mistakes.'
        ].join(NEW_LINE);

        expect(response.stdout).toEqual(expected);
    });
});
