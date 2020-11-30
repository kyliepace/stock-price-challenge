import chai from 'chai';
import { createSandbox } from 'sinon';
chai.use(require('sinon-chai'));
import sampleApiResponse from '../../mock/stockApiResponse';
import RedisRepository from '../../src/repositories/RedisRepository';


describe('repositories > RedisRepository', () => {
  let sandbox;
  let set;
  let get;
  let repo;
  const key = 'test-key';
  
  before(() => {
    sandbox = createSandbox();
    set = sandbox.stub().resolves('ok');
    get = sandbox.stub();
    const mockClient = {
      set,
      get
    };
    repo = new RedisRepository(mockClient);
  });

  after(() => {
    sandbox.restore();
  });

  describe('#save', () => {
    describe('incoming data as object', () => {
      let data;
      before(async () => {
        data = sampleApiResponse.daily_prices;
        await repo.save(key, data);
      })
      it('saves data as string', () => {
        chai.expect(set.args[0][1]).to.equal(JSON.stringify(sampleApiResponse.daily_prices))
      });
    });
  });

  describe('#find', () => {
    describe('redis returns undefined', () => {
      let result;
      before(async() => {
        get.resolves(undefined);
        result = await repo.find(key);
      });
      it('returns null', () => {
        chai.expect(result).to.equal(null);
      });
    });

    describe('redis returns data', () => {
      let result;
      before(async() => {
        sandbox.resetHistory();
        get.resolves(JSON.stringify(sampleApiResponse.daily_prices));

        result = await repo.find(key);
      });
      it('returns data as json', () => {
        chai.expect(result).to.deep.equal(sampleApiResponse.daily_prices);
      });
    });
  });
});