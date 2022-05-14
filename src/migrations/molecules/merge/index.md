# $merge migration

> Deeply merges two iterable structures

## Signature

**path** *(String/Array)* - The path to the item, that should be overridden

**value** *(Any)* - The value to merge with

**subject** *(Object)* - The object that contains the item

**TYPE SIGNATURES**
```
String -> Object -> Object -> Object
(String, Object) -> Object -> Object
(String, Object, Object) -> Object
Array -> Object -> Object -> Object
(Array, Object) -> Object -> Object
(Array, Object, Object) -> Object
```

**EXAMPLE**
```js
const subject = {
    rooms: {
        kitchen: {name: 'Kitchen', color: 'brown'},
        living: {name: 'Living Rooms', color: 'red'}
    }
};

//
// Naming is important
//
$merge('rooms', { kitchen: { name: 'Mighty hall of culinary awesomeness', chairColor: 'white' } }, subject);
// returns {
//     rooms: {
//          kitchen: {name: 'Mighty hall of culinary awesomeness', color: 'brown', chairColor: 'white'},
//          living: {name: 'Living Rooms', color: 'red'}
//     }
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
