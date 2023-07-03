const path = require('path')

module.exports = {
  trailingSlash: true,
  reactStrictMode: false,
  experimental: {
    esmExternals: false,
    jsconfigPaths: true // enables it for both jsconfig.json and tsconfig.json
  },
  env: {
    JWT: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiJhODZjMTkwMi03MTQwLTQyZDItYmRjNS01YWUyMzMxNzdmZDgiLCJlbWFpbCI6InNrY2hhaW4zM0BnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwicGluX3BvbGljeSI6eyJyZWdpb25zIjpbeyJpZCI6IkZSQTEiLCJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MX0seyJpZCI6Ik5ZQzEiLCJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MX1dLCJ2ZXJzaW9uIjoxfSwibWZhX2VuYWJsZWQiOmZhbHNlLCJzdGF0dXMiOiJBQ1RJVkUifSwiYXV0aGVudGljYXRpb25UeXBlIjoic2NvcGVkS2V5Iiwic2NvcGVkS2V5S2V5IjoiMjAyNmIzMjAxNjA0NDk4MmY3ZmYiLCJzY29wZWRLZXlTZWNyZXQiOiJhZGNjMjFhNDk2Y2E2YThjNGQ2Yzk2MWEzNzI0NGNmMTBiMmI2YzkyNTViNGViYzUxNTUwZjM1ZWFkZDdlNTE2IiwiaWF0IjoxNjg3OTQ0Njk2fQ.vfeWopqdGwKwyp2GeVxlCPL0oPu3pzvyQBVC6UlrW2k'
  },
  webpack: config => {
    config.resolve.alias = {
      ...config.resolve.alias,
      apexcharts: path.resolve(__dirname, './node_modules/apexcharts-clevision')
    }

    return config
  }
}
