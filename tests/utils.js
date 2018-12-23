function url (path) {
  var URL_PREFIX = '/api';

  if (path[0] != '/') {
    return URL_PREFIX + '/' + path;
  }

  return URL_PREFIX + path;
}

module.exports = {
  url: url,
};
