import {expect} from 'chai';
import sinon from 'sinon';

import $and from './index.js';

describe('Projections > Atoms > $and', () => {
    // Helper Identity function
    const id = id => id;

    describe('Common', () => {
        it('$and :: ...Function -> Object -> *', () => {
            expect($and).to.be.a('function');
            expect($and(() => {})).to.be.a('function');
            expect($and(() => {}, () => {})).to.be.a('function');
            expect($and(() => {}, () => {}, () => {})).to.be.a('function');
            expect($and(() => {})({})).not.to.be.a('function');
            expect($and(() => {}, () => {})({})).not.to.be.a('function');
            expect($and(() => {}, () => {}, () => {})({})).not.to.be.a('function');
        });

        it('$and :: (...Function, Object) -> *', () => {
            expect($and(() => {}, {})).not.to.be.a('function');
            expect($and(() => {}, () => {}, {})).not.to.be.a('function');
            expect($and(() => {}, () => {}, () => {}, {})).not.to.be.a('function');
            expect($and(() => {}, () => {}, () => {}, () => {}, {})).not.to.be.a('function');
        });
    });

    describe('Vanilla JS', () => {
        it('should call all passed functions with the passed subject and return true, if all them return truthy values', () => {
            const subject = 'mySubject';
            const op1 = sinon.spy(id);
            const op2 = sinon.spy(id);
            const op3 = sinon.spy(id);

            expect($and(op1, op2, op3, subject)).to.equal(true);
            expect(op1.called).to.equal(true);
            expect(op1.getCall(0).args[0]).to.equal('mySubject');
            expect(op2.called).to.equal(true);
            expect(op2.getCall(0).args[0]).to.equal('mySubject');
            expect(op3.called).to.equal(true);
            expect(op3.getCall(0).args[0]).to.equal('mySubject');
        });

        it('should return false, if any of the functions returns a falsy value', () => {
            const subject = 'mySubject';
            const opTrue = () => true;
            const opFalse = () => false;
            const opFalsy1 = () => '';
            const opFalsy2 = () => null;
            const opFalsy3 = () => undefined;
            const opFalsy4 = () => NaN;
            const opFalsy5 = () => 0;

            expect($and(opTrue, opTrue, opTrue, opTrue, subject)).to.equal(true);
            expect($and(opFalse, opTrue, opTrue, opTrue, subject)).to.equal(false);
            expect($and(opTrue, opFalse, opTrue, opTrue, subject)).to.equal(false);
            expect($and(opTrue, opTrue, opFalse, opTrue, subject)).to.equal(false);
            expect($and(opTrue, opTrue, opTrue, opFalse, subject)).to.equal(false);

            expect($and(opTrue, opTrue, opFalsy1, opTrue, subject)).to.equal(false);
            expect($and(opTrue, opTrue, opFalsy2, opTrue, subject)).to.equal(false);
            expect($and(opTrue, opTrue, opFalsy3, opTrue, subject)).to.equal(false);
            expect($and(opTrue, opTrue, opFalsy4, opTrue, subject)).to.equal(false);
            expect($and(opTrue, opTrue, opFalsy5, opTrue, subject)).to.equal(false);
        });
    });
});
