import { assert } from 'chai';
import { solution } from './Main';

describe('Roman numerals encoder solution', () => {
  it('basic', () => {
    assert.equal(solution(1000), 'M', '1000 should == "M"')
    assert.equal(solution(4), 'IV', '4 should == "IV"')
    assert.equal(solution(1), 'I', '1 should == "I"')
    assert.equal(solution(1990), 'MCMXC', '1990 should == "MCMXC"')
    assert.equal(solution(2008), 'MMVIII', '2008 should == "MMVIII"')
    assert.equal(solution(1444), 'MCDXLIV', '1444 should == "MCDXLIV"')
  });
});