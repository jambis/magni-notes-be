const dbExercises = require("../models/exercises-models");

module.exports = { exerciseCreator, exerciseIdExists };

async function exerciseCreator(req, res, next) {
  try {
    const exercise = await dbExercises.getBy({ id: req.params.id });
    if (req.decodedJwt.id != exercise.user_id) {
      res.status(403).json({
        message: "Sorry you aren't the creator of the exercise"
      });
    } else {
      next();
    }
  } catch (err) {
    console.error(err);

    res.status(500).json({ error: "Failed to verify creator of the exercise" });
  }
}

async function exerciseIdExists(req, res, next) {
  try {
    const exercise = await dbExercises.getBy({ id: req.params.id });
    exercise
      ? next()
      : res
          .status(404)
          .json({ message: "Exercise with that ID was not found" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to verify exercise ID" });
  }
}
