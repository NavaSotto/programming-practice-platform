// const GeneralLogic = require("./BL/Logic/generalLogic"),
//   ExerciseLogic = require("./BL/Logic/exerciseLogic"),
 const  UserLogic = require("../BL/Logic/userLogic");
//   LangLogic = require("./BL/Logic/langLogic");
// const langLogic = require("./BL/langLogic");
// const userLogic = require("./BL/userLogic");

module.exports = (app) => {

  //==================user===================
  // READ - Users (for test) - V
  app.get("/user", async (req, res) => {
    console.log("in 7");

    res.send(await UserLogic.read());
  });

  app.get("/usertoken", async (req, res) => {
    console.log("in 7");

    res.send(await UserLogic.getTokenStatus());
  });

  // login
  app.post("/login", async (req, res) => {
    console.log("in 8");
    try{
      let result = await UserLogic.login(req.body);
      res.send(result);
    }catch(err)
    {
      console.log(err);
      res.send({
        status: 400,
        message: err.message || err,
      });
    }
  });
// {
// "email":"israel@gmail.com",
// "password":"israeli22"
// }
  // register - V
  app.post("/register", async (req, res) => {
    console.log("in 9");

    try {
      let result = await UserLogic.register(req.body);
      res.send(result);
    } catch (err) {
      console.log(err);
      res.send({
        status: 400,
        message: err.message || err,
      });
    }
  });

};



