import createPolymorphFunction from '../../../util/createPolymorphFunction/index.js';
import resolveObjectPath from '../../../util/resolveObjectPath/index.js';

import $get from '../../../projections/atoms/get/index.js';
import $set from '../set/index.js';

export default createPolymorphFunction(
    path => value => subject => {
        const target = $get(path, subject);

        if (target && !Array.isArray(target) && typeof target.unshift === 'function') {
            return $set(path, target.unshift(value), subject);
        }

        if (typeof target !== 'object') {
            console.warn(`Cannot unshift an item to a ${typeof target}.`);
            return subject;
        }

        if (Array.isArray(target)) {
            return $set(path, [value, ...target], subject);
        }

        if (typeof value !== 'object') {
            console.warn(`Only objects can be added to objects.`);
            return subject;
        }

        const keys = Object.keys(value);

        if (keys.length !== 1) {
            console.warn(`Only objects with exactly one key can be added to objects.`);
            return subject;
        }

        const [key] = keys;

        if (typeof target[key] !== 'undefined') {
            console.warn(`Cannot add {${key}: ${value[key].toString()}} to ${resolveObjectPath(path).join('.')}, because it is already set.`);
            return subject;
        }

        return $set([...resolveObjectPath(path), key], value[key], subject);
    }
);
