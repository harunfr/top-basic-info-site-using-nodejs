/** 
    localhost:8080 should take users to index.html
    localhost:8080/about should take users to about.html
    localhost:8080/contact-me should take users to contact-me.html
    404.html should display any time the user tries to go to a page not listed above.
*/
const path = require("path");
const fs = require("fs");
const http = require("http");

const server = http.createServer((req, res) => {
  let fileToRender = "";
  if (req.url === "/") {
    fileToRender = "index.html";
  } else if (req.url === "/about") {
    fileToRender = "about.html";
  } else if (req.url === "/contact-me") {
    fileToRender = "contact-me.html";
  } else {
    fileToRender = "404.html";
  }

  let filePath = path.join(__dirname, "public", fileToRender);

  fs.readFile(filePath, (err, data) => {
    if (err) {
      if (err.code === "ENOENT") {
        fs.readFile(path.join(__dirname, "public", "404.html"), (err, data) => {
          res.writeHead(200, { "Content-Type": "text/html" });
          res.end(content, "utf8");
        });
      } else {
        res.writeHead(500);
        res.end(`Server error: ${err.code}`);
      }
    } else {
      res.writeHead(200, { "Content-Type": "text/html" });
      res.end(data, "utf8");
    }
  });
});

server.listen(8080);
