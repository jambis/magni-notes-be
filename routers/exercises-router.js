const router = require("express").Router();
const { restricted } = require("../middleware/auth-middleware");

const dbExercises = require("../models/exercises-models");

router.get("/", restricted, async (req, res) => {
  try {
    const exercises = await dbExercises.get();

    res.status(200).json(exercises);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to retrieve list of exercises" });
  }
});
// TODO: Check for category_id, set_type_id, and unique name
/**
 * @api {post} /api/vacations/:vid/activities/ Activities - Add
 * @apiName Add Vacation's Activities
 * @apiGroup Vacations
 *
 * @apiParam {Number} vid Input Vacations's id into the URL
 * @apiParam {String} name Vacation's activity name, required
 * @apiParam {String} description Vacation's activity description, optional
 * @apiHeader {String} authorization user's access token.
 *
 * @apiExample {js} Example usage
 * axios.post("https://vacation-planner-be.herokuapp.com/api/vacations/2/activities/", {
 *    name: "Skiing",
 *    description: "At Colorado Mt resort"
 * })
 *
 * @apiSuccess (201) {Array} vacations Array containing vacations with its name, description, place, picture, date object, activities array, comments array and array of user's invited
 *
 * @apiSuccessExample {json} Successful Response
 *
 * "vacations": [
 *   {
 *     "name": "Summer Vaction",
 *     "description": "Summer getaway to some beach",
 *     "place": "Cancun",
 *     "picture": "http://lorempixel.com/640/480/city",
 *     "dates": {
 *       "id": 3,
 *       "start": "1999-01-08T06:00:00.000Z",
 *       "end": "1999-01-08T06:00:00.000Z"
 *     },
 *     "comments": [
 *       {
 *         "id": 7,
 *         "body": "Cancun here we go",
 *         "created_by": 1
 *       },
 *       {
 *         "id": 8,
 *         "body": "OMG so pumped for cancun",
 *         "created_by": 4
 *       }
 *     ],
 *     "activities": [
 *       {
 *         "id": 7,
 *         "name": "Xcaret",
 *         "description": "Wild life tour"
 *       }
 *     ],
 *     "users": [
 *       {
 *         "id": 2,
 *         "username": "Adriel",
 *         "avatar": "https://s3.amazonaws.com/uifaces/faces/twitter/jomarmen/128.jpg"
 *       },
 *       {
 *         "id": 4,
 *         "username": "Monte",
 *         "avatar": "https://s3.amazonaws.com/uifaces/faces/twitter/turkutuuli/128.jpg"
 *       }
 *     ]
 *   },
 *
 */
router.post("/", restricted, async (req, res) => {
  let exerciseData = {
    category_id: req.body.category_id,
    set_type_id: req.body.set_type_id,
    name: req.body.name
  };

  try {
    const exercise = await dbExercises.add({
      ...exerciseData,
      user_id: req.decodedJwt.id
    });

    res.status(201).json(exercise);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to create the exercise" });
  }
});

/**
 * @api {put} /api/vacations/:vid/activities/:id Activities - Update
 * @apiName Update Vacation's Activities
 * @apiGroup Vacations
 *
 * @apiParam {Number} vid Input vacations's id into the URL
 * @apiParam {Number} id Input activity id into the URL
 * @apiParam {String} name Vacation's activity name, required
 * @apiParam {String} description Vacation's activity description, optional
 * @apiHeader {String} authorization user's access token.
 *
 * @apiExample {js} Example usage
 * axios.put("https://vacation-planner-be.herokuapp.com/api/vacations/2/activities/1", {
 *    name: "Skiing",
 *    description: "At Colorado Mt resort"
 * })
 *
 * @apiSuccess (202) {Array} vacations Array containing vacations with its name, description, place, picture, date object, activities array, comments array and array of user's invited
 *
 * @apiSuccessExample {json} Successful Response
 *
 * "vacations": [
 *   {
 *     "name": "Summer Vaction",
 *     "description": "Summer getaway to some beach",
 *     "place": "Cancun",
 *     "picture": "http://lorempixel.com/640/480/city",
 *     "dates": {
 *       "id": 3,
 *       "start": "1999-01-08T06:00:00.000Z",
 *       "end": "1999-01-08T06:00:00.000Z"
 *     },
 *     "comments": [
 *       {
 *         "id": 7,
 *         "body": "Cancun here we go",
 *         "created_by": 1
 *       },
 *       {
 *         "id": 8,
 *         "body": "OMG so pumped for cancun",
 *         "created_by": 4
 *       }
 *     ],
 *     "activities": [
 *       {
 *         "id": 7,
 *         "name": "Xcaret",
 *         "description": "Wild life tour"
 *       }
 *     ],
 *     "users": [
 *       {
 *         "id": 2,
 *         "username": "Adriel",
 *         "avatar": "https://s3.amazonaws.com/uifaces/faces/twitter/jomarmen/128.jpg"
 *       },
 *       {
 *         "id": 4,
 *         "username": "Monte",
 *         "avatar": "https://s3.amazonaws.com/uifaces/faces/twitter/turkutuuli/128.jpg"
 *       }
 *     ]
 *   },
 *
 */

// router.put("/:id", activityIdExists, canModifyActivity, async (req, res) => {
//   let changes = {};
//   if (req.body.description)
//     changes = { ...changes, description: req.body.description };

//   if (req.body.name) {
//     changes = { ...changes, name: req.body.name };
//   }

//   if (Object.getOwnPropertyNames(changes).length == 0) {
//     res.status(400).json({ message: "Please provide name or description" });
//   }

//   try {
//     const activity = await dbActivities.update(changes, req.params.id);
//     const vacationsArr = await dbUsers.getVacationsArr(req.decodedJwt.id);

//     activity
//       ? res.status(202).json(vacationsArr)
//       : res
//           .status(404)
//           .json({ message: "Activity with that ID was not found" });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: "Failed to update the activity" });
//   }
// });

/**
 * @api {delete} /api/vacations/:vid/activities/:id Activities - Delete
 * @apiName Delete Vacation's Activities
 * @apiGroup Vacations
 *
 * @apiParam {Number} vid Input vacations's id into the URL
 * @apiParam {Number} id Input activity id into the URL
 * @apiHeader {String} authorization user's access token.
 *
 * @apiExample {js} Example usage
 * axios.delete("https://vacation-planner-be.herokuapp.com/api/vacations/2/activities/1")
 *
 * @apiSuccess (202) {Array} vacations Array containing vacations with its name, description, place, picture, date object, activities array, comments array and array of user's invited
 *
 * @apiSuccessExample {json} Successful Response
 *
 * "vacations": [
 *   {
 *     "name": "Summer Vaction",
 *     "description": "Summer getaway to some beach",
 *     "place": "Cancun",
 *     "picture": "http://lorempixel.com/640/480/city",
 *     "dates": {
 *       "id": 3,
 *       "start": "1999-01-08T06:00:00.000Z",
 *       "end": "1999-01-08T06:00:00.000Z"
 *     },
 *     "comments": [
 *       {
 *         "id": 7,
 *         "body": "Cancun here we go",
 *         "created_by": 1
 *       },
 *       {
 *         "id": 8,
 *         "body": "OMG so pumped for cancun",
 *         "created_by": 4
 *       }
 *     ],
 *     "activities": [
 *       {
 *         "id": 7,
 *         "name": "Xcaret",
 *         "description": "Wild life tour"
 *       }
 *     ],
 *     "users": [
 *       {
 *         "id": 2,
 *         "username": "Adriel",
 *         "avatar": "https://s3.amazonaws.com/uifaces/faces/twitter/jomarmen/128.jpg"
 *       },
 *       {
 *         "id": 4,
 *         "username": "Monte",
 *         "avatar": "https://s3.amazonaws.com/uifaces/faces/twitter/turkutuuli/128.jpg"
 *       }
 *     ]
 *   },
 *
 */
// router.delete("/:id", activityIdExists, canModifyActivity, async (req, res) => {
//   try {
//     const deleted = await dbActivities.remove(req.params.id);
//     const vacationsArr = await dbUsers.getVacationsArr(req.decodedJwt.id);

//     deleted
//       ? res.status(202).json(vacationsArr)
//       : res
//           .status(404)
//           .json({ message: "Activity with that ID was not found" });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: "Failed to delete activity" });
//   }
// });

module.exports = router;
