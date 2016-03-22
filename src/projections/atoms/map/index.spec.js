import {expect} from 'chai';
import {Iterable} from 'immutable';

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

        it('$map :: Array -> String -> Object -> *', () => {
            expect($map).to.be.a('function');
            expect($map([])).to.be.a('function');
            expect($map([])('')).to.be.a('function');
            expect($map([])('')({})).not.to.be.a('function');
        });

        it('$map :: (Array, String) -> Object -> *', () => {
            expect($map([], '')).to.be.a('function');
            expect($map([], '')({})).not.to.be.a('function');
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

        it('$map :: (Array, String, Object) -> *', () => {
            expect($map([], '', {})).not.to.be.a('function');
        });

        it('$map :: (* -> *, String, Object) -> *', () => {
            expect($map(() => null, '', {})).not.to.be.a('function');
        });

        it('$map :: String -> Array -> Object -> *', () => {
            expect($map).to.be.a('function');
            expect($map('')).to.be.a('function');
            expect($map('')([])).to.be.a('function');
            expect($map('')([])({})).not.to.be.a('function');
        });

        it('$map :: (String, Array) -> Object -> *', () => {
            expect($map('', [])).to.be.a('function');
            expect($map('', [])({})).not.to.be.a('function');
        });

        it('$map :: Array -> Array -> Object -> *', () => {
            expect($map).to.be.a('function');
            expect($map([])).to.be.a('function');
            expect($map([])([])).to.be.a('function');
            expect($map([])([])({})).not.to.be.a('function');
        });

        it('$map :: (Array, Array) -> Object -> *', () => {
            expect($map([], [])).to.be.a('function');
            expect($map([], [])({})).not.to.be.a('function');
        });

        it('$map :: (* -> *) -> Array -> Object -> *', () => {
            expect($map(() => null)([])).to.be.a('function');
            expect($map(() => null)([])({})).not.to.be.a('function');
        });

        it('$map :: (* -> *, Array) -> Object -> *', () => {
            expect($map(() => null, [])).to.be.a('function');
            expect($map(() => null, [])({})).not.to.be.a('function');
        });

        it('$map :: (String, Array, Object) -> *', () => {
            expect($map('', [], {})).not.to.be.a('function');
        });

        it('$map :: (Array, Array, Object) -> *', () => {
            expect($map([], [], {})).not.to.be.a('function');
        });

        it('$map :: (* -> *, Array, Object) -> *', () => {
            expect($map(() => null, [], {})).not.to.be.a('function');
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
        it('should map the values of an Iterable.Indexed with a property path', () => {
            const subject = new Iterable.Indexed([
                new Iterable.Indexed([{a: 1}, {a: 2}, {a: 3}, {a: 4}])
            ]);

            expect($map('a', '0', subject).toArray()).to.deep.equal([1, 2, 3, 4]);
        });

        it('should map the values of an Iterable.Indexed with a mapper function', () => {
            const subject = new Iterable.Indexed([
                new Iterable.Indexed([1, 2, 3, 4])
            ]);

            expect($map(x => x*2, '0', subject).toArray()).to.deep.equal([2, 4, 6, 8]);
        });

        it('should map the values of an Iterable.Keyed with a property path', () => {
            const subject = new Iterable.Keyed({
                a: new Iterable.Keyed({a: {a: 1}, b: {a: 2}, c: {a: 3}, d: {a: 4}})
            });

            expect($map('a', 'a', subject).toJS()).to.deep.equal({
                a: 1,
                b: 2,
                c: 3,
                d: 4
            });
        });

        it('should map the values of an Iterable.Keyed with a mapper function', () => {
            const subject = new Iterable.Keyed({
                a: new Iterable.Keyed({a: 1, b: 2, c: 3, d: 4})
            });

            expect($map(x => x*2, 'a', subject).toJS()).to.deep.equal({
                a: 2,
                b: 4,
                c: 6,
                d: 8
            });
        });

        it('should map the values of an Iterable.Set with a property path', () => {
            const subject = new Iterable.Indexed([
                new Iterable.Set([{a: 1}, {a: 2}, {a: 3}, {a: 4}])
            ]);

            expect($map('a', '0', subject).toArray()).to.deep.equal([1, 2, 3, 4]);
        });

        it('should map the values of an Iterable.Set with a mapper function', () => {
            const subject = new Iterable.Indexed([
                new Iterable.Set([1, 2, 3, 4])
            ]);

            expect($map(x => x*2, '0', subject).toArray()).to.deep.equal([2, 4, 6, 8]);
        });
    });
});
