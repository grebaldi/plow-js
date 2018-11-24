import createPolymorphFunction from '../../../util/createPolymorphFunction/index.js';
import resolveObjectPath from '../../../util/resolveObjectPath/index.js';

import $get from '../../../projections/atoms/get/index.js';

//
// Helper function to peform the necessary recursion
//
const recursivelySetValueInObject = (object, value, path) => {
    if (path.length === 0) {
        return value;
    }

    //
    // If the object has a setter, use it
    //
    if (object && typeof object.set === 'function') {
        return object.set(path[0], recursivelySetValueInObject(object.get(path[0]), value, path.slice(1)));
    }

    //
    // Create missing path targets
    //
    if (typeof object === 'undefined') {
        if (typeof path[0] === 'number') {
            object = [];
        } else {
            object = {};
        }
    }
    //
    // Make sure, that array elements are always inserted at the last position, if the path exceeds the length
    // of the array
    //
    if (typeof path[0] === 'number' && Array.isArray(object) && object.length < path[0]) {
        path[0] = object.length;
    }

    object[path[0]] = recursivelySetValueInObject(object[path[0]], value, path.slice(1));
    return object;
};

//
// Sets a value inside an object and returns the resulting object
//
export default createPolymorphFunction(
    path => value => subject => {
        if (typeof subject !== 'undefined') {
            let object = subject;
            if (typeof subject.setIn === 'function') {
                try {
                    const setInResult = subject.setIn(resolveObjectPath(path), value);
                    if (setInResult !== undefined) {
                        return setInResult;
                    }
                } catch (e) {}
            } else {
                object = JSON.parse(JSON.stringify(subject));
            }
            return recursivelySetValueInObject(object, value, resolveObjectPath(path));
        }

        return subject;
    }
);
