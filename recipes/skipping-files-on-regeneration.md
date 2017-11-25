# How to skip certain files/folders when re-launching the generator?

Since version [4.0.0](https://github.com/tinesoft/generator-ngx-library/releases/tag/v4.0.0) of the generator, it is now possible to skip certain existing files from being overwritten (or even flagged as in-conflict) when re-running the generator (after a new release for example).

This is very useful when you don't want to update them, no matter what may have changed in the incoming versions of these files.

To achieve this, nothing simpler:

1. - open the `yo-rc.json` configuration file
2. - add the files/folders you want to exclude (glob patterns are supported) relatively to project's root folder:
```
{
...
    "exclusions":[
        "config/*", // all files in this folder will be ignored
        "demo/src/app/home/home.module.ts" // only this file will be skipped
    ]
}
```

The generator now remembers the skip options you've provided (`--skip-demo`, `--skip-styles`, `--skip-travis`) when creating your project, and automatically add the related files to exclude.