# @gxxc/nx-anchor

An NX plugin for running Anchor commands

## Build Executor

Runs the Anchor "build" command

```json filename="project.json"
{
  ...
  "targets": {
    "build": {
      "executor": "@gxxc/nx-anchor:build"
    }
  }
}
```

Then, from the root of your nx project:
```
> nx build <project-name>
```

## Test Executor

Runs the Anchor "test" command

```json filename="project.json"
{
  ...
  "targets": {
    "test": {
      "executor": "@gxxc/nx-anchor:test"
    }
  }
}
```

Then, from the root of your nx project:
```
> nx test <project-name>
```

## TODO

This just runs simple build and test commands, with no arguments. Eventually, it should support more commands + passing in arguments.