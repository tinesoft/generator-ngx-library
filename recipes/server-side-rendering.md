# How to test if your library is compatible for Universal (server side) rendering?

First, make sure you followed the [guidelines](https://github.com/angular/universal-starter#universal-gotchas) explained here, in order to make your library universal-compatible.

Then, to test:

1- `gulp build` -> builds your library locally to `dist/`
2- `gulp build:demo-ssr`-> builds the integrated demo (that consumes your library in `dist/` via npm link) with Universal support.

If Step 2 produces no error, then congratulations! Your library will not break the Server Side Rendering.
