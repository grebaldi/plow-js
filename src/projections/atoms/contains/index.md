# $contains projection

> Checks if a structure contains an item at the position addressed by `path`

## Signature

**value** *(Any)* - The value to search for

**path** *(String/Array)* - Path to the property to search in

**subject** *(Object)* - The object that contains the requested value

**TYPE SIGNATURES**
```
* -> String -> Object -> Boolean
(*, String) -> Object -> Boolean
(*, String, Object) -> Boolean
* -> Array -> Object -> Boolean
(*, Array) -> Object -> Boolean
(*, Array, Object) -> Boolean
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

$contains('beer', 'rooms.kitchen.refrigerator', myObject); // returns true
$contains('wine', 'rooms.kitchen.refrigerator', myObject); // returns false
```
