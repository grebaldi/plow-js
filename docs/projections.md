# Projections

Looking at their last parameter, projections are always functions of the following form:

```
A -> B
```

With `A` being an object-like or array-like structure and `B` being an arbitrary type. The conclusion of this signature is, that projections cannot be easily composed on data structures, since they reduce their values to a different type.

Projections are needed for any kind of conclusion you want to draw from an object structure (like counting the values inside or simply retrieving them).

## Available projections

* [$get](../src/projections/atoms/get/index.md)
* [$count](../src/projections/atoms/count/index.md)
* [$contains](../src/projections/atoms/contains/index.md)
* [$head](../src/projections/atoms/head/index.md)
* [$tail](../src/projections/atoms/tail/index.md)
* [$last](../src/projections/atoms/last/index.md)
* [$map](../src/projections/atoms/map/index.md)
* [$transform](../src/projections/molecules/transform/index.md)
* [$resolve](../src/projections/molecules/resolve/index.md)
* [$and](../src/projections/atoms/and/index.md)
* [$or](../src/projections/atoms/or/index.md)
* [$not](../src/projections/atoms/not/index.md)
