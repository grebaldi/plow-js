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

    object[path[0]] = recursivelySetValueInObject(object[path[0]], value, path.slice(1));
    return object;
};

//
// Sets a value inside an object and returns the resulting object
//
export default createPolymorphFunction(
    path => value => subject => {
        if (!$get(path, subject)) {
            return subject;
        }

        const object = JSON.parse(JSON.stringify(subject));
        return recursivelySetValueInObject(object, value, resolveObjectPath(path));
    }
);
