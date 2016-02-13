import {expect} from 'chai';

import $set from './index.js';

describe('Migrations > Atoms > $set', () => {
    describe('Common', () => {
        it('$set :: String -> * -> Object -> Object', () => {
            expect($set('')).to.be.a('function');
            expect($set('')(NaN)).to.be.a('function');
            expect($set('')(NaN)({})).not.to.be.a('function');
        });

        it('$set :: (String, *) -> Object -> Object', () => {
            expect($set('', NaN)).to.be.a('function');
            expect($set('', NaN)({})).not.to.be.a('function');
        });

        it('$set :: (String, *, Object) -> Object', () => {
            expect($set('', NaN, {})).not.to.be.a('function');
        });
    })

    describe('Vanilla JS', () => {
        it('should shallowly set a value inside an object', () => {
            const subject = {
                test: 'a'
            };

            expect($set('test', 'b', subject)).to.deep.equal({
                test: 'b'
            });
            expect($set('test', 'b', subject)).to.not.equal(subject);
        });

        it('should shallowly set a value inside an array', () => {
            const subject = [1, 2, 3];

            expect($set(1, 42, subject)).to.deep.equal([1, 42, 3]);
            expect($set(1, 42, subject)).to.not.equal(subject);
        });

        it('should deeply set a value inside an object', () => {
            const subject = {
                a: {
                    b: {
                        c: {
                            d: {
                                e: 'Former Value'
                            }
                        }
                    }
                }
            };

            expect($set('a.b.c.d.e', 'New Value', subject)).to.deep.equal({
                a: {
                    b: {
                        c: {
                            d: {
                                e: 'New Value'
                            }
                        }
                    }
                }
            });
            expect($set('a.b.c.d.e', 'New Value', subject)).to.not.equal(subject);
        });

        it('should deeply set a value inside an array', () => {
            const subject = [
                [
                    [
                        [
                            ['Former Value']
                        ]
                    ]
                ]
            ];

            expect($set('0.0.0.0.0', 'New Value', subject)).to.deep.equal([
                [
                    [
                        [
                            ['New Value']
                        ]
                    ]
                ]
            ]);
            expect($set('0.0.0.0.0', 'New Value', subject)).to.not.equal(subject);
        });

        it('should deeply set a value inside a mixed object/array structure', () => {
            const subject = {
                a: ['b', {
                    c: {
                        d: ['e', 'f']
                    }
                }]
            };

            expect($set('a.0', 'test', subject)).to.deep.equal({
                a: ['test', {
                    c: {
                        d: ['e', 'f']
                    }
                }]
            });
            expect($set('a.0', 'test', subject)).to.not.equal(subject);
            expect($set('a.1.c', 'test', subject)).to.deep.equal({
                a: ['b', {
                    c: 'test'
                }]
            });
            expect($set('a.1.c', 'test', subject)).to.not.equal(subject);
            expect($set('a.1.c.d.1', 'test', subject)).to.deep.equal({
                a: ['b', {
                    c: {
                        d: ['e', 'test']
                    }
                }]
            });
            expect($set('a.1.c.d.1', 'test', subject)).to.not.equal(subject);
        });

        it('should create missing path elements', () => {
            const subject = {
                a: ['b', {
                    c: {
                        d: ['e', 'f']
                    }
                }]
            };

            expect($set('a.2', 'test', subject)).to.deep.equal({
                a: ['b', {
                    c: {
                        d: ['e', 'f']
                    }
                }, 'test']
            });
            expect($set('a.1.c.f', 'test', subject)).to.deep.equal({
                a: ['b', {
                    c: {
                        d: ['e', 'f'],
                        f: 'test'
                    }
                }]
            });
            expect($set('a.1.c.d.5', 'test', subject)).to.deep.equal({
                a: ['b', {
                    c: {
                        d: ['e', 'f', 'test']
                    }
                }]
            });
        });
    });

    describe('Immutable', () => {
        it('should shallowly set a value inside an object');
        it('should shallowly set a value inside an array');
        it('should deeply set a value inside an object');
        it('should deeply set a value inside an array');
        it('should deeply set a value inside a mixed object/array structure');
        it('should do nothing if the path leads to undefined');
    });
});
