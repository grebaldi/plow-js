import {expect} from 'chai';
import {Iterable} from 'immutable';

import $resolve from './index.js';

describe('Projections > Molecules > $resolve', () => {
    describe('Common', () => {
        it('$resolve :: String -> Object -> *', () => {
            expect($resolve).to.be.a('function');
            expect($resolve('')).to.be.a('function');
            expect($resolve('')({'':''})).not.to.be.a('function');
        });

        it('$resolve :: (String, Object) -> *', () => {
            expect($resolve('', {'':''})).not.to.be.a('function');
        });

        it('$resolve :: Array -> Object -> *', () => {
            expect($resolve).to.be.a('function');
            expect($resolve([])).to.be.a('function');
            expect($resolve([''])({'':''})).not.to.be.a('function');
        });

        it('$resolve :: (Array, Object) -> *', () => {
            expect($resolve([''], {'':''})).not.to.be.a('function');
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
        it('should return the target shallowly addressed by the property addressed by the path inside an Iterable.Indexed', () => {
            const subject = new Iterable.Indexed([
                '1',
                'targetValue'
            ]);

            expect($resolve('0', subject)).to.equal('targetValue');
        });

        it('should return the target shallowly addressed by the property addressed by the path inside an Iterable.Keyed', () => {
            const subject = new Iterable.Keyed({
                target: 'targetValue',
                path: 'target'
            });

            expect($resolve('path', subject)).to.equal('targetValue');
        });

        it('should return the target deeply addressed by the property addressed by the path inside an Iterable.Indexed', () => {
            const subject = new Iterable.Indexed([
                '1.0.0',
                new Iterable.Indexed([
                    new Iterable.Indexed([
                        'targetValue'
                    ])
                ])
            ]);

            expect($resolve('0', subject)).to.equal('targetValue');
        });

        it('should return the target deeply addressed by the property addressed by the path inside an Iterable.Keyed', () => {
            const subject = new Iterable.Keyed({
                target1: new Iterable.Keyed({
                    target2: new Iterable.Keyed({
                        target3: 'targetValue'
                    })
                }),
                path: 'target1.target2.target3'
            });

            expect($resolve('path', subject)).to.equal('targetValue');
        });
    });
});
