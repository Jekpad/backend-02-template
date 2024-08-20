const fs = require("fs");
const path = require("path");

const getFavicon = () => {
  const faviconPath = path.join(__dirname, "../favicon.ico");

  try {
    const data = fs.readFileSync(faviconPath);
    return data;
  } catch (error) {
    return "";
  }
};

module.exports = getFavicon;
