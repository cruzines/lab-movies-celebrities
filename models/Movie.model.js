const { Schema, model } = require("mongoose");
require("./Celebrity.model");

const MovieSchema = new Schema({
  title: String,
  genre: String,
  plot: String,
  cast: [
    {
      type: Schema.Types.ObjectId,
      ref: "celebrity",
    },
  ],
});

const MovieModel = model("movie", MovieSchema);

module.exports = MovieModel;
