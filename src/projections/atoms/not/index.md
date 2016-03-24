# $not projection

> Returns the boolean opposite of the result of the passed function

## Signature

**statement** *(Function)* - A function that takes `subject` as its first and only argument

**subject** *(Object)* - The object that contains the requested values

**TYPE SIGNATURES**
```
Function -> Object -> *
(Function, Object) -> *
```

**EXAMPLE**
```js
const myObject = {
    itemsInTheFridge: ['eggs', 'beer', 'milk']
};

$not($contains('beer', 'itemsInTheFridge'), myObject); // returns false
$not($contains('wine', 'itemsInTheFridge'), myObject); // returns true
```
