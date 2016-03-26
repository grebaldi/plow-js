# $set migration

> Sets a value inside an object and returns the resulting object

## Signature

**path** *(String/Array)* - The path to the object, to set the value in

**value** *(String/Array)* - The value to be set

**subject** *(Object)* - The object that contains the object, to set the value in

**TYPE SIGNATURES**
```
String -> * -> Object -> Object
(String, *) -> Object -> Object
(String, *, Object) -> Object
Array -> * -> Object -> Object
(Array, *) -> Object -> Object
(Array, *, Object) -> Object
```

**EXAMPLE**
```js
const myObject = {
    itemsInTheFrige: ['eggs', 'beer', 'milk']
};

//
// Don't like beer?
//
$set('itemsInTheFrige.1', 'wine', subject);
// returns {
//     itemsInTheFrige: ['eggs', 'wine', 'milk']
// }
```
