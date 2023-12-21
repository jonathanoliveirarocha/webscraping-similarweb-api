const { Builder, By, until } = require("selenium-webdriver");

const scrapingData = async (url) => {
  const driver = await new Builder().forBrowser("chrome").build();

  try {
    await navigateToUrl(driver, url);

    await driver.wait(until.elementLocated(By.className('wa-overview__title')), 10000);

    const genderDistContainer = await getGenderDistribution(driver);
    const ageDistContainer = await getAgeDistribution(driver);
    const countryListContainer = await getCountryListContainer(driver);

    const elements = {
      url: url,
      websiteRank: await getElementText(driver, '//*[@id="overview"]/div/div/div/div[3]/div/div[1]/div'),
      totalVisits: await getElementText(driver, '//*[@id="traffic"]/div/div/div[3]/div[1]/div[1]/p[2]'),
      websiteCategory: await getElementText(driver, '//*[@id="overview"]/div/div/div/div[5]/div/dl/div[6]/dd'),
      websiteRankChange: await getWebsiteRankChange (driver, '//*[@id="traffic"]/div/div/div[3]/div[1]/div[2]/p[2]/span'),
      durationAverageVisit: await getElementText(driver, '//*[@id="traffic"]/div/div/div[3]/div[1]/div[5]/p[2]'),
      pagesPerVisit: await getElementText(driver, '//*[@id="traffic"]/div/div/div[3]/div[1]/div[4]/p[2]'),
      rejectionRate: await getElementText(driver, '//*[@id="traffic"]/div/div/div[3]/div[1]/div[3]/p[2]'),
      countryListContainer,
      genderDistContainer,
      ageDistContainer,
    };

    return elements;
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await driver.quit();
  }
};

const navigateToUrl = async (driver, url) => {
  await driver.get(`https://www.similarweb.com/website/${extractDomain(url)}`);
};

const getGenderDistribution = async (driver) => {
  const genreArray = await getElementsText(driver, By.className("wa-demographics__gender-legend-item-value"));
  return {
    male: genreArray[1],
    female: genreArray[0],
  };
};

const getWebsiteRankChange = async (driver, xpath) => {
  const element = await driver.findElement(By.xpath(xpath));
  if (element) {
    const classList = await element.getAttribute('class');
    if (classList && classList.includes('app-parameter-change--down')) {
      return `-${await element.getText()}`;
    } else {
      return `+${await element.getText()}`;
    }
  }
};

const getAgeDistribution = async (driver) => {
  const ageArray = await getElementsText(driver, By.className("wa-demographics__age-data-label"));
  return {
    range_18_24: ageArray[0],
    range_25_34: ageArray[1],
    range_35_44: ageArray[2],
    range_45_54: ageArray[3],
    range_55_64: ageArray[4],
    range_65_or_more: ageArray[5],
  };
};

const getCountryListContainer = async (driver) => {
  const countryNameArray = await getElementsText(driver, By.className("wa-geography__country-name"));
  const countryValueArray = await getElementsText(driver, By.className("wa-geography__country-traffic-value"));
  return {
    first: { name: countryNameArray[0], value: countryValueArray[0] },
    second: { name: countryNameArray[1], value: countryValueArray[1] },
    third: { name: countryNameArray[2], value: countryValueArray[2] },
    fourth: { name: countryNameArray[3], value: countryValueArray[3] },
    fifth: { name: countryNameArray[4], value: countryValueArray[4] },
    others: { name: countryNameArray[5], value: countryValueArray[5] },
  };
};

const getElementText = async (driver, xpath) => {
  const element = await driver.findElement(By.xpath(xpath));
  return element.getText();
};

const getElementsText = async (driver, by) => {
  const elements = await driver.findElements(by);
  return Promise.all(elements.map((element) => element.getText()));
};

function extractDomain(url) {
  try {
    const parsedUrl = new URL(url);
    return parsedUrl.hostname;
  } catch (error) {
    console.error("Erro ao analisar a URL:", error.message);
    return null;
  }
}

module.exports = scrapingData;
