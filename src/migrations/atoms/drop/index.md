# $drop migration

> Removes an item from an array or object, addressed by its path

## Signature

**path** *(String/Array)* - The path to the item, that should be removed

**subject** *(Object)* - The object that contains the item

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

$drop('itemsInTheFrige.1', myObject); // returns { itemsInTheFrige: ['eggs', 'milk'] }
```