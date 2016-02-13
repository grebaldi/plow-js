import {expect} from 'chai';

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
    });

    describe('Immutable', () => {
        it('should set the target to true, if the target is boolean and its value is false');
        it('should set the target to false, if the target is boolean and its value is true');
        it('should add an item to the target, if the target is an array and does not contain the item');
        it('should remove an item from the target, if the target is an array and contains the item');
        it('should set the target to the value, if the target is neither array nor boolean and does not equal the value');
        it('should set the target to the fallback, if the target is neither array nor boolean and equals the value');
    });
});
