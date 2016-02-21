import {expect} from 'chai';
import 'mocha-sinon';

import $pop from './index.js';

describe('Migrations > Atoms > $pop', () => {
    beforeEach(function stubConsoleWarn() {
        this.sinon.stub(console, 'warn');
    });

    describe('Common', () => {
        it('$pop :: String -> Object -> Object', () => {
            expect($pop('')).to.be.a('function');
            expect($pop('')({})).not.to.be.a('function');
        });

        it('$pop :: (String, Object) -> Object', () => {
            expect($pop('', {})).not.to.be.a('function');
        });
    });

    describe('Vanilla JS', () => {
        it('should remove an item from the end of an array', () => {
            const subject = {
                test: [1, 2, 3]
            };

            expect($pop('test', subject)).to.deep.equal({
                test: [1, 2]
            });
            expect($pop('test', subject)).to.not.equal(subject);
        });

        it('should do nothing and warn when the target is not an array', () => {
            const subject = {
                test1: 'some string',
                test2: undefined,
                test3: {}
            };

            expect($pop('test1', subject)).to.equal(subject);
            expect(console.warn.calledOnce).to.equal(true);
            expect(console.warn.calledWith('Cannot pop an item from a string.')).to.equal(true);

            expect($pop('test2', subject)).to.equal(subject);
            expect(console.warn.calledTwice).to.equal(true);
            expect(console.warn.calledWith('Cannot pop an item from a undefined.')).to.equal(true);

            expect($pop('test3', subject)).to.equal(subject);
            expect(console.warn.calledThrice).to.equal(true);
            expect(console.warn.calledWith('Cannot pop an item from a object.')).to.equal(true);
        });
    });

    describe('Immutable', () => {
        it('should add an item to an array');
        it('should do nothing and warn when the target is not an array');
    });
});
