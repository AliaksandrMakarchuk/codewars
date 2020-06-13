import { PowerRepresentation } from "./PowerRepresentation";
import { expect, assert } from "chai";
import { RomanNumeralsEncoderDecoder, RomanNumeralsEncoderDecoderHelper } from "./RomanNumeralsEncoderDecoder";

describe('RomanNumeralsDecoder', function () {
    it('Try encode meaningless value', () => {
        expect(() => RomanNumeralsEncoderDecoder.fromRoman('')).to.throw('Value should be meaningful');
    });
});

describe('RomanNumeralsEncoderHelper', () => {
    it('Try split negative number', () => {
        expect(() => RomanNumeralsEncoderDecoderHelper.getPowerRepresentationMap(-1)).to.throw("The value should be positive: -1")
    });
    it('Split simple number', () => {
        let testData: Array<number> = [1, 5, 10, 50, 100, 500, 1000];
        let expectedPowerRepresentations: Array<PowerRepresentation> = [
            new PowerRepresentation(1, 1),
            new PowerRepresentation(5, 1),
            new PowerRepresentation(1, 10),
            new PowerRepresentation(5, 10),
            new PowerRepresentation(1, 100),
            new PowerRepresentation(5, 100),
            new PowerRepresentation(1, 1000)
        ];

        testData.forEach((value: number, index: number) => {
            let actual: Array<PowerRepresentation> = RomanNumeralsEncoderDecoderHelper.getPowerRepresentationMap(value);
            assert.isNotNull(actual, 'should not be NULL');
            assert.lengthOf(actual, 1, 'length should be 1');
            assert.deepEqual(actual[0], expectedPowerRepresentations[index], `Representation of "${value}" should be: ${expectedPowerRepresentations[index].toString()}`);
        });
    });
    it('Split complex number', () => {
        let testData: Array<number> = [5342, 6854];
        let expectedPowerRepresentationMaps: Array<Array<PowerRepresentation>> = [
            [
                new PowerRepresentation(5, 1000),
                new PowerRepresentation(3, 100),
                new PowerRepresentation(4, 10),
                new PowerRepresentation(2, 1)
            ],
            [
                new PowerRepresentation(6, 1000),
                new PowerRepresentation(8, 100),
                new PowerRepresentation(5, 10),
                new PowerRepresentation(4, 1)
            ],
        ];

        testData.forEach((value: number, index: number) => {
            let actual: Array<PowerRepresentation> = RomanNumeralsEncoderDecoderHelper.getPowerRepresentationMap(value);
            assert.lengthOf(actual, expectedPowerRepresentationMaps[index].length, `Length of "${value}" should be ${expectedPowerRepresentationMaps[index].length}`);
            actual.forEach((elem: PowerRepresentation, id: number) => {
                assert.deepEqual(elem, expectedPowerRepresentationMaps[index][id], `Representation of "${elem.toString()}" should be: ${expectedPowerRepresentationMaps[index][id]}`);
            });
        });

    });
    it('Get symbol by correct value', () => {
        let testData: Array<number> = [1, 5, 10, 50, 100, 500, 1000];
        let expectedSymbols: Array<string> = ['I', 'V', 'X', 'L', 'C', 'D', 'M'];

        testData.forEach((value: number, index: number) => {
            let actual: string = RomanNumeralsEncoderDecoderHelper.getCorrectSymbol(value);
            assert.equal(actual, expectedSymbols[index], `Symbol should be ${expectedSymbols[index]}`);
        });
    });
    it('Get symbol by incorrect value', () => {
        expect(() => RomanNumeralsEncoderDecoderHelper.getCorrectSymbol(3)).to.throw('There is no representation for "3"');
    });
    it('Check valid value', () => {
        [1, 5, 10, 50, 100, 500, 1000].forEach((value: number) => {
            assert.isTrue(RomanNumeralsEncoderDecoderHelper.isValidValue(value), `Value "${value}" should be valid`);
        });
    });
    it('Check invalid value', () => {
        [3, 7, 11].forEach((value: number) => {
            assert.isFalse(RomanNumeralsEncoderDecoderHelper.isValidValue(value), `Value "${value}" should be invalid`);
        });
    });
    it('Get valid power representation of a simple value', () => {
        let testData: Array<PowerRepresentation> = [
            new PowerRepresentation(2, 1),
            new PowerRepresentation(3, 1),
            new PowerRepresentation(4, 1),
            new PowerRepresentation(6, 1),
            new PowerRepresentation(7, 1),
            new PowerRepresentation(8, 1),
            new PowerRepresentation(9, 1)
        ];
        let expectedPowerRepresentationMaps: Array<Array<PowerRepresentation>> = [
            [
                new PowerRepresentation(1, 1),
                new PowerRepresentation(1, 1)
            ],
            [
                new PowerRepresentation(1, 1),
                new PowerRepresentation(1, 1),
                new PowerRepresentation(1, 1)
            ],
            [
                new PowerRepresentation(1, 1),
                new PowerRepresentation(5, 1)
            ],
            [
                new PowerRepresentation(5, 1),
                new PowerRepresentation(1, 1)
            ],
            [
                new PowerRepresentation(5, 1),
                new PowerRepresentation(1, 1),
                new PowerRepresentation(1, 1)
            ],
            [
                new PowerRepresentation(5, 1),
                new PowerRepresentation(1, 1),
                new PowerRepresentation(1, 1),
                new PowerRepresentation(1, 1)
            ],
            [
                new PowerRepresentation(1, 1),
                new PowerRepresentation(1, 10)
            ]
        ];

        testData.forEach((value: PowerRepresentation, index: number) => {
            let actual: Array<PowerRepresentation> = RomanNumeralsEncoderDecoderHelper.getValidPowerRepresentationMap(value);
            let expected: Array<PowerRepresentation> = expectedPowerRepresentationMaps[index];
            assert.lengthOf(actual, expected.length, `Length of "${value.toString()}" should be ${expected.length}`);
            actual.forEach((elem: PowerRepresentation, id: number) => {
                assert.deepEqual(elem, expected[id], `Representation of "${elem.toString()}" should be ${expected[id].toString()}`);
            });
        });
    });
});

describe('RomanNumeralsDecoderHelper', function () {
    it('Try get value by non-existing symbol', () => {
        expect(() => RomanNumeralsEncoderDecoderHelper.getCorrespondingValueBySymbol('H')).to.throw('Could not found value for symbol "H"');
    });
    it('Get value by existing symbol', () => {
        let values: Array<number> = [1, 5, 10, 50, 100, 500, 1000];
        let symbols: Array<string> = ['I', 'V', 'X', 'L', 'C', 'D', 'M'];

        symbols.forEach((symbol: string, index: number) => {
            let actual = RomanNumeralsEncoderDecoderHelper.getCorrespondingValueBySymbol(symbol);
            assert.equal(actual, values[index]);
        });
    });
});