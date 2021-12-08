// get user
const PROFILE_NAME = document.getElementById('profileName')
const PROFILE_IMG = document.getElementById('profileImg')
const PROFILE_BIO = document.getElementById('profileBio')
let FILE_PHOTO_PROFILE = ""

// print profile
function printProfile(profile) {
  PROFILE_IMG.setAttribute('src', `${profile.image}`)
  PROFILE_NAME.value = profile.name
  PROFILE_BIO.value = profile.bio
}

async function photoProfile(event){
    if (event.target.files.length > 0) {
        FILE_PHOTO_PROFILE = event.target.files[0]
        var promise = getBase64(FILE_PHOTO_PROFILE)
        promise.then( function(result) { PROFILE_IMG.setAttribute('src', `${result}`) } )
    }
}
function getBase64(file) {
    return new Promise(function(resolve, reject) {
        var reader = new FileReader()
        reader.onload = function() { resolve(reader.result) }
        reader.onerror = reject
        reader.readAsDataURL(file)
    })
}


// save changes profile
async function saveProfile(id) {
    /* PROFILE_IMG.setAttribute('src', `${profile.image}`)
    PROFILE_NAME.value = profile.name
    PROFILE_BIO.value = profile.bio */
    console.log("save-profile", id)
    try {
        let FORM_DATA = new FormData()
        FORM_DATA.append('url', 'contenido')
        FORM_DATA.append('params', 'edit-user')
        FORM_DATA.append('data', JSON.stringify({id_user: id, name:PROFILE_NAME.value, bio:PROFILE_BIO.value}))
        FILE_PHOTO_PROFILE == "" ? '' : FORM_DATA.append('file_imgportada', FILE_PHOTO_PROFILE)
        // display the key/value pairs
        // for(let pair of FORM_DATA.entries()) {
        //   console.log(`${pair[0]}: ${pair[1]}`)
        // }
        const REQUEST = await fetch(`${API_URL}`, {
          method: 'POST',
          body: FORM_DATA,
          headers: {
            'KEY_MUSIC': 'Z9AQBQXUWDHRN5GYE3DUG52BTSFT1NMA'
          }
        })
        const RESULT = await REQUEST.json()
        console.log("Response Backend",RESULT);
      } catch(err) {
        console.error(`Hubo un problema con la petición Fetch: Error ${err.status} - ${err.statusText}`)
      }
}

// get all data from user
var getUser = async (id) => {
  try {
    let FORM_DATA = new FormData()
    FORM_DATA.append('url', 'contenido')
    FORM_DATA.append('params', 'get-init')
    FORM_DATA.append('data', JSON.stringify({id_user: id}))
    // display the key/value pairs
    // for(let pair of FORM_DATA.entries()) {
    //   console.log(`${pair[0]}: ${pair[1]}`)
    // }
    const REQUEST = await fetch(`${API_URL}`, {
      method: 'POST',
      body: FORM_DATA,
      headers: {
        'KEY_MUSIC': 'Z9AQBQXUWDHRN5GYE3DUG52BTSFT1NMA'
      }
    })
    const RESULT = await REQUEST.json()
    const PROFILE = RESULT.response.profile[0]
    printProfile(PROFILE)
  } catch(err) {
    console.error(`Hubo un problema con la petición Fetch: Error ${err.status} - ${err.statusText}`)
  }
}

function backView(){
  //USER__NAME esta declarada en player.js
  sessionStorage.removeItem('idUserDest')
  window.location.href = '../../user/'
}