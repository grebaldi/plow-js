import {expect} from 'chai';

import $transform from './index.js';

describe('Projections > Molecules > $transform', () => {
    describe('Common', () => {
        it('$transform :: Object -> Object -> *', () => {
            expect($transform).to.be.a('function');
            expect($transform({})).to.be.a('function');
            expect($transform({})({})).not.to.be.a('function');
        });

        it('$transform :: (Object, Object) -> *', () => {
            expect($transform({}, {})).not.to.be.a('function');
        });
    });

    describe('Vanilla JS', () => {
        it('should return an empty object, if the shape is empty as well', () => {
            const subject = {
                does: 'not matter'
            };

            expect($transform({}, subject)).to.deep.equal({});
        });

        it('should return the shape if it consists purely of plain values', () => {
            const subject = {
                does: 'not matter'
            };

            expect($transform({
                a: 'a',
                b: 1,
                c: {
                    d: {
                        e: true
                    }
                }
            }, subject)).to.deep.equal({
                a: 'a',
                b: 1,
                c: {
                    d: {
                        e: true
                    }
                }
            });
        });

        it('should return the shape with all of its function-values resolved', () => {
            const subject = {
                a: 42,
                b: 'the answer'
            };
            const shape = {
                a: 'test',
                b: subject => {
                    return `${subject.b}: ${subject.a}`
                },
                c: {
                    d: subject => {
                        return subject.b.length + subject.a;
                    }
                }
            };

            expect($transform(shape, subject)).to.deep.equal({
                a: 'test',
                b: 'the answer: 42',
                c: {
                    d: 52
                }
            })
        });
    });

    describe('Immutable', () => {
        it('should return an empty object, if the shape is empty as well');
        it('should return the shape if it consists purely of plain values');
        it('should return the shape with all of its function-values resolved');
    });
});
