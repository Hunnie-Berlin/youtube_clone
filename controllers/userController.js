import passport from "passport";
import routes from "../routes";
import User from "../models/User";

export const getJoin = (req, res) => {
  res.render("join", { pageTitle: "Join" });
};
export const postJoin = async (req, res, next) => {
  const {
    body: { name, email, password, password2 },
  } = req;
  if (password !== password2) {
    res.status(400);
    res.render("join", { pageTitle: "Join", errorMessage: "The Passwords don't match each other." });
  } else {
    try {
      const user = await User({ name, email });
      await User.register(user, password);
      next();
    } catch (error) {
      console.log(error);
      res.render("join", { pageTitle: "Join", errorMessage: "The email already exists. Please try again." });
    }
  }
};

export const getLogin = (req, res) => {
  res.render("login", { pageTitle: "Login" });
};
export const postLogin = passport.authenticate("local", {
  successRedirect: routes.home,
  failureRedirect: routes.login,
});

export const githubLogin = passport.authenticate("github");

export const postGithubLogin = (req, res) => {
  res.redirect(routes.home);
};

export const githubLoginCallback = async (_, __, profile, cb) => {
  const {
    _json: { id, avatar_url: avatarUrl, name },
    } = profile;
  const {value: email} = profile.emails[0];
    try {
    const user = await User.findOne({email});
    if(user){
      user.githubId = id;
      user.avatarUrl = avatarUrl;
      user.name = name;
      user.save();
      return cb(null, user);
    } 
    const newUser = await User.create({
      email,
      name,
      githubId: id,
      avatarUrl,
    });
    return cb(null, newUser);
  } catch(error) {
return cb(error);
  }
};

export const logout = (req, res) => {
  req.logout();
  res.redirect(routes.home);
};

export const getMe = (req, res) => {
  res.render("userDetail", { pageTitle: "User Detail", user: req.user });
}

export const userDetail = async (req, res) =>{
  const {params: id} =req;
  try{
    const user = await User.findById(id);
    res.render("userDetail", { pageTitle: "User Detail", user });
  } catch(error) {
    res.redirect(routes.home);
  }
}

export const getEditProfile = (req, res) =>
  res.render("editProfile", { pageTitle: "Edit Profile" });
export const postEditProfile = async (req, res) => {
  try {
    const {
    body: {name, email},
    file
  } = req;
  await User.findByIdAndUpdate(req.user.id, {
    name,
    email,
    avatarUrl: file ? file.path : req.user.avatarUrl
  })
  res.redirect(routes.me);
  } catch(error) {
    console.log(error);
    res.render("editProfile", { pageTitle: "Edit Profile" });
  }

}

export const changePassword = (req, res) =>
  res.render("changePassword", { pageTitle: "Change Password" });
