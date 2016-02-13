import {expect} from 'chai';

import $override from './index.js';

describe('Migrations > Atoms > $override', () => {
    describe('Common', () => {
        it('$override :: String -> Object -> Object -> Object', () => {
            expect($override('')).to.be.a('function');
            expect($override('')({})).to.be.a('function');
            expect($override('')({})({})).not.to.be.a('function');
        });

        it('$override :: (String, Object) -> Object -> Object', () => {
            expect($override('', {})).to.be.a('function');
            expect($override('', {})({})).not.to.be.a('function');
        });

        it('$override :: (String, Object, Object) -> Object', () => {
            expect($override('', {}, {})).not.to.be.a('function');
        });
    });

    describe('Vanilla JS', () => {
        it('should shallowly add properties to an object', () => {
            const subject = {
                test: {
                    a: 'a',
                    b: 'b',
                    c: 'c'
                }
            };

            expect($override('test', {d: 'd'}, subject)).to.deep.equal({
                test: {
                    a: 'a',
                    b: 'b',
                    c: 'c',
                    d: 'd'
                }
            });
            expect($override('test', {d: 'd'}, subject)).to.not.equal(subject);
        });

        it('should shallowly overwrite properties in an object without removing any', () => {
            const subject = {
                test: {
                    a: 'a',
                    b: 'b',
                    c: 'c'
                }
            };

            expect($override('test', {c: 'foo'}, subject)).to.deep.equal({
                test: {
                    a: 'a',
                    b: 'b',
                    c: 'foo'
                }
            });
            expect($override('test', {c: 'foo'}, subject)).to.not.equal(subject);
        });

        it('should shallowly overwrite items of an array without removing any', () => {
            const subject = {
                test: ['a', 'b', 'c']
            };

            expect($override('test', ['foo'], subject)).to.deep.equal({
                test: ['foo', 'b', 'c']
            });
            expect($override('test', ['foo'], subject)).to.not.equal(subject);
        });
    });

    describe('Immutable', () => {
        it('should shallowly add properties to an object');
        it('should shallowly overwrite properties in an object without removing any');
        it('should shallowly add items to an array');
        it('should always add items at the highest index+1 of an array, even when the path suggests a higher index');
        it('should shallowly overwrite items of an array without removing any');
    });
});
