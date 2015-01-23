/*
 * grunt-upx
 * https://github.com/pirumpi/grunt-upx
 *
 * Copyright (c) 2015 Carlos Martin
 * Licensed under the MIT license.
 */

'use strict';

var exec = require('child_process').exec;
var fs = require('fs');
var path = require('path');
var upx = path.resolve('tasks', 'bin', 'upx.exe');

module.exports = function(grunt) {

  // Please see the Grunt documentation for more information regarding task
  // creation: http://gruntjs.com/creating-tasks

  grunt.registerMultiTask('upx', 'By using upx.exe this plugin is able to compress executables files up to 85% of their original size.', function() {
    // Merge task-specific and/or target-specific options with these defaults.
    var done = this.async();
    var options = this.options({
      speed: 3,
      args: ''
    });
    var data = this.data;
    var fileList = [];
    var destFolder = data.files.dest ? path.resolve(data.files.dest) : null;

    function error(str, grunt, done) {
      grunt.log.write(str);
      done(false);
    }

    var compressFiles = function(done, options, grunt){
      if(fileList.length){
        var file = fileList.shift();
        grunt.log.writeln('compressing ' + file);
        exec(upx + options.args + ' -' + options.speed + ' ' + file, function(err, stdout, stderr){
          if(!err){
            compressFiles(done, options, grunt);
            grunt.log.write(stdout);
          }else{
            error(err, grunt, done);
          }
        });
      }else{
        done(true);
      }
    };

    if(destFolder !== null){
      fs.exists(destFolder, function(exist){
        if(!exist){
          fs.mkdir(destFolder, function(err){
            if(!err){
              grunt.event.emit('folderChecked');
            }
            grunt.log.writeln('folder created');
          });
        }else{
          grunt.event.emit('folderChecked');
          grunt.log.writeln('folder created');
        }
      });
    }else{
      grunt.event.emit('folderChecked');
      grunt.log.writeln('no destination folder found');
    }


    grunt.event.once('folderChecked',function(){
      data.files.src.forEach(function(f){
        if(destFolder !== null){
          var movedFile = path.resolve(destFolder, path.basename(f));
          fs.writeFileSync(movedFile, fs.readFileSync(f));
          fileList.push(movedFile);
        }else{
          fileList.push(f);
        }

        grunt.log.writeln('file copied');
      });
      grunt.event.emit('filesCreated');
    });

    grunt.event.once('filesCreated', function(){
      compressFiles(done, options, grunt);
    });

  });

};
