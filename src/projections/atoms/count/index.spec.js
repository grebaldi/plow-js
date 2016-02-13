import {expect} from 'chai';

import $count from './index.js';

describe('Projections > atoms > $count', () => {
    describe('Common', () => {
        it('$count :: String -> Object -> Number', () => {
            expect($count).to.be.a('function');
            expect($count('')).to.be.a('function');
            expect($count('')({})).not.to.be.a('function');
            expect($count('')({})).to.be.a('number');
        });

        it('$count :: (String, Object) -> Number', () => {
            expect($count('', {})).not.to.be.a('function');
            expect($count('', {})).to.be.a('number');
        });
    });

    describe('Vanilla JS', () => {
        it('it should count the values of an array correctly', () => {
            const subject = {
                test1: [1],
                test2: [1, 2],
                test3: [1, 2, 3],
                test4: [1, 2, 3, 4],
                test5: [1, 2, 3, 4, 5],
                test6: []
            };

            expect($count('test1', subject)).to.equal(1);
            expect($count('test2', subject)).to.equal(2);
            expect($count('test3', subject)).to.equal(3);
            expect($count('test4', subject)).to.equal(4);
            expect($count('test5', subject)).to.equal(5);
            expect($count('test6', subject)).to.equal(0);
        });

        it('it should count the keys of an object correctly', () => {
            const subject = {
                test1: { a: 'a' },
                test2: { a: 'a', b: 'b' },
                test3: { a: 'a', b: 'b', c: 'c' },
                test4: { a: 'a', b: 'b', c: 'c', d: 'd' },
                test5: { a: 'a', b: 'b', c: 'c', d: 'd', e: 'e' },
                test6: {}
            };

            expect($count('test1', subject)).to.equal(1);
            expect($count('test2', subject)).to.equal(2);
            expect($count('test3', subject)).to.equal(3);
            expect($count('test4', subject)).to.equal(4);
            expect($count('test5', subject)).to.equal(5);
            expect($count('test6', subject)).to.equal(0);
        });

        it('it should count the characters of a string correctly', () => {
            const subject = {
                test1: 'a',
                test2: 'ab',
                test3: 'abc',
                test4: 'abcd',
                test5: 'abcde',
                test6: ''
            };

            expect($count('test1', subject)).to.equal(1);
            expect($count('test2', subject)).to.equal(2);
            expect($count('test3', subject)).to.equal(3);
            expect($count('test4', subject)).to.equal(4);
            expect($count('test5', subject)).to.equal(5);
            expect($count('test6', subject)).to.equal(0);
        });

        it('it should return 0 in all uncovered cases.', () => {
            const subject = {
                test1: NaN,
                test2: null,
                test3: undefined
            };

            expect($count('test1', subject)).to.equal(0);
            expect($count('test2', subject)).to.equal(0);
            expect($count('test3', subject)).to.equal(0);
        });
    });

    describe('Immutable', () => {
        it('it should count the values of an array correctly');
        it('it should count the keys of an object correctly');
    });
});
