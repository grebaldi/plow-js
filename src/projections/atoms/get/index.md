# $get projection

> Returns a value from an object structure, addressed by `path`

## Signature

**path** *(String/Array)* - Path to the property, that should be retrieved

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
			refrigerator: [
				'eggs',
				'beer',
				'milk'
			]
		}
	}
};

$get('rooms.kitchen.refrigerator.1', myObject); // returns 'beer'
```
