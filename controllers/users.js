const User = require("../models/user");

// Show the register form
module.exports.renderRegister = (req, res) => {
    if (req.isAuthenticated()) {
        return res.redirect("/campgrounds");
    }
    res.render("users/register");
};

// Register a new user
module.exports.register = async (req, res, next) => {
    try {
        const { email, username, password } = req.body;
        const user = new User({ email, username });
        const registeredUser = await User.register(user, password);
        req.login(registeredUser, (err) => {
            if (err) return next(err);
            req.login(registeredUser, (err) => {
                if (err) return next(err);
                req.flash("success", "Welcome to Yelp Camp!");
                res.redirect("/campgrounds");
            });
        });
    } catch (e) {
        req.flash("error", e.message);
        res.redirect("register");
    }
};

// Show the login form
module.exports.renderLogin = (req, res) => {
    if (req.isAuthenticated()) {
        return res.redirect("/campgrounds");
    }
    res.render("users/login");
};

// Login a user
module.exports.login = (req, res) => {
    req.flash("success", "Welcome back");
    const redirectUrl = req.session.returnTo;
    if (!redirectUrl) {
        return res.redirect("/campgrounds");
    }
    delete req.session.returnTo;
    res.redirect(redirectUrl);
};

// Log a user out
module.exports.logout = (req, res) => {
    req.logout();
    req.flash("success", "Logged out");
    res.redirect("/campgrounds");
};
