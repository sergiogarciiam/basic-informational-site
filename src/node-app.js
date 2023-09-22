const http = module.require("node:http");
const path = module.require("node:path");
const fs = module.require("node:fs");

const port = process.env.PORT ?? 8080;

const server = http.createServer(processRequest);
server.listen(port, () =>
  console.log(`server listening on http://localhost:${port}`)
);

function processRequest(req, res) {
  let file = req.url === "/" ? "index" : req.url;
  file = path.join(__dirname, "../public", `${file}.html`);

  fs.readFile(file, (err, data) => {
    if (err) showError(res);
    else res.end(data);
  });
}

function showError(res) {
  const file = path.join(__dirname, "../public", `404.html`);
  fs.readFile(file, (err, data) => {
    res.end(data);
  });
}
