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
$remove('itemsInTheFrige', 'beer', myObject);
// returns {
//     itemsInTheFrige: ['eggs', 'milk', 'bacon']
// }
```

**IMMUTABLE JS SUPPORT (DEPRECATED)**

> **WARNING:** Immutable JS support is deprecated. It will be removed entirely with the next major version of Plow JS (which will be 4.0.0). Until then, 
support for Immutable JS versions below (but not including) v4 - though discouraged - continues to work.

<s>*the following types are supported for values targeted by `path`*:
```
List
Set
Map
OrderedSet
OrderedMap
```
</s>
