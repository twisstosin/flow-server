
// middleware function to check for authorization
var sessionChecker = (req, res, next) => {
    if (req.headers.api_key != 'twisstedkey') {
        res.send(401, 'Api Key Auth Failed')
    } else {
        next();
    }    
  };
module.exports = sessionChecker;