import { exec } from 'child_process';
import { promisify } from 'util';
import { EOL as NEW_LINE } from 'os';

const execPromise = promisify(exec);

describe('advice api', () => {
    it('test advice api query command successful returns advice', async () => {
        const response = await execPromise('node bin/index.js advice --query mother');

        const expected: string = [
            'Advice(031): Never let your Mother cut your hair.',
            'Advice(208): Play is the true mother of invention.'
        ].join(NEW_LINE);

        expect(response.stdout).toEqual(expected);
    });

    it('test advice api query command returns no advice for unknown search term', async () => {

        const expected = [
            'Error: Failed to search for Advice containing aaa',
            '{\"message\":{\"type\":\"notice\",\"text\":\"No advice slips found matching that search term.\"'
        ].join(NEW_LINE);

        const response = await execPromise('node bin/index.js advice --query aaa');
        expect(response.stderr).toContain(expected);
    });
});
