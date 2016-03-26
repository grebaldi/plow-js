# $remove migration

> Removes all occurences of an item from an array or an object, adressed by its value

## Signature

**path** *(String/Array)* - The path to the iterable

**value** *(String/Array)* - The value to be removed

**subject** *(Object)* - The object that contains the iterable

**TYPE SIGNATURES**
```
String -> * -> Object -> Object
(String, *) -> Object -> Object
(String, *,  Object) -> Object
Array -> * -> Object -> Object
(Array, *) -> Object -> Object
(Array, *,  Object) -> Object
```

**EXAMPLE**
```js
const myObject = {
    itemsInTheFrige: ['eggs', 'beer', 'milk', 'beer', 'bacon', 'beer']
};

//
// Too much beer...
//
$remove('itemsInTheFrige', 'beer', subject);
// returns {
//     itemsInTheFrige: ['eggs', 'milk', 'bacon']
// }
```
