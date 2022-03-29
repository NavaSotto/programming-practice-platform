// const GeneralLogic = require("./BL/generalLogic"),
//   ExerciseLogic = require("./BL/exerciseLogic"),
//   UserLogic = require("./BL/userLogic"),
 const LangLogic = require("../BL/Logic/langLogic");
// const langLogic = require("./BL/langLogic");
// const userLogic = require("./BL/userLogic");

module.exports = (app) => {
  
  
  //==================lang===================
  //get-http://localhost:5000/language
  // app.get("/language", async (req, res) => {
  //   console.log("in 10");

  //   let result;
  //   try {
  //     result = await LangLogic.read();
  //   } catch (error) {
  //     result = { status: 400, massage: error.message || error };
  //   }

  //   res.send(result);
  // });
  app.get("/language/:id?", async (req, res) => {
    console.log("in 2");

    let result;
    try {
      result = req.params.id
        ? await LangLogic.readLang({ _id: req.params.id })
        : await LangLogic.readAllLang();
    } catch (error) {
      result = { status: 400, massage: error.message || error };
    }

    res.send(result);
  });
  app.get("/languages/:langName", async (req, res) => {
    console.log("in 2");

    let result;
    try {
      // result = req.params.langName;
      result = await LangLogic.getIdLangByName({
        langName: req.params.langName,
      });
    } catch (error) {
      result = { status: 400, massage: error.message || error };
    }

    res.send(result);
  });

  //post-http://localhost:5000/language
  //in body-{"langName": "c#",
  //"icon": "https://cdn.jsdelivr.net/gh/devicons/devicon@v2.14.0/devicon.min.css",
  //"tags": ["loops", "arr"]}

  app.post("/language", async (req, res) => {
    console.log("in 11");

    let result;
    try {
      result = await LangLogic.create(req.body);
    } catch (error) {
      result = { status: 400, massage: error.message || error };
    }

    res.send(result);
  });
  

};



