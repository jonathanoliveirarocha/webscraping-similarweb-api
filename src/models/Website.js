const mongoose = require("mongoose");

const websiteSchema = new mongoose.Schema({
  url: {
    type: String,
    required: true,
  },
  websiteRank: String,
  totalVisits: String,
  websiteCategory: String,
  websiteRankChange: String,
  durationAverageVisit: String,
  pagesPerVisit: String,
  rejectionRate: String,
  countryListContainer: {
    first: {
      name: String,
      value: String,
    },
    second: {
      name: String,
      value: String,
    },
    third: {
      name: String,
      value: String,
    },
    fourth: {
      name: String,
      value: String,
    },
    fifth: {
      name: String,
      value: String,
    },
    others: {
      name: String,
      value: String,
    },
  },
  genderDistContainer: {
    male: String,
    female: String,
  },
  ageDistContainer: {
    range_18_24: String,
    range_25_34: String,
    range_35_44: String,
    range_45_54: String,
    range_55_64: String,
    range_65_or_more: String,
  },
});

const Website = mongoose.model("Website", websiteSchema);

module.exports = Website;
