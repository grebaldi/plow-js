import createPolymorphFunction from '../../../util/createPolymorphFunction/index.js';

//
// Returns the boolean opposite of the result of the passed function
//
export default createPolymorphFunction(
    op => subject => !Boolean(op(subject))
);
