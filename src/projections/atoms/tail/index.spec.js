import {expect} from 'chai';
import 'mocha-sinon';
import {Iterable} from 'immutable';

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

        it('$tail :: Array -> Object -> *', () => {
            expect($tail).to.be.a('function');
            expect($tail([])).to.be.a('function');
            expect($tail([])({})).not.to.be.a('function');
        });

        it('$tail :: (Array, Object) -> *', () => {
            expect($tail([], {})).not.to.be.a('function');
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
        it('should return all elements but the first of an Iterable.Indexed, addresses by path', () => {
            const subject = new Iterable.Indexed([
                new Iterable.Indexed([1, 2, 3, 4]),
                new Iterable.Indexed([2, 3, 4]),
                new Iterable.Indexed([3, 4]),
                new Iterable.Indexed([4])
            ]);

            expect($tail('0', subject).toArray()).to.deep.equal([2, 3, 4]);
            expect($tail('1', subject).toArray()).to.deep.equal([3, 4]);
            expect($tail('2', subject).toArray()).to.deep.equal([4]);
            expect($tail('3', subject).toArray()).to.deep.equal([]);
        });

        it('should return all elements but the first of an Iterable.Keyed, addresses by path', () => {
            const subject = new Iterable.Keyed({
                a: new Iterable.Keyed({a: 1, b: 2, c: 3, d: 4}),
                b: new Iterable.Keyed({b: 2, c: 3, d: 4}),
                c: new Iterable.Keyed({c: 3, d: 4}),
                d: new Iterable.Keyed({d: 4})
            });

            expect($tail('a', subject).toJS()).to.deep.equal({b: 2, c: 3, d: 4});
            expect($tail('b', subject).toJS()).to.deep.equal({c: 3, d: 4});
            expect($tail('c', subject).toJS()).to.deep.equal({d: 4});
            expect($tail('d', subject).toJS()).to.deep.equal({});
        });

        it('should return all elements but the first of an Iterable.Set, addresses by path', () => {
            const subject = new Iterable.Indexed([
                new Iterable.Set([1, 2, 3, 4]),
                new Iterable.Set([2, 3, 4]),
                new Iterable.Set([3, 4]),
                new Iterable.Set([4]),
            ]);

            expect($tail('0', subject).toArray()).to.deep.equal([2, 3, 4]);
            expect($tail('1', subject).toArray()).to.deep.equal([3, 4]);
            expect($tail('2', subject).toArray()).to.deep.equal([4]);
            expect($tail('3', subject).toArray()).to.deep.equal([]);
        });
    });
});
