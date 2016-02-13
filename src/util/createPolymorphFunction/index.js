//
// Allows to create function that can be called with
// argument lists and/or curried
//
export default func => (...args) => args.reduce(
    (func, arg) => func(arg),
    func
);
