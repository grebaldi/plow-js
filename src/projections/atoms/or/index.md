# $or projection

> Performs all passed operations until one of them returns true

## Signature

**statements** *(...Function)* - Multiple functions that take `subject` as their first and only argument

**subject** *(Object)* - The object that contains the requested values

**TYPE SIGNATURES**
```
...Function -> Object -> *
(...Function, Object) -> *
```

**EXAMPLE**
```js
const myObject = {
	allBugsFixed: false,
    itemsInTheFridge: ['eggs', 'beer', 'milk']
};

//
// Happy?
//
$or(
    $get('allBugsFixed'),
    $contains('beer', 'itemsInTheFridge'),
    myObject
); // returns true
```
