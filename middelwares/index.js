const fs = require("fs");

function logReqRes(filename) {
  return (req, res, next) => {
    // ROUTES
    fs.appendFile(
      filename,
      `\n${Date.now()}: ${req.method} : ${req.path}\n`,
      (err, data) => {
        next();
      }
    );
  };
}

module.exports = {logReqRes,};