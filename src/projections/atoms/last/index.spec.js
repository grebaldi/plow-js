import {expect} from 'chai';
import 'mocha-sinon';
import {Iterable} from 'immutable';

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

        it('$last :: Array -> Object -> *', () => {
            expect($last([])).to.be.a('function');
            expect($last([])({})).not.to.be.a('function');
        });

        it('$last :: (Array, Object) -> *', () => {
            expect($last([], {})).not.to.be.a('function');
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
        it('should return the last element of an Itrable.Indexed', () => {
            const subject = new Iterable.Indexed([
                new Iterable.Indexed([1, 2, 3, 4]),
                new Iterable.Indexed([2, 3, 4]),
                new Iterable.Indexed([3, 4]),
                new Iterable.Indexed([4]),
            ]);

            expect($last('0', subject)).to.equal(4);
            expect($last('1', subject)).to.equal(4);
            expect($last('2', subject)).to.equal(4);
            expect($last('3', subject)).to.equal(4);
        });

        it('should return the last element of an Itrable.Keyed', () => {
            const subject = new Iterable.Keyed({
                a: new Iterable.Keyed({a: 1, b: 2, c: 3, d: 4}),
                b: new Iterable.Keyed({b: 2, c: 3, d: 4}),
                c: new Iterable.Keyed({c: 3, d: 4}),
                d: new Iterable.Keyed({d: 4})
            });

            expect($last('a', subject)).to.equal(4);
            expect($last('b', subject)).to.equal(4);
            expect($last('c', subject)).to.equal(4);
            expect($last('d', subject)).to.equal(4);
        });

        it('should return the last element of an Itrable.Set', () => {
            const subject = new Iterable.Indexed([
                new Iterable.Set([1, 2, 3, 4]),
                new Iterable.Set([2, 3, 4]),
                new Iterable.Set([3, 4]),
                new Iterable.Set([4]),
            ]);

            expect($last('0', subject)).to.equal(4);
            expect($last('1', subject)).to.equal(4);
            expect($last('2', subject)).to.equal(4);
            expect($last('3', subject)).to.equal(4);
        });
    });
});
