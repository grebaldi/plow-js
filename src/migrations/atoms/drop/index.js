import createPolymorphFunction from '../../../util/createPolymorphFunction/index.js';
import resolveObjectPath from '../../../util/resolveObjectPath/index.js';

import $get from '../../../projections/atoms/get/index.js';
import $set from '../set/index.js';

//
// Removes an item from an array or object, addressed by its path
//
export default createPolymorphFunction(
    path => subject => {
        if (subject && typeof subject.deleteIn === 'function') {
            return subject.deleteIn(resolveObjectPath(path));
        }
        const resolvedPath = resolveObjectPath(path);
        const parentPath = resolvedPath.slice(0, -1);
        const key = resolvedPath[resolvedPath.length - 1];
        const parent = $get(parentPath, subject);

        if (typeof parent !== 'object') {
            console.warn(`Cannot drop an item from a ${typeof parent}.`);
            return subject;
        }

        if (Array.isArray(parent)) {
            return $set(parentPath, parent.filter((item, index) => index !== key), subject);
        }

        return $set(parentPath, Object.keys(parent).filter(index => index !== key).reduce(
            (newObject, key) => {
                newObject[key] = parent[key];
                return newObject;
            },
            {}
        ), subject);
    }
);
