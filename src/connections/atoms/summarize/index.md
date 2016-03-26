# $summarize connection

> Passes the results of all functions in the first parameter to the finisher function and returns
> the finishers result

## Signature

**operations** *(Array)* - Multiple functions that take `subject` as their first and only argument

**finisher** *(Function)* - A function that takes the results of all operations as parameters

**subject** *(Object)* - An object to operate on

**TYPE SIGNATURES**
```
Array -> Function -> Object -> *
(Array, Function) -> Object -> *
(Array, Function, Object) -> *
```

**EXAMPLE**
```js
const myObject = {
	bugs: ['nasty', 'tricky', 'ugly', 'crazy'],
    beersInTheFrige: ['light', 'dark', 'lager']
};

$summarize(
    [
        $count('bugs'),
        $count('beersInTheFrige'),
    ],
    (numberOfBugs, numberOfBeers) =>
        numberOfBugs > numberOfBeers ?
        console.log('You\'ve got a problem!') :
        console.log('You\'re fine.'),
    myObject
); // logs "You've got a problem!"
```
