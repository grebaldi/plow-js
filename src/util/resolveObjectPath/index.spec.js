import {expect} from 'chai';
import resolveObjectPath from './index.js';

describe('Internals: resolveObjectPath', () => {
    it('should resolve string paths to arrays', () => {
        expect(resolveObjectPath('a')).to.deep.equal(['a']);
        expect(resolveObjectPath('a.b')).to.deep.equal(['a', 'b']);
        expect(resolveObjectPath('a.b.c')).to.deep.equal(['a', 'b', 'c']);
        expect(resolveObjectPath('a.b.c.1')).to.deep.equal(['a', 'b', 'c', 1]);
        expect(resolveObjectPath('a.b.c.1.d.0')).to.deep.equal(['a', 'b', 'c', 1, 'd', 0]);
    });

    it('should leave arrays untouched', () => {
        expect(resolveObjectPath(['a'])).to.deep.equal(['a']);
        expect(resolveObjectPath(['a', 1, 'b'])).to.deep.equal(['a', 1, 'b']);
        expect(resolveObjectPath(['a', '2', 'c'])).to.deep.equal(['a', '2', 'c']);
    });
});
