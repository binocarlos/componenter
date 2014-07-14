var tape = require('tape')
var Componenter = require('./')
var path = require('path')
var fs = require('fs')

tape('install / build a new project', function(t){

	var projectSource = path.normalize(__dirname + '/test/project')
	var project = Componenter(projectSource)

	project(true, function(err){

		if(err){
			t.fail(err, 'run')
			t.end()
			return
		}
		else{

			t.ok(fs.existsSync(path.join(projectSource, 'components')), 'src components')
			t.ok(fs.existsSync(path.join(projectSource, 'build')), 'src build')

			t.end()
		}
	})

})