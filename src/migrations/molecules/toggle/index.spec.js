import {expect} from 'chai';
import {Map, List, Set, OrderedSet, Iterable} from 'immutable';

import $toggle from './index.js';

describe('Migrations > Molecules > $toggle', () => {
    describe('Common', () => {
        it('$toggle :: String -> Object -> Object !!!(when first parameter leads to Boolean)', () => {
            expect($toggle('a')).to.be.a('function');
            expect($toggle('a')({a: true})).not.to.be.a('function');
            expect($toggle('a')({a: true})).to.be.an('object');
        });

        it('$toggle :: (String, Object) -> Object !!!(when first parameter leads to Boolean)', () => {
            expect($toggle('a', {a: true})).not.to.be.a('function');
            expect($toggle('a', {a: true})).to.be.an('object');
        });

        it('$toggle :: String -> * -> Object -> Object', () => {
            expect($toggle('')(NaN)).to.be.a('function');
            expect($toggle('')(NaN)({})).not.to.be.a('function');
            expect($toggle('')(NaN)({})).to.be.an('object');
        });

        it('$toggle :: (String, *) -> Object -> Object', () => {
            expect($toggle('', NaN)).to.be.a('function');
            expect($toggle('', NaN)({})).not.to.be.a('function');
            expect($toggle('', NaN)({})).to.be.an('object');
        });

        it('$toggle :: (String, *, Object) -> Object', () => {
            expect($toggle('', NaN, {})).not.to.be.a('function');
            expect($toggle('', NaN, {})).to.be.an('object');
        });

        it('$toggle :: String -> * -> * -> Object -> Object', () => {
            expect($toggle('')(NaN)(NaN)).to.be.a('function');
            expect($toggle('')(NaN)(NaN)({})).not.to.be.a('function');
            expect($toggle('')(NaN)(NaN)({})).to.be.an('object');
        });

        it('$toggle :: (String, *) -> * -> Object -> Object', () => {
            expect($toggle('', NaN)(NaN)).to.be.a('function');
            expect($toggle('', NaN)(NaN)({})).not.to.be.a('function');
            expect($toggle('', NaN)(NaN)({})).to.be.an('object');
        });

        it('$toggle :: (String, *, *) -> Object -> Object', () => {
            expect($toggle('', NaN, NaN)).to.be.a('function');
            expect($toggle('', NaN, NaN)({})).not.to.be.a('function');
            expect($toggle('', NaN, NaN)({})).to.be.an('object');
        });

        it('$toggle :: (String, *, *, Object) -> Object', () => {
            expect($toggle('', NaN, NaN, {})).not.to.be.a('function');
            expect($toggle('', NaN, NaN, {})).to.be.an('object');
        });

        it('$toggle :: Array -> Object -> Object !!!(when first parameter leads to Boolean)', () => {
            expect($toggle(['a'])).to.be.a('function');
            expect($toggle(['a'])({a: true})).not.to.be.a('function');
            expect($toggle(['a'])({a: true})).to.be.an('object');
        });

        it('$toggle :: (Array, Object) -> Object !!!(when first parameter leads to Boolean)', () => {
            expect($toggle(['a'], {a: true})).not.to.be.a('function');
            expect($toggle(['a'], {a: true})).to.be.an('object');
        });

        it('$toggle :: Array -> * -> Object -> Object', () => {
            expect($toggle(['a'])(NaN)).to.be.a('function');
            expect($toggle(['a'])(NaN)({a: true})).not.to.be.a('function');
            expect($toggle(['a'])(NaN)({a: true})).to.be.an('object');
        });

        it('$toggle :: (Array, *) -> Object -> Object', () => {
            expect($toggle(['a'], NaN)).to.be.a('function');
            expect($toggle(['a'], NaN)({a: true})).not.to.be.a('function');
            expect($toggle(['a'], NaN)({a: true})).to.be.an('object');
        });

        it('$toggle :: (Array, *, Object) -> Object', () => {
            expect($toggle(['a'], NaN, {a: true})).not.to.be.a('function');
            expect($toggle(['a'], NaN, {a: true})).to.be.an('object');
        });

        it('$toggle :: Array -> * -> * -> Object -> Object', () => {
            expect($toggle(['a'])(NaN)(NaN)).to.be.a('function');
            expect($toggle(['a'])(NaN)(NaN)({a: true})).not.to.be.a('function');
            expect($toggle(['a'])(NaN)(NaN)({a: true})).to.be.an('object');
        });

        it('$toggle :: (Array, *) -> * -> Object -> Object', () => {
            expect($toggle(['a'], NaN)(NaN)).to.be.a('function');
            expect($toggle(['a'], NaN)(NaN)({a: true})).not.to.be.a('function');
            expect($toggle(['a'], NaN)(NaN)({a: true})).to.be.an('object');
        });

        it('$toggle :: (Array, *, *) -> Object -> Object', () => {
            expect($toggle(['a'], NaN, NaN)).to.be.a('function');
            expect($toggle(['a'], NaN, NaN)({a: true})).not.to.be.a('function');
            expect($toggle(['a'], NaN, NaN)({a: true})).to.be.an('object');
        });

        it('$toggle :: (Array, *, *, Object) -> Object', () => {
            expect($toggle(['a'], NaN, NaN, {a: true})).not.to.be.a('function');
            expect($toggle(['a'], NaN, NaN, {a: true})).to.be.an('object');
        });
    });

    describe('Vanilla JS', () => {
        it('should set the target to true, if the target is boolean and its value is false', () => {
            const subject = {
                test: false
            };

            expect($toggle('test', subject)).to.deep.equal({ test: true });
            expect($toggle('test', subject)).to.not.equal(subject);
        });

        it('should set the target to false, if the target is boolean and its value is true', () => {
            const subject = {
                test: true
            };

            expect($toggle('test', subject)).to.deep.equal({ test: false });
            expect($toggle('test', subject)).to.not.equal(subject);
        });

        it('should add an item to the target, if the target is an array and does not contain the item', () => {
            const subject = {
                test: [1, 2, 3]
            };

            expect($toggle('test', 4, subject)).to.deep.equal({ test: [1, 2, 3, 4] });
            expect($toggle('test', 4, subject)).to.not.equal(subject);
        });

        it('should remove an item from the target, if the target is an array and contains the item', () => {
            const subject = {
                test: [1, 2, 3]
            };

            expect($toggle('test', 1, subject)).to.deep.equal({ test: [2, 3] });
            expect($toggle('test', 1, subject)).to.not.equal(subject);
            expect($toggle('test', 2, subject)).to.deep.equal({ test: [1, 3] });
            expect($toggle('test', 2, subject)).to.not.equal(subject);
            expect($toggle('test', 3, subject)).to.deep.equal({ test: [1, 2] });
            expect($toggle('test', 3, subject)).to.not.equal(subject);
        });

        it('should set the target to the value, if the target is neither array nor boolean and does not equal the value', () => {
            const subject = {
                test: 'some string'
            };

            expect($toggle('test', 'foo', subject)).to.deep.equal({ test: 'foo' });
            expect($toggle('test', 'foo', subject)).to.not.equal(subject);
        });

        it('should set the target to the fallback, if the target is neither array nor boolean and equals the value', () => {
            const subject = {
                test: 'foo'
            };

            expect($toggle('test', 'foo', subject)).to.deep.equal({ test: '' });
            expect($toggle('test', 'foo', subject)).to.not.equal(subject);
            expect($toggle('test', 'foo', 'bar', subject)).to.deep.equal({ test: 'bar' });
            expect($toggle('test', 'foo', 'bar', subject)).to.not.equal(subject);
        });

        it('should tolerate undefined subjects', () => {
            const subject = undefined;
            expect($toggle('some.path', subject)).to.be.an('undefined');
            expect($toggle('some.path', 'foo', subject)).to.be.an('undefined');
            expect($toggle('some.path', 'foo', 'bar', subject)).to.be.an('undefined');
        });
    });

    describe('Immutable', () => {
        it('should set the target to true, if the target is boolean and its value is false', () => {
            const subject = new Map({
                test1: new List([true, true, false]),
                test2: new Map({ a: true, b: true, c: false })
            });

            expect($toggle('test1.2', subject).toJS()).to.deep.equal({
                test1: [true, true, true],
                test2: { a: true, b: true, c: false }
            });
            expect($toggle('test2.c', subject).toJS()).to.deep.equal({
                test1: [true, true, false],
                test2: { a: true, b: true, c: true }
            });
        });

        it('should set the target to false, if the target is boolean and its value is true', () => {
            const subject = new Map({
                test1: new List([false, false, true]),
                test2: new Map({ a: false, b: false, c: true })
            });

            expect($toggle('test1.2', subject).toJS()).to.deep.equal({
                test1: [false, false, false],
                test2: { a: false, b: false, c: true }
            });
            expect($toggle('test2.c', subject).toJS()).to.deep.equal({
                test1: [false, false, true],
                test2: { a: false, b: false, c: false }
            });
        });

        it('should add an item to the target, if the target is a List and does not contain the item', () => {
            const subject = new Map({
                a: new List([1, 2, 3, 4])
            });

            expect($toggle('a', 5, subject).toJS()).to.deep.equal({
                a: [1, 2, 3, 4, 5]
            });
            expect($toggle('a', 6, subject).toJS()).to.deep.equal({
                a: [1, 2, 3, 4, 6]
            });
            expect($toggle('a', 7, subject).toJS()).to.deep.equal({
                a: [1, 2, 3, 4, 7]
            });
            expect($toggle('a', 8, subject).toJS()).to.deep.equal({
                a: [1, 2, 3, 4, 8]
            });
        });

        it('should add an item to the target, if the target is a Set and does not contain the item', () => {
            const subject = new Map({
                a: new Set([1, 2, 3, 4])
            });

            expect($toggle('a', 5, subject).toJS()).to.deep.equal({
                a: [1, 2, 3, 4, 5]
            });
            expect($toggle('a', 6, subject).toJS()).to.deep.equal({
                a: [1, 2, 3, 4, 6]
            });
            expect($toggle('a', 7, subject).toJS()).to.deep.equal({
                a: [1, 2, 3, 4, 7]
            });
            expect($toggle('a', 8, subject).toJS()).to.deep.equal({
                a: [1, 2, 3, 4, 8]
            });
        });

        it('should add an item to the target, if the target is an OrderedSet and does not contain the item', () => {
            const subject = new Map({
                a: new OrderedSet([1, 2, 3, 4])
            });

            expect($toggle('a', 5, subject).toJS()).to.deep.equal({
                a: [1, 2, 3, 4, 5]
            });
            expect($toggle('a', 6, subject).toJS()).to.deep.equal({
                a: [1, 2, 3, 4, 6]
            });
            expect($toggle('a', 7, subject).toJS()).to.deep.equal({
                a: [1, 2, 3, 4, 7]
            });
            expect($toggle('a', 8, subject).toJS()).to.deep.equal({
                a: [1, 2, 3, 4, 8]
            });
        });

        it('should remove an item from the target, if the target is a List and does contain the item', () => {
            const subject = new Map({
                a: new List([1, 2, 3, 4])
            });

            expect($toggle('a', 1, subject).toJS()).to.deep.equal({
                a: [2, 3, 4]
            });
            expect($toggle('a', 2, subject).toJS()).to.deep.equal({
                a: [1, 3, 4]
            });
            expect($toggle('a', 3, subject).toJS()).to.deep.equal({
                a: [1, 2, 4]
            });
            expect($toggle('a', 4, subject).toJS()).to.deep.equal({
                a: [1, 2, 3]
            });
        });

        it('should remove an item from the target, if the target is a Set and does contain the item', () => {
            const subject = new Map({
                a: new Set([1, 2, 3, 4])
            });

            expect($toggle('a', 1, subject).toJS()).to.deep.equal({
                a: [4, 2, 3]
            });
            expect($toggle('a', 2, subject).toJS()).to.deep.equal({
                a: [1, 4, 3]
            });
            expect($toggle('a', 3, subject).toJS()).to.deep.equal({
                a: [1, 2, 4]
            });
            expect($toggle('a', 4, subject).toJS()).to.deep.equal({
                a: [1, 2, 3]
            });
        });

        it('should remove an item from the target, if the target is an OrderedSet and does contain the item', () => {
            const subject = new Map({
                a: new OrderedSet([1, 2, 3, 4])
            });

            expect($toggle('a', 1, subject).toJS()).to.deep.equal({
                a: [2, 3, 4]
            });
            expect($toggle('a', 2, subject).toJS()).to.deep.equal({
                a: [1, 3, 4]
            });
            expect($toggle('a', 3, subject).toJS()).to.deep.equal({
                a: [1, 2, 4]
            });
            expect($toggle('a', 4, subject).toJS()).to.deep.equal({
                a: [1, 2, 3]
            });
        });
    });
});
