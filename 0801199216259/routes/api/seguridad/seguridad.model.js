var fs = require('fs');
var fileToSave = 'security.json';
var userModel = {};
var userCollection = [];

function writeToFile(){
  var serializedJSON = JSON.stringify(userCollection);
  fs.writeFileSync(fileToSave, serializedJSON, { encoding: 'utf8' } );
  return true;
}
function openFile(){
  try{
  var serializedJSON = fs.readFileSync(fileToSave,{encoding:'utf8'});
  userCollection = JSON.parse(serializedJSON);
  } catch(e){
    console.log(e);
  }
}

var userTemplate = {
  userID:'',
  userTitulo:"",
  userURL:"",
  userThumbnail:"",
  userAlbum:"",
  userDateCreated: null
}

openFile();

userModel.getAll = ()=>{
  return userCollection;
}

userModel.getById = (id)=>{
  var filteredUsers = userCollection.filter(
    (o)=>{
      return o.userID === id;
    }
  );
  if(filteredUsers.length){
    return filteredUsers[0];
  }else{
    return null
  }
}


// userCollection.push(
//   Object.assign(
//     {},
//     userTemplate,
//     {
//       userID:1,
//       userTitulo: "Hola",
//       userURL: "www.Jose.com",
//       userThumbnail: "www.Jose.com",
//       userAlbum: "Foto",
//       userDateCreated: new Date().getTime()
//     }
//   )
// );

// userCollection.push(
//   Object.assign(
//     {},
//     userTemplate,
//     {
//       userID:1,
//       userTitulo: "Adios",
//       userURL: "www.Landa.com",
//       userThumbnail: "www.Landa.com",
//       userAlbum: "Foto",
//       userDateCreated: new Date().getTime()
//     }
//   )
// );
//  // new Date(timestamp)


module.exports = userModel;
