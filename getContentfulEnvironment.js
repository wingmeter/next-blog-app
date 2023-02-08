const contentfulManagement = require("contentful-management");

module.exports = function () {
  const contentfulClient = contentfulManagement.createClient({
    accessToken: "CFPAT-_gVHfm8VdPpwT-3fALZw82qHoXLABGa7_fvxAXlWSkY",
  });

  return contentfulClient
    .getSpace("5k10s7chfpuj")
    .then((space) => space.getEnvironment("master"));
};
