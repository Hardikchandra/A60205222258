// utils/validateUrl.js
module.exports = function isValidUrl(url) {
    const urlRegex = /^(https?):\/\/[\w.-]+(?:\.[\w\.-]+)+[\w\-._~:/?#[\]@!$&'()*+,;=.]+$/;
    return urlRegex.test(url);
  };