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
$set('itemsInTheFrige.1', 'wine', myObject);
// returns {
//     itemsInTheFrige: ['eggs', 'wine', 'milk']
// }
```

**IMMUTABLE JS SUPPORT (DEPRECATED)**

> **WARNING:** Immutable JS support is deprecated. It will be removed entirely with the next major version of Plow JS (which will be 4.0.0). Until then, 
support for Immutable JS versions below (but not including) v4 - though discouraged - continues to work.

<s>*the following types are supported for values targeted by `path`*:
```
List
Map
OrderedMap
```
</s>
