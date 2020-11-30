import chai from 'chai';
chai.use(require('sinon-chai'));
import { createSandbox } from 'sinon';
import axios from 'axios';
import sampleResponse from '../../mock/stockApiResponse';
import ApiClient from '../../src/clients/ApiClient';

describe('clients > ApiClient', () => {
  let sandbox;
  let sendRequest;
  let request;

  before(() => {
    sandbox = createSandbox();
    sendRequest = sandbox.spy(ApiClient.prototype, 'sendRequest');
    request = sandbox.stub(axios, 'request') ;
  });
  after(() => {
    sandbox.restore();
  });

  describe('#get', () => {
    let client;
    let baseURL;
    let params;

    before(() => {
      baseURL = 'https://stock-data.graphy.now.sh';
      client = new ApiClient(baseURL);
      params = {
        since: '2019-06-01',
        until: '2019-07-01',
        symbol: 'MSFT'
      };
    });

    describe('no data returned', () => {
      let data;
      before(async () => {
        request.resolves({status: 401});
        data = await client.get('/', params);
      });
      it('returns undefined', () => {
        chai.expect(data).to.deep.equal(undefined)
      });
    });

    describe('data returned', () => {
      let data;
      before(async () => {
        sandbox.resetHistory();
        request.resolves({data: sampleResponse});
        data = await client.get('/', params);
      });

      it('calls sendRequest with params', () => {
        chai.expect(sendRequest).to.be.calledOnce;
        chai.expect(sendRequest.args[0][0].params).to.deep.equal(params)
      });

      it('calls sendRequest with get method', () => {
        chai.expect(sendRequest.args[0][0].method).to.equal('get');
      });

      it('calls sendRequest to expected url', () => {
        chai.expect(sendRequest.args[0][0].baseURL).to.equal(baseURL);
      });

      it('returns data', () => {
        chai.expect(data).to.deep.equal(sampleResponse)
      });
    });

  });
});