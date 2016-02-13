import {expect} from 'chai';

import $get from './index.js';

describe('Projections > Atoms > $get', () => {
    describe('Common', () => {
        it('$get :: String -> Object -> *', () => {
            expect($get).to.be.a('function');
            expect($get('')).to.be.a('function');
        });

        it('$get :: (String, Object) -> *', () => {
            expect($get).to.be.a('function');
            expect($get('', {})).not.to.be.a('function');
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

    describe('Immutable', () => {
        it('should return the subject, if no path was given');
        it('should return shallowly addressed values');
        it('should return deeply addressed values in objects');
        it('should return deeply addressed values in objects and arrays');
        it('should gracefully ignore missing values on the path');
        it('should handle string paths');
    });
});
