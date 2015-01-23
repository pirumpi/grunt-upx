# grunt-upx

> By using upx.exe this plugin is able to compress executables files up to 85% of their original size.

## Getting Started
This plugin requires Grunt `~0.4.5`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-upx --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-upx');
```

## The "upx" task

### Overview
In your project's Gruntfile, add a section named `upx` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  upx: {
    default_options: {
      options: {
        speed: 9,
        agrs: ' --compress-icons=0'
      },
      files: {
        src: ['test/file.exe'],
        dest: 'test/dist'
      }
    }
  }
});
```

### Options

#### options.speed
Type: `integer`
Default value: 3

This represent the speed and compression type, 1 being the faster and less compress.

#### options.ags
Type: `String`
Default value: `none`

You can pass any extra arguments available in [upx](http://linux.die.net/man/1/upx)

### Usage Examples

#### Default Options
In this example, the default options are used to compress executable in a folder and then send to a distibution folder. If you want to keep the executables in the same folder, just remove the destination folder.

```js
grunt.initConfig({
  upx: {
    options: {
      speed: 8
    },
    files: {
      src: ['test/file.exe'],
      dest: 'test/dist'
    }
  }
});
```

#### Custom Options
In this example, custom options are used get the best compression and create a backup file of the executable while keeping it in the same folder.

```js
grunt.initConfig({
  upx: {
    options: {
      speed: 9,
      args ' -k'
    },
    files: {
      src: ['test/file.exe']
    }
  }
});
```
