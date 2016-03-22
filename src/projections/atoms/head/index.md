# $head projection

> Returns the head of a list inside of a structure addressed by `path`

## Signature

**path** *(String/Array)* - Path to the property, that should be counted

**subject** *(Object)* - The object that contains the requested value

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
	rooms: {
		kitchen: {
			refridgerator: [
				'eggs',
				'beer',
				'milk'
			]
		}
	}
};

$head('rooms.kitchen.refridgerator', myObject); // returns 'eggs'
```
