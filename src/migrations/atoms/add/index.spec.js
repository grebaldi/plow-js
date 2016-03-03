import {expect} from 'chai';
import 'mocha-sinon';

import $add from './index.js';

describe('Migrations > Atoms > $add', () => {
    beforeEach(function stubConsoleWarn() {
        this.sinon.stub(console, 'warn');
    });

    describe('Common', () => {
        it('$add :: String -> * -> Object -> Object', () => {
            expect($add('')).to.be.a('function');
            expect($add('')(NaN)).to.be.a('function');
            expect($add('')(NaN)({})).not.to.be.a('function');
        });

        it('$add :: (String, *) -> Object -> Object', () => {
            expect($add('', NaN)).to.be.a('function');
            expect($add('', NaN)({})).not.to.be.a('function');
        });

        it('$add :: (String, *,  Object) -> Object', () => {
            expect($add('', NaN, {})).not.to.be.a('function');
        });
    });

    describe('Vanilla JS', () => {
        it('should add an item to an array', () => {
            const subject = {
                test: [1, 2, 3]
            };

            expect($add('test', 'foo', subject)).to.deep.equal({
                test: [1, 2, 3, 'foo']
            });
            expect($add('test', 'foo', subject)).to.not.equal(subject);
        });

        it('should add an item to an object', () => {
            const subject = {
                test: {
                    a: 'a',
                    b: 'b',
                    c: 'c'
                }
            };

            expect($add('test', {foo: 'bar'}, subject)).to.deep.equal({
                test: {
                    a: 'a',
                    b: 'b',
                    c: 'c',
                    foo: 'bar'
                }
            });
            expect($add('test', {foo: 'bar'}, subject)).to.not.equal(subject);
        });

        it('should do nothing and warn when the target is neither an array nor an object', () => {
            const subject = {
                test1: 'some string',
                test2: undefined
            };

            expect($add('test1', 'foo', subject)).to.equal(subject);
            expect(console.warn.calledOnce).to.equal(true);
            expect(console.warn.calledWith('Cannot add an item to a string.')).to.equal(true);

            expect($add('test2', 'foo', subject)).to.equal(subject);
            expect(console.warn.calledTwice).to.equal(true);
            expect(console.warn.calledWith('Cannot add an item to a undefined.')).to.equal(true);
        });

        it('should do nothing and warn when a malformed value is trying to be added to an object', () => {
            const subject = {
                test: {
                }
            };

            expect($add('test', 'foo', subject)).to.equal(subject);
            expect(console.warn.calledOnce).to.equal(true);
            expect(console.warn.calledWith('Only objects can be added to objects.')).to.equal(true);
        });

        it('should do nothing and warn when a malformed object is trying to be added to an object', () => {
            const subject = {
                test: {
                }
            };

            expect($add('test', {}, subject)).to.equal(subject);
            expect(console.warn.calledOnce).to.equal(true);
            expect(console.warn.calledWith('Only objects with exactly one key can be added to objects.')).to.equal(true);

            expect($add('test', {a: 'a', b: 'b'}, subject)).to.equal(subject);
            expect(console.warn.calledTwice).to.equal(true);
            expect(console.warn.calledWith('Only objects with exactly one key can be added to objects.')).to.equal(true);
        });

        it('should do nothing and warn when an object is attempted to be overrwritten.', () => {
            const subject = {
                test: {
                    a: 'exists'
                }
            };

            expect($add('test', {a: 'overwrite?'}, subject)).to.equal(subject);
            expect(console.warn.calledOnce).to.equal(true);
            expect(console.warn.calledWith('Cannot add {a: overwrite?} to test, because it is already set.')).to.equal(true);
        });

        it('should tolerate undefined subjects', () => {
            const subject = undefined;
            expect($add('some.path', 'someValue', subject)).to.be.an('undefined');
        });
    });

    describe('Immutable', () => {
        it('should add an item to an array');
        it('should add an item to an object');
        it('should do nothing and warn when the target is neither an array nor an object');
        it('should do nothing and warn when a malformed value is trying to be added to an object');
        it('should do nothing and warn when a malformed object is trying to be added to an object');
        it('should do nothing and warn when an object is attempted to be overrwritten.');
    });
});
