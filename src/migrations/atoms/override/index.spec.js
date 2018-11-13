import {expect} from 'chai';
import {List, OrderedMap, Map} from 'immutable';

import $override from './index.js';

describe('Migrations > Atoms > $override', () => {
    describe('Common', () => {
        it('$override :: String -> Object -> Object -> Object', () => {
            expect($override('')).to.be.a('function');
            expect($override('')({})).to.be.a('function');
            expect($override('')({})({})).not.to.be.a('function');
        });

        it('$override :: (String, Object) -> Object -> Object', () => {
            expect($override('', {})).to.be.a('function');
            expect($override('', {})({})).not.to.be.a('function');
        });

        it('$override :: (String, Object, Object) -> Object', () => {
            expect($override('', {}, {})).not.to.be.a('function');
        });

        it('$override :: Array -> Object -> Object -> Object', () => {
            expect($override([])).to.be.a('function');
            expect($override([])({})).to.be.a('function');
            expect($override([])({})({})).not.to.be.a('function');
        });

        it('$override :: (Array, Object) -> Object -> Object', () => {
            expect($override([], {})).to.be.a('function');
            expect($override([], {})({})).not.to.be.a('function');
        });

        it('$override :: (Array, Object, Object) -> Object', () => {
            expect($override([], {}, {})).not.to.be.a('function');
        });
    });

    describe('Vanilla JS', () => {
        it('should shallowly add properties to an object', () => {
            const subject = {
                test: {
                    a: 'a',
                    b: 'b',
                    c: 'c'
                }
            };

            expect($override('test', {d: 'd'}, subject)).to.deep.equal({
                test: {
                    a: 'a',
                    b: 'b',
                    c: 'c',
                    d: 'd'
                }
            });
            expect($override('test', {d: 'd'}, subject)).to.not.equal(subject);
        });

        it('should shallowly overwrite properties in an object without removing any', () => {
            const subject = {
                test: {
                    a: 'a',
                    b: 'b',
                    c: 'c'
                }
            };

            expect($override('test', {c: 'foo'}, subject)).to.deep.equal({
                test: {
                    a: 'a',
                    b: 'b',
                    c: 'foo'
                }
            });
            expect($override('test', {c: 'foo'}, subject)).to.not.equal(subject);
        });

        it('should shallowly overwrite items of an array without removing any', () => {
            const subject = {
                test: ['a', 'b', 'c']
            };

            expect($override('test', ['foo'], subject)).to.deep.equal({
                test: ['foo', 'b', 'c']
            });
            expect($override('test', ['foo'], subject)).to.not.equal(subject);
        });

        it('should tolerate undefined subjects', () => {
            const subject = undefined;
            expect($override('some.path', 'someValue', subject)).to.be.an('undefined');
		});

		it('should keep the references of untouched values unchanged', () => {
			const subject = {
				test: {
					arr: [
						{
							a: 'a'
						},
						{
							b: 'b'
						}
					]
				},
				foo: {
					bar: 'baz'
				}
			};
			const overwritten = $override('test.arr', [{c: 'c'}], subject);

			expect(overwritten).to.deep.equal({
				test: {
					arr: [
						{
							c: 'c'
						},
						{
							b: 'b'
						}
					]
				},
				foo: {
					bar: 'baz'
				}
			});
			expect(overwritten).to.not.equal(subject);
			expect(overwritten.foo).to.equal(overwritten.foo);
			expect(overwritten.test.arr[1]).to.equal(subject.test.arr[1]);
		});
    });

    describe('Immutable', () => {
        it('should shallowly add properties to a List', () => {
            const subject = new List([
                new List([1, 2, 3, 4])
            ]);

            expect($override('0', [1, 2, 3, 4, 5], subject).toJS()).to.deep.equal([
                [1, 2, 3, 4, 5]
            ]);
        });

        it('should shallowly overwrite properties in a List', () => {
            const subject = new List([
                new List([1, 2, 3, 4])
            ]);

            expect($override('0', [2], subject).toJS()).to.deep.equal([
                [2, 2, 3, 4]
            ]);
            expect($override('0', [2, 2], subject).toJS()).to.deep.equal([
                [2, 2, 3, 4]
            ]);
            expect($override('0', [2, 2, 2], subject).toJS()).to.deep.equal([
                [2, 2, 2, 4]
            ]);
            expect($override('0', [2, 2, 2, 2], subject).toJS()).to.deep.equal([
                [2, 2, 2, 2]
            ]);
        });

        it('should shallowly add properties to an OrderedMap', () => {
            const subject = new OrderedMap({
                a: new OrderedMap({
                    a: 1,
                    b: 2,
                    c: 3,
                    d: 4
                })
            });

            expect($override('a', { e: 5 }, subject).toJS()).to.deep.equal({
                a: {
                    a: 1,
                    b: 2,
                    c: 3,
                    d: 4,
                    e: 5
                }
            })
        });

        it('should shallowly overwrite properties in an OrderedMap', () => {
            const subject = new OrderedMap({
                a: new OrderedMap({
                    a: 1,
                    b: 2,
                    c: 3,
                    d: 4
                })
            });

            expect($override('a', {a: 2}, subject).toJS()).to.deep.equal({
                a: {
                    a: 2,
                    b: 2,
                    c: 3,
                    d: 4
                }
            });
            expect($override('a', {a: 2, c: 2}, subject).toJS()).to.deep.equal({
                a: {
                    a: 2,
                    b: 2,
                    c: 2,
                    d: 4
                }
            });
            expect($override('a', {a: 2, c: 2, d: 2}, subject).toJS()).to.deep.equal({
                a: {
                    a: 2,
                    b: 2,
                    c: 2,
                    d: 2
                }
            });
        });

        it('should shallowly add properties to a Map', () => {
            const subject = new Map({
                a: new Map({
                    a: 1,
                    b: 2,
                    c: 3,
                    d: 4
                })
            });

            expect($override('a', { e: 5 }, subject).toJS()).to.deep.equal({
                a: {
                    a: 1,
                    b: 2,
                    c: 3,
                    d: 4,
                    e: 5
                }
            })
        });

        it('should shallowly overwrite properties in a Map', () => {
            const subject = new Map({
                a: new Map({
                    a: 1,
                    b: 2,
                    c: 3,
                    d: 4
                })
            });

            expect($override('a', {a: 2}, subject).toJS()).to.deep.equal({
                a: {
                    a: 2,
                    b: 2,
                    c: 3,
                    d: 4
                }
            });
            expect($override('a', {a: 2, c: 2}, subject).toJS()).to.deep.equal({
                a: {
                    a: 2,
                    b: 2,
                    c: 2,
                    d: 4
                }
            });
            expect($override('a', {a: 2, c: 2, d: 2}, subject).toJS()).to.deep.equal({
                a: {
                    a: 2,
                    b: 2,
                    c: 2,
                    d: 2
                }
            });
        });
    });
});
