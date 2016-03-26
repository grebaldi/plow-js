# $unshift migration

> Adds items to the beginning of iterables in `subject` addressed by `path`

## Signature

**path** *(String/Array)* - The path to the iterable to add a new item to

**value** *Any* - The new item

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
    itemsInTheFrige: ['eggs', 'beer', 'milk']
};

$unshift('itemsInTheFrige', 'wine', myObject);

// returns { itemsInTheFrige: ['wine', 'eggs', 'beer', 'milk'] }
```
