import {expect} from 'chai';
import sinon from 'sinon';

import $and from './index.js';

describe('Connections > Atoms > $and', () => {
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
        it('should call all passed functions with the passed subject', () => {
            const subject = 'mySubject';
            const op1 = sinon.spy(id);
            const op2 = sinon.spy(id);
            const op3 = sinon.spy(id);

            expect($and(op1, op2, op3, subject)).to.equal('mySubject');
            expect(op1.called).to.equal(true);
            expect(op1.getCall(0).args[0]).to.equal('mySubject');
            expect(op2.called).to.equal(true);
            expect(op2.getCall(0).args[0]).to.equal('mySubject');
            expect(op3.called).to.equal(true);
            expect(op3.getCall(0).args[0]).to.equal('mySubject');
        });

        it('should call the passed functions in a predictable order', () => {
            const subject = 1;
            const op1 = sinon.spy(a => a + 1);
            const op2 = sinon.spy(a => a + 2);
            const op3 = sinon.spy(a => a + 3);

            expect($and(op1, op2, op3, subject)).to.equal(7);
            expect($and(op3, op2, op1, subject)).to.equal(7);

            expect(op1.getCall(0).args[0]).to.equal(1);
            expect(op1.getCall(1).args[0]).to.equal(6);
            expect(op2.getCall(0).args[0]).to.equal(2);
            expect(op2.getCall(1).args[0]).to.equal(4);
            expect(op3.getCall(0).args[0]).to.equal(4);
            expect(op3.getCall(1).args[0]).to.equal(1);
        });

        it('should return false, if any of the functions returns false', () => {
            const subject = 'mySubject';
            const opTrue = () => true;
            const opFalse = () => false;

            expect($and(opTrue, opTrue, opTrue, opTrue, subject)).to.equal(true);
            expect($and(opFalse, opTrue, opTrue, opTrue, subject)).to.equal(false);
            expect($and(opTrue, opFalse, opTrue, opTrue, subject)).to.equal(false);
            expect($and(opTrue, opTrue, opFalse, opTrue, subject)).to.equal(false);
            expect($and(opTrue, opTrue, opTrue, opFalse, subject)).to.equal(false);
        });
    });
});
