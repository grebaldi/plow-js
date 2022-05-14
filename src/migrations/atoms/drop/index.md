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

**IMMUTABLE JS SUPPORT (DEPRECATED)**

> **WARNING:** Immutable JS support is deprecated. It will be removed entirely with the next major version of Plow JS (which will be 4.0.0). Until then, 
support for Immutable JS versions below (but not including) v4 - though discouraged - continues to work.

<s>*the following types are supported for values targeted by `path`*:
```
List
OrderedMap
Map
```
</s>
