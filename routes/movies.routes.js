const CelebrityModel = require("../models/Celebrity.model");
const MovieModel = require("../models/Movie.model");

// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();

//Handles GET resquests to '/movies'
router.get("/movies", (req, res, next) => {
  MovieModel.find()
    .then((movies) => {
      res.render("movies/movies.hbs", { movies });
    })
    .catch((error) => {
      next(error);
    });
});

// Handles GET requests to `/movies/create`
router.get("/movies/create", (req, res, next) => {
  CelebrityModel.find()
    .then((celebrities) => {
      res.render("movies/new-movie.hbs", { celebrities });
    })
    .catch((error) => {
      next(error);
    });
});

// Handles POST requests to `/movies/create`
router.post("/movies/create", (req, res, next) => {
  //all the form data will be available inside req.body

  const { title, genre, plot, cast } = req.body;

  //IMPORT YOUR TODOMODEL AT THE TOP OF THE FILE
  MovieModel.create({ title, genre, plot, cast })
    .then(() => {
      //redirect the user to home page
      // redirects it to a certain url path
      res.redirect("/movies");
    })
    .catch(() => {
      res.render("movies/new-movie");
    });
});

router.get("/movies/:id", (req, res, next) => {
  let id = req.params.id;

  MovieModel.findById(id)
    .populate("cast")
    .then((movie) => {
      console.log(movie);
      res.render("movies/movie-details", { movie });
    })
    .catch((error) => {
      next(error);
    });
});

//DELETE MOVIES
router.post("/movies/:id/delete", (req, res, next) => {
  let id = req.params.id;

  MovieModel.findByIdAndRemove(id)
    .populate("cast")
    .then(() => {
      res.redirect("/movies");
    })
    .catch((error) => {
      next(error);
    });
});

//EDIT MOVIES --- GET REQUEST
router.get("/movies/:id/edit", (req, res, next) => {
  let id = req.params.id;

  MovieModel.findById(id)
    .then((movie) => {
      CelebrityModel.find()
        .then((celebrities) => {
        res.render("movies/edit-movie", { movie, celebrities })
      });
    })
    .catch(() => {
      next("Single to do fetch failed");
    });
});

//EDIT MOVIES --- POST RESQUEST
router.post("/movies/:id/edit", (req, res, next) => {
  const id = req.params.id;
  const { title, genre, plot, cast } = req.body;

  MovieModel.findByIdAndUpdate(id,  { title, genre, plot, cast })
    .then((movie) => {
      res.redirect(`/movies/${movie._id}`);
    })
    .catch(() => {
      next("To do edit failed");
    });
});
module.exports = router;

