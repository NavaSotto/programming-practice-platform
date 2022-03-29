const bcryptjs = require("bcryptjs");
//npm i bcryptjs
const { createToken, verifyToken } = require("../Middleware/jwt");
const UserController = require("../../DL/Controllers/userController");

// async function read(filter, token) {
//   const user = await readOne({ token });

//   if (user && verifyToken(user._id, token)) return UserController.find(filter);
//   else throw "not conected";
// }
async function read(filter, token) {
  //const user = await readOne({ token })

 // if (user && verifyToken(user._id, token))
      return await UserController.read(filter)
 // else
    //  throw 'not conected'
}

async function readOne(filter, projection) {
  return UserController.readOne(filter, projection)
}
async function create(data) {
  console.log("in create");
  if (!data.email?.includes("@")) throw "you forgot to put @";

  return UserController.create(data);
}



async function register(data) {
  console.log("in register");
  
  const {firstName, lastName,password}=data
  console.log(firstName);
  console.log(lastName);


  if (!data.firstName) throw `'firstName' is required`;

  if (!data.lastName) throw `'lastName' is required`;

  data.name = `${firstName} ${lastName}`;

  data.password = bcryptjs.hashSync(password);

  return await create(data);
}

async function login(data) {
  console.log("in login");
  const {email, password}=data

  let user = (await UserController.read({ email }, '+password'))[0] //projection say to not return the password- {select: false }
  console.log(user);

  if (!user) throw 'Faild to login';
  console.log(password);
  console.log(user.password);
  if (!bcryptjs.compareSync(password, user.password))
  throw 'email or password invalid'
  const token = createToken(user._id);
  console.log("tttttttttttttttttttttttt");
  console.log(token);
  user.token = token;
  console.log("******************user**********************");
  console.log(user);
  user.lastSeen = Date.now();
  let updatedUser = await update(user._id, user);
  updatedUser.token = token;
  return updatedUser;
}
async function update(id,data) {
  data.lastSeen = Date.now();
  return UserController.update(id, data);
}
async function getTokenStatus( token)
{
   const user = await readOne({ token })

if (user && verifyToken(user._id, token))
 return true
else
      //throw 'not conected'
      return false
 
}
async function readAllUsersData(token) {
  console.log("token= "+token);
  // console.log("in del");
   const user = await readOne({ token: `${token}` })
   console.log("u "+user);
   //console.log(verifyToken(user._id, token));
 
   if (user && verifyToken(user._id, token))
   {
    console.log("sucsses");
    return await UserController.read(filter={},{name:1,email:1,permission:1})
   }
 }



module.exports = {
  ...UserController,
  create,
  update,
  register,
  login,
  getTokenStatus,
  read,
  readAllUsersData
  //readOne
};
