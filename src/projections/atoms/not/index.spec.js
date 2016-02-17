import {expect} from 'chai';
import sinon from 'sinon';

import $not from './index.js';

describe('Connections > Atoms > $not', () => {
    describe('Common', () => {
        it('$not :: Function -> Object -> *', () => {
            expect($not).to.be.a('function');
            expect($not(() => {})).to.be.a('function');
            expect($not(() => {})({})).not.to.be.a('function');
        });

        it('$not :: (Function, Object) -> *', () => {
            expect($not(() => {}, {})).not.to.be.a('function');
        });
    });

    describe('Vanilla JS', () => {
        it('should return true if the function returns a falsy value', () => {
            const subject = 'mySubject';
            const falsy1 = sinon.spy(() => false);
            const falsy2 = sinon.spy(() => undefined);
            const falsy3 = sinon.spy(() => null);
            const falsy4 = sinon.spy(() => '');
            const falsy5 = sinon.spy(() => 0);
            const falsy6 = sinon.spy(() => {});

            expect($not(falsy1, subject)).to.equal(true);
            expect(falsy1.called).to.equal(true);
            expect(falsy1.getCall(0).args[0]).to.equal('mySubject');
            expect($not(falsy2, subject)).to.equal(true);
            expect(falsy2.called).to.equal(true);
            expect(falsy2.getCall(0).args[0]).to.equal('mySubject');
            expect($not(falsy3, subject)).to.equal(true);
            expect(falsy3.called).to.equal(true);
            expect(falsy3.getCall(0).args[0]).to.equal('mySubject');
            expect($not(falsy4, subject)).to.equal(true);
            expect(falsy4.called).to.equal(true);
            expect(falsy4.getCall(0).args[0]).to.equal('mySubject');
            expect($not(falsy5, subject)).to.equal(true);
            expect(falsy5.called).to.equal(true);
            expect(falsy5.getCall(0).args[0]).to.equal('mySubject');
            expect($not(falsy6, subject)).to.equal(true);
            expect(falsy6.called).to.equal(true);
            expect(falsy6.getCall(0).args[0]).to.equal('mySubject');
        });

        it('should return false, if the function returns a falsy value', () => {
            const subject = 'mySubject';
            const truthy1 = sinon.spy(() => '0');
            const truthy2 = sinon.spy(() => []);
            const truthy3 = sinon.spy(() => 1);
            const truthy4 = sinon.spy(() => true);

            expect($not(truthy1, subject)).to.equal(false);
            expect(truthy1.called).to.equal(true);
            expect(truthy1.getCall(0).args[0]).to.equal('mySubject');
            expect($not(truthy2, subject)).to.equal(false);
            expect(truthy2.called).to.equal(true);
            expect(truthy2.getCall(0).args[0]).to.equal('mySubject');
            expect($not(truthy3, subject)).to.equal(false);
            expect(truthy3.called).to.equal(true);
            expect(truthy3.getCall(0).args[0]).to.equal('mySubject');
            expect($not(truthy4, subject)).to.equal(false);
            expect(truthy4.called).to.equal(true);
            expect(truthy4.getCall(0).args[0]).to.equal('mySubject');
        });
    });
});
