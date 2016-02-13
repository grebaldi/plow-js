import {expect} from 'chai';

import $map from './index.js';

describe('Projections > Atoms > $map', () => {
    describe('Common', () => {
        it('$map :: String -> String -> Object -> *', () => {
            expect($map).to.be.a('function');
            expect($map('')).to.be.a('function');
            expect($map('')('')).to.be.a('function');
            expect($map('')('')({})).not.to.be.a('function');
        });

        it('$map :: (String, String) -> Object -> *', () => {
            expect($map('', '')).to.be.a('function');
            expect($map('', '')({})).not.to.be.a('function');
        });

        it('$map :: (* -> *) -> String -> Object -> *', () => {
            expect($map(() => null)('')).to.be.a('function');
            expect($map(() => null)('')({})).not.to.be.a('function');
        });

        it('$map :: (* -> *, String) -> Object -> *', () => {
            expect($map(() => null, '')).to.be.a('function');
            expect($map(() => null, '')({})).not.to.be.a('function');
        });

        it('$map :: (String, String, Object) -> *', () => {
            expect($map('', '', {})).not.to.be.a('function');
        });

        it('$map :: (* -> *, String, Object) -> *', () => {
            expect($map(() => null, '', {})).not.to.be.a('function');
        });
    });

    describe('Vanilla JS', () => {
        it('should map the values of an array, given the property path', () => {
            const subject = {
                test: [{
                  a: 'a',
                  b: {
                    c: 'd'
                  }
                },{
                  a: 'b',
                  b: {
                    c: 'e'
                  }
                },{
                  a: 'c',
                  b: {
                    c: 'f'
                  }
                }]
            };

            expect($map('a', 'test', subject)).to.deep.equal(['a', 'b', 'c']);
            expect($map('b.c', 'test', subject)).to.deep.equal(['d', 'e', 'f']);
        });

        it('should map the values of an object, given the property path', () => {
            const subject = {
                test: {
                    a: {
                      x: 'x',
                      y: {
                        z: 1
                      }
                    },
                    b: {
                      x: 'y',
                      y: {
                        z: 2
                      }
                    },
                    c: {
                      x: 'z',
                      y: {
                        z: 3
                      }
                    }
                }
            };

            expect($map('x', 'test', subject)).to.deep.equal({
                a: 'x',
                b: 'y',
                c: 'z'
            });
            expect($map('y.z', 'test', subject)).to.deep.equal({
                a: 1,
                b: 2,
                c: 3
            });
        });

        it('should map the values of an array with a mapper function', () => {
            const subject = {
                test: [1, 2, 3]
            };

            expect($map(x => 2*x, 'test', subject)).to.deep.equal([2, 4, 6]);
        });

        it('should map the values of an object with a mapper function', () => {
            const subject = {
                test: {
                    a: 1,
                    b: 2,
                    c: 3
                }
            };

            expect($map(x => 2*x, 'test', subject)).to.deep.equal({
                a: 2,
                b: 4,
                c: 6
            });
        });
    });

    describe('Immutable', () => {
        it('should map the values of an array, given the property path');
        it('should map the values of an object, given the property path');
        it('should map the values of an array with a mapper function');
        it('should map the values of an object with a mapper function');
    });
});
