const rewire = require("rewire");
import * as moment from 'moment';

const weatherCommand = rewire('../../build/src/command/weather.js');
const formatTime = weatherCommand.__get__("formatTime");

let frozenUTC: moment.Moment;
beforeEach(() => {
    frozenUTC = moment('2000-01-02T03:04:05.000Z').utc();
});

it('test time format with timezone offset = -1', () => {
    expect(formatTime(frozenUTC, -3600))
        .toEqual('Jan 2, 2000/2:04:05 am');
});

it('test time format with timezone offset = 0', () => {
    expect(formatTime(frozenUTC, 0))
        .toEqual('Jan 2, 2000/3:04:05 am');
});

it('test time format with timezone offset = 1', () => {
    expect(formatTime(frozenUTC, 3600))
        .toEqual('Jan 2, 2000/4:04:05 am');
});