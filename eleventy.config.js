
module.exports = function (eleventyConfig) {

  const filters = require('./src/js/filters');

  // Add each filter to Eleventy
  Object.keys(filters).forEach((filterName) => {
    eleventyConfig.addFilter(filterName, filters[filterName]);
  });

  eleventyConfig.addPassthroughCopy("./src/css/*.*");
  eleventyConfig.addPassthroughCopy("./src/js/*.js");
  eleventyConfig.addPassthroughCopy("./src/images/*.*");
  eleventyConfig.addWatchTarget("./src/**/*.njk");
  eleventyConfig.addWatchTarget("./src/**/js/*.js");
  eleventyConfig.addWatchTarget("./src/css/*.css");
  
  return {
    dir: {
      input: "src",
      output: "dist",
    },
  };

};
