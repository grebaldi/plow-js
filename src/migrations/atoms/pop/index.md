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

$pop('itemsInTheFrige', myObject);
// returns {
//     itemsInTheFrige: ['eggs', 'beer']
// }
```

**IMMUTABLE JS SUPPORT (DEPRECATED)**

> **WARNING:** Immutable JS support is deprecated. It will be removed entirely with the next major version of Plow JS (which will be 4.0.0). Until then, 
support for Immutable JS versions below (but not including) v4 - though discouraged - continues to work.

<s>*the following types are supported for values targeted by `path`*:
```
List
Stack
```
</s>
