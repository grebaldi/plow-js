import {expect} from 'chai';

import $traverse from './index.js';

describe('Connections > Atoms > $traverse', () => {
    describe('Common', () => {
        it('$traverse :: Function -> Object -> Object', () => {
            expect($traverse).to.be.a('function');
            expect($traverse(() => {})).to.be.a('function');
            expect($traverse(() => {})({})).not.to.be.a('function');
            expect($traverse(() => {})({})).to.be.an('object');
        });

        it('$traverse :: (Function, Object) -> Object', () => {
            expect($traverse(() => {}, {})).not.to.be.a('function');
            expect($traverse(() => {}, {})).to.be.an('object');
        });
    });

    describe('Vanilla JS', () => {
        it('should apply the actor deeply on all members of the subject', () => {
            const subject = {
                a: {
                    b: {
                        c: 1
                    },
                    d: 2
                },
                e: 3
            };

            expect($traverse(a => a * 2, subject)).to.deep.equal({
                a: {
                    b: {
                        c: 2
                    },
                    d: 4
                },
                e: 6
            });
        });
    });
});
