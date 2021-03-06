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

userModel.addNew = ({ usertitulo, userurl, userthumbnail, useralbum }  )=>{
  var newUser = Object.assign(
    {},
    userTemplate,
    {
      userTitulo: usertitulo,
      userURL: userurl,
      userThumbnail: userthumbnail,
      userAlbum: useralbum,
    }
  );
  newUser.userID = userCollection.length + 1;

  userCollection.push(newUser);
  writeToFile();
  return newUser;
}

  userModel.update = (id, { usertitulo, userurl, userthumbnail, useralbum })=>{
    var updatingUser = userCollection.filter(
      (o, i)=>{
        return o.userID === id;
      }
    );
    if(updatingUser && updatingUser.length>0){
      updatingUser = updatingUser[0];
    } else {
      return null;
    }
    var updateUser = {};
    var newUpdatedCollection = userCollection.map(
      (o, i)=>{
        if(o.userID === id){
          updateUser = Object.assign({},
             o,
            { userTitulo: usertitulo, userURL: userurl, userThumbnail: userthumbnail,  userAlbum: useralbum}
          );
          return updateUser;
        }else{
          return o;
        }
      }
    );
     userCollection = newUpdatedCollection;
     writeToFile();
     return updateUser;
   }

   
  userModel.deleteByCode = (id)=>{
    var newCollection = [];
    newCollection = userCollection.filter(
      (o)=>{
        return o.userID !== id;
      }
    );
    userCollection = newCollection;
    writeToFile();
    return true;
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
//     }
//   )
// );
//  // new Date(timestamp)


module.exports = userModel;
