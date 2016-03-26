# $override migration

> Shallowly merges two iterable structures

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
// Make the appartement awesome!
//
$override('rooms', { pool: {name: 'Freaking awesome pool table chamber!!!'} }, subject);
// returns {
//     kitchen: {name: 'Kitchen'},
//     living: {name: 'Living Rooms'},
//     pool: {name: 'Freaking awesome pool table chamber!!!'}
// }

```
