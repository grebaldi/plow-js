import {expect} from 'chai';
import {List, Map, OrderedMap} from 'immutable';

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

        it('$merge :: Array -> Object -> Object -> Object', () => {
            expect($merge([])).to.be.a('function');
            expect($merge([])({})).to.be.a('function');
            expect($merge([])({})({})).not.to.be.a('function');
        });

        it('$merge :: (Array, Object) -> Object -> Object', () => {
            expect($merge([], {})).to.be.a('function');
            expect($merge([], {})({})).not.to.be.a('function');
        });

        it('$merge :: (Array, Object, Object) -> Object', () => {
            expect($merge([], {}, {})).not.to.be.a('function');
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
        it('should deeply add properties to a List', () => {
            const subject = new List([
                new List([
                    new List([1, 2, 3, 4])
                ])
            ]);

            expect($merge('0', new List([
                new List([1, 2, 3, 4, 5])
            ]), subject).toJS()).to.deep.equal([
                [
                    [1, 2, 3, 4, 5]
                ]
            ]);
            expect($merge('0', [[1, 2, 3, 4, 5]], subject).toJS()).to.deep.equal([
                [
                    [1, 2, 3, 4, 5]
                ]
            ]);
        });

        it('should deeply add properties to a Map', () => {
            const subject = new Map({
                a: new Map({
                    a: new Map({
                        a: 1,
                        b: 2,
                        c: 3
                    })
                })
            });

            expect($merge('a', new Map({
                a: new Map({
                    d: 4
                })
            }), subject).toJS()).to.deep.equal({
                a: {
                    a: {
                        a: 1,
                        b: 2,
                        c: 3,
                        d: 4
                    }
                }
            });
            expect($merge('a', {
                a: {
                    d: 4
                }
            }, subject).toJS()).to.deep.equal({
                a: {
                    a: {
                        a: 1,
                        b: 2,
                        c: 3,
                        d: 4
                    }
                }
            });
        });

        it('should deeply add properties to an OrderedMap', () => {
            const subject = new OrderedMap({
                a: new OrderedMap({
                    a: new OrderedMap({
                        a: 1,
                        b: 2,
                        c: 3
                    })
                })
            });

            expect($merge('a', new OrderedMap({
                a: new OrderedMap({
                    d: 4
                })
            }), subject).toJS()).to.deep.equal({
                a: {
                    a: {
                        a: 1,
                        b: 2,
                        c: 3,
                        d: 4
                    }
                }
            });
            expect($merge('a', {
                a: {
                    d: 4
                }
            }, subject).toJS()).to.deep.equal({
                a: {
                    a: {
                        a: 1,
                        b: 2,
                        c: 3,
                        d: 4
                    }
                }
            });
        });

        it('should deeply overwrite properties in a List without removing any', () => {
            const subject = new List([
                new List([
                    new List([1, 2, 3, 4])
                ])
            ]);

            expect($merge('0', new List([
                new List([42, 2, 3, 4])
            ]), subject).toJS()).to.deep.equal([
                [[42, 2, 3, 4]]
            ]);
            expect($merge('0', new List([
                new List([1, 42, 3, 4])
            ]), subject).toJS()).to.deep.equal([
                [[1, 42, 3, 4]]
            ]);
            expect($merge('0', new List([
                new List([1, 2, 42, 4])
            ]), subject).toJS()).to.deep.equal([
                [[1, 2, 42, 4]]
            ]);
            expect($merge('0', new List([
                new List([1, 2, 3, 42])
            ]), subject).toJS()).to.deep.equal([
                [[1, 2, 3, 42]]
            ]);
            expect($merge('0', [
                [42, 2, 3, 4]
            ], subject).toJS()).to.deep.equal([
                [[42, 2, 3, 4]]
            ]);
            expect($merge('0', [
                [1, 42, 3, 4]
            ], subject).toJS()).to.deep.equal([
                [[1, 42, 3, 4]]
            ]);
            expect($merge('0', [
                [1, 2, 42, 4]
            ], subject).toJS()).to.deep.equal([
                [[1, 2, 42, 4]]
            ]);
            expect($merge('0', [
                [1, 2, 3, 42]
            ], subject).toJS()).to.deep.equal([
                [[1, 2, 3, 42]]
            ]);
        });

        it('should deeply overwrite properties in a Map without removing any', () => {
            const subject = new Map({
                a: new Map({
                    a: new Map({
                        a: 1,
                        b: 2,
                        c: 3
                    })
                })
            });

            expect($merge('a', new Map({
                a: new Map({
                    a: 42
                })
            }), subject).toJS()).to.deep.equal({
                a: {
                    a: {
                        a: 42,
                        b: 2,
                        c: 3
                    }
                }
            });
            expect($merge('a', new Map({
                a: new Map({
                    b: 42
                })
            }), subject).toJS()).to.deep.equal({
                a: {
                    a: {
                        a: 1,
                        b: 42,
                        c: 3
                    }
                }
            });
            expect($merge('a', new Map({
                a: new Map({
                    c: 42
                })
            }), subject).toJS()).to.deep.equal({
                a: {
                    a: {
                        a: 1,
                        b: 2,
                        c: 42
                    }
                }
            });
            expect($merge('a', {
                a: {
                    a: 42
                }
            }, subject).toJS()).to.deep.equal({
                a: {
                    a: {
                        a: 42,
                        b: 2,
                        c: 3
                    }
                }
            });
            expect($merge('a', {
                a: {
                    b: 42
                }
            }, subject).toJS()).to.deep.equal({
                a: {
                    a: {
                        a: 1,
                        b: 42,
                        c: 3
                    }
                }
            });
            expect($merge('a', {
                a: {
                    c: 42
                }
            }, subject).toJS()).to.deep.equal({
                a: {
                    a: {
                        a: 1,
                        b: 2,
                        c: 42
                    }
                }
            });
        });

        it('should deeply overwrite properties in a OrderedMap without removing any', () => {
            const subject = new OrderedMap({
                a: new OrderedMap({
                    a: new OrderedMap({
                        a: 1,
                        b: 2,
                        c: 3
                    })
                })
            });

            expect($merge('a', new OrderedMap({
                a: new OrderedMap({
                    a: 42
                })
            }), subject).toJS()).to.deep.equal({
                a: {
                    a: {
                        a: 42,
                        b: 2,
                        c: 3
                    }
                }
            });
            expect($merge('a', new OrderedMap({
                a: new OrderedMap({
                    b: 42
                })
            }), subject).toJS()).to.deep.equal({
                a: {
                    a: {
                        a: 1,
                        b: 42,
                        c: 3
                    }
                }
            });
            expect($merge('a', new OrderedMap({
                a: new OrderedMap({
                    c: 42
                })
            }), subject).toJS()).to.deep.equal({
                a: {
                    a: {
                        a: 1,
                        b: 2,
                        c: 42
                    }
                }
            });
            expect($merge('a', {
                a: {
                    a: 42
                }
            }, subject).toJS()).to.deep.equal({
                a: {
                    a: {
                        a: 42,
                        b: 2,
                        c: 3
                    }
                }
            });
            expect($merge('a', {
                a: {
                    b: 42
                }
            }, subject).toJS()).to.deep.equal({
                a: {
                    a: {
                        a: 1,
                        b: 42,
                        c: 3
                    }
                }
            });
            expect($merge('a', {
                a: {
                    c: 42
                }
            }, subject).toJS()).to.deep.equal({
                a: {
                    a: {
                        a: 1,
                        b: 2,
                        c: 42
                    }
                }
            });
        });
    });
});
