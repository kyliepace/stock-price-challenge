import chai from 'chai';
chai.use(require('chai-http'));
import getApp from '../../src/loaders';
import { createSandbox } from 'sinon';
import RedisRepository from '../../src/repositories/RedisRepository';
import stockApiResponse from '../../mock/stockApiResponse';

describe('route /ascii', () => {
  let sandbox;
  let redisFind;
  let app;

  before(async () => {
    sandbox = createSandbox();
    redisFind = sandbox.stub(RedisRepository.prototype, 'find').resolves(stockApiResponse.daily_prices);
    app = await getApp();
  });
  after(() => {
    sandbox.restore();
  });

  describe('get', () => {
    describe('valid parameters', () => {
      let query;
      let response;
      before(async () => {
        query = {
          symbol: 'UBER', 
          since: '2019-05-10',
          until: '2019-06-07'
        };
        response = await chai.request(app)
          .get('/ascii')
          .query(query)
      });
      it('returns status 200', () => {
        chai.expect(response.status).to.equal(200);
      });
      // don't want to hard-code body equals test exactly because that will change with the constants file
      it('returns a string line graph', () => {
        chai.expect(response.body).to.be.a('string')
      });
    });
  });
});