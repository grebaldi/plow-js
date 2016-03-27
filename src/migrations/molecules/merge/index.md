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
const myObject = {
    rooms: {
        kitchen: {name: 'Kitchen'},
        living: {name: 'Living Rooms'}
    }
};

//
// Naming is important
//
$override('rooms', { kitchen: { name: 'Mighty hall of culinary awesomeness' } }, subject);
// returns {
//     kitchen: {name: 'Mighty hall of culinary awesomeness'},
//     living: {name: 'Living Rooms'}
// }
```

**IMMUTABLE JS SUPPORT**
*the following types are supported for values targeted by `path`*:
```
List
Map
OrderedMap
```
