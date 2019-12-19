# nodejs

tips : dont do it on a USB Key, it'll take so much more time to install

 - install nodejs
 - npm init -y (dans le dossier du git)
 - create directory src
 - create file index.js in src (write in a `console.log('test');` for some test)
 - npm install --save-dev webpack app-root-path webpack-cli
 - add in package.json, in `"script"` = `"build": "webpack --mode=development"`
 - create file webpack.config.js
 - insert inside : 
 ````
const root = require('app-root-path').path
const dotenv = require('dotenv').config({ path: `${root}/.env` });
const DefinePlugin = require('webpack').DefinePlugin

module.exports = {
    entry: `./index.js`,
    target: 'node',
    externals: [
        /^[a-z\-0-9]+$/ // Ignore node_modules folder
    ],
    output: {
        filename: 'index.js',
        path: `${root}/dist`,
        libraryTarget: "commonjs"
    },
    plugins: [
        new DefinePlugin({
            "process.env": dotenv.parsed
        })
    ]
}
````
 - add in `"script"` in package.json = `"watch": "webpack --mode=development --watch"`
 - npm install --save-dev npm-run-all nodemon
 - in package.json, in `"script"`, replace `"watch": "webpack --mode=development --watch"` by : 
````
"watch": "npm run build && npm-run-all --parallel watch:server watch:build",
"watch:build": "webpack --mode=development --watch",
"watch:server": "nodemon --inspect=9223 \"./dist/index.js\" --watch \"./dist\""
````
 - npm install express
 - npm install dotenv
 - create file .env
 - npm install mongoose (only if you are using mongoDB as database)
 - npm install body-parser
 
For build your project, you can :
 - run `npm run build` for build once
 - run `npm run watch` for rebuild automatically when files change.

For database, download mongoDB here : 
````
https://www.mongodb.com/download-center/community?jmp=docs
````
Put it on your program Files Directory, in a new directory MongoDB. 
For managing your mongoDB database, use compass. download here : 
````
https://www.mongodb.com/download-center/compass
````

 Now you can dev ! after download files, make a `npm install` in the directory.