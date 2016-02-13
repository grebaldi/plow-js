import createPolymorphFunction from '../../../util/createPolymorphFunction/index.js';
import resolveObjectPath from '../../../util/resolveObjectPath/index.js';

//
// Returns a value from an object structure, addressed by `path`
//
export default createPolymorphFunction(
    path => {
        //
        // This function returns the path, if it is neither
        // an array nor a string
        //
        if (typeof path !== 'string' && !Array.isArray(path)) {
            return path;
        }

        return subject => resolveObjectPath(path).reduce(
            (subject, part) => subject && subject[part],
            subject
        );
    }
);
