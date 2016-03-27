# $toggle migration


> Performs different toggle mechanisms, depending on what type lies behind
> `path` in `subject`.

> **1. Boolean:** Will turn true to false and false to true

> **2. Array:** Will add a value if not present and remove it otherwise

> **3. Other:** Will set the target to value if it doesn't equal value or to fallback otherwise. If fallback is not set,
>           it will be replaced by a type-dependent empty value


## Signature

**path** *(String/Array)* - The path to the item, that should be toggled

**value** *(Any)* - An optional value, to determine the toggle operation on. In case `path` leads to an array, `$toggle` will check, if that array contains `value` and remove it, if it's there or add it otherwise. In case `path` leads to a string for example, `$toggle` will set the that string to `fallback` or an empty string, if it equals `value`. In case `path` leads to a `boolean` value, `value` is not available.

**fallback** *(Any)* - An optional fallback for the non-array and non-boolean toggle types.

**subject** *(Object)* - The object that contains the item, that should be toggled

**TYPE SIGNATURES**
```
String -> Object -> Object !!!(when first parameter leads to Boolean)
(String, Object) -> Object !!!(when first parameter leads to Boolean)
String -> * -> Object -> Object
(String, *) -> Object -> Object
(String, *, Object) -> Object
String -> * -> * -> Object -> Object
(String, *) -> * -> Object -> Object
(String, *, *) -> Object -> Object
(String, *, *, Object) -> Object
Array -> Object -> Object !!!(when first parameter leads to Boolean)
(Array, Object) -> Object !!!(when first parameter leads to Boolean)
Array -> * -> Object -> Object
(Array, *) -> Object -> Object
(Array, *, Object) -> Object
Array -> * -> * -> Object -> Object
(Array, *) -> * -> Object -> Object
(Array, *, *) -> Object -> Object
(Array, *, *, Object) -> Object
```

**EXAMPLE (boolean)**
```js
const myObject = {
    lightIsOn: false
};

$toggle('lightIsOn', myObject); // returns { lightIsOn: true }
```

**EXAMPLE (array)**
```js
const myObject = {
    itemsInTheFrige: ['eggs', 'beer', 'milk']
};

const withoutBeer = $toggle('itemsInTheFrige', 'beer', myObject); // returns { itemsInTheFrige: ['eggs', 'milk'] }
$toggle('itemsInTheFrige', 'beer', withoutBeer); // returns { itemsInTheFrige: ['eggs', 'milk', 'beer'] }
```

**EXAMPLE (string)**
```js
const myObject = {
    kitchenDutyToday: 'John Schmoe'
};

$toggle('kitchenDutyToday', 'John Schmoe', myObject); // returns { kitchenDutyToday: '' }
const jane = $toggle('kitchenDutyToday', 'John Schmoe', 'Jane Doe', myObject); // returns { kitchenDutyToday: 'Jane Doe' }
$toggle('kitchenDutyToday', 'John Schmoe', 'Jane Doe', jane); // returns { kitchenDutyToday: 'John Schmoe' }
```

**IMMUTABLE JS SUPPORT**
*the following types are supported for values targeted by `path`*:
```
List
Set
OrderedSet
```
