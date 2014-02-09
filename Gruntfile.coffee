module.exports = (grunt) ->

    # Load'em all!
    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks)

    grunt.initConfig

        # Project paths

        paths:
            app:    'app/'
            assets: '_assets/'
            coffee: '_coffee/'
            build:  
                dev: '.dev/'
                prod: 'dist/'
            fonts:  'fonts/'
            sass:   '_scss/'
            img:    'img/'
            css:    'css/'
            js:     'js/'

        # Watch: trigger tasks on file changes/add
        watch:
            options:
                nospawn: true
                livereload: false

            compass:
                files: ['<%= paths.app %><%= paths.assets %><%= paths.sass %>**/*.{scss,sass}']
                tasks: ['compass:dev']

            coffee:
                files: '<%= paths.app %><%= paths.assets %><%= paths.coffee %>**/*.coffee'
                tasks: ['coffee:dev']

            jekyll:
                files: '<%= paths.app %>**/*.{html,md}'
                tasks: ['buildDev']

        # Browser-sync: sync navigation and file changes
        browser_sync:
            options:
                watchTask: true

                ghostMode:
                    scroll: true
                    links: true
                    forms: true
                    clicks: true

            dev:
                bsFiles:
                    src: [
                            '<%= paths.build.dev %><%= paths.assets %><%= paths.css %>**/*.css'
                            '<%= paths.build.dev %><%= paths.assets %><%= paths.img %>**/*.{png,jpg,gif}'
                            '<%= paths.build.dev %><%= paths.assets %><%= paths.js %>**/*.js'
                            '<%= paths.build.dev %>**/*.html'
                        ]
                options:
                    server:
                        baseDir: '<%= paths.build.dev %>'

            prod:
                bsFiles: 
                    src: [
                        '<%= paths.build.prod %><%= paths.css %>**/*.css'
                        '<%= paths.build.prod %><%= paths.img %>**/*.{png,jpg,gif}'
                        '<%= paths.build.prod %><%= paths.js %>**/*.js'
                        '<%= paths.build.prod %>**/*.html'
                    ]
                options:
                    server:
                        baseDir: '<%= paths.build.prod %>'

        # Coffee: compiles CoffeeScript files
        coffee:
            options:
                bare: true

            dev:
                expand: true
                cwd: '<%= paths.app %><%= paths.assets %><%= paths.coffee %>'
                src: '**/*.coffee'
                dest: '<%= paths.build.dev %><%= paths.js %>'
                ext: '.js'

        # Sass: compiles SCSS files
        sass:
            dev:
                cwd: '<%= paths.app %><%= paths.assets %><%= paths.sass %>'
                src: '**/*.scss'
                ext: '.css'
                expand: true
                dest: '<%= paths.build.dev %><%= paths.assets %><%= paths.css %>'

            prod:    
                cwd: '<%= paths.app %><%= paths.assets %><%= paths.sass %>'
                src: '**/*.scss'
                ext: '.css'
                expand: true
                dest: '<%= paths.build.prod %><%= paths.assets %><%= paths.css %>'

        # Jekyll: generates the blog
        jekyll:
            options:
                src: '<%= paths.app %>'
                config: ['_config.yml', '_config.build.yml']
                bundleExec: true
                keep_files: ['_assets/*']
            
            dev:
                options:
                    dest: '<%= paths.build.dev %>'
                    config: '_config.yml'
                    # drafts: true

            prod:
                options:
                    dest: '<%= paths.build.prod'
                    config: ['_config.yml', '_config.build.yml']


        # Imagemin: optimizes images
        imagemin:
            prod:
                options:
                    optimizationLevel: 7
                    progressive: true

                files: [
                    expand: true
                    cwd: '<%= paths.app %><%= paths.assets %><%= paths.img %>'
                    src: '**/*.{png,jpg,gif}'
                    dest: '<%= paths.build.prod %><%= paths.img %>'
                ]

        # Tarefa Coffeelint: mantém a qualidade do código CoffeeScript
        coffeelint:
            options:
                arrow_spacing:
                    'level': 'error'
                max_line_length:
                    'level': 'ignore'
                no_implicit_parens:
                    'level': 'error'
                no_trailing_semicolons:
                    'level': 'error'
                no_tabs:
                    'level': 'ignore'
                indentation:
                    'level': 'ignore'

            app: ['<%= paths.app %><%= paths.assets %><%= paths.coffee %>**/*.coffee']

        # Clean: remove files from folder
        clean: 
            dev: ['<%= paths.build.dev']
            prod: ['<%= paths.build.prod']

    # complex tasks
    grunt.registerTask('buildDev',[
        'clean:dev'
        'jekyll:dev'
        'coffee:dev'
        'sass:dev'
    ])

    grunt.registerTask('serve', [
        'buildDev'
        'browser_sync:dev'
        'watch'
    ])

    # default task
    grunt.registerTask('default', ['browser_sync', 'watch'])

    

    # Coffee to compile just changed file
    grunt.event.on('watch', (action, filepath) ->
        if grunt.file.isMatch(grunt.config('watch.coffee.files'), filepath)
            filepath = filepath.replace(grunt.config('coffee.all.cwd'), '')
            grunt.config('coffee.all.src', filepath)
    )
