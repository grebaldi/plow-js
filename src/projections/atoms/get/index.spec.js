import {expect} from 'chai';
import {Iterable} from 'immutable';

import $get from './index.js';

describe('Projections > Atoms > $get', () => {
    describe('Common', () => {
        it('$get :: String -> Object -> *', () => {
            expect($get).to.be.a('function');
            expect($get('')).to.be.a('function');
            expect($get('')({})).not.to.be.a('function');
        });

        it('$get :: (String, Object) -> *', () => {
            expect($get('', {})).not.to.be.a('function');
        });

        it('$get :: Array -> Object -> *', () => {
            expect($get).to.be.a('function');
            expect($get([])).to.be.a('function');
            expect($get([])({})).not.to.be.a('function');
        });

        it('$get :: (Array, Object) -> *', () => {
            expect($get([], {})).not.to.be.a('function');
        });
    });

    describe('Vanilla JS', () => {
        it('should return the subject, if no path was given', () => {
            const subject = {
                a: 'a'
            };

            expect($get(subject)).to.deep.equal(subject);
        });

        it('should return shallowly addressed values', () => {
            const subject = {
                a: 'a',
                b: [1, 2, 3],
                c: {
                    foo: 'bar'
                }
            };

            expect($get(['a'], subject)).to.equal('a');
            expect($get(['b'], subject)).to.deep.equal([1, 2, 3]);
            expect($get(['c'], subject)).to.deep.equal({
                foo: 'bar'
            });
        });

        it('should return deeply addressed values in objects', () => {
            const subject = {
                a: {
                  b: {
                    c: {
                      d: {
                        e: {
                          f: 'The Value'
                        }
                      }
                    }
                  }
                }
            };

            expect($get(['a', 'b', 'c', 'd', 'e', 'f'], subject)).to.equal('The Value');
        });

        it('should return deeply addressed values in objects and arrays', () => {
            const subject = {
                a: ['a', {
                  b: {
                    c: ['c1', 'c2', {
                        d: 'The Value'
                    }]
                  }
                }]
            };

            expect($get(['a', 0], subject)).to.equal('a');
            expect($get(['a', 1], subject)).to.deep.equal(subject.a[1]);
            expect($get(['a', 1, 'b'], subject)).to.deep.equal(subject.a[1].b);
            expect($get(['a', 1, 'b', 'c'], subject)).to.deep.equal(subject.a[1].b.c);
            expect($get(['a', 1, 'b', 'c', 0], subject)).to.equal('c1');
            expect($get(['a', 1, 'b', 'c', 1], subject)).to.equal('c2');
            expect($get(['a', 1, 'b', 'c', 2], subject)).to.deep.equal(subject.a[1].b.c[2]);
            expect($get(['a', 1, 'b', 'c', 2, 'd'], subject)).to.equal('The Value');
        });

        it('should gracefully ignore missing values on the path', () => {
            const subject = {
                a: ['a', {
                  b: {
                    c: ['c1', 'c2', {
                        d: 'The Value'
                    }]
                  }
                }]
            };

            expect($get(['b'], subject)).to.be.an('undefined');
            expect($get(['a', 'c'], subject)).to.be.an('undefined');
            expect($get(['a', '1', 'c'], subject)).to.be.an('undefined');
            expect($get(['a', '2'], subject)).to.be.an('undefined');
            expect($get(['a', '1', 'b', 'd'], subject)).to.be.an('undefined');
        });

        it('should handle string paths', () => {
            const subject = {
                a: ['a', {
                  b: {
                    c: ['c1', 'c2', {
                        d: 'The Value'
                    }]
                  }
                }]
            };

            expect($get('a.0', subject)).to.equal('a');
            expect($get('a.1', subject)).to.deep.equal(subject.a[1]);
            expect($get('a.1.b', subject)).to.deep.equal(subject.a[1].b);
            expect($get('a.1.b.c', subject)).to.deep.equal(subject.a[1].b.c);
            expect($get('a.1.b.c.0', subject)).to.equal('c1');
            expect($get('a.1.b.c.1', subject)).to.equal('c2');
            expect($get('a.1.b.c.2', subject)).to.deep.equal(subject.a[1].b.c[2]);
            expect($get('a.1.b.c.2.d', subject)).to.equal('The Value');
        });
    });

    describe('Immutable JS', () => {
        it('should return shallowly addressed values in Iterable.Keyed structures', () => {
            const subject = new Iterable.Keyed({
                a: 1,
                b: 2,
                c: 3
            });

            expect($get('a', subject)).to.equal(1);
            expect($get('b', subject)).to.equal(2);
            expect($get('c', subject)).to.equal(3);
        });

        it('should return shallowly addressed values in Iterable.Indexed structures', () => {
            const subject = new Iterable.Indexed([1, 2, 3]);

            expect($get('0', subject)).to.equal(1);
            expect($get('1', subject)).to.equal(2);
            expect($get('2', subject)).to.equal(3);
        });

        it('should return shallowly addressed values in Iterable.Set structures', () => {
            const subject1 = new Iterable.Set(['a', 'b', 'c']);
            const subject2 = new Iterable.Set([1, 2, 3]);

            expect($get('a', subject1)).to.equal('a');
            expect($get('b', subject1)).to.equal('b');
            expect($get('c', subject1)).to.equal('c');
            expect($get([1], subject2)).to.equal(1);
            expect($get([2], subject2)).to.equal(2);
            expect($get([3], subject2)).to.equal(3);
        });

        it('should return deeply addressed values in Iterable.Keyed structures', () => {
            const subject = new Iterable.Keyed({
                a: new Iterable.Keyed({
                    b: new Iterable.Keyed({
                        c: 123
                    })
                })
            });

            expect($get('a.b.c', subject)).to.equal(123);
        });

        it('should return deeply addressed values in Iterable.Indexed structures', () => {
            const subject = new Iterable.Indexed([
                NaN,
                new Iterable.Indexed([
                    NaN,
                    NaN,
                    new Iterable.Indexed([
                        123
                    ])
                ])
            ]);

            expect($get('1.2.0', subject)).to.equal(123);
        });

        it('should return deeply addressed values in mixed structures', () => {
            const subject = new Iterable.Keyed({
                a: new Iterable.Indexed([
                    NaN,
                    12,
                    new Iterable.Keyed({
                        foo: 1,
                        bar: new Iterable.Set([1, 2])
                    }),
                    new Iterable.Set(['foo', 'bar'])
                ])
            });

            expect($get('a.1', subject)).to.equal(12);
            expect($get('a.2.foo', subject)).to.equal(1);
            expect($get('a.2.bar.1', subject)).to.equal(1);
            expect($get('a.2.bar.2', subject)).to.equal(2);
            expect($get('a.3.foo', subject)).to.equal('foo');
            expect($get('a.3.bar', subject)).to.equal('bar');
        });
    });
});
