[![Build Status](https://travis-ci.org/grebaldi/plow-js.svg?branch=main)](https://travis-ci.org/grebaldi/plow-js)

# <s>Plow JS</s>

**ARCHIVED:** This repository has been moved here: https://codeberg.org/wbehncke/plow-js

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

## License

The MIT License (MIT)
Copyright (c) 2016 Wilhelm Behncke

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
