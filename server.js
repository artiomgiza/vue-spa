const express = require("express");
const app = express();
const fs = require("fs");
const path = require("path")

// When we run 
// > npm start
// npm goes to packege.json file and search for 'start' command under the script section.
// In our case 'node server' found, so this command run.
// 'node server' (samw as 'node server.js' loads and run this (server.js) file)

const isProd = typeof process.env.NODE_ENV !== 'undefined' && (process.env.NODE_ENV === 'production')

if (isProd) {
  app.use('/', express.static(path.resolve(__dirname,'./dist'))) // must be here :/
} else {
  app.use('/dist', express.static(path.resolve(__dirname,'./dist')))
  // This will set up the dev environment...
  require("./build/dev-server")(app);
}

const indexHTML = (() => {
  // path always be relative to server.js file with this:
  return fs.readFileSync(path.resolve(__dirname,"./index.html"),"utf-8");
})();

app.get('*', (req, res) => {
  console.log("index html")
  res.write(indexHTML)
  res.end();
})

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`--> server started at http://localhost:${port}`);
});
