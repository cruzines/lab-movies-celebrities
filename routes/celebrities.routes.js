const CelebrityModel = require("../models/Celebrity.model");

// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();

router.get("/celebrities", (req, res, next) => {
  CelebrityModel.find()
    .then((celebrities) => {
      res.render("celebrities/celebrities.hbs", { celebrities });
    })
    .catch(() => {
      next("Error");
    });
});

// Handles GET requests to `/celebrities/create`
router.get("/celebrities/create", (req, res, next) => {
  res.render("celebrities/new-celebrity");
});

// Handles POST requests to `/celebrities/create`
router.post("/celebrities/create", (req, res, next) => {
  //all the form data will be available inside req.body
  console.log(req.body);
  const { name, occupation, catchPhrase } = req.body;

  //IMPORT YOUR TODOMODEL AT THE TOP OF THE FILE
  CelebrityModel.create({ name, occupation, catchPhrase })
    .then(() => {
      //redirect the user to home page
      // redirects it to a certain url path
      res.redirect("/celebrities");
    })
    .catch(() => {
      res.render("celebrities/new-celebrity");
    });
});

module.exports = router;
