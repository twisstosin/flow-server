
// middleware function to check for authorization
var sessionChecker = (req, res, next) => {
    if (req.headers.api_key != 'twisstedkey') {
        res.send(403, 'Auth Failed')
    } else {
        next();
    }    
  };
module.exports = sessionChecker;