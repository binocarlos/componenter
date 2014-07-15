componenter
===========

Install and build components programatically

## install

```
$ npm install componenter
```

## usage

Componenter will install and build components for you in one hit

```js
var Componenter = require('componenter')
var project = Componenter('/my/project')

// this will remove existing components/build folder for a fresh install
project(true, function(err){

	// /my/project/components and /my/project/build now exists
})
```

You can use the 'install' and 'build' functions seperately:

```js
// this will not remove the old components folder
project.install(function(err){

	// this will remove the old build folder
	project.build(true, function(err){

	})
})
```

## api

#### `var project = Componenter(folderPath)`

Create a new project by passing a folder path and the folder contains a component.json

#### `project(autoRemove)`

Run project.install then project.build - autoRemove will delete folders before each step

#### `project.install(autoRemove)`

Run `component install` in the project folder - autoRemove will remove the components folder and result in a fresh install (i.e. pulling the latest components from github)

#### `project.build(autoRemove)`

Run `component build` in the project folder - autoRemove will remove the build folder

## licence
MIT

