const scrapingData = require("../functions/scrapingData");
const websiteService = require("../services/website.service");

const websiteController = {
  getWebsiteInfo: async (req, res) => {
    const { url } = req.body;
    try {
      const data = await websiteService.getWebsiteInfo(url);
      if (!data) {
        res.status(404).json({ error: "This website has not yet been registered!" });
      } else {
        res.json(data);
      }
    } catch {
      res.status(500).json({ error: "Error processing the request!" });
    }
  },

  postWebSiteInfo: async (req, res) => {
    const { url } = req.body;
    try {
      const isAlreadyRegistered = await websiteService.getWebsiteInfo(url);

      if (isAlreadyRegistered) {
        res.status(409).json({ error: "This URL has already been registered!" });
      } else {
        const data = await scrapingData(url);
        const savedDataID = await websiteService.postWebsiteInfo(data);
        res.status(201).json({ id: savedDataID });
      }
    } catch {
      res.status(500).json({ error: "Error processing the request!" });
    }
  },
};

module.exports = websiteController;
