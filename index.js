var fs = require('fs')
var wrench = require('wrench')
var cp = require('child_process')
var path = require('path')

var osx = /darwin/.test(process.platform)

function installComponent(folder, autoRemove, done){
	
	if(!fs.existsSync(path.join(folder, 'component.json'))){
		return done('component.json does not exist')
	}

	if(autoRemove){
		wrench.rmdirSyncRecursive(folder + '/components', true)
	}

	var args = [
		path.resolve(__dirname + '/node_modules/component/bin/component-install'),
		'-v'
	]

	var install = cp.spawn('node', args, {
		stdio:'inherit',
		cwd:folder
	})
	install.on('error', done)
	install.on('close', done)
}

function buildComponent(folder, autoRemove, done){
	if(!fs.existsSync(path.join(folder, 'component.json'))){
		return done('component.json does not exist')
	}

	if(autoRemove){
		wrench.rmdirSyncRecursive(folder + '/build', true)
	}

	var args = [
		path.resolve(__dirname + '/node_modules/component/bin/component-build'),
		'-v'
	]

	if(!osx){
		args.push('-c')
	}

	var install = cp.spawn('node', args, {
		stdio:'inherit',
		cwd:folder
	})
	install.on('error', done)
	install.on('close', done)
}

module.exports = function(path){

	function install(autoRemove, done){
		if(!done){
			done = autoRemove
			autoRemove = false
		}
		return installComponent(path, autoRemove, done)
	}

	function build(autoRemove, done){
		if(!done){
			done = autoRemove
			autoRemove = false
		}
		return buildComponent(path, autoRemove, done)
	}

	function make(autoRemove, done){
		if(!done){
			done = autoRemove
			autoRemove = false
		}
		install(autoRemove, function(err){
			if(err) return done(err)
			build(autoRemove, done)
		})
	}

	make.install = install
	make.build = build

	return make
}