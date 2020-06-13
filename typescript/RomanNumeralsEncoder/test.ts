import { solution, RomanNumeralsEncoderHelper, PowerRepresentation } from './Main';
import { assert, expect } from 'chai';

describe('Roman numerals encoder solution', () => {
  it('basic', () => {
    let result = solution(1000);
    expect(result).to.equal('M', '1000 should == "M"');
    assert.equal(solution(1000), 'M', '1000 should == "M"')
    assert.equal(solution(4), 'IV', '4 should == "IV"')
    assert.equal(solution(1), 'I', '1 should == "I"')
    assert.equal(solution(1990), 'MCMXC', '1990 should == "MCMXC"')
    assert.equal(solution(2008), 'MMVIII', '2008 should == "MMVIII"')
    assert.equal(solution(1444), 'MCDXLIV', '1444 should == "MCDXLIV"')
  });
});

describe('RomanNumeralsEncoderHelper', () => {
  it('Try split negative number', () => {
    expect(() => RomanNumeralsEncoderHelper.getPowerRepresentationMap(-1)).to.throw("The value should be positive: -1")
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
      let actual: Array<PowerRepresentation> = RomanNumeralsEncoderHelper.getPowerRepresentationMap(value);
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
      let actual: Array<PowerRepresentation> = RomanNumeralsEncoderHelper.getPowerRepresentationMap(value);
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
      let actual: string = RomanNumeralsEncoderHelper.getCorrectSymbol(value);
      assert.equal(actual, expectedSymbols[index], `Symbol should be ${expectedSymbols[index]}`);
    });
  });
  it('Get symbol by incorrect value', () => {
    expect(() => RomanNumeralsEncoderHelper.getCorrectSymbol(3)).to.throw('There is no representation for "3"');
  });
  it('Check valid value', () => {
    [1, 5, 10, 50, 100, 500, 1000].forEach((value: number) => {
      assert.isTrue(RomanNumeralsEncoderHelper.isValidValue(value), `Value "${value}" should be valid`);
    });
  });
  it('Check invalid value', () => {
    [3, 7, 11].forEach((value: number) => {
      assert.isFalse(RomanNumeralsEncoderHelper.isValidValue(value), `Value "${value}" should be invalid`);
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
      let actual: Array<PowerRepresentation> = RomanNumeralsEncoderHelper.getValidPowerRepresentationMap(value);
      let expected: Array<PowerRepresentation> = expectedPowerRepresentationMaps[index];
      assert.lengthOf(actual, expected.length, `Length of "${value.toString()}" should be ${expected.length}`);
      actual.forEach((elem: PowerRepresentation, id: number) => {
        assert.deepEqual(elem, expected[id], `Representation of "${elem.toString()}" should be ${expected[id].toString()}`);
      });
    });
  });
});