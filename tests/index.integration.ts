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


describe('weather api', () => {
    it('test multiple weather locations successfully returns ordered data', async () => {
        const response = await execPromise("./bin/weather --locations 'Paris,France:Fresno,CA,USA' --json");
        const obj = JSON.parse(response.stdout);

        expect(obj).toBeDefined();
        expect(obj).toHaveLength(2);

        [0, 1].forEach(idx => {
            expect(obj[idx]).toBeDefined();
            expect(obj[idx]['local_datetime']).toBeTruthy();
            expect(obj[idx]['curr_temp']).toBeTruthy();
            expect(obj[idx]['lat_long']).toBeTruthy();
            expect(obj[idx]['visibility']).toBeTruthy();
            expect(obj[idx]['wind_speed']).toBeTruthy();
            expect(obj[idx]['wind_angle']).toBeTruthy();
        });

        expect(obj[0]['name']).toEqual('Fresno,CA,USA');
        expect(obj[1]['name']).toEqual('Paris,France');
    });

    it('test location not found error', async () => {
        const response = await execPromise("./bin/weather --locations 'A:B' --json");
        const expected: string = [
            'Location "A" not found.',
            'Location "B" not found.',
            '', // leaving this in for now
        ].join(NEW_LINE);

        expect(response.stderr).toEqual(expected);
    });

    it('test no location passed in', async () => {
        const response = await execPromise("./bin/weather --json");
        const expected: string = 'Error: invalid request, no locations found.';

        expect(response.stderr).toEqual(expected);
    });
});