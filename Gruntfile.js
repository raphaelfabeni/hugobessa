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
                tasks: ['build:dev']
            },
            js: {
                files: ['<%= paths.app %><%= paths.assets %><%= paths.js %>**/*.js'],
                tasks: ['browserify:dev']
            }
        },

        // Browser-sync: sync navigation and file changes
        browserSync: {
            options: {
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
                    watchTask: true,
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
                    watchTask: false,
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

        // Uncss: removes not used css cruft (mostly from inuit)
        uncss: {
            prod: {
                options: {
                    htmlroot: '<%= paths.build.prod %>',
                    report: 'gzip'
                },
                files: {
                    '<%= paths.build.prod %><%= paths.assets %><%= paths.css %>main.css': ['<%= paths.build.prod %>**/*.html']
                }
            }
        },

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

        // Reduce: hard optimization script, including html, js and css
        reduce: {
            root: '<%= paths.build.prod %>',
            outRoot: '<%= paths.build.prod %>',

            include: [
                '**/*.html'
            ],

            autoprefix: [
                '> 1%',
                'last 2 versions',
                'Firefox ESR',
                'Opera 12.1'
            ],

            optimizeImages: false
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
                    cwd: '<%= paths.app %><%= paths.assets %>',
                    src: ['<%= paths.img %>**/*'],
                    dest: '<%= paths.build.dev %><%= paths.assets %>'
                }]
            },
            prod: {
                files: [{
                    expand: true,
                    cwd: '<%= paths.app %><%= paths.assets %>',
                    src: ['<%= paths.img %>**/*'],
                    dest: '<%= paths.build.prod %><%= paths.assets %>'
                }]
            }
        },

        // Browserify: made possible the use of node_modules in the browser
        browserify: {
            dev: {
                files: {
                    '<%= paths.build.dev %><%= paths.assets %><%= paths.js %>app.js': [
                        '<%= paths.app %><%= paths.assets %><%= paths.js %>**/*.js'
                    ]
                }
            },
            prod: {
                files: {
                    '<%= paths.build.prod %><%= paths.assets %><%= paths.js %>app.js': [
                        '<%= paths.app %><%= paths.assets %><%= paths.js %>**/*.js'
                    ]
                }
            }
        },

        // get the contents of secret.json file
        secret: grunt.file.readJSON('secret.json'),

        // Rsync: copy files from local computer to VPS
        rsync: {
            options: {
                args: ['--verbose', '--chmod=Du=rwx,Dgo=rx,Fu=rw,Fgo=r'],
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
        },

        // Pageres: take screenshots of an url
        pageres: {
            prod: {
                options: {
                    url: 'hugobessa.com.br',
                    sizes: ['1024x768'],
                    crop: true,
                    dest: './'
                }
            }
        }
    });

    // complex tasks
    grunt.registerTask('build:dev', [
        'clean:dev',
        'jekyll:dev',
        'sass:dev',
        'browserify:dev',
        'copy:dev'
    ]);

    grunt.registerTask('build:prod', [
        'clean:prod',
        'jekyll:prod',
        'sass:prod',
        'browserify:prod',
        'copy:prod',
        'uncss:prod',
        'imagemin:prod',
        'reduce'
    ]);

    grunt.registerTask('serve:dev', [
        'build:dev',
        'browserSync:dev',
        'watch'
    ]);

    grunt.registerTask('serve:prod', [
        'build:prod',
        'browserSync:prod',
    ]);

    grunt.registerTask('deploy', [
        'build:prod',
        'rsync',
        'pageres'
    ]);

    // default task
    grunt.registerTask('default', ['serve:dev']);
};
