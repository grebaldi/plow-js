# Getting started

## What is Plow JS?

Plow JS aims to be a collection of general, useful functional operations for the handling of complex object structures. It is designed for use with redux and reselect, because these patterns/libraries embrace the idea of a single store to centralize application state. But Plow JS is abstracted far enough to be used in other scenarios as well.

With its functional approach it is a good fit for any functional application design. In those environments it helps to keep your code readable and won't break your own functional approaches.

## General principles

Plow JS's API tries to embrace general functional principles. To better understand these ideas, you can have a look at the [mostly adequate guide to functional programming](https://drboolean.gitbooks.io/mostly-adequate-guide/content/). There you'll find the basics to *pure functions*, *currying*, *functional composition* and the *Hindley-Milner type system*.

This documentation contains a lot of Hindley-Milneresque type signatures, so it is strongly recommended to read about that first ;)

### Nomenclature

It turned out to be reasonable to roughly categorize operations by their type signature. There are 4 major types of operations, that Plow JS exposes:

* [Projections](projections.md)
* [Migrations](migrations.md)
* [Connections](connections.md)
* [Effects](effects.md)

All of which are explained in their own chapters.

### Curryied API

Each operation in Plow JS can optionally be *partially applied*. An example for this behavior:

```js
$get('some.path', myObject);
```

could also be called like:

```js
$get('some.path')(myObject);
```

This allows for the creation of partially applied functions like this one:

```js
const getValueAtSomePath = $get('some.path');
```

`getValueAtSomePath` could now be used with any object as its first parameter.

### Normalized behavior

At many points JavaScript `objects` lack support of basic array operations (like `map`, `filter` and things alike). Plow JS provides a unified interface and applies the expected behavior to both `arrays` and `objects`.

### Immutable JS support (DEPRECATED)

<s>Besides operations on native JavaScript data structures, Plow JS also supports the use of [Immutable JS](http://facebook.github.io/immutable-js/), a library for immutable data structures in JavaScript, developed and published by facebook.

Plow JS uses duck typing to distinguish between native JS and Immutable JS, so the latter is no dependency for Plow JS itself. You don't need to use Immutable JS, however it is recommended to do so, the more complex your data becomes (since Immutable JS is much better at optimization).</s>

> **WARNING:** Immutable JS support is deprecated. It will be removed entirely with the next major version of Plow JS (which will be 4.0.0). Until then, 
support for Immutable JS versions below (but not including) v4 - though discouraged - continues to work. 
