# Migrations

Looking at their last parameter, migrations are always functions of the following form:

```
A -> A
```

Migrations are basically "mutations" on objects. Migrations take an object structure as their last parameter and return a new object of the same shape, but with some mutations performed on it.

* [$add](../src/migrations/atoms/add/index.md)
* [$drop](../src/migrations/atoms/drop/index.md)
* [$override](../src/migrations/atoms/override/index.md)
* [$pop](../src/migrations/atoms/pop/index.md)
* [$remove](../src/migrations/atoms/remove/index.md)
* [$set](../src/migrations/atoms/set/index.md)
* [$shift](../src/migrations/atoms/shift/index.md)
* [$unshift](../src/migrations/atoms/unshift/index.md)
* [$merge](../src/migrations/molecules/merge/index.md)
* [$toggle](../src/migrations/molecules/toggle/index.md)
