import {expect} from 'chai';
import 'mocha-sinon';

import $shift from './index.js';

describe('Migrations > Atoms > $shift', () => {
    beforeEach(function stubConsoleWarn() {
        this.sinon.stub(console, 'warn');
    });

    describe('Common', () => {
        it('$shift :: String -> Object -> Object', () => {
            expect($shift('')).to.be.a('function');
            expect($shift('')({})).not.to.be.a('function');
        });

        it('$shift :: (String, Object) -> Object', () => {
            expect($shift('', {})).not.to.be.a('function');
        });
    });

    describe('Vanilla JS', () => {
        it('should remove an item from the beginning of an array', () => {
            const subject = {
                test: [1, 2, 3]
            };

            expect($shift('test', subject)).to.deep.equal({
                test: [2, 3]
            });
            expect($shift('test', subject)).to.not.equal(subject);
        });

        it('should do nothing and warn when the target is not an array', () => {
            const subject = {
                test1: 'some string',
                test2: undefined,
                test3: {}
            };

            expect($shift('test1', subject)).to.equal(subject);
            expect(console.warn.calledOnce).to.equal(true);
            expect(console.warn.calledWith('Cannot shift an item from a string.')).to.equal(true);

            expect($shift('test2', subject)).to.equal(subject);
            expect(console.warn.calledTwice).to.equal(true);
            expect(console.warn.calledWith('Cannot shift an item from a undefined.')).to.equal(true);

            expect($shift('test3', subject)).to.equal(subject);
            expect(console.warn.calledThrice).to.equal(true);
            expect(console.warn.calledWith('Cannot shift an item from a object.')).to.equal(true);
        });
    });

    describe('Immutable', () => {
        it('should remove an item from the beginning of an array');
        it('should do nothing and warn when the target is not an array');
    });
});
