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
    itemsInTheFrige: ['eggs', 'beer', 'milk']
};

$not($contains('beer', 'itemsInTheFrige'), myObject); // returns false
$not($contains('wine', 'itemsInTheFrige'), myObject); // returns true
```
