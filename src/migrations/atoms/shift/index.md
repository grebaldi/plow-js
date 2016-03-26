# $shift migration

> Removes an item from the beginning of an iterable structure

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

$shift('itemsInTheFrige', subject);
// returns {
//     itemsInTheFrige: ['beer', 'milk']
// }
```
