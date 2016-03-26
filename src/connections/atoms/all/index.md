# $all projection

> Performs all passed operations like a reversed compose

## Signature

**operations** *(...Function)* - Multiple functions that take `subject` as their first and only argument

**subject** *(Object)* - An object to operate on

**TYPE SIGNATURES**
```
...Function -> Object -> *
(...Function, Object) -> *
```

**EXAMPLE**
```js
const myObject = {
	allBugsFixed: false,
    itemsInTheFrige: ['eggs', 'milk']
};

//
// Awesomize the situation
//
$all(
    $toggle('allBugsFixed'),
    $add('itemsInTheFrige', 'beer'),
    myObject
); // returns false
```
