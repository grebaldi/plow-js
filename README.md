# Plow JS

> Functional operations on large immutable objects

## Why?

Technologies like redux and Flux embrace the idea of a central immutable state object. Immutability brings a lot of benefits, especially regarding predictability and memory usage.

But it can be a rather daunting task to handle those objects in a readable fashion. When you're just trying to change a value deep inside an object structure while keeping the structure immutable, you can end up having code like this:

```js
return Object.assign(
    {},
    state,
    {
        someProperty: Object.assign(
            {},
            state.someProperty,
            {
                someDeeperProperty: 'someValue'
            }
        )
    }
);
```

Of course, you want a function for that.

Immutable already does a great job on providing functions for these situation. But it does that in a rather OOP style and also binds you to a non-Standard API for data structures.

Plow JS is aiming to fill the remaining gap with functional operations, that allow you to process large state objects in a clear and declarative way.

## Installation

You can install Plow JS via npm:

```sh
npm install plow-js
```

## Example

Given the following object:

```js
const state = {
    rooms: {
        kitchen: {
            light: 'off',
            door: 'closed',
            refrigerator: ['beer']
        },
        living: {
            tv: 'off'
        }
    }
}
```

Plow JS allows you to open the kitchen door and turn the light on as follows:


```js
const newState = $merge('rooms.kitchen', {
    light: 'on',
    door: 'open'
}, state);
```

Well that was easy... Now let's grab a beer, turn the light off and the TV on:

```js
const beer = $head('rooms.kitchen.refrigerator', state);
const newState = $all(
    $set('rooms.kitchen.refrigerator', []),
    $set('rooms.kitchen.light', 'off'),
    $set('rooms.living.tv', 'on'),
    state
);
```
