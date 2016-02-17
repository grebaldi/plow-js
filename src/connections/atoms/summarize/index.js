import createPolymorphFunction from '../../../util/createPolymorphFunction/index.js';

//
// Passes the results of all functions in the first parameter to the finisher function and returns
// the finishers result
//
export default createPolymorphFunction(
    ops => finisher => subject =>
        finisher(...ops.map(op => op(subject)), subject)
);
