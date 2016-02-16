import {expect} from 'chai';
import 'mocha-sinon';

import $tail from './index.js';

describe('Projections > Atoms > $tail', () => {
    beforeEach(function stubConsoleWarn() {
        this.sinon.stub(console, 'warn');
    });

    describe('Common', () => {
        it('$tail :: String -> Object -> *', () => {
            expect($tail).to.be.a('function');
            expect($tail('')).to.be.a('function');
            expect($tail('')({})).not.to.be.a('function');
        });

        it('$tail :: (String, Object) -> *', () => {
            expect($tail('', {})).not.to.be.a('function');
        });
    });

    describe('Vanilla JS', () => {
        it('should return all elements but the first of an array, addressed by path', () => {
            const subject = {
                test1: [1, 2, 3, 4],
                test2: [2, 3, 4],
                test3: [3, 4],
                test4: [4]
            };

            expect($tail('test1', subject)).to.deep.equal([2, 3, 4]);
            expect($tail('test2', subject)).to.deep.equal([3, 4]);
            expect($tail('test3', subject)).to.deep.equal([4]);
            expect($tail('test4', subject)).to.deep.equal([]);
        });

        it('should warn, if the target is not an array', () => {
            const subject = {
                test: ''
            };

            expect($tail('test', subject)).to.equal(null);
            expect(console.warn.calledOnce).to.equal(true);
            expect(console.warn.calledWith('$tail expects the target to be an array, got string instead')).to.equal(true);
        });
    });

    describe('Immutable', () => {
        it('should return the first element of an array, addresses by path');
        it('should warn, if the target is not an array');
    });
});
