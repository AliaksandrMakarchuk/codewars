import { assert } from 'chai';
import { solution } from './Main';

describe("Roman numerals decoder solution", function () {
    it('tests', () => {
        assert.equal(solution('XXI'), 21);
        assert.equal(solution('I'), 1);
        assert.equal(solution('IV'), 4);
        assert.equal(solution('MMVIII'), 2008);
        assert.equal(solution('MDCLXVI'), 1666);
    });
});