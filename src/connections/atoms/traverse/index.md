# $traverse projection

> Deeply applies the `actor` function to each member of the `subject`

## Signature

**actor** *(Function)* - Will be applied to each member of `subject`

**subject** *(Object)* - An object to operate on

**TYPE SIGNATURES**
```
Function -> Object -> Object
(Function, Object) -> Object
```

**EXAMPLE**
```js
const myObject = {
    numberOfIdeas: 1,
    numberOfCommits: 2,
    numberOfPullRequests: 3
};

$traverse(x => x* 2, myObject);
// will return {
//     numberOfIdeas: 2,
//     numberOfCommits: 4,
//     numberOfPullRequests: 6
// }
```
