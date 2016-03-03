import {expect} from 'chai';

import $merge from './index.js';

describe('Migrations > Atoms > $merge', () => {
    describe('Common', () => {
        it('$merge :: String -> Object -> Object -> Object', () => {
            expect($merge('')).to.be.a('function');
            expect($merge('')({})).to.be.a('function');
            expect($merge('')({})({})).not.to.be.a('function');
        });

        it('$merge :: (String, Object) -> Object -> Object', () => {
            expect($merge('', {})).to.be.a('function');
            expect($merge('', {})({})).not.to.be.a('function');
        });

        it('$merge :: (String, Object, Object) -> Object', () => {
            expect($merge('', {}, {})).not.to.be.a('function');
        });
    });

    describe('Vanilla JS', () => {
        it('should deeply add properties to an object', () => {
            const subject = {
                test: {
                    a: {
                        b: {
                            c: 'c'
                        }
                    }
                }
            };

            expect($merge('test', {a: {b: {d: 'd'}}}, subject)).to.deep.equal({
                test: {
                    a: {
                        b: {
                            c: 'c',
                            d: 'd'
                        }
                    }
                }
            });
            expect($merge('test', {a: {b: {d: 'd'}}}, subject)).to.not.equal(subject);
        });

        it('should deeply overwrite properties in an object without removing any', () => {
            const subject = {
                test: {
                    a: {
                        b: {
                            c: 'c'
                        }
                    }
                }
            };

            expect($merge('test', {a: {b: {c: 'foo'}}}, subject)).to.deep.equal({
                test: {
                    a: {
                        b: {
                            c: 'foo'
                        }
                    }
                }
            });
            expect($merge('test', {a: {b: {c: 'foo'}}}, subject)).to.not.equal(subject);
        });

        it('should deeply overwrite items of an array without removing any', () => {
            const subject = {
                test: {
                    a: ['a', 'b', 'c']
                }
            };

            expect($merge('test', {a: ['foo']}, subject)).to.deep.equal({
                test: {
                    a: ['foo', 'b', 'c']
                }
            });
            expect($merge('test', {a: ['foo']}, subject)).to.not.equal(subject);
        });

        it('should tolerate undefined subjects', () => {
            const subject = undefined;
            expect($merge('some.path', {some: 'value'}, subject)).to.be.an('undefined');
        });
    });

    describe('Immutable', () => {
        it('should deeply add properties to an object');
        it('should deeply overwrite properties in an object without removing any');
        it('should deeply overwrite items of an array without removing any');
    });
});
