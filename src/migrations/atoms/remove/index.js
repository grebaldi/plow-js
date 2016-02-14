import createPolymorphFunction from '../../../util/createPolymorphFunction/index.js';

import $get from '../../../projections/atoms/get/index.js';
import $set from '../set/index.js';

//
// Removes all occurences of an item from an array or an object,
// adressed by its value
//
export default createPolymorphFunction(
    path => value => subject => {
        const object = $get(path, subject);

        if (typeof object !== 'object') {
            console.warn(`Cannot remove an item from a ${typeof object}.`);
            return subject;
        }

        if (Array.isArray(object)) {
            return $set(path, object.filter(item => item !== value), subject);
        }

        return $set(path, Object.keys(object).filter(key => object[key] !== value).reduce(
            (newObject, key) => {
                newObject[key] = object[key];
                return newObject;
            },
            {}
        ), subject);
    }
);
