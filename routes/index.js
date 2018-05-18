var express = require('express');
var router = express.Router();
const request = require("request");
const cydia = require("cydia-api-node");
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
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
  let downURL;

  res.render("package", { packageInfo: info, downloadURL: downURL });
});

router.get("/downloadURL" /* ?packageid=someid */, (req, res, next) => {
  request({
    url: "https://server.s0n1c.org/cydia/download.php",
    method: "POST",
    form: { id: req.query.packageid }
  }, (err, resp, body) => {
    console.log(resp.body);
    if (resp.body == "invalid id.") return res.json("Invalid package."); 
    resp.body = JSON.parse(resp.body);
    if (resp.body.stats) return res.json("Invalid package."); 
    return res.json(resp.body.package.file);
  });
});

module.exports = router;
