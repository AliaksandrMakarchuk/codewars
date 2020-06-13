import { solution, RomanNumeralsDecoderHelper, RomanNumeralsDecoder } from './Main';
import { assert, expect } from 'chai';

describe("Roman numerals decoder solution", function () {
    it('tests', () => {
        assert.equal(solution('XXI'), 21);
        assert.equal(solution('I'), 1);
        assert.equal(solution('IV'), 4);
        assert.equal(solution('MMVIII'), 2008);
        assert.equal(solution('MDCLXVI'), 1666);
    });
});

describe('RomanNumeralsDecoder', function () {
    it('Try encode meaningless value', () => {
        expect(() => new RomanNumeralsDecoder().decode('')).to.throw('Value should be meaningful');
    });
});

describe('RomanNumeralsDecoderHelper', function () {
    it('Try get value by non-existing symbol', () => {
        expect(() => RomanNumeralsDecoderHelper.getCorrespondingValueBySymbol('H')).to.throw('Could not found value for symbol "H"');
    });
    it('Get value by existing symbol', () => {
        let values: Array<number> = [1, 5, 10, 50, 100, 500, 1000];
        let symbols: Array<string> = ['I', 'V', 'X', 'L', 'C', 'D', 'M'];

        symbols.forEach((symbol: string, index: number) => {
            let actual = RomanNumeralsDecoderHelper.getCorrespondingValueBySymbol(symbol);
            assert.equal(actual, values[index]);
        });
    });
});