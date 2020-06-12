// /// <reference path="/runner/typings/mocha/index.d.ts" />
// /// <reference path="/runner/typings/chai/index.d.ts" />
import { solution, RomanNumeralsEncoderHelper, PowerRepresentation } from './Main';
import { assert, expect } from 'chai';

describe('solution', () => {
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
    let actual = RomanNumeralsEncoderHelper.getPowerRepresentationMap(1000);
    expect(actual.length).to.equal(1, 'length should be 1');
    expect(actual[0].Value).to.equal(1, 'value should be 1');
    expect(actual[0].Power).to.equal(1000, 'power should be 1000');
    actual = RomanNumeralsEncoderHelper.getPowerRepresentationMap(500);
    expect(actual.length).to.equal(1, 'length should be 1');
    expect(actual[0].Value).to.equal(5, 'value should be 5');
    expect(actual[0].Power).to.equal(100, 'power should be 100');
    actual = RomanNumeralsEncoderHelper.getPowerRepresentationMap(100);
    expect(actual.length).to.equal(1, 'length should be 1');
    expect(actual[0].Value).to.equal(1, 'value should be 1');
    expect(actual[0].Power).to.equal(100, 'power should be 100');
    actual = RomanNumeralsEncoderHelper.getPowerRepresentationMap(50);
    expect(actual.length).to.equal(1, 'length should be 1');
    expect(actual[0].Value).to.equal(5, 'value should be 5');
    expect(actual[0].Power).to.equal(10, 'power should be 10');
    actual = RomanNumeralsEncoderHelper.getPowerRepresentationMap(10);
    expect(actual.length).to.equal(1, 'length should be 1');
    expect(actual[0].Value).to.equal(1, 'value should be 1');
    expect(actual[0].Power).to.equal(10, 'power should be 10');
    actual = RomanNumeralsEncoderHelper.getPowerRepresentationMap(5);
    expect(actual.length).to.equal(1, 'length should be 1');
    expect(actual[0].Value).to.equal(5, 'value should be 5');
    expect(actual[0].Power).to.equal(1, 'power should be 1');
    actual = RomanNumeralsEncoderHelper.getPowerRepresentationMap(1);
    expect(actual.length).to.equal(1, 'length should be 1');
    expect(actual[0].Value).to.equal(1, 'value should be 1');
    expect(actual[0].Power).to.equal(1, 'power should be 1');
  });
  it('Split complex number', () => {
    let splitValue = RomanNumeralsEncoderHelper.getPowerRepresentationMap(5342);
    expect(splitValue.length).to.equal(4, 'length should be 4');
    expect(splitValue[0].Power).to.equal(1000, 'power should be 1000');
    expect(splitValue[0].Value).to.equal(5, 'value should be 5');
    expect(splitValue[1].Power).to.equal(100, 'power should be 100');
    expect(splitValue[1].Value).to.equal(3, 'value should be 3');
    expect(splitValue[2].Power).to.equal(10, 'power should be 10');
    expect(splitValue[2].Value).to.equal(4, 'value should be 4');
    expect(splitValue[3].Power).to.equal(1, 'power should be 1');
    expect(splitValue[3].Value).to.equal(2, 'value should be 2');
  });
  it('Get symbol by correct value', () => {
    let actual = RomanNumeralsEncoderHelper.getCorrectSymbol(1);
    expect(actual).to.equal('I', 'symbol should be I');
    actual = RomanNumeralsEncoderHelper.getCorrectSymbol(5);
    expect(actual).to.equal('V', 'symbol should be V');
    actual = RomanNumeralsEncoderHelper.getCorrectSymbol(10);
    expect(actual).to.equal('X', 'symbol should be X');
    actual = RomanNumeralsEncoderHelper.getCorrectSymbol(50);
    expect(actual).to.equal('L', 'symbol should be L');
    actual = RomanNumeralsEncoderHelper.getCorrectSymbol(100);
    expect(actual).to.equal('C', 'symbol should be C');
    actual = RomanNumeralsEncoderHelper.getCorrectSymbol(500);
    expect(actual).to.equal('D', 'symbol should be D');
    actual = RomanNumeralsEncoderHelper.getCorrectSymbol(1000);
    expect(actual).to.equal('M', 'symbol should be M');
  });
  it('Get symbol by incorrect value', () => {
    let actual = RomanNumeralsEncoderHelper.getCorrectSymbol(3);
    expect(actual).to.be.undefined;
  });
  it('Check valid value', () => {
    let actual = RomanNumeralsEncoderHelper.isValidValue(1);
    expect(actual).to.be.true;
    actual = RomanNumeralsEncoderHelper.isValidValue(5);
    expect(actual).to.be.true;
  });
  it('Check invalid value', () => {
    let actual = RomanNumeralsEncoderHelper.isValidValue(3);
    expect(actual).to.be.false;
  });
  it('Get valid power representation of a simple value', () => {
    let actual = RomanNumeralsEncoderHelper.getValidPowerRepresentationMap(new PowerRepresentation(2, 1));
    expect(actual.length).to.equal(2, 'length should be 2');
    expect(actual[0].Value).to.equal(1, 'value should be 1');
    expect(actual[0].Power).to.equal(1, 'power should be 1');
    expect(actual[1].Value).to.equal(1, 'value should be 1');
    expect(actual[1].Power).to.equal(1, 'power should be 1');
    actual = RomanNumeralsEncoderHelper.getValidPowerRepresentationMap(new PowerRepresentation(3, 1));
    expect(actual.length).to.equal(3, 'length should be 3');
    expect(actual[0].Value).to.equal(1, 'value should be 1');
    expect(actual[0].Power).to.equal(1, 'power should be 1');
    expect(actual[1].Value).to.equal(1, 'value should be 1');
    expect(actual[1].Power).to.equal(1, 'power should be 1');
    expect(actual[2].Value).to.equal(1, 'value should be 1');
    expect(actual[2].Power).to.equal(1, 'power should be 1');
    actual = RomanNumeralsEncoderHelper.getValidPowerRepresentationMap(new PowerRepresentation(4, 1));
    expect(actual.length).to.equal(2, 'length should be 2');
    expect(actual[0].Value).to.equal(1, 'value should be 1');
    expect(actual[0].Power).to.equal(1, 'power should be 1');
    expect(actual[1].Value).to.equal(5, 'value should be 5');
    expect(actual[1].Power).to.equal(1, 'power should be 1');
    actual = RomanNumeralsEncoderHelper.getValidPowerRepresentationMap(new PowerRepresentation(6, 1));
    expect(actual.length).to.equal(2, 'length should be 2');
    expect(actual[0].Value).to.equal(5, 'value should be 5');
    expect(actual[0].Power).to.equal(1, 'power should be 1');
    expect(actual[1].Value).to.equal(1, 'value should be 1');
    expect(actual[1].Power).to.equal(1, 'power should be 1');
    actual = RomanNumeralsEncoderHelper.getValidPowerRepresentationMap(new PowerRepresentation(7, 1));
    expect(actual.length).to.equal(3, 'length should be 3');
    expect(actual[0].Value).to.equal(5, 'value should be 5');
    expect(actual[0].Power).to.equal(1, 'power should be 1');
    expect(actual[1].Value).to.equal(1, 'value should be 1');
    expect(actual[1].Power).to.equal(1, 'power should be 1');
    expect(actual[2].Value).to.equal(1, 'value should be 1');
    expect(actual[2].Power).to.equal(1, 'power should be 1');
    actual = RomanNumeralsEncoderHelper.getValidPowerRepresentationMap(new PowerRepresentation(8, 1));
    expect(actual.length).to.equal(4, 'length should be 4');
    expect(actual[0].Value).to.equal(5, 'value should be 5');
    expect(actual[0].Power).to.equal(1, 'power should be 1');
    expect(actual[1].Value).to.equal(1, 'value should be 1');
    expect(actual[1].Power).to.equal(1, 'power should be 1');
    expect(actual[2].Value).to.equal(1, 'value should be 1');
    expect(actual[2].Power).to.equal(1, 'power should be 1');
    expect(actual[3].Value).to.equal(1, 'value should be 1');
    expect(actual[3].Power).to.equal(1, 'power should be 1');
    actual = RomanNumeralsEncoderHelper.getValidPowerRepresentationMap(new PowerRepresentation(9, 1));
    expect(actual.length).to.equal(2, 'length should be 2');
    expect(actual[0].Value).to.equal(1, 'value should be 1');
    expect(actual[0].Power).to.equal(1, 'power should be 1');
    expect(actual[1].Value).to.equal(1, 'value should be 1');
    expect(actual[1].Power).to.equal(10, 'power should be 10');
  });
});