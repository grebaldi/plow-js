import {expect} from 'chai';
import {Iterable} from 'immutable';

import $contains from './index.js';

describe('Projections > Atoms > $contains', () => {
    describe('Common', () => {
        it('$contains :: * -> String -> Object -> Boolean', () => {
            expect($contains).to.be.a('function');
            expect($contains(NaN)).to.be.a('function');
            expect($contains(NaN)('')).to.be.a('function');
            expect($contains(NaN)('')({})).not.to.be.a('function');
            expect($contains(NaN)('')({})).to.be.a('boolean');
        });

        it('$contains :: (*, String) -> Object -> Boolean', () => {
            expect($contains(NaN, '')).to.be.a('function');
            expect($contains(NaN, '')({})).not.to.be.a('function');
            expect($contains(NaN, '')({})).to.be.a('boolean');
        });

        it('$contains :: (*, String, Object) -> Boolean', () => {
            expect($contains(NaN, '', {})).not.to.be.a('function');
            expect($contains(NaN, '', {})).to.be.a('boolean');
        });

        it('$contains :: * -> Array -> Object -> Boolean', () => {
            expect($contains).to.be.a('function');
            expect($contains(NaN)).to.be.a('function');
            expect($contains(NaN)([])).to.be.a('function');
            expect($contains(NaN)([])({})).not.to.be.a('function');
            expect($contains(NaN)([])({})).to.be.a('boolean');
        });

        it('$contains :: (*, Array) -> Object -> Boolean', () => {
            expect($contains(NaN, [])).to.be.a('function');
            expect($contains(NaN, [])({})).not.to.be.a('function');
            expect($contains(NaN, [])({})).to.be.a('boolean');
        });

        it('$contains :: (*, Array, Object) -> Boolean', () => {
            expect($contains(NaN, [], {})).not.to.be.a('function');
            expect($contains(NaN, [], {})).to.be.a('boolean');
        });
    });

    describe('Vanilla JS', () => {
        it('should return true if an item can be found in an array', () => {
            const subject = {
                test1: [0, 1, 2, 3, 4],
                test2: ['a', 'b', 'c', '']
            };

            expect($contains(0, 'test1', subject)).to.equal(true);
            expect($contains(1, 'test1', subject)).to.equal(true);
            expect($contains(2, 'test1', subject)).to.equal(true);
            expect($contains(3, 'test1', subject)).to.equal(true);
            expect($contains(4, 'test1', subject)).to.equal(true);
            expect($contains('a', 'test2', subject)).to.equal(true);
            expect($contains('b', 'test2', subject)).to.equal(true);
            expect($contains('c', 'test2', subject)).to.equal(true);
            expect($contains('', 'test2', subject)).to.equal(true);
        });

        it('should return true if an item can be found in an object', () => {
            const subject = {
                test1: {a: 0, b: 1, c: 2, d: 3, e: 4},
                test2: {a: 'a', b: 'b', c: 'c', d: ''}
            };

            expect($contains(0, 'test1', subject)).to.equal(true);
            expect($contains(1, 'test1', subject)).to.equal(true);
            expect($contains(2, 'test1', subject)).to.equal(true);
            expect($contains(3, 'test1', subject)).to.equal(true);
            expect($contains(4, 'test1', subject)).to.equal(true);
            expect($contains('a', 'test2', subject)).to.equal(true);
            expect($contains('b', 'test2', subject)).to.equal(true);
            expect($contains('c', 'test2', subject)).to.equal(true);
            expect($contains('', 'test2', subject)).to.equal(true);
        });

        it('should return false if an item cannot be found in an array', () => {
            const subject = {
                test1: [1, 2, 3, 4],
                test2: ['a', 'b', 'c']
            };

            expect($contains(0, 'test1', subject)).to.equal(false);
            expect($contains(5, 'test1', subject)).to.equal(false);
            expect($contains(6, 'test1', subject)).to.equal(false);
            expect($contains(7, 'test1', subject)).to.equal(false);
            expect($contains(8, 'test1', subject)).to.equal(false);
            expect($contains('d', 'test2', subject)).to.equal(false);
            expect($contains('e', 'test2', subject)).to.equal(false);
            expect($contains('f', 'test2', subject)).to.equal(false);
            expect($contains('', 'test2', subject)).to.equal(false);
        });

        it('should return false if an item cannot be found in an object', () => {
            const subject = {
                test1: {a: 1, b: 2, c: 3, d: 4},
                test2: {a: 'a', b: 'b', c: 'c'}
            };

            expect($contains(0, 'test1', subject)).to.equal(false);
            expect($contains(5, 'test1', subject)).to.equal(false);
            expect($contains(6, 'test1', subject)).to.equal(false);
            expect($contains(7, 'test1', subject)).to.equal(false);
            expect($contains(8, 'test1', subject)).to.equal(false);
            expect($contains('d', 'test2', subject)).to.equal(false);
            expect($contains('e', 'test2', subject)).to.equal(false);
            expect($contains('f', 'test2', subject)).to.equal(false);
            expect($contains('', 'test2', subject)).to.equal(false);
        });

        it('should return false if the target is neither an array nor an object', () => {
            const subject = {
                test1: 'foo',
                test2: 42,
                test3: NaN,
                test4: null,
                test5: undefined
            };

            expect($contains('bar', 'test1', subject)).to.equal(false);
            expect($contains('bar', 'test2', subject)).to.equal(false);
            expect($contains('bar', 'test3', subject)).to.equal(false);
            expect($contains('bar', 'test4', subject)).to.equal(false);
            expect($contains('bar', 'test5', subject)).to.equal(false);
        });
    });

    describe('Immutable', () => {
        it('should return true if an item can be found in an Iterable.Keyed', () => {
            const subject = new Iterable.Keyed({
                a: new Iterable.Keyed({
                    a: 1,
                    b: 2,
                    c: 3
                })
            });

            expect($contains(1, 'a', subject)).to.equal(true);
            expect($contains(2, 'a', subject)).to.equal(true);
            expect($contains(3, 'a', subject)).to.equal(true);
        });

        it('should return true if an item can be found in an Iterable.Indexed', () => {
            const subject = new Iterable.Indexed([
                new Iterable.Indexed([1, 2, 3])
            ]);

            expect($contains(1, '0', subject)).to.equal(true);
            expect($contains(2, '0', subject)).to.equal(true);
            expect($contains(3, '0', subject)).to.equal(true);
        });

        it('should return true if an item can be found in an Iterable.Set', () => {
            const subject = new Iterable.Indexed([
                new Iterable.Set([1, 2, 3])
            ]);

            expect($contains(1, '0', subject)).to.equal(true);
            expect($contains(2, '0', subject)).to.equal(true);
            expect($contains(3, '0', subject)).to.equal(true);
        });

        it('should return false if an item cannot be found in an Iterable.Keyed', () => {
            const subject = new Iterable.Keyed({
                a: new Iterable.Keyed({
                    a: 1,
                    b: 2,
                    c: 3
                })
            });

            expect($contains(4, 'a', subject)).to.equal(false);
            expect($contains(5, 'a', subject)).to.equal(false);
            expect($contains(6, 'a', subject)).to.equal(false);
        });

        it('should return false if an item cannot be found in an Iterable.Indexed', () => {
            const subject = new Iterable.Indexed([
                new Iterable.Indexed([1, 2, 3])
            ]);

            expect($contains(4, '0', subject)).to.equal(false);
            expect($contains(5, '0', subject)).to.equal(false);
            expect($contains(6, '0', subject)).to.equal(false);
        });

        it('should return false if an item cannot be found in an Iterable.Set', () => {
            const subject = new Iterable.Indexed([
                new Iterable.Set([1, 2, 3])
            ]);

            expect($contains(4, '0', subject)).to.equal(false);
            expect($contains(5, '0', subject)).to.equal(false);
            expect($contains(6, '0', subject)).to.equal(false);
        });
    });
});
