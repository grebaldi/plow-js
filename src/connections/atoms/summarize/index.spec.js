import {expect} from 'chai';
import sinon from 'sinon';

import $summarize from './index.js';

describe.only('Connections > Atoms > $summarize', () => {
    // Helper Identity function
    const id = id => id;

    describe('Common', () => {
        it('$summarize :: Array -> Function -> Object -> *', () => {
            expect($summarize).to.be.a('function');
            expect($summarize([])).to.be.a('function');
            expect($summarize([])(() => {})).to.be.a('function');
            expect($summarize([])(() => {})({})).not.to.be.a('function');
        });

        it('$summarize :: (Array, Function) -> Object -> *', () => {
            expect($summarize([], () => {})).to.be.a('function');
            expect($summarize([], () => {})({})).not.to.be.a('function');
        });

        it('$summarize :: (Array, Function, Object) -> *', () => {
            expect($summarize([], () => {}, {})).not.to.be.a('function');
        });
    });

    describe('Vanilla JS', () => {
        it('should perform all passed functions and the finisher', () => {
            const op1 = sinon.spy(id);
            const op2 = sinon.spy(id);
            const op3 = sinon.spy(id);
            const finisher = sinon.spy(id);

            expect($summarize([op1, op2, op3], finisher, 'test')).to.equal('test');
            expect(op1.calledOnce).to.equal(true);
            expect(op2.calledOnce).to.equal(true);
            expect(op3.calledOnce).to.equal(true);
            expect(finisher.calledOnce).to.equal(true);
        });

        it('should pass the results of the functions and the subject to the finisher', () => {
            const op1 = () => 1;
            const op2 = () => 2;
            const op3 = () => 3;
            const finisher = sinon.spy(id);

            expect($summarize([op1, op2, op3], finisher, 'test')).to.equal(1);
            expect(finisher.calledWith(1, 2, 3, 'test')).to.equal(true);
        })
    });
});
