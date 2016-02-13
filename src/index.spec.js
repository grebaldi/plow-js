import {expect} from 'chai';

import api from './index.js';

describe('API', () => {
    describe('Projections', () => {
      it('$get', () => {
        expect(api.$get).to.be.a('function');
      });
      it('$map', () => {
        expect(api.$map).to.be.a('function');
      });
      it('$count', () => {
        expect(api.$count).to.be.a('function');
      });
    });
});
