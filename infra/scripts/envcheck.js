//https://github.com/maxchou415/node-envchecker/blob/master/index.js
module.exports = function (variables) {
  if (variables.isArray === false) {
    throw new Error('ENV File must be a array.');
  }
  if (variables.length <= 0) {
    throw new Error('ENV File can not be empty.');
  }

  var env = process.env;
  var lostItems = [];

  variables.forEach(function (variable) {
    if (!(variable in env)) {
      lostItems.push(variable);
    }
  });

  if (lostItems.length > 0) {
    console.error(lostItems);
    throw new Error('These variables are required.');
  }

  return true;
};
