import {expect} from 'chai';
import 'mocha-sinon';
import {List, Set, Map, OrderedSet, OrderedMap} from 'immutable';

import $remove from './index.js';

describe('Migrations > Atoms > $remove', () => {
    beforeEach(function stubConsoleWarn() {
        this.sinon.stub(console, 'warn');
    });

    describe('Common', () => {
        it('$remove :: String -> * -> Object -> Object', () => {
            expect($remove('')).to.be.a('function');
            expect($remove('')(NaN)).to.be.a('function');
            expect($remove('')(NaN)({})).not.to.be.a('function');
        });

        it('$remove :: (String, *) -> Object -> Object', () => {
            expect($remove('', NaN)).to.be.a('function');
            expect($remove('', NaN)({})).not.to.be.a('function');
        });

        it('$remove :: (String, *,  Object) -> Object', () => {
            expect($remove('', NaN, {})).not.to.be.a('function');
        });

        it('$remove :: Array -> * -> Object -> Object', () => {
            expect($remove([])).to.be.a('function');
            expect($remove([])(NaN)).to.be.a('function');
            expect($remove([])(NaN)({})).not.to.be.a('function');
        });

        it('$remove :: (Array, *) -> Object -> Object', () => {
            expect($remove([], NaN)).to.be.a('function');
            expect($remove([], NaN)({})).not.to.be.a('function');
        });

        it('$remove :: (Array, *,  Object) -> Object', () => {
            expect($remove([], NaN, {})).not.to.be.a('function');
        });
    });

    describe('Vanilla JS', () => {
        it('should remove all occurences of an item from an array, addressed by its value', () => {
            const subject = {
                test: [1, 2, 2, 3, 4, 5, 6, 7, 5]
            };

            expect($remove('test', 1, subject)).to.deep.equal({ test: [2, 2, 3, 4, 5, 6, 7, 5] });
            expect($remove('test', 1, subject)).to.not.equal(subject);
            expect($remove('test', 2, subject)).to.deep.equal({ test: [1, 3, 4, 5, 6, 7, 5] });
            expect($remove('test', 2, subject)).to.not.equal(subject);
            expect($remove('test', 3, subject)).to.deep.equal({ test: [1, 2, 2, 4, 5, 6, 7, 5] });
            expect($remove('test', 3, subject)).to.not.equal(subject);
            expect($remove('test', 4, subject)).to.deep.equal({ test: [1, 2, 2, 3, 5, 6, 7, 5] });
            expect($remove('test', 4, subject)).to.not.equal(subject);
            expect($remove('test', 5, subject)).to.deep.equal({ test: [1, 2, 2, 3, 4, 6, 7] });
            expect($remove('test', 5, subject)).to.not.equal(subject);
            expect($remove('test', 6, subject)).to.deep.equal({ test: [1, 2, 2, 3, 4, 5, 7, 5] });
            expect($remove('test', 6, subject)).to.not.equal(subject);
            expect($remove('test', 7, subject)).to.deep.equal({ test: [1, 2, 2, 3, 4, 5, 6, 5] });
            expect($remove('test', 7, subject)).to.not.equal(subject);
        });

        it('should remove all occurences of an item from an object, addressed by a value', () => {
            const subject = {
                test: { a: 'a', b: 'b',  c: 'c', d: 'c' }
            };

            expect($remove('test', 'a', subject)).to.deep.equal({
                test: { b: 'b',  c: 'c', d: 'c' }
            });
            expect($remove('test', 'a', subject)).to.not.equal(subject);
            expect($remove('test', 'b', subject)).to.deep.equal({
                test: { a: 'a', c: 'c', d: 'c' }
            });
            expect($remove('test', 'b', subject)).to.not.equal(subject);
            expect($remove('test', 'c', subject)).to.deep.equal({
                test: { a: 'a', b: 'b' }
            });
            expect($remove('test', 'c', subject)).to.not.equal(subject);
        });

        it('should do nothing and warn, if the target is neither an array nor an object', () => {
            const subject = {
                test1: 'some string',
                test2: undefined
            };

            expect($remove('test1', 'foo', subject)).to.equal(subject);
            expect(console.warn.calledOnce).to.equal(true);
            expect(console.warn.calledWith('Cannot remove an item from a string.')).to.equal(true);

            expect($remove('test2', 'foo', subject)).to.equal(subject);
            expect(console.warn.calledTwice).to.equal(true);
            expect(console.warn.calledWith('Cannot remove an item from a undefined.')).to.equal(true);
        });

        it('should tolerate undefined subjects', () => {
            const subject = undefined;
            expect($remove('some.path', 'someValue', subject)).to.be.an('undefined');
        });
    });

    describe('Immutable', () => {
        it('should remove all occurences of an item from a List, addressed by its value', () => {
            const subject = new Map({
                a: new List([1, 2, 3, 4, 2, 5, 3, 3])
            });

            expect($remove('a', 1, subject).toJS()).to.deep.equal({
                a: [2, 3, 4, 2, 5, 3, 3]
            });
            expect($remove('a', 2, subject).toJS()).to.deep.equal({
                a: [1, 3, 4, 5, 3, 3]
            });
            expect($remove('a', 3, subject).toJS()).to.deep.equal({
                a: [1, 2, 4, 2, 5]
            });
            expect($remove('a', 4, subject).toJS()).to.deep.equal({
                a: [1, 2, 3, 2, 5, 3, 3]
            });
            expect($remove('a', 5, subject).toJS()).to.deep.equal({
                a: [1, 2, 3, 4, 2, 3, 3]
            });
        });

        it('should remove all occurences of an item from a Set, addressed by its value', () => {
            const subject = new Map({
                a: new Set([1, 2, 3, 4, 5])
            });

            expect($remove('a', 1, subject).toJS()).to.deep.equal({
                a: [2, 3, 4, 5]
            });
            expect($remove('a', 2, subject).toJS()).to.deep.equal({
                a: [1, 3, 4, 5]
            });
            expect($remove('a', 3, subject).toJS()).to.deep.equal({
                a: [1, 2, 4, 5]
            });
            expect($remove('a', 4, subject).toJS()).to.deep.equal({
                a: [1, 2, 3, 5]
            });
            expect($remove('a', 5, subject).toJS()).to.deep.equal({
                a: [1, 2, 3, 4]
            });
        });

        it('should remove all occurences of an item from a Map, addressed by its value', () => {
            const subject = new Map({
                a: new Map({
                    a: 1,
                    b: 2,
                    c: 3,
                    d: 4,
                    e: 5,
                    f: 3,
                    g: 2
                })
            });

            expect($remove('a', 1, subject).toJS()).to.deep.equal({
                a: { b: 2, c: 3, d: 4, e: 5, f: 3, g: 2 }
            });
            expect($remove('a', 2, subject).toJS()).to.deep.equal({
                a: { a: 1, c: 3, d: 4, e: 5, f: 3 }
            });
            expect($remove('a', 3, subject).toJS()).to.deep.equal({
                a: { a: 1, b: 2, d: 4, e: 5, g: 2 }
            });
            expect($remove('a', 4, subject).toJS()).to.deep.equal({
                a: { a: 1, b: 2, c: 3, e: 5, f: 3, g: 2 }
            });
            expect($remove('a', 5, subject).toJS()).to.deep.equal({
                a: { a: 1, b: 2, c: 3, d: 4, f: 3, g: 2 }
            });
        });

        it('should remove all occurences of an item from an OrderedSet, addressed by its value', () => {
            const subject = new Map({
                a: new OrderedSet([1, 2, 3, 4, 5])
            });

            expect($remove('a', 1, subject).toJS()).to.deep.equal({
                a: [2, 3, 4, 5]
            });
            expect($remove('a', 2, subject).toJS()).to.deep.equal({
                a: [1, 3, 4, 5]
            });
            expect($remove('a', 3, subject).toJS()).to.deep.equal({
                a: [1, 2, 4, 5]
            });
            expect($remove('a', 4, subject).toJS()).to.deep.equal({
                a: [1, 2, 3, 5]
            });
            expect($remove('a', 5, subject).toJS()).to.deep.equal({
                a: [1, 2, 3, 4]
            });
        });

        it('should remove all occurences of an item from an OrderedMap, addressed by its value', () => {
            const subject = new Map({
                a: new OrderedMap({
                    a: 1,
                    b: 2,
                    c: 3,
                    d: 4,
                    e: 5,
                    f: 3,
                    g: 2
                })
            });

            expect($remove('a', 1, subject).toJS()).to.deep.equal({
                a: { b: 2, c: 3, d: 4, e: 5, f: 3, g: 2 }
            });
            expect($remove('a', 2, subject).toJS()).to.deep.equal({
                a: { a: 1, c: 3, d: 4, e: 5, f: 3 }
            });
            expect($remove('a', 3, subject).toJS()).to.deep.equal({
                a: { a: 1, b: 2, d: 4, e: 5, g: 2 }
            });
            expect($remove('a', 4, subject).toJS()).to.deep.equal({
                a: { a: 1, b: 2, c: 3, e: 5, f: 3, g: 2 }
            });
            expect($remove('a', 5, subject).toJS()).to.deep.equal({
                a: { a: 1, b: 2, c: 3, d: 4, f: 3, g: 2 }
            });
        });
    });
});
