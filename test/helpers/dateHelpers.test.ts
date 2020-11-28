import { expect } from 'chai';
import { isDateStringFormat, isBefore } from '../../src/helpers/dateHelpers';

describe('helpers > date helpers', () => {
  describe('#isDateStringFormat', () => {
    describe('MM/DD/YYYY format', () => {
      let result;
      before(() => {
        const input = '09/19/2000';
        result = isDateStringFormat(input);
      });
      it('returns false', () => {
        expect(result).to.be.false;
      });
    });

    describe('YYYY-MM-DD format', () => {
      let result;
      before(() => {
        const input = '2000-09-19';
        result = isDateStringFormat(input);
      });
      it('returns true', () => {
        expect(result).to.be.true;
      });
    });
  });

  describe('#isBefore', () => {
    describe('1st parameter is earlier than 2nd', () => {
      let result;
      before(() => {
        const since = '2019-06-01';
        const until = '2019-07-01';
        result = isBefore(since, until);
      });
      it('returns true', () => {
        expect(result).to.be.true;
      });
    });

    describe('1st parameter is later than 2nd', () => {
      let result;
      before(() => {
        const since = '2019-07-01';
        const until = '2019-06-01';
        result = isBefore(since, until);
      });
      it('returns false', () => {
        expect(result).to.be.false;
      });
    });
  });
});