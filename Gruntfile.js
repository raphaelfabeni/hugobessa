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

        surgeConfig: {
            domains: {
                prod: 'https://www.hugobessa.com.br',
                develop: 'develop.hugobessa.com.br'
            }
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
                    clicks: true,
                    location: true
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
                dest: '<%= paths.build.dev %><%= paths.assets %><%= paths.css %>',
                options: {
                    sourceMap: true
                }
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
                    config: '_config.yml',
                    trace: true
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
                    src: ['<%= paths.img %>**/*', '<%= paths.fonts %>**/*'],
                    dest: '<%= paths.build.dev %><%= paths.assets %>'
                }]
            },
            prod: {
                files: [{
                    expand: true,
                    cwd: '<%= paths.app %><%= paths.assets %>',
                    src: ['<%= paths.img %>**/*', '<%= paths.fonts %>**/*'],
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

        surge: {
            prod: {
                options: {
                    project: '<%= paths.build.prod %>',
                    domain: '<%= surgeConfig.domains.prod %>'
                }
            },
            develop: {
                options: {
                    project: '<%= paths.build.prod %>',
                    domain: '<%= surgeConfig.domains.develop %>'
                }
            }
        },

        cssmin: {
            prod: {
                files: {
                    '<%= paths.build.prod %><%= paths.assets %><%= paths.css %>main.css': [
                        '<%= paths.build.prod %><%= paths.assets %><%= paths.css %>main.css'
                    ]
                }
            }
        },

        // Htmlmin: Minifies HTML and its contents (inline css and js)
        htmlmin: {
            prod: {
                files: [{
                    expand: true,
                    cwd: '<%= paths.build.prod %>',
                    src: ['**/*.html'],
                    dest: '<%= paths.build.prod %>'
                }],
                options: {
                    removeComments: true,
                    collapseWhitespace: true,
                    minifyJS: true,
                    minifyCSS: true
                }
            }
        },

        // Uglify: makes javascript ugly. Machines like this way
        uglify: {
            prod: {
                files: {
                    '<%= paths.build.prod %><%= paths.assets %><%= paths.js %>app.js': [
                        '<%= paths.build.prod %><%= paths.assets %><%= paths.js %>app.js'
                    ]
                }
            }
        },

        // Pageres: take screenshots of my website
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

    grunt.registerTask('ping', function() {
        var http = require('http');
        var GOOGLE_PING_URL = 'http://www.google.com/webmasters/sitemaps/ping'
        var BING_PING_URL = 'http://www.bing.com/webmaster/ping.aspx'
        var sitemap = 'http://www.hugobessa.com.br/sitemap.xml';
        var done = this.async();

        http.get(GOOGLE_PING_URL + '?sitemap='+sitemap, function(res) {
            console.log('Pinged Google. Status: ' + res.statusCode);

            http.get(BING_PING_URL + '?siteMap='+sitemap, function(res) {
                console.log('Pinged Bing. Status: ' + res.statusCode);

                done();
            });
        });
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
        'cssmin:prod',
        'htmlmin:prod',
        'uglify:prod'
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

    grunt.registerTask('deploy:develop', [
        'surge:develop'
    ]);

    grunt.registerTask('deploy:prod', [
        'surge:prod',
        'ping'
    ]);

    // default task
    grunt.registerTask('default', ['serve:dev']);
};
