
module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("./src/keen-assets/**/*.*");
  eleventyConfig.addPassthroughCopy("./src/css/*.*");
  eleventyConfig.addWatchTarget("./src/**/*.njk");
  eleventyConfig.addWatchTarget("./src/css/*.css");
  
  return {
    dir: {
      input: "src",
      output: "dist",
    },
  };

};
