<%= projectName %> [![Build Status](https://travis-ci.org/<%= githubUsername %>/<%= projectName %>.svg)](https://travis-ci.org/<%= githubUsername %>/<%= projectName %>)[![devDependency Status](https://david-dm.org/<%= githubUsername %>/<%= projectName %>/dev-status.svg)](https://david-dm.org/<%= githubUsername %>/<%= projectName %>#info=devDependencies)
===========================================================================================================================================

<%= projectDescription %>

Demo: http://<%= githubUsername %>.github.io/<%= projectName %>

### Installation

Using bower:

```
$ bower install <%= projectName %>
```

Using npm:

```
$ npm install <%= projectName %>
```


### How to use it

You should already have angular script referenced. If not, add it:

```
<script type="text/javascript" src="angular.min.js"></script>
```

to the list above, you should add:

```
<script type="text/javascript" src="<%= projectName %>.min.js"></script>
```

Then, inject `<%= ngModuleName %>` in your application module:

```
angular.module('myApp', ['<%= ngModuleName %>']);
```

and then just add an `<%= ngDirectiveName %>` tag:

```
<<%= ngDirectiveName %>></<%= ngDirectiveName %>>
```

### Implemented features so far

* `option1` : description1
* `option2` : description2
* `reminder` : atfer how many hours should the message reappear: 0 = show all the time
* ...

Example with some above features:

```
<<%= ngDirectiveName %>  
 option1="value1"
 option2="value2"
 ...
</<%= ngDirectiveName %>>
```

### Features to be implemented:



### Build

You can run the tests by cloning the repo and then (inside the project folder) running

```
$ npm install
$ bower install
$ grunt watch
```

assuming you already have `grunt` installed, otherwise you also need to do:

```
$ npm install -g grunt-cli
```

### License

Copyright (c) <%%= grunt.template.today("yyyy") %> <%= authorName %>. Licensed under the MIT License (MIT)


### Thanks To



