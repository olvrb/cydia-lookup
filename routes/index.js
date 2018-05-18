var express = require('express');
var router = express.Router();
const request = require("request");
const cydia = require("cydia-api-node");
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get("/about", (req, res, next) => {
  res.render("about");
});
router.post("/getpackages", (req, res, next) => {
  res.set('Content-Type', 'application/json');
  /*if (!req.query.package) {
    return res.json(JSON.stringify({ inputError: "This field is required!" }));
  }*/  
  request(`https://cydia.saurik.com/api/macciti?query=${req.query.package}`, (err, resp, body) => {
    /*
    resp.body.packageDownloadURLs = [];
    for (const result of resp.body.results) {
      resp.body.packageDownloadURLs.push(``);
    }
    */
    return res.json(resp.body);
  });
});
router.get("/package" /* ?package=packageid */, async (req, res, next) => {
  let package = req.query.packageid;
  const info = await cydia.getAllInfo(package);
  res.render("package", { packageInfo: info });
});

module.exports = router;
