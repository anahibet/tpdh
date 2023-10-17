
const adminMiddleware = (req, res, next) => {

    if (req.session.userLogged && req.session.userLogged.user_category_id === 1) {
        return res.redirect('/login'); 
    } else {
        next();
    }


}


module.exports = adminMiddleware;

