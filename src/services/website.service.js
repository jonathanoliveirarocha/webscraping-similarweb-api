const Website = require("../models/Website");

const websiteService = {
  getWebsiteInfo: async (url) => {
    const website = await Website.findOne({ url });
    return website;
  },
  postWebsiteInfo: async (webSiteInfo) => {
    const newWebsite = new Site(webSiteInfo);
    await newWebsite.save();
  },
};

module.exports = websiteService;
