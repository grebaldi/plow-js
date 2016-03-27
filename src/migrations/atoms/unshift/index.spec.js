import {expect} from 'chai';
import 'mocha-sinon';
import {Stack, Map, OrderedSet, Set, OrderedMap, List} from 'immutable';

import $unshift from './index.js';

describe('Migrations > Atoms > $unshift', () => {
    beforeEach(function stubConsoleWarn() {
        this.sinon.stub(console, 'warn');
    });

    describe('Common', () => {
        it('$unshift :: String -> * -> Object -> Object', () => {
            expect($unshift('')).to.be.a('function');
            expect($unshift('')(NaN)).to.be.a('function');
            expect($unshift('')(NaN)({})).not.to.be.a('function');
        });

        it('$unshift :: (String, *) -> Object -> Object', () => {
            expect($unshift('', NaN)).to.be.a('function');
            expect($unshift('', NaN)({})).not.to.be.a('function');
        });

        it('$unshift :: (String, *,  Object) -> Object', () => {
            expect($unshift('', NaN, {})).not.to.be.a('function');
        });

        it('$unshift :: Array -> * -> Object -> Object', () => {
            expect($unshift([])).to.be.a('function');
            expect($unshift([])(NaN)).to.be.a('function');
            expect($unshift([])(NaN)({})).not.to.be.a('function');
        });

        it('$unshift :: (Array, *) -> Object -> Object', () => {
            expect($unshift([], NaN)).to.be.a('function');
            expect($unshift([], NaN)({})).not.to.be.a('function');
        });

        it('$unshift :: (Array, *,  Object) -> Object', () => {
            expect($unshift([], NaN, {})).not.to.be.a('function');
        });
    });

    describe('Vanilla JS', () => {
        it('should add an item to the beginning of an array', () => {
            const subject = {
                test: [1, 2, 3]
            };

            expect($unshift('test', 'foo', subject)).to.deep.equal({
                test: ['foo', 1, 2, 3]
            });
            expect($unshift('test', 'foo', subject)).to.not.equal(subject);
        });

        it('should add an item to an object', () => {
            const subject = {
                test: {
                    a: 'a',
                    b: 'b',
                    c: 'c'
                }
            };

            expect($unshift('test', {foo: 'bar'}, subject)).to.deep.equal({
                test: {
                    a: 'a',
                    b: 'b',
                    c: 'c',
                    foo: 'bar'
                }
            });
            expect($unshift('test', {foo: 'bar'}, subject)).to.not.equal(subject);
        });

        it('should do nothing and warn when the target is neither an array nor an object', () => {
            const subject = {
                test1: 'some string',
                test2: undefined
            };

            expect($unshift('test1', 'foo', subject)).to.equal(subject);
            expect(console.warn.calledOnce).to.equal(true);
            expect(console.warn.calledWith('Cannot unshift an item to a string.')).to.equal(true);

            expect($unshift('test2', 'foo', subject)).to.equal(subject);
            expect(console.warn.calledTwice).to.equal(true);
            expect(console.warn.calledWith('Cannot unshift an item to a undefined.')).to.equal(true);
        });

        it('should do nothing and warn when a malformed value is trying to be added to an object', () => {
            const subject = {
                test: {
                }
            };

            expect($unshift('test', 'foo', subject)).to.equal(subject);
            expect(console.warn.calledOnce).to.equal(true);
            expect(console.warn.calledWith('Only objects can be added to objects.')).to.equal(true);
        });

        it('should do nothing and warn when a malformed object is trying to be added to an object', () => {
            const subject = {
                test: {
                }
            };

            expect($unshift('test', {}, subject)).to.equal(subject);
            expect(console.warn.calledOnce).to.equal(true);
            expect(console.warn.calledWith('Only objects with exactly one key can be added to objects.')).to.equal(true);

            expect($unshift('test', {a: 'a', b: 'b'}, subject)).to.equal(subject);
            expect(console.warn.calledTwice).to.equal(true);
            expect(console.warn.calledWith('Only objects with exactly one key can be added to objects.')).to.equal(true);
        });

        it('should do nothing and warn when an object is attempted to be overrwritten.', () => {
            const subject = {
                test: {
                    a: 'exists'
                }
            };

            expect($unshift('test', {a: 'overwrite?'}, subject)).to.equal(subject);
            expect(console.warn.calledOnce).to.equal(true);
            expect(console.warn.calledWith('Cannot add {a: overwrite?} to test, because it is already set.')).to.equal(true);
        });

        it('should tolerate undefined subjects', () => {
            const subject = undefined;
            expect($unshift('some.path', 'someValue', subject)).to.be.an('undefined');
        });
    });

    describe('Immutable', () => {
        it('should add an item to the beginning of a Stack', () => {
            const subject = new Map({
                a: new Stack([1, 2, 3])
            });

            expect($unshift('a', 4, subject).toJS()).to.deep.equal({
                a: [4, 1, 2, 3]
            });
        });

        it('should add an item to the beginning of a List', () => {
            const subject = new Map({
                a: new List([1, 2, 3])
            });

            expect($unshift('a', 4, subject).toJS()).to.deep.equal({
                a: [4, 1, 2, 3]
            });
        });
    });
});
