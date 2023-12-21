const Website = require("../models/Website");

const websiteService = {
  getWebsiteInfo: async (url) => {
    const website = await Website.findOne({ url });
    return website;
  },
  postWebsiteInfo: async (webSiteInfo) => {
    const newWebsite = new Website(webSiteInfo);
    await newWebsite.save();
    return newWebsite._id;
  },
};

module.exports = websiteService;
