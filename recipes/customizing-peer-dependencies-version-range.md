# How to customize the version range for peerDependencies in packaged library?

Dependencies in your library's `package.json` are transformed into `peerDependencies` when packaging the library for distribution, so that final users can specify which exact compatible version they want to use.
By default, these peerDependencies have a version range set to '^' (i.e `^2.0.0` matches 2.x.x which means that any major version bump will not match).

If you want to change the default version range to use, simply:

1. - open the `yo-rc.json` configuration file
2. - edit value for `"dependenciesRange"` to whatever range you want/
```
{
...
    "dependenciesRange": ">=" // can be '^' (default), '~', '>', '>=', ...
}
```
3. - relaunch the generator: `yo ngx-library`