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
    itemsInTheFrige: ['eggs', 'beer', 'milk']
};

$add('itemsInTheFrige', 'wine', myObject);

// returns { itemsInTheFrige: ['eggs', 'beer', 'milk', 'wine'] }
```
**IMMUTABLE JS SUPPORT**
*the following types are supported for values targeted by `path`*:
```
Stack
Map
OrderedSet
Set
OrderedMap
List
```
