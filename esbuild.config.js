const esbuild = require('esbuild')
const dotenv = require('dotenv')

dotenv.config({path: './.env'})

console.log(process.env.NODE_ENV)
console.log(process.env.PORT)

esbuild.build({
  entryPoints: ['./src/main/js/src'],
  outfile: './src/main/resources/static/built/bundle.js',
  bundle: true,
  sourcemap: true,
  define: {
    'process.env.PORT': JSON.stringify(process.env.PORT),
    'process.env.DOMAIN': JSON.stringify(process.env.DOMAIN),
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
  }
}).catch(() => process.exit(1))
