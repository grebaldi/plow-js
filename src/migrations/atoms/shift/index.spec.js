import {expect} from 'chai';
import 'mocha-sinon';
import {List, Stack} from 'immutable';

import $shift from './index.js';

describe('Migrations > Atoms > $shift', () => {
    beforeEach(function stubConsoleWarn() {
        this.sinon.stub(console, 'warn');
    });

    describe('Common', () => {
        it('$shift :: String -> Object -> Object', () => {
            expect($shift('')).to.be.a('function');
            expect($shift('')({})).not.to.be.a('function');
        });

        it('$shift :: (String, Object) -> Object', () => {
            expect($shift('', {})).not.to.be.a('function');
        });
    });

    describe('Vanilla JS', () => {
        it('should remove an item from the beginning of an array', () => {
            const subject = {
                test: [1, 2, 3]
            };

            expect($shift('test', subject)).to.deep.equal({
                test: [2, 3]
            });
            expect($shift('test', subject)).to.not.equal(subject);
        });

        it('should do nothing and warn when the target is not an array', () => {
            const subject = {
                test1: 'some string',
                test2: undefined,
                test3: {}
            };

            expect($shift('test1', subject)).to.equal(subject);
            expect(console.warn.calledOnce).to.equal(true);
            expect(console.warn.calledWith('Cannot shift an item from a string.')).to.equal(true);

            expect($shift('test2', subject)).to.equal(subject);
            expect(console.warn.calledTwice).to.equal(true);
            expect(console.warn.calledWith('Cannot shift an item from a undefined.')).to.equal(true);

            expect($shift('test3', subject)).to.equal(subject);
            expect(console.warn.calledThrice).to.equal(true);
            expect(console.warn.calledWith('Cannot shift an item from a object.')).to.equal(true);
        });

        it('should tolerate undefined subjects', () => {
            const subject = undefined;
            expect($shift('some.path', subject)).to.be.an('undefined');
        });
    });

    describe('Immutable', () => {
        it('should remove an item from the beginning of a List', () => {
            const subject = new List([
                new List([1, 2, 3, 4]),
                new List([1, 2, 3]),
                new List([1, 2]),
                new List([1])
            ]);

            expect($shift('0', subject).toJS()).to.deep.equal([
                [2, 3, 4],
                [1, 2, 3],
                [1, 2],
                [1]
            ]);
            expect($shift('1', subject).toJS()).to.deep.equal([
                [1, 2, 3, 4],
                [2, 3],
                [1, 2],
                [1]
            ]);
            expect($shift('2', subject).toJS()).to.deep.equal([
                [1, 2, 3, 4],
                [1, 2, 3],
                [2],
                [1]
            ]);
            expect($shift('3', subject).toJS()).to.deep.equal([
                [1, 2, 3, 4],
                [1, 2, 3],
                [1, 2],
                []
            ]);
        });

        it('should remove an item from the beginning of an Stack', () => {
            const subject = new List([
                new Stack([1, 2, 3, 4]),
                new Stack([1, 2, 3]),
                new Stack([1, 2]),
                new Stack([1])
            ]);

            expect($shift('0', subject).toJS()).to.deep.equal([
                [2, 3, 4],
                [1, 2, 3],
                [1, 2],
                [1]
            ]);
            expect($shift('1', subject).toJS()).to.deep.equal([
                [1, 2, 3, 4],
                [2, 3],
                [1, 2],
                [1]
            ]);
            expect($shift('2', subject).toJS()).to.deep.equal([
                [1, 2, 3, 4],
                [1, 2, 3],
                [2],
                [1]
            ]);
            expect($shift('3', subject).toJS()).to.deep.equal([
                [1, 2, 3, 4],
                [1, 2, 3],
                [1, 2],
                []
            ]);
        });
    });
});
