import {expect} from 'chai';

import $resolve from './index.js';

describe.only('Projections > Molecules > $resolve', () => {
    describe('Common', () => {
        it('$resolve :: String -> Object -> *', () => {
            expect($resolve).to.be.a('function');
            expect($resolve('')).to.be.a('function');
            expect($resolve('')({'':''})).not.to.be.a('function');
        });

        it('$resolve :: (String, Object) -> *', () => {
            expect($resolve('', {'':''})).not.to.be.a('function');
        });
    });

    describe('Vanilla JS', () => {
        it('should return the target shallowly addressed by the property addressed by the path inside the subject', () => {
            const subject = {
                target: 'targetValue',
                path: 'target'
            };

            expect($resolve('path', subject)).to.equal('targetValue');
        });

        it('should return the target deeply addressed by the property addressed by the path inside the subject', () => {
            const subject = {
                target1: {
                    target2: {
                        target3: 'targetValue'
                    }
                },
                path: 'target1.target2.target3'
            };

            expect($resolve('path', subject)).to.equal('targetValue');
        });

        it('should return the subject, if no path was given', () => {
            const subject = {
                a: 'a'
            };

            expect($resolve(subject)).to.deep.equal(subject);
        });
    });

    describe('Immutable', () => {
        it('should return the target shallowly addressed by the property addressed by the path inside the subject');
        it('should return the target deeply addressed by the property addressed by the path inside the subject');
        it('should return the subject, if no path was given');
    });
});
