# $map projection

>Returns a structure of values in `subject`, addressed by a property path or a mapper function

## Signature

**mapper** *(String/Function)* - If string, map to a child/grandchild at that path, if function, map by that function

**path** *(String/Array)* - Path to the list

**subject** *(Object)* - The object that contains the requested value

**TYPE SIGNATURES**
```
String -> String -> Object -> *
(String, String) -> Object -> *
Array -> String -> Object -> *
(Array, String) -> Object -> *
(* -> *) -> String -> Object -> *
(* -> *, String) -> Object -> *
(String, String, Object) -> *
(Array, String, Object) -> *
(* -> *, String, Object) -> *
String -> Array -> Object -> *
(String, Array) -> Object -> *
Array -> Array -> Object -> *
(Array, Array) -> Object -> *
(* -> *) -> Array -> Object -> *
(* -> *, Array) -> Object -> *
(String, Array, Object) -> *
(Array, Array, Object) -> *
(* -> *, Array, Object) -> *
```

**EXAMPLE**
```js
const myObject = {
	rooms: {
		living: {name: 'Living Room'},
        kitchen: {name: 'Kitchen'},
        bath: {name: 'Bathroom'}
	},
    randomList: [1, 2, 3, 4]
};

$map('name', 'rooms', myObject); // returns {living: 'Living Room', kitchen: 'Kitchen', bath: 'Bathroom'}
$map(x => x*2, 'randomList', myObject); // returns [2, 4, 6, 8]
```


**IMMUTABLE JS SUPPORT (DEPRECATED)**

> **WARNING:** Immutable JS support is deprecated. It will be removed entirely with the next major version of Plow JS (which will be 4.0.0). Until then, 
support for Immutable JS versions below (but not including) v4 - though discouraged - continues to work.

<s>*the following types are supported for values targeted by `path`*:
```
Iterable.Indexed
Iterable.Keyed
Iterable.Set
```
</s>
