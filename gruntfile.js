module.exports = grunt => {
  grunt.initConfig({
    version: '1.0.0',
    build: {
      css: '> build css action',
      js: '> build js action'
    },
    clean: {
      temp: 'temp/**'
    }
  })

  grunt.registerTask('start', () => {
    console.log('grunt start', grunt.config('version')) // 读取配置
  })

  grunt.registerTask('end', () => {
    console.log('grunt end')
  })

  // 标记同步任务失败，如果忽略错误执行：yarn grunt --force
  grunt.registerTask('bad', () => {
    console.log('grunt failed')
    return false
  })

  grunt.registerTask('async', function () {
    const done = this.async()
    setTimeout(() => {
      console.log('this is a async task')
      done()
    }, 3000)
  })

  // 标记异步任务失败
  grunt.registerTask('async-bad', function () {
    const done = this.async()
    setTimeout(() => {
      console.log('this is a async task')
      done(false)
    }, 3000)
  })

  grunt.registerTask('default', ['start', 'bad', 'end'])
  grunt.registerMultiTask('build', function () {
    console.log(`build ${this.target}, do ${this.data}`)
  })

  // 使用插件构建任务
  grunt.loadNpmTasks('grunt-contrib-clean')
}
