<% if(!skipDemo) {%><p align="center">
  <img height="256px" width="256px" style="text-align: center;" src="https://cdn.rawgit.com/<%= githubUsername %>/<%= githubRepoName %>/master/demo/src/assets/logo.svg">
</p>

<% } %># <%= githubRepoName %> - <%= projectDescription %>

[![npm version](https://badge.fury.io/js/<%= githubRepoName %>.svg)](https://badge.fury.io/js/<%= githubRepoName %>)<% if(!skipTravis) {%>,
[![Build Status](https://travis-ci.org/<%= githubUsername %>/<%= githubRepoName %>.svg?branch=master)](https://travis-ci.org/<%= githubUsername %>/<%= githubRepoName %>)<% } if(!skipCoveralls) { %>
[![Coverage Status](https://coveralls.io/repos/github/<%= githubUsername %>/<%= githubRepoName %>/badge.svg?branch=master)](https://coveralls.io/github/<%= githubUsername %>/<%= githubRepoName %>?branch=master)<% } %>
[![dependency Status](https://david-dm.org/<%= githubUsername %>/<%= githubRepoName %>/status.svg)](https://david-dm.org/<%= githubUsername %>/<%= githubRepoName %>)
[![devDependency Status](https://david-dm.org/<%= githubUsername %>/<%= githubRepoName %>/dev-status.svg?branch=master)](https://david-dm.org/<%= githubUsername %>/<%= githubRepoName %>#info=devDependencies)<% if(useGreenkeeper){%>
[![Greenkeeper Badge](https://badges.greenkeeper.io/<%= githubUsername %>/<%= githubRepoName %>.svg)](https://greenkeeper.io/)<% } %>

## Demo

View all the directives in action at https://<%= githubUsername %>.github.io/<%= githubRepoName %>

## Dependencies
* [Angular](https://angular.io) (*requires* Angular 2 or higher, tested with 2.0.0)

## Installation
Install above dependencies via *npm*. 

Now install `<%= projectName %>` via:
```shell
npm install --save <%= projectName %>
```

---
##### SystemJS
>**Note**:If you are using `SystemJS`, you should adjust your configuration to point to the UMD bundle.
In your systemjs config file, `map` needs to tell the System loader where to look for `<%= projectName %>`:
```js
map: {
  '<%= projectName %>': 'node_modules/<%= projectName %>/bundles/<%= unscopedProjectName %>.umd.js',
}
```
---

Once installed you need to import the main module:
```js
import { LibModule } from '<%= projectName %>';
```
The only remaining part is to list the imported module in your application module. The exact method will be slightly
different for the root (top-level) module for which you should end up with the code similar to (notice ` LibModule .forRoot()`):
```js
import { LibModule } from '<%= projectName %>';

@NgModule({
  declarations: [AppComponent, ...],
  imports: [LibModule.forRoot(), ...],  
  bootstrap: [AppComponent]
})
export class AppModule {
}
```

Other modules in your application can simply import ` LibModule `:

```js
import { LibModule } from '<%= projectName %>';

@NgModule({
  declarations: [OtherComponent, ...],
  imports: [LibModule, ...], 
})
export class OtherModule {
}
```

## Usage



## License

Copyright (c) <%= today.getFullYear() %> <%= authorName %>. Licensed under the MIT License (MIT)

