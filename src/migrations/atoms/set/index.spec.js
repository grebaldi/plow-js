import {expect} from 'chai';
import {List, Map, OrderedMap} from 'immutable';

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

        it('$set :: Array -> * -> Object -> Object', () => {
            expect($set([])).to.be.a('function');
            expect($set([])(NaN)).to.be.a('function');
            expect($set([])(NaN)({})).not.to.be.a('function');
        });

        it('$set :: (Array, *) -> Object -> Object', () => {
            expect($set([], NaN)).to.be.a('function');
            expect($set([], NaN)({})).not.to.be.a('function');
        });

        it('$set :: (Array, *, Object) -> Object', () => {
            expect($set([], NaN, {})).not.to.be.a('function');
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

        it('should tolerate undefined subjects', () => {
            const subject = undefined;
            expect($set('some.path', 'someValue', subject)).to.be.an('undefined');
		});

		it('should keep the references of untouched values unchanged', () => {
			const subject = {
				test: {
					arr: [
						{
							a: ['a', 'b', 'c'],
							b: 'buzz'
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

			const changed = $set('test.arr.0', {a: 'a'}, subject);
			expect(changed).to.deep.equal({
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
			});
			expect(changed).not.to.equal(subject);
			expect(changed.foo).to.equal(subject.foo);
			expect(changed.test.arr[1]).to.equal(subject.test.arr[1]);
		});

        it('should keep Date objects intact', () => {
            const subject = {a:{b:new Date(2018, 11, 24, 10, 33, 30, 0)}};
            const result = $set('a.c', new Date(2018, 11, 24, 11, 33, 30, 0), subject);

            expect(result.a.b instanceof Date).to.equal(true);
            expect(result.a.c instanceof Date).to.equal(true);
        });
    });

    describe('Immutable', () => {
        it('should shallowly set a value inside a List', () => {
            const subject = new List([1, 2, 3, 4]);

            expect($set('0', 42, subject).toJS()).to.deep.equal([42, 2, 3, 4]);
            expect($set('1', 42, subject).toJS()).to.deep.equal([1, 42, 3, 4]);
            expect($set('2', 42, subject).toJS()).to.deep.equal([1, 2, 42, 4]);
            expect($set('3', 42, subject).toJS()).to.deep.equal([1, 2, 3, 42]);
        });

        it('should add a value to the end of a List', () => {
            const subject = new List([1, 2, 3, 4]);

            expect($set('4', 42, subject).toJS()).to.deep.equal([1, 2, 3, 4, 42]);
        });

        it('should shallowly set a value inside a Map', () => {
            const subject = new Map({
                a: 1,
                b: 2,
                c: 3,
                d: 4
            });

            expect($set('a', 42, subject).toJS()).to.deep.equal({
                a: 42, b: 2, c: 3, d: 4
            });
            expect($set('b', 42, subject).toJS()).to.deep.equal({
                a: 1, b: 42, c: 3, d: 4
            });
            expect($set('c', 42, subject).toJS()).to.deep.equal({
                a: 1, b: 2, c: 42, d: 4
            });
            expect($set('d', 42, subject).toJS()).to.deep.equal({
                a: 1, b: 2, c: 3, d: 42
            });
        });

        it('should add a value to a Map', () => {
            const subject = new Map({
                a: 1,
                b: 2,
                c: 3,
                d: 4
            });

            expect($set('e', 42, subject).toJS()).to.deep.equal({
                a: 1,
                b: 2,
                c: 3,
                d: 4,
                e: 42
            });
        });

        it('should shallowly set a value inside an OrderedMap', () => {
            const subject = new OrderedMap({
                a: 1,
                b: 2,
                c: 3,
                d: 4
            });

            expect($set('a', 42, subject).toJS()).to.deep.equal({
                a: 42, b: 2, c: 3, d: 4
            });
            expect($set('b', 42, subject).toJS()).to.deep.equal({
                a: 1, b: 42, c: 3, d: 4
            });
            expect($set('c', 42, subject).toJS()).to.deep.equal({
                a: 1, b: 2, c: 42, d: 4
            });
            expect($set('d', 42, subject).toJS()).to.deep.equal({
                a: 1, b: 2, c: 3, d: 42
            });
        });

        it('should add a value to an OrderedMap', () => {
            const subject = new OrderedMap({
                a: 1,
                b: 2,
                c: 3,
                d: 4
            });

            expect($set('e', 42, subject).toJS()).to.deep.equal({
                a: 1,
                b: 2,
                c: 3,
                d: 4,
                e: 42
            });
        });

        it('should deeply set a value inside a List', () => {
            const subject = new List([
                new List([
                    NaN,
                    new List([1, 2, 3, 4])
                ])
            ]);

            expect($set('0.1.0', 42, subject).toJS()).to.deep.equal([
                [
                    NaN,
                    [42, 2, 3, 4]
                ]
            ]);
            expect($set('0.1.1', 42, subject).toJS()).to.deep.equal([
                [
                    NaN,
                    [1, 42, 3, 4]
                ]
            ]);
            expect($set('0.1.2', 42, subject).toJS()).to.deep.equal([
                [
                    NaN,
                    [1, 2, 42, 4]
                ]
            ]);
            expect($set('0.1.3', 42, subject).toJS()).to.deep.equal([
                [
                    NaN,
                    [1, 2, 3, 42]
                ]
            ]);
        });

        it('should deeply set a value inside a Map', () => {
            const subject = new Map({
                a: NaN,
                b: new Map({
                    a: NaN,
                    b: NaN,
                    c: new Map({
                        a: 1,
                        b: 2,
                        c: 3,
                        d: 4
                    })
                })
            });

            expect($set('b.c.a', 42, subject).toJS()).to.deep.equal({
                a: NaN,
                b: {
                    a: NaN,
                    b: NaN,
                    c: {
                        a: 42,
                        b: 2,
                        c: 3,
                        d: 4
                    }
                }
            });
            expect($set('b.c.b', 42, subject).toJS()).to.deep.equal({
                a: NaN,
                b: {
                    a: NaN,
                    b: NaN,
                    c: {
                        a: 1,
                        b: 42,
                        c: 3,
                        d: 4
                    }
                }
            });
            expect($set('b.c.c', 42, subject).toJS()).to.deep.equal({
                a: NaN,
                b: {
                    a: NaN,
                    b: NaN,
                    c: {
                        a: 1,
                        b: 2,
                        c: 42,
                        d: 4
                    }
                }
            });
            expect($set('b.c.d', 42, subject).toJS()).to.deep.equal({
                a: NaN,
                b: {
                    a: NaN,
                    b: NaN,
                    c: {
                        a: 1,
                        b: 2,
                        c: 3,
                        d: 42
                    }
                }
            });
        });

        it('should deeply set a value inside a OrderedMap', () => {
            const subject = new OrderedMap({
                a: NaN,
                b: new OrderedMap({
                    a: NaN,
                    b: NaN,
                    c: new OrderedMap({
                        a: 1,
                        b: 2,
                        c: 3,
                        d: 4
                    })
                })
            });

            expect($set('b.c.a', 42, subject).toJS()).to.deep.equal({
                a: NaN,
                b: {
                    a: NaN,
                    b: NaN,
                    c: {
                        a: 42,
                        b: 2,
                        c: 3,
                        d: 4
                    }
                }
            });
            expect($set('b.c.b', 42, subject).toJS()).to.deep.equal({
                a: NaN,
                b: {
                    a: NaN,
                    b: NaN,
                    c: {
                        a: 1,
                        b: 42,
                        c: 3,
                        d: 4
                    }
                }
            });
            expect($set('b.c.c', 42, subject).toJS()).to.deep.equal({
                a: NaN,
                b: {
                    a: NaN,
                    b: NaN,
                    c: {
                        a: 1,
                        b: 2,
                        c: 42,
                        d: 4
                    }
                }
            });
            expect($set('b.c.d', 42, subject).toJS()).to.deep.equal({
                a: NaN,
                b: {
                    a: NaN,
                    b: NaN,
                    c: {
                        a: 1,
                        b: 2,
                        c: 3,
                        d: 42
                    }
                }
            });
        });
	});
});
