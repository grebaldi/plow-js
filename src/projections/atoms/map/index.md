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


**IMMUTABLE JS SUPPORT**
*the following types are supported for values targeted by `path`*:
```
Iterable.Indexed
Iterable.Keyed
Iterable.Set
```
