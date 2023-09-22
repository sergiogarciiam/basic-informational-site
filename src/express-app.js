const express = module.require("express");
const path = module.require("node:path");
const fs = module.require("node:fs/promises");

const app = express();
const port = process.env.PORT ?? 8080;

app.use(express.static("public"));

app.use(async (req, res, next) => {
  try {
    let file = req.url === "/" ? "index" : req.url;
    file = path.join(__dirname, "../public", `${file}.html`);
    req.body = await fs.readFile(file, "utf8");
    next();
  } catch (err) {
    if (err.code === "ENOENT") {
      const errorFile = path.join(__dirname, "../public", `404.html`);
      req.body = await fs.readFile(errorFile, "utf8");
      res.status(404);
      next();
    } else {
      next(err);
    }
  }
});

app.get(["/", "/about", "contact-me"], (req, res) => {
  res.end(req.body);
});

app.use((req, res) => {
  res.end(req.body);
});

app.listen(port, () =>
  console.log(`server listening on http://localhost:${port}`)
);
