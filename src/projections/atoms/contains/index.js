import createPolymorphFunction from '../../../util/createPolymorphFunction/index.js';
import $get from '../get/index.js';

// const objectContains = object => {
//     const keys = Object.keys(object);
//
//     return
// }

//
// Checks if a structure contains an item
//
export default createPolymorphFunction(
    value => path => subject => {
        const object = $get(path, subject);

        if (typeof object !== 'object' || !Boolean(object)) {
            return false;
        }

        return Array.isArray(object)
            ? object.indexOf(value) !== -1
            : Object.keys(object).some(key => object[key] === value);
    }
);
