# $resolve projection

> Returns a value from an object structure, addressed by a path that is a value within the same object. The behavior of this function is somewhat comparable to pointers.

## Signature

**pointer** *(Object)* - The path to the property inside of `subject`, that contains another path inside of `subject`, that leads to the resulting value

**subject** *(Object)* - The object containing the requested value

**TYPE SIGNATURES**
```
String -> Object -> *
(String, Object) -> *
Array -> Object -> *
(Array, Object) -> *
```

**EXAMPLE**
```js
const myObject = {
	hasKitchenDuty: 'people.roomMate2',
    people: {
        roomMate1: { name: 'Jane Doe' },
        roomMate2: { name: 'John Schmoe' }
    }
};

//
// Who has kitchen duty?
//
$resolve('hasKitchenDuty', myObject); // returns { name: 'John Schmoe' }
```

**IMMUTABLE JS SUPPORT (DEPRECATED)**

> **WARNING:** Immutable JS support is deprecated. It will be removed entirely with the next major version of Plow JS (which will be 4.0.0). Until then, 
support for Immutable JS versions below (but not including) v4 - though discouraged - continues to work.

<s>*the following types are supported for values targeted by `path`*:
```
Iterable.Indexed
Iterable.Keyed
```
</s>
