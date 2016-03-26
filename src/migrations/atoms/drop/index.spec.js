import {expect} from 'chai';
import 'mocha-sinon';
import {List, OrderedMap, Map} from 'immutable';

import $drop from './index.js';

describe('Migrations > Atoms > $drop', () => {
    beforeEach(function stubConsoleWarn() {
        this.sinon.stub(console, 'warn');
    });

    describe('Common', () => {
        it('$drop :: String -> Object -> Object', () => {
            expect($drop('')).to.be.a('function');
            expect($drop('')({})).not.to.be.a('function');
        });

        it('$drop :: (String, Object) -> Object', () => {
            expect($drop('', {})).not.to.be.a('function');
        });

        it('$drop :: Array -> Object -> Object', () => {
            expect($drop([])).to.be.a('function');
            expect($drop([])({})).not.to.be.a('function');
        });

        it('$drop :: (Array, Object) -> Object', () => {
            expect($drop([], {})).not.to.be.a('function');
        });
    });

    describe('Vanilla JS', () => {
        it('should remove an item from an array, addressed by its path', () => {
            const subject = {
                test: [1, 2, 2, 3, 4, 5, 6, 7, 5]
            };

            expect($drop('test.0', subject)).to.deep.equal({ test: [2, 2, 3, 4, 5, 6, 7, 5] });
            expect($drop('test.0', subject)).to.not.equal(subject);
            expect($drop('test.1', subject)).to.deep.equal({ test: [1, 2, 3, 4, 5, 6, 7, 5] });
            expect($drop('test.1', subject)).to.not.equal(subject);
            expect($drop('test.2', subject)).to.deep.equal({ test: [1, 2, 3, 4, 5, 6, 7, 5] });
            expect($drop('test.2', subject)).to.not.equal(subject);
            expect($drop('test.3', subject)).to.deep.equal({ test: [1, 2, 2, 4, 5, 6, 7, 5] });
            expect($drop('test.3', subject)).to.not.equal(subject);
            expect($drop('test.4', subject)).to.deep.equal({ test: [1, 2, 2, 3, 5, 6, 7, 5] });
            expect($drop('test.4', subject)).to.not.equal(subject);
            expect($drop('test.5', subject)).to.deep.equal({ test: [1, 2, 2, 3, 4, 6, 7, 5] });
            expect($drop('test.5', subject)).to.not.equal(subject);
            expect($drop('test.6', subject)).to.deep.equal({ test: [1, 2, 2, 3, 4, 5, 7, 5] });
            expect($drop('test.6', subject)).to.not.equal(subject);
            expect($drop('test.7', subject)).to.deep.equal({ test: [1, 2, 2, 3, 4, 5, 6, 5] });
            expect($drop('test.7', subject)).to.not.equal(subject);
            expect($drop('test.8', subject)).to.deep.equal({ test: [1, 2, 2, 3, 4, 5, 6, 7] });
            expect($drop('test.8', subject)).to.not.equal(subject);
        });

        it('should remove an item from an object, addressed by its path', () => {
            const subject = {
                test: { a: 'a', b: 'b',  c: 'c', d: 'c' }
            };

            expect($drop('test.a', subject)).to.deep.equal({
                test: { b: 'b',  c: 'c', d: 'c' }
            });
            expect($drop('test.a', subject)).to.not.equal(subject);
            expect($drop('test.b', subject)).to.deep.equal({
                test: { a: 'a', c: 'c', d: 'c' }
            });
            expect($drop('test.b', subject)).to.not.equal(subject);
            expect($drop('test.c', subject)).to.deep.equal({
                test: { a: 'a', b: 'b', d: 'c' }
            });
            expect($drop('test.c', subject)).to.not.equal(subject);
            expect($drop('test.d', subject)).to.deep.equal({
                test: { a: 'a', b: 'b',  c: 'c' }
            });
            expect($drop('test.d', subject)).to.not.equal(subject);
        });

        it('should do nothing and warn, if the targets parent is neither an array nor an object', () => {
            const subject = {
                test1: 'some string',
                test2: undefined
            };

            expect($drop('test1.foo', subject)).to.equal(subject);
            expect(console.warn.calledOnce).to.equal(true);
            expect(console.warn.calledWith('Cannot drop an item from a string.')).to.equal(true);

            expect($drop('test2.foo', subject)).to.equal(subject);
            expect(console.warn.calledTwice).to.equal(true);
            expect(console.warn.calledWith('Cannot drop an item from a undefined.')).to.equal(true);
        });

        it('should tolerate undefined subjects', () => {
            const subject = undefined;
            expect($drop('some.path', subject)).to.be.an('undefined');
        });
    });

    describe('Immutable', () => {
        it('should remove an item from a List, addressed by its path', () => {
            const subject = new List([
                new List([1, 2, 3, 4])
            ]);

            expect($drop('0.0', subject).toJS()).to.deep.equal([
                [2, 3, 4]
            ]);
            expect($drop('0.1', subject).toJS()).to.deep.equal([
                [1, 3, 4]
            ]);
            expect($drop('0.2', subject).toJS()).to.deep.equal([
                [1, 2, 4]
            ]);
            expect($drop('0.3', subject).toJS()).to.deep.equal([
                [1, 2, 3]
            ]);
        });

        it('should remove an item from an OrderedMap, addressed by its path', () => {
            const subject = new OrderedMap({
                a: new OrderedMap({
                    a: 1,
                    b: 2,
                    c: 3,
                    d: 4
                })
            });

            expect($drop('a.a', subject).toJS()).to.deep.equal({
                a: {
                    b: 2,
                    c: 3,
                    d: 4
                }
            });
            expect($drop('a.b', subject).toJS()).to.deep.equal({
                a: {
                    a: 1,
                    c: 3,
                    d: 4
                }
            });
            expect($drop('a.c', subject).toJS()).to.deep.equal({
                a: {
                    a: 1,
                    b: 2,
                    d: 4
                }
            });
            expect($drop('a.d', subject).toJS()).to.deep.equal({
                a: {
                    a: 1,
                    b: 2,
                    c: 3
                }
            });
        });

        it('should remove an item from a Map, addressed by its path', () => {
            const subject = new Map({
                a: new Map({
                    a: 1,
                    b: 2,
                    c: 3,
                    d: 4
                })
            });

            expect($drop('a.a', subject).toJS()).to.deep.equal({
                a: {
                    b: 2,
                    c: 3,
                    d: 4
                }
            });
            expect($drop('a.b', subject).toJS()).to.deep.equal({
                a: {
                    a: 1,
                    c: 3,
                    d: 4
                }
            });
            expect($drop('a.c', subject).toJS()).to.deep.equal({
                a: {
                    a: 1,
                    b: 2,
                    d: 4
                }
            });
            expect($drop('a.d', subject).toJS()).to.deep.equal({
                a: {
                    a: 1,
                    b: 2,
                    c: 3
                }
            });
        });
    });
});
