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

**IMMUTABLE JS SUPPORT (DEPRECATED)**

> **WARNING:** Immutable JS support is deprecated. It will be removed entirely with the next major version of Plow JS (which will be 4.0.0). Until then, 
support for Immutable JS versions below (but not including) v4 - though discouraged - continues to work.

<s>*the following types are supported for values targeted by `path`*:
```
Iterable.Indexed
Iterable.Keyed
```
</s>
