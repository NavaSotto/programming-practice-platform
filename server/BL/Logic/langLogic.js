const LangController = require("../../DL/Controllers/langController");

async function readAllLang() {
  return LangController.read();
}
async function readLang(filter) {
  console.log("in read logic");
  return LangController.read(filter);
}
async function getIdLangByName(filter) {
  console.log("in getIdLangByName");
  return LangController.read(filter, { _id: 1 });
}
async function getLangById(filter) {
  console.log("in getLangById");
  return LangController.read(filter, { langName: 1 });
}

module.exports = { ...LangController, readAllLang, readLang, /*getIdLangByName,getLangById*/ };
