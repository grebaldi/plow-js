# $pop migration

> Removes an item from the end of an iterable structure

## Signature

**path** *(String/Array)* - The path to the iterable

**subject** *(Object)* - The object that contains the iterable

**TYPE SIGNATURES**
```
String -> Object -> Object
(String, Object) -> Object
Array -> Object -> Object
(Array, Object) -> Object
```

**EXAMPLE**
```js
const myObject = {
    itemsInTheFrige: ['eggs', 'beer', 'milk']
};

$pop('itemsInTheFrige', subject);
// returns {
//     itemsInTheFrige: ['eggs', 'beer']
// }
```

**IMMUTABLE JS SUPPORT**
*the following types are supported for values targeted by `path`*:
```
List
Stack
```
