
// middleware function to check for authorization
var sessionChecker = (req, res, next) => {
    if (req.headers.api_key != 'twisstedkey') {
        res.redirect('/null');
    } else {
        next();
    }    
  };
export default sessionChecker;