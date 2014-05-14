'use-strict';
module.exports = function(grunt) {

    // Load'em all!
    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

    grunt.initConfig({

        // Project paths
        paths: {
            app:    'app/',
            assets: '_assets/',
            build: {
                dev: '.dev/',
                prod: 'dist/'
            },
            fonts:  'fonts/',
            sass:   '_scss/',
            img:    'images/',
            css:    'css/',
            js:     'js/'
        },

        // Watch: trigger tasks on file changes/add
        watch: {
            options: {
                nospawn: true,
                livereload: false,
            },
            sass: {
                files: ['<%= paths.app %><%= paths.assets %><%= paths.sass %>**/*.{scss,sass}'],
                tasks: ['sass:dev']
            },
            jekyll: {
                files: '<%= paths.app %>**/*.{html,md}',
                tasks: ['buildDev']
            }
        },

        // Browser-sync: sync navigation and file changes
        browser_sync: {
            options: {
                watchTask: true,
                reloadDelay: 1000,

                ghostMode: {
                    scroll: true,
                    links: true,
                    forms: true,
                    clicks: true
                }
            },
            dev: {
                bsFiles: {
                    src: [
                        '<%= paths.build.dev %><%= paths.assets %><%= paths.css %>**/*.css',
                        '<%= paths.build.dev %><%= paths.assets %><%= paths.img %>**/*.{png,jpg,gif}',
                        '<%= paths.build.dev %><%= paths.assets %><%= paths.js %>**/*.js',
                        '<%= paths.build.dev %>**/*.html'
                    ]
                },
                options: {
                    server: {
                        baseDir: '<%= paths.build.dev %>'
                    }
                }
            },
            prod:{
                bsFiles: {
                    src: [
                        '<%= paths.build.prod %><%= paths.css %>**/*.css',
                        '<%= paths.build.prod %><%= paths.img %>**/*.{png,jpg,gif}',
                        '<%= paths.build.prod %><%= paths.js %>**/*.js',
                        '<%= paths.build.prod %>**/*.html'
                    ],
                },
                options: {
                    server: {
                        baseDir: '<%= paths.build.prod %>'
                    }
                }
            }
        },

        // Sass: compiles SCSS files
        sass: {
            dev: {
                cwd: '<%= paths.app %><%= paths.assets %><%= paths.sass %>',
                src: '**/*.scss',
                ext: '.css',
                expand: true,
                dest: '<%= paths.build.dev %><%= paths.assets %><%= paths.css %>'
            },
            prod: {
                options: {
                    outputStyle: 'compressed'
                },
                cwd: '<%= paths.app %><%= paths.assets %><%= paths.sass %>',
                src: '**/*.scss',
                ext: '.css',
                expand: true,
                dest: '<%= paths.build.prod %><%= paths.assets %><%= paths.css %>'
            }
        },

        // Jekyll: generates the blog
        jekyll: {
            options: {
                src: '<%= paths.app %>',
                bundleExec: true,
                keep_files: ['_assets/*']
            },
            dev: {
                options: {
                    dest: '<%= paths.build.dev %>',
                    config: '_config.yml'
                    // drafts: true,
                }
            },
            prod: {
                options: {
                    dest: '<%= paths.build.prod %>',
                    config: ['_config.yml', '_config.build.yml']
                }
            }
        },

        // Imagemin: optimizes images
        imagemin: {
            prod: {
                options: {
                    optimizationLevel: 7,
                    progressive: true
                },
                files: [{
                    expand: true,
                    cwd: '<%= paths.app %><%= paths.assets %><%= paths.img %>',
                    src: '**/*.{png,jpg,gif}',
                    dest: '<%= paths.build.prod %><%= paths.assets %><%= paths.img %>'
                }]
            }
        },

        // Clean: remove files from folder
        clean: {
            dev: ['<%= paths.build.dev %>'],
            prod: ['<%= paths.build.prod %>']
        },

        // Copy: copy files from a folder to another folder
        copy: {
            dev: {
                files: [{
                    expand: true,
                    cwd: '<%= paths.app %><%= paths.assets %><%= paths.img %>',
                    src: ['**'],
                    dest: '<%= paths.build.dev %><%= paths.assets %><%= paths.img %>'
                }]
            },
            prod: {
                files: [{
                    expand: true,
                    cwd: '<%= paths.app %><%= paths.assets %><%= paths.img %>',
                    src: ['**'],
                    dest: '<%= paths.build.prod %><%= paths.assets %><%= paths.img %>'
                }]
            }
        },

        // get the contents of secret.json file
        secret: grunt.file.readJSON('secret.json'),

        // Rsync: copy files from local computer to VPS
        rsync: {
            options: {
                args: ['--verbose'],
                recursive: true,
                compareMode: 'checksum'
            },
            dist: {
                options: {
                    src: '<%= paths.build.prod %>',
                    dest: '<%= secret.path %>',
                    host: '<%= secret.username %>@<%= secret.host %>'
                }
            }
        }
    });

    // complex tasks
    grunt.registerTask('buildDev', [
        'clean:dev',
        'jekyll:dev',
        'sass:dev',
        'copy:dev'
    ]);

    grunt.registerTask('build', [
        'clean:prod',
        'jekyll:prod',
        'sass:prod',
        'copy:prod',
        'imagemin:prod'
    ]);

    grunt.registerTask('serve', [
        'buildDev',
        'browser_sync:dev',
        'watch'
    ]);

    grunt.registerTask('deploy', [
        'build',
        'rsync'
    ]);

    // default task
    grunt.registerTask('default', ['serve']);
};
