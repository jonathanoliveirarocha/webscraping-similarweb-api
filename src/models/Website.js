const mongoose = require("mongoose");

const websiteSchema = new mongoose.Schema({
  url: {
    type: String,
    required: true,
  },
  websiteRank: String,
  websiteCategory: String,
  websiteRankChange: String,
  durationAverageVisit: String,
  visitsPerPage: String,
  rejectionRate: String,
  countryListContainer: String,
  genderDistContainer: String,
  ageDistContainer: String,
});

const Website = mongoose.model("Website", websiteSchema);

module.exports = Website;
