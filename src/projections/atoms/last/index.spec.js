import {expect} from 'chai';
import 'mocha-sinon';

import $last from './index.js';

describe('Projections > Atoms > $last', () => {
    beforeEach(function stubConsoleWarn() {
        this.sinon.stub(console, 'warn');
    });

    describe('Common', () => {
        it('$last :: String -> Object -> *', () => {
            expect($last).to.be.a('function');
            expect($last('')).to.be.a('function');
            expect($last('')({})).not.to.be.a('function');
        });

        it('$last :: (String, Object) -> *', () => {
            expect($last('', {})).not.to.be.a('function');
        });
    });

    describe('Vanilla JS', () => {
        it('should return the last element of an array, addresses by path', () => {
            const subject = {
                test1: [1, 2, 3, 4],
                test2: [2, 3, 4],
                test3: [3, 4],
                test4: [4]
            };

            expect($last('test1', subject)).to.equal(4);
            expect($last('test2', subject)).to.equal(4);
            expect($last('test3', subject)).to.equal(4);
            expect($last('test4', subject)).to.equal(4);
        });

        it('should warn, if the target is not an array', () => {
            const subject = {
                test: ''
            };

            expect($last('test', subject)).to.equal(null);
            expect(console.warn.calledOnce).to.equal(true);
            expect(console.warn.calledWith('$last expects the target to be an array, got string instead')).to.equal(true);
        });
    });

    describe('Immutable', () => {
        it('should return the last element of an array, addresses by path');
        it('should warn, if the target is not an array');
    });
});
