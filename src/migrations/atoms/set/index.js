import createPolymorphFunction from '../../../util/createPolymorphFunction/index.js';
import resolveObjectPath from '../../../util/resolveObjectPath/index.js';

//
// Helper function to peform the necessary recursion
//
const recursivelySetValueInObject = (object, value, path) => {
    if (path.length === 0) {
        return value;
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

	if (Array.isArray(object)) {
		//
		// Make sure, that array elements are always inserted at the last position, if the path exceeds the length
		// of the array
		//
		const key = Math.min(object.length, getArrayKey(path[0]));
		return Object.assign([], object, {[key]: recursivelySetValueInObject(object[path[0]], value, path.slice(1))});
	}

	return Object.assign({}, object, {[path[0]]: recursivelySetValueInObject(object[path[0]], value, path.slice(1))});
};

function getArrayKey(key) {
	switch (typeof key) {
		case 'string': {
			if (key.match(/^\d+$/)) {
				return parseInt(key);
			}
			return key;
		}
		case 'number':
			return key;
		default:
			throw new TypeError(`Array key must be a number or able to be parsed to number! Got key: ${key} with type: ${typeof key}`);
	}
}

//
// Sets a value inside an object and returns the resulting object
//
export default createPolymorphFunction(
    path => value => subject => {
        if (typeof subject !== 'undefined') {
            if (typeof subject.setIn === 'function') {
                return subject.setIn(resolveObjectPath(path), value);
			}

            return recursivelySetValueInObject(subject, value, resolveObjectPath(path));
        }

        return subject;
    }
);
