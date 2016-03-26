# $add migration

> Adds items to iterables in `subject` addressed by `path`

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
    itemsInTheFridge: ['eggs', 'beer', 'milk']
};

$add('itemsInTheFridge', 'wine', myObject);

// returns { itemsInTheFridge: ['eggs', 'beer', 'milk', 'wine'] }
```
