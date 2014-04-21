module.exports = function (grunt) {
    'use strict';

    // Force use of Unix newlines
    grunt.util.linefeed = '\n';

    grunt.initConfig({

        'clean': {
            'dist': ['dist']
        },

        'copy': {
            'js': {
                'src': 'js/*',
                'dest': 'dist/'
            }
        },

        'less': {
            compileCore: {
                options: {
                },
                files: {
                    'dist/css/dropdowns-enhancement.css': 'less/dropdowns-enhancement.less'
                }
            },
            minify: {
                options: {
                    cleancss: true
                },
                files: {
                    'dist/css/dropdowns-enhancement.min.css': 'dist/css/dropdowns-enhancement.css'
                }
            }
        },

        'gh-pages': {
            options: {
                base: 'docs',
                message: 'Auto-generated gh-pages'
            },
            src: '**/*'
        }
    });

    // These plugins provide necessary tasks.
    require('load-grunt-tasks')(grunt, {scope: 'devDependencies'});

    grunt.registerTask('dist', ['clean', 'copy', 'less']);
    grunt.registerTask('pages', 'gh-pages');
};