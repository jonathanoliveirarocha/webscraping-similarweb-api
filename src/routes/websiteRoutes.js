const express = require("express");
const router = express.Router();
const websiteController = require("../controllers/websiteController");

router.post("/get_info", websiteController.getWebsiteInfo);
router.post("/salve_info", websiteController.postWebSiteInfo);

module.exports = router;
