# $count projection

> Counts values in objects, arrays or strings that are addressed by `path`

## Signature

**path** *(String/Array)* - Path to the property, that should be counted

**subject** *(Object)* - The object that contains the requested value

**TYPE SIGNATURES**
```
String -> Object -> Number
(String, Object) -> Number
Array -> Object -> Number
(Array, Object) -> Number
```

**EXAMPLE**
```js
const myObject = {
	rooms: {
		kitchen: {
			refrigerator: [
				'eggs',
				'beer',
				'milk'
			]
		}
	}
};

$count('rooms.kitchen.refrigerator', myObject); // returns 3
```

**IMMUTABLE JS SUPPORT**
*the following types are supported for values targeted by `path`*:
```
Iterable.Indexed
Iterable.Keyed
Iterable.Set
```
