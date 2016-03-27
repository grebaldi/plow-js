# Effects

Looking at their last parameter, effects are always functions of the following form:

```
id -> id
```

This means they get an object and will always return this very same, unaltered object. Alongside that, they'll perform some operations that's independent from the object itself, like logging to console. This becomes useful, when you're using functional composition, since you don't have access to the control flow of the resulting functions.

## Available effects

* [$log](../src/effects/atoms/log/index.md)
