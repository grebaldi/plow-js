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

**IMMUTABLE JS SUPPORT**
*the following types are supported for values targeted by `path`*:
```
List
Map
OrderedMap
```
