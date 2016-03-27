# Connections

Connections are higher order operations. Looking at their last parameter, they are always functions of the following form:

```
A -> A
```

This looks similar to migrations, with the exception that connections never perform mutations by themselves. They are useful to combine partially applied operations to create a more complex operation.

## Available connections

* [$all](../src/connections/atoms/all/index.md)
* [$summarize](../src/connections/atoms/summarize/index.md)
* [$traverse](../src/connections/atoms/traverse/index.md)
