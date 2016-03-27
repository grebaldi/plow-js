# $log effect

> Logs and returns the `subject`

## Signature

**path** *(Object)* - An optional path to the value, that should be logged. If empty the entire `subject` gets logged

**subject** *(Object)* - An object to operate on

**TYPE SIGNATURES**
```
String -> Object -> Object
(String, Object) -> Object
Object -> Object
```

**EXAMPLE**
```js
const myObject = {
	allBugsFixed: false,
    itemsInTheFrige: ['eggs', 'milk']
};

//
// Awesomize the situation
//
$all(
    $toggle('allBugsFixed'),
    $add('itemsInTheFrige', 'beer'),
    $log,
    myObject
);
// logs and returns {
//     allBugsFixed: true,
//     itemsInTheFrige: ['eggs', 'milk', 'beer']
// }
```
