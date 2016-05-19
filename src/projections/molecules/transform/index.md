# $transform projection

> Transforms the subject into a new shape

## Signature

**shape** *(Object)* - A description of the new shape in form of a hashmap. If a value is a function, it is assumed that this function takes the subject as its first and only parameter and is then executed alongside the transformation.

**subject** *(Object)* - The object to be transformed

**TYPE SIGNATURES**
```
Object -> Object -> *
(Object, Object) -> *
```

**EXAMPLE**
```js
const myObject = {
	rooms: {
        kitchen: { name: 'Kitchen' },
        living: { name: 'Living Room' }
    },
    people: {
        roomMate1: { name: 'Jane Doe' },
        roomMate2: { name: 'John Schmoe' }
    }
};

//
// Who is where?
//
$transform({
    who: $get('people.roomMate1'),
    where: $get('rooms.living.name')
}, myObject); // returns { who: 'Jane Doe', where: 'Living Room' }

$transform({
    who: $get('people.roomMate2'),
    where: $get('rooms.kitchen.name')
}, myObject); // returns { who: 'John Schmoe', where: 'Kitchen' }
```
