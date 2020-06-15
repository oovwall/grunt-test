const sass = require('sass')
const loadGruntTasks = require('load-grunt-tasks')

module.exports = grunt => {
  const data = {
    menus: [
      {
        name: 'Home',
        icon: 'aperture',
        link: 'index.html'
      },
      {
        name: 'Features',
        link: 'features.html'
      },
      {
        name: 'About',
        link: 'about.html'
      },
      {
        name: 'Contact',
        link: '#',
        children: [
          {
            name: 'Twitter',
            link: 'https://twitter.com/w_zce'
          },
          {
            name: 'About',
            link: 'https://weibo.com/zceme'
          },
          {
            name: 'divider'
          },
          {
            name: 'About',
            link: 'https://github.com/zce'
          }
        ]
      }
    ],
    pkg: require('./package.json'),
    date: new Date()
  }

  grunt.initConfig({
    cleanempty: {
      options: {},
      src: ['dist/*'],
    },
    sass: {
      options: {
        sourceMap: true,
        implementation: sass
      },
      main: {
        files: {
          'dist/assets/styles/main.css': 'src/assets/styles/main.scss'
        }
      }
    },
    cssmin: {
      options: {
        mergeIntoShorthands: false,
        roundingPrecision: -1
      },
      target: {
        files: {
          'dist/assets/styles/main.min.css': ['dist/assets/styles/main.css']
        }
      }
    },
    babel: {
      options: {
        sourceMap: true,
        presets: ['@babel/preset-env']
      },
      main: {
        files: {
          'dist/assets/scripts/main.js': 'src/assets/scripts/main.js'
        }
      }
    },
    swigtemplates: {
      options: {
        defaultContext: data,
        templatesDir: 'src/'
      },
      production: {
        dest: 'dist/',
        src: ['src/*.html']
      }
    },
    useref: {
      copy: {
        test: {
          files: [
            {expand: true, cwd: '/', src : ['.'], dest: 'dist/' }
          ]
        }
      },
      // specify which files contain the build blocks
      html: 'dist/*.html',
      // explicitly specify the temp directory you are working in
      // this is the the base of your links ( "/" )
      temp: 'dist'
    },
    watch: {
      css: {
        files: ['src/assets/styles/*.scss'],
        tasks: ['sass']
      },
      js: {
        files: ['src/assets/scripts/*.js'],
        tasks: ['babel']
      },
      html: {
        files: ['src/*.html'],
        tasks: ['swigtemplates:production']
      }
    }
  })

  loadGruntTasks(grunt)
  grunt.registerTask('default', [
    'cleanempty',
    'sass',
    'cssmin',
    'babel',
    'swigtemplates:production',
    'useref',
    'watch'
  ])

}
