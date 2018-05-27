import Vue from 'vue'

console.log('loaded')

const app = new Vue({
  data: {
    hello: 'hi there 11d'
  },
  template: '<div id="app">{{ hello }}</div>'
})

export { app }

// https://gist.github.com/bstavroulakis/dcaf903e3f8d3bf6e6fa202b34c3849a#file-build-process-lint-rules 
