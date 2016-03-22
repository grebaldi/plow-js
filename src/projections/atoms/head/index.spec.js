import {expect} from 'chai';
import 'mocha-sinon';
import {Iterable} from 'immutable';

import $head from './index.js';

describe('Projections > Atoms > $head', () => {
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

        it('$head :: Array -> Object -> *', () => {
            expect($head([])).to.be.a('function');
            expect($head([])({})).not.to.be.a('function');
        });

        it('$head :: (Array, Object) -> *', () => {
            expect($head([], {})).not.to.be.a('function');
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
        it('should return the first element of an Iterable.Indexed', () => {
            const subject = new Iterable.Indexed([
                new Iterable.Indexed([1, 2, 3, 4]),
                new Iterable.Indexed([2, 3, 4]),
                new Iterable.Indexed([3, 4]),
                new Iterable.Indexed([4]),
            ]);

            expect($head('0', subject)).to.equal(1);
            expect($head('1', subject)).to.equal(2);
            expect($head('2', subject)).to.equal(3);
            expect($head('3', subject)).to.equal(4);
        });

        it('should return the first element of an Iterable.Keyed', () => {
            const subject = new Iterable.Keyed({
                a: new Iterable.Keyed({a: 1, b: 2, c: 3, d: 4}),
                b: new Iterable.Keyed({b: 2, c: 3, d: 4}),
                c: new Iterable.Keyed({c: 3, d: 4}),
                d: new Iterable.Keyed({d: 4})
            });

            expect($head('a', subject)).to.equal(1);
            expect($head('b', subject)).to.equal(2);
            expect($head('c', subject)).to.equal(3);
            expect($head('d', subject)).to.equal(4);
        });

        it('should return the first element of an Iterable.Set', () => {
            const subject = new Iterable.Indexed([
                new Iterable.Set([1, 2, 3, 4]),
                new Iterable.Set([2, 3, 4]),
                new Iterable.Set([3, 4]),
                new Iterable.Set([4]),
            ]);

            expect($head('0', subject)).to.equal(1);
            expect($head('1', subject)).to.equal(2);
            expect($head('2', subject)).to.equal(3);
            expect($head('3', subject)).to.equal(4);
        });
    });
});
