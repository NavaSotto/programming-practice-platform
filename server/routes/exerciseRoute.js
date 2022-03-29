const GeneralLogic = require("../BL/Logic/generalLogic"),
  ExerciseLogic = require("../BL/Logic/exerciseLogic");
//   UserLogic = require("./BL/userLogic"),
//   LangLogic = require("./BL/langLogic");
// const langLogic = require("./BL/langLogic");
// const userLogic = require("./BL/userLogic");

module.exports = (app) => {
  //==================exercise===================

  app.post("/exercise", async (req, res) => {
    console.log("in 1");
    try {
      console.log("in router.js app.post");

      let result = await ExerciseLogic.create(req.params.id,req.body);
      res.send(result);
    } catch (err) {
      console.log(err);
      res.send({
        status: 400,
        message: err.message || err,
      });
    }
  });

  //read a exercise
  //   to run in postman:
  //   // get -http://localhost:5000/exercise or http://localhost:5000/exercise/<id>

  app.get("/exercises/:id?", async (req, res) => {
    console.log("in 2");

    let result;
    try {
      result = req.params.id
        ? await GeneralLogic.getSingleExercise(req.params.id)
        : await ExerciseLogic.read();
    } catch (error) {
      result = { status: 400, massage: error.message || error };
    }

    res.send(result);
  });

  app.get("/fullExercisesInLang/:langName", async (req, res) => {
    console.log("in 3");
    let result;
    try {
      result = await ExerciseLogic.read({
        prog_lang: `${req.params.langName}`,
      });
    } catch (error) {
      result = { status: 400, massage: error.message || error };
    }

    res.send(result);
  });

  app.get("/exercisesCardsInLang/:langName", async (req, res) => {
    console.log("in 4");

    let result;
    try {
      result = await ExerciseLogic.read(
        { prog_lang: `${req.params.langName}` },
        { title: 1, details: 1, difficulty: 1, exec_type: 1, icon: 1, tags: 1 }
      );
    } catch (error) {
      result = { status: 400, massage: error.message || error };
    }

    res.send(result);
  });

  //update an exercise
  app.put("/exercise/edit/:id?", async (req, res) => {
    console.log("in 5");
    console.log(req.params.id);

    let result;
    try {
      result = await ExerciseLogic.update(req.params.id, req.body);
    } catch (error) {
      result = { status: 400, massage: error.message || error };
    }

    res.send(result);
  });

  //delete an exercise
  app.delete("/exercise/delete/:id", async (req, res) => {
    console.log("in 6");

    let result;
    try {
      result = await ExerciseLogic.delete(req.params.id,req.body);
    } catch (error) {
      result = { status: 400, massage: error.message || error };
    }

    res.send(result);
  });

  
  

};



