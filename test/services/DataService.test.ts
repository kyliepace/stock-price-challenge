import chai from 'chai';
import { createSandbox } from 'sinon';
chai.use(require('sinon-chai'));
import DataService from '../../src/services/DataService';
import stockApiResponse from '../../seed/stockApiResponse';

describe('services > DataService', () => {
  let sandbox;
  let getCached;
  let getFromApi;
  let service;
  let saveToCache;
  const testData = stockApiResponse.daily_prices;

  before(() => {
    sandbox = createSandbox();
    getCached = sandbox.stub(DataService.prototype, 'getCached');
    getFromApi = sandbox.stub(DataService.prototype, 'getFromApi');
    saveToCache = sandbox.stub(DataService.prototype, 'saveToCache').resolves();
    service = new DataService();
  });

  after(() => {
    sandbox.restore();
  });

  describe('#getStockData', () => {
    const params = {
      since: '2019-06-01',
      until: '2019-07-01',
      symbol: 'MSFT'
    };

    describe('data already cached', () => {
      let data;
      before(async () => {
        getCached.resolves(testData);
        data = await service.getStockData(params);
      });
      it('calls cache with built key', () => {
        chai.expect(getCached).to.be.calledOnce;
        chai.expect(getCached).to.be.calledWith('since=2019-06-01&until=2019-07-01&symbol=MSFT')
      });

      it('does not call getFromApi', () => {
        chai.expect(getFromApi).to.not.be.called;
      });

      it('does not save to cache', () => {
        chai.expect(saveToCache).to.not.be.called;
      });

      it('returns data', () => {
        chai.expect(data).to.deep.equal(testData);
      });
    });

    describe('data not already cached', () => {
      let data;
      before(async () => {
        sandbox.resetHistory();
        getCached.resolves(null);
        getFromApi.resolves(testData);
        data = await service.getStockData(params);
      });
      it('calls getFromApi', () => {
        chai.expect(getFromApi).to.be.called;
      });
      it('saves to cache', () => {
        chai.expect(saveToCache).to.be.called;
      });
      it('returns data', () => {
        chai.expect(data).to.deep.equal(testData);
      });
    });
  });
});