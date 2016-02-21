import {expect} from 'chai';

import * as api from './index.js';

describe.only('API', () => {
    describe('Projections', () => {
        it('$and', () => {
            expect(api.$and).to.be.a('function');
        });
        it('$contains', () => {
            expect(api.$contains).to.be.a('function');
        });
        it('$count', () => {
            expect(api.$count).to.be.a('function');
        });
        it('$get', () => {
            expect(api.$get).to.be.a('function');
        });
        it('$head', () => {
            expect(api.$head).to.be.a('function');
        });
        it('$map', () => {
            expect(api.$map).to.be.a('function');
        });
        it('$not', () => {
            expect(api.$not).to.be.a('function');
        });
        it('$or', () => {
            expect(api.$or).to.be.a('function');
        });
        it('$tail', () => {
            expect(api.$tail).to.be.a('function');
        });
        it('$resolve', () => {
            expect(api.$resolve).to.be.a('function');
        });
    });

    describe('Migrations', () => {
        it('$add', () => {
            expect(api.$add).to.be.a('function');
        });
        it('$drop', () => {
            expect(api.$drop).to.be.a('function');
        });
        it('$override', () => {
            expect(api.$override).to.be.a('function');
        });
        it('$remove', () => {
            expect(api.$remove).to.be.a('function');
        });
        it('$set', () => {
            expect(api.$set).to.be.a('function');
        });
        it('$merge', () => {
            expect(api.$merge).to.be.a('function');
        });
        it('$toggle', () => {
            expect(api.$toggle).to.be.a('function');
        });
    });

    describe('Connections', () => {
        it('$all', () => {
            expect(api.$all).to.be.a('function');
        });
        it('$summarize', () => {
            expect(api.$summarize).to.be.a('function');
        });
        it('$traverse', () => {
            expect(api.$traverse).to.be.a('function');
        });
    });

    describe('Effects', () => {
        it('$log', () => {
            expect(api.$log).to.be.a('function');
        });
    });
});
