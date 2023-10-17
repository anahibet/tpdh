function userLoggedMiddleware(req, res, next) {
    res.locals.isLogged = false;
    res.locals.userLogged = null; // Inicializar como nulo si no está autenticado

    if (req.session && req.session.userLogged) {
        res.locals.isLogged = true;
        res.locals.userLogged = req.session.userLogged;
    }

    next();
}

module.exports = userLoggedMiddleware;
