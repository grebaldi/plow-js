import {expect} from 'chai';
import createPolymorphFunction from './index.js';

describe('Internals: createPolymorphFunction', () => {
    it('should create a polymorph function which can be curried or called with argument lists', () => {
        const fn = a => b => `foo ${a} ${b}`;
        const polymorphFn = createPolymorphFunction(fn);

        expect(polymorphFn).to.be.a('function');
        expect(polymorphFn('bar')).to.be.a('function');
        expect(polymorphFn('bar')('baz')).to.equal('foo bar baz');
        expect(polymorphFn('bar', 'baz')).to.equal('foo bar baz');
    });
});
