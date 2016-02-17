import {expect} from 'chai';
import sinon from 'sinon';

import $all from './index.js';

describe('Connections > Atoms > $all', () => {
    // Helper Identity function
    const id = id => id;

    describe('Common', () => {
        it('$all :: ...Function -> Object -> *', () => {
            expect($all).to.be.a('function');
            expect($all(() => {})).to.be.a('function');
            expect($all(() => {}, () => {})).to.be.a('function');
            expect($all(() => {}, () => {}, () => {})).to.be.a('function');
            expect($all(() => {})({})).not.to.be.a('function');
            expect($all(() => {}, () => {})({})).not.to.be.a('function');
            expect($all(() => {}, () => {}, () => {})({})).not.to.be.a('function');
        });

        it('$all :: (...Function, Object) -> *', () => {
            expect($all(() => {}, {})).not.to.be.a('function');
            expect($all(() => {}, () => {}, {})).not.to.be.a('function');
            expect($all(() => {}, () => {}, () => {}, {})).not.to.be.a('function');
            expect($all(() => {}, () => {}, () => {}, () => {}, {})).not.to.be.a('function');
        });
    });

    describe('Vanilla JS', () => {
        it('should perform all passed functions', () => {
            const op1 = sinon.spy(id);
            const op2 = sinon.spy(id);
            const op3 = sinon.spy(id);

            expect($all(op1, op2, op3, 'test')).to.equal('test');
            expect(op1.calledOnce).to.equal(true);
            expect(op2.calledOnce).to.equal(true);
            expect(op3.calledOnce).to.equal(true);
        });

        it('should run the functions in a predictable order', () => {
            const op1 = a => a + 1;
            const op2 = a => a * 2;
            const op3 = a => a + 3;

            expect($all(op1, op2, op3, 1)).to.equal(7);
            expect($all(op1, op2, op3, 2)).to.equal(9);
            expect($all(op3, op2, op1, 1)).to.equal(9);
            expect($all(op3, op2, op1, 2)).to.equal(11);
        });
    });
});
