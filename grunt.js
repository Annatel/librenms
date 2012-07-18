/*global module:false*/
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: '<json:package.json>',
    meta: {
      banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
        '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
        '<%= pkg.homepage ? "* " + pkg.homepage + "\n" : "" %>' +
        '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
        ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */'
    },
    concat: {
      dist_js: {
        src: ['<banner:meta.banner>', '<file_strip_banner:src/jquery.coords.js>', '<file_strip_banner:src/jquery.collision.js>', '<file_strip_banner:src/<%= pkg.name %>.js>'],
        dest: 'dist/<%= pkg.name %>.js'
      },
      dist_css: {
        src: ['<banner:meta.banner>', 'src/<%= pkg.name %>.css'],
        dest: 'dist/<%= pkg.name %>.css'
      }
    },
    min: {
      dist: {
        src: ['<banner:meta.banner>', '<config:concat.dist_js.dest>'],
        dest: 'dist/<%= pkg.name %>.min.js'
      }
    },
    mincss: {
      compress: {
        files: {
          "dist/<%= pkg.name %>.min.css": ["dist/<%= pkg.name %>.css"]
        }
      }
    },
    qunit: {
      files: ['test/**/*.html']
    },
    lint: {
      files: ['grunt.js', 'src/**/*.js', 'test/**/*.js']
    },
    watch: {
      files: ['<config:lint.files>', 'src/<%= pkg.name %>.css'],
      tasks: 'lint concat'
    },
    jshint: {
      options: {
        curly: true,
        eqeqeq: true,
        immed: true,
        latedef: true,
        newcap: true,
        noarg: true,
        sub: true,
        undef: true,
        boss: true,
        eqnull: true,
        browser: true
      },
      globals: {
        jQuery: true
      }
    },
    uglify: {},
    yuidoc: {
      compile: {
        "name": '<%= pkg.title || pkg.name %>',
        "description": '<%= pkg.description %>',
        "version": '<%= pkg.version %>',
        "url": '<%= pkg.homepage %>',
        "logo": 'http://ducksboard.com/wp-content/themes/blog-theme-ducksboard/images/ducksboard.png',
        options: {
          paths: "src/",
          outdir: "docs/"
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib');

  // Default task.
  grunt.registerTask('default', 'lint qunit concat min mincss');

};
