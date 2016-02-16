import {expect} from 'chai';
import 'mocha-sinon';

import $head from './index.js';

describe.only('Projections > Atoms > $head', () => {
    beforeEach(function stubConsoleWarn() {
        this.sinon.stub(console, 'warn');
    });

    describe('Common', () => {
        it('$head :: String -> Object -> *', () => {
            expect($head).to.be.a('function');
            expect($head('')).to.be.a('function');
            expect($head('')({})).not.to.be.a('function');
        });

        it('$head :: (String, Object) -> *', () => {
            expect($head('', {})).not.to.be.a('function');
        });
    });

    describe('Vanilla JS', () => {
        it('should return the first element of an array, addresses by path', () => {
            const subject = {
                test1: [1, 2, 3, 4],
                test2: [2, 3, 4],
                test3: [3, 4],
                test4: [4]
            };

            expect($head('test1', subject)).to.equal(1);
            expect($head('test2', subject)).to.equal(2);
            expect($head('test3', subject)).to.equal(3);
            expect($head('test4', subject)).to.equal(4);
        });

        it('should warn, if the target is not an array', () => {
            const subject = {
                test: ''
            };

            expect($head('test', subject)).to.equal(null);
            expect(console.warn.calledOnce).to.equal(true);
            expect(console.warn.calledWith('$head expects the target to be an array, got string instead')).to.equal(true);
        });
    });

    describe('Immutable', () => {
        it('should return the first element of an array, addresses by path');
        it('should warn, if the target is not an array');
    });
});
