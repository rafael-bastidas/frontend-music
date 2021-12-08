// get user
const PROFILE_NAME = document.getElementById('profileName')
const PROFILE_IMG = document.getElementById('profileImg')
const PROFILE_BIO = document.getElementById('profileBio')
const FAVORITE_LIST = document.getElementById('favList')
const PERSONAL_LIST = document.getElementById('myList')
const OTHER_LIST = document.getElementById('otherList')
const ALL_LIST = document.getElementById('allList')
let OWN = null
let FAVORITES = null
let OTHERS = null
let SONGS = null
let LIST = null
// Checkbox y Search
const INPUT_SEARCH = document.getElementById('inputSearch')
const BTN_SEARCH = document.getElementById('btnSearch')
const CHECKBOX_ALL = document.getElementById('checkboxAll')
const CHECKBOX_TITLE = document.getElementById('checkboxTitle')
const CHECKBOX_ALBUM = document.getElementById('checkboxAlbum')
const CHECKBOX_GROUP = document.getElementById('checkboxGroup')
const CHECKBOX_LIST = document.getElementById('checkboxList')
let CHECKBOX_CRITERIO = "all"

// print profile
function printProfile(profile) {
  PROFILE_IMG.setAttribute('src', `${profile.image}`)
  PROFILE_NAME.innerText = profile.name
  PROFILE_BIO.innerText = profile.bio
}

// print favorite list
function printFavList(songs) {
  let fragment = createSongsParaFav(songs)
  FAVORITE_LIST.innerHTML = ""
  FAVORITE_LIST.append(fragment)
}

// print personal list
function printOwnList(list) {
  let fragment = createOwnPropia(list)
  PERSONAL_LIST.innerHTML = ""
  PERSONAL_LIST.append(fragment)
}

// print other lists
function printOtherList(list) {
  let fragment = createListOther(list)
  OTHER_LIST.innerHTML = ""
  OTHER_LIST.append(fragment)
}

// print all songs/list
function printAll(songs, list) {
  let fragmentList = createList(list)
  let fragmentSongs = createSongs(songs)
  ALL_LIST.innerHTML = ""
  ALL_LIST.append(fragmentList, fragmentSongs)
}
function printSongs(songs) {
  let fragmentSongs = createSongs(songs)
  ALL_LIST.innerHTML = ""
  ALL_LIST.append(fragmentSongs)
}
function printList(list) {
  let fragmentList = createList(list)
  ALL_LIST.innerHTML = ""
  ALL_LIST.append(fragmentList)
}

// create node object (songs)
function createSongs(songs) {
  let fragment = document.createDocumentFragment()
  songs.forEach(song => {
    let li = document.createElement('li')
    li.innerHTML = `<ul class="list__child" aria-label="song" id="${song.id_song}">
                        <li class="list__metadata" aria-label="${song.title}"><span>Título:</span> ${song.title}</li>
                        <li class="list__metadata" aria-label="${song.duration}"><span>Duración:</span> ${song.duration}</li>
                        <li class="list__metadata" aria-label="${song.album}"><span>Álbum:</span> ${song.album}</li>
                        <li class="list__metadata" aria-label="${song.group}"><span>Artista:</span> ${song.group}</li>
                        <li style="justify-content: end; display: flex;">
                          <button onclick="reproducirSong(${song.id_song})" class="form__button" style="line-height:normal; margin: 0px; width: auto;" id="btnReproSong">Reproducir</button>
                          <button onclick="controllerListGral(event)" class="form__button" style="line-height:normal; margin: 0px; margin-left:10px; width: auto;" id="btnOptionSong">Agregar</button>
                        </li>
                      </ul>`
    fragment.append(li)
  })
  return fragment
}
function createSongsParaFav(songs) {
  let fragment = document.createDocumentFragment()
  songs.forEach(song => {
    let li = document.createElement('li')
    li.innerHTML = `<ul class="list__child" aria-label="song" id="${song.id_song}">
                        <li class="list__metadata" aria-label="${song.title}"><span>Título:</span> ${song.title}</li>
                        <li class="list__metadata" aria-label="${song.duration}"><span>Duración:</span> ${song.duration}</li>
                        <li class="list__metadata" aria-label="${song.album}"><span>Álbum:</span> ${song.album}</li>
                        <li class="list__metadata" aria-label="${song.group}"><span>Artista:</span> ${song.group}</li>
                        <li style="justify-content: end; display: flex;"><button onclick="deleteSongDeFav(${song.id_song})" class="form__button" style="line-height:normal; margin: 0px; width: auto;" id="btnCreateList">Quitar</button></li>
                      </ul>`
    fragment.append(li)
  })
  return fragment
}

// create node object (list)
function createList(list) {
  let fragment = document.createDocumentFragment()
  list.forEach(list => {
    let li = document.createElement('li')
    list.list? qty = list.list.length : qty = list.list_id_song.length
    li.innerHTML = `<ul class="list__child" aria-label="list" id="${list.id_my_list}">
                      <li class="list__metadata" aria-label="${list.name}"><span>Título:</span> ${list.name}</li>
                      <li class="list__metadata"><span>Canciones:</span> ${qty}</li>
                      <li class="list__metadata" aria-label="${list.name_user_creador}"><span>Usuario:</span> ${list.name_user_creador}</li>
                      <li style="justify-content: end; display: flex;">
                        <button onclick="reproducirListg(${list.id_my_list})" class="form__button" style="line-height:normal; margin: 0px; width: auto;" id="btnReproSong">Reproducir</button>
                        <button onclick="controllerListGral(event)" class="form__button" style="line-height:normal; margin: 0px; margin-left:10px; width: auto;" id="btnOptionSong">Agregar</button>
                      </li>
                    </ul>`
    fragment.append(li)
  })
  return fragment
}
function createListOther(list) {
  let fragment = document.createDocumentFragment()
  list.forEach(list => {
    let li = document.createElement('li')
    list.list? qty = list.list.length : qty = list.list_id_song.length
    li.innerHTML = `<ul class="list__child" aria-label="list" id="${list.id_my_list}">
                      <li class="list__metadata" aria-label="${list.name}"><span>Título:</span> ${list.name}</li>
                      <li class="list__metadata"><span>Canciones:</span> ${qty}</li>
                      <li class="list__metadata" aria-label="${list.name_user_creador}"><span>Usuario:</span> ${list.name_user_creador}</li>
                      <li style="justify-content: end; display: flex;"><button onclick="deleteListDeFollowList(${list.id_my_list})" class="form__button" style="line-height:normal; margin: 0px; width: auto;">Quitar</button></li>
                    </ul>`
    fragment.append(li)
  })
  return fragment
}

// create node object (own)
function createOwn(list) {
  let fragment = document.createDocumentFragment()
  list.forEach(list => {
    let li = document.createElement('li')
    li.innerHTML = `<ul class="list__child">
                      <li class="list__metadata"><span>Título:</span> ${list.name}</li>
                      <li class="list__metadata"><span>Canciones:</span> ${list.list_id_song.length}</li>
                    </ul>`
    fragment.append(li)
  })
  return fragment
}
function createOwnPropia(list) {
  let fragment = document.createDocumentFragment()
  list.forEach(list => {
    let li = document.createElement('li')
    li.innerHTML = `<ul class="list__child" id="${list.id_my_list}">
                      <li class="list__metadata"><span>Título:</span> ${list.name}</li>
                      <li class="list__metadata"><span>Canciones:</span> ${list.list_id_song.length}</li>
                      <li style="justify-content: end; display: flex;"><button onclick="deleteListDeMyList(${list.id_my_list})" class="form__button" style="line-height:normal; margin: 0px; width: auto;">Quitar</button></li>
                    </ul>`
    fragment.append(li)
  })
  return fragment
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
    console.log(RESULT)
    const PROFILE = RESULT.response.profile[0]
    OWN = RESULT.response.my_list
    FAVORITES = RESULT.response.favorite_list[0]?.list_id_song
    OTHERS = RESULT.response.follow_list
    LIST = RESULT.response.all_list
    SONGS = RESULT.response.all_songs
    printProfile(PROFILE)
    FAVORITES?.length > 0 ? printFavList(FAVORITES) : ""
    OWN.length > 0 ? printOwnList(OWN) : ""
    OTHERS.length > 0 ? printOtherList(OTHERS) : ""
    printAll(SONGS, LIST)
  } catch(err) {
    console.error(`Hubo un problema con la petición Fetch: Error ${err.status} - ${err.statusText} - ${err}`)
  }
}

async function filterList(){
  let valueSearch = document.getElementById('inputSearch').value
  try {
    let FORM_DATA = new FormData()
    FORM_DATA.append('url', 'contenido')
    FORM_DATA.append('params', 'get-filter')
    let data = {}; data[CHECKBOX_CRITERIO] = valueSearch
    FORM_DATA.append('data', JSON.stringify(data))

    const REQUEST = await fetch(`${API_URL}`, {
      method: 'POST',
      body: FORM_DATA,
      headers: {
        'KEY_MUSIC': 'Z9AQBQXUWDHRN5GYE3DUG52BTSFT1NMA'
      }
    })
    const RESULT = await REQUEST.json()
    console.log(RESULT)
    
    if (CHECKBOX_CRITERIO == 'title' || CHECKBOX_CRITERIO == 'group' || CHECKBOX_CRITERIO == 'album') {
      const SONGS = RESULT.response.all_songs
      printSongs(SONGS)
    } else if (CHECKBOX_CRITERIO == 'name') {
      const LIST = RESULT.response.all_list
      printList(LIST)
    } else {
      const LIST = RESULT.response.all_list
      const SONGS = RESULT.response.all_songs
      printAll(SONGS, LIST)
    }
  } catch(err) {
    console.error(`Hubo un problema con la petición Fetch: Error ${err.status} - ${err.statusText}`)
  }
}
function controllerCheckbox(element){
  desmarcarCheckbox()
  element.checked = true
  CHECKBOX_CRITERIO = element.ariaLabel
}
function desmarcarCheckbox(){
  CHECKBOX_ALL.checked = false
  CHECKBOX_TITLE.checked = false
  CHECKBOX_ALBUM.checked = false
  CHECKBOX_GROUP.checked = false
  CHECKBOX_LIST.checked = false
}

function controllerListGral(event){
  console.log(event)
  let typeElement = event.path[2]
  let selectElement = {}
  if (typeElement.ariaLabel == 'list') {
    selectElement.id = typeElement.id
    selectElement.name = typeElement.children[0].ariaLabel
  } else if (typeElement.ariaLabel == 'song') {
    selectElement.id = typeElement.id
    selectElement.title = typeElement.children[0].ariaLabel
  }
  console.log(selectElement)
  showToast(typeElement.ariaLabel, selectElement)
}
function showToast(criterio, selectElement) {
  var x = document.getElementById("snackbar");
  x.innerHTML = ""
  if (criterio == 'list') {
    x.innerHTML = `
      <span onclick="closeToast()" style="position: absolute; right: 10px; top: 5px; cursor: pointer;">X</span>
        ¿Desea seguir la lista ${selectElement.name}?
      <strong style="margin-left: 20px; color: green; cursor: pointer;" onclick="addListToList(${selectElement.id})">SI</strong>`
  } else if (criterio == 'song') {
    const options = createOptionSelect(OWN);
    let span = document.createElement('span')
    span.innerText = "X"
    span.onclick = closeToast
    span.setAttribute("style", "position: absolute; right: 10px; top: 5px; cursor: pointer;")
    let select = document.createElement('select')
    select.onchange = () => { addSongToList(select.value, selectElement.id) }
    select.setAttribute("style", "margin-top: 8px; width: 70%; padding: 4px; border-radius: 4px; background-color: #ECECEC; color: #232C33; font-size: 18px; font-weight: 500;")
    select.append(options)
    x.appendChild(span)
    let span2 = document.createElement('h4')
    span2.innerText = `Agregar ${selectElement.title}`
    x.appendChild(span2)
    x.appendChild(select)
  }
  x.className = "show";
}
// create node object (own)
function createOptionSelect(list) {
  let fragment = document.createDocumentFragment()
  let option1 = document.createElement('option')
  option1.value = 0
  option1.innerText = "Seleccione la lista destino:"
  fragment.append(option1)
  let option2 = document.createElement('option')
  option2.value = -1
  option2.innerText = "Lista  de favoritas"
  fragment.append(option2)
  list.forEach(list => {
    let option = document.createElement('option')
    option.value = list.id_my_list
    option.innerText = list.name
    fragment.append(option)
  })
  console.log(fragment)
  return fragment
}
function closeToast() {
  var x = document.getElementById("snackbar");
  x.className = "";
}
async function addListToList(id) {
  console.log("Agregar id_my_list", id)
  closeToast()
  try {
    let FORM_DATA = new FormData()
    FORM_DATA.append('url', 'contenido')
    FORM_DATA.append('params', 'add-list-tolist')
    let data = {"id_my_list":id, "id_user":sessionStorage.getItem('userId')}
    FORM_DATA.append('data', JSON.stringify(data))

    const REQUEST = await fetch(`${API_URL}`, {
      method: 'POST',
      body: FORM_DATA,
      headers: {
        'KEY_MUSIC': 'Z9AQBQXUWDHRN5GYE3DUG52BTSFT1NMA'
      }
    })
    const RESULT = await REQUEST.json()
    console.log(RESULT)
    getUser(sessionStorage.getItem('userId'))
  } catch(err) {
    console.error(`Hubo un problema con la petición Fetch: Error ${err.status} - ${err.statusText}`)
  }
}
async function addSongToList(value, id){
  console.log("Agregar id_list / id_song", value, id)

  try {
    let FORM_DATA = new FormData()
    if(value == -1){
      //Add a lista de favoritas
      FORM_DATA.append('url', 'contenido')
      FORM_DATA.append('params', 'add-song-tofavorite')
      FORM_DATA.append('data', JSON.stringify({"id_song":id, "id_user":sessionStorage.getItem('userId')}))
    } else if(value > 0) {
      //Add a una lista del usuario
      FORM_DATA.append('url', 'contenido')
      FORM_DATA.append('params', 'add-song-tolist')
      FORM_DATA.append('data', JSON.stringify({"id_my_list":value, "id_song":id}))
    }
    
    const REQUEST = await fetch(`${API_URL}`, {
      method: 'POST',
      body: FORM_DATA,
      headers: {
        'KEY_MUSIC': 'Z9AQBQXUWDHRN5GYE3DUG52BTSFT1NMA'
      }
    })
    const RESULT = await REQUEST.json()
    console.log(RESULT)
    getUser(sessionStorage.getItem('userId'))
  } catch(err) {
    console.error(`Hubo un problema con la petición Fetch: Error ${err.status} - ${err.statusText}`)
  }
}

function createListOwn(){
  var x = document.getElementById("snackbar");
  x.innerHTML = ""
  x.innerHTML = `
    <span onclick="closeToast()" style="position: absolute; right: 10px; top: 5px; cursor: pointer;">X</span>
    <div style="width: 100%; display: flex; flex-direction: row;" class="form">
      <div class="form__group" style="width: 170%;">
        <label><input type="text" id="inputNameList" placeholder="Nombre de la lista" /></label>
      </div>
      <button id="btnAddNameList" onclick="createListOwn2()" class="form__button">Agregar</button>
    </div>`

  x.className = "show";
}
async function createListOwn2(){
  document.getElementById("btnAddNameList").disabled = true
  const nameList = document.getElementById("inputNameList").value
  console.log("Create Lista", nameList)

  try {
    let FORM_DATA = new FormData()
    FORM_DATA.append('url', 'contenido')
    FORM_DATA.append('params', 'create-list')
    FORM_DATA.append('data', JSON.stringify({"id_user":sessionStorage.getItem('userId'), "name":nameList}))
    
    const REQUEST = await fetch(`${API_URL}`, {
      method: 'POST',
      body: FORM_DATA,
      headers: {
        'KEY_MUSIC': 'Z9AQBQXUWDHRN5GYE3DUG52BTSFT1NMA'
      }
    })
    const RESULT = await REQUEST.json()
    console.log(RESULT)
    getUser(sessionStorage.getItem('userId'))
  } catch(err) {
    console.error(`Hubo un problema con la petición Fetch: Error ${err.status} - ${err.statusText}`)
  }

  closeToast();
}
async function deleteSongDeFav(id){
  console.log("Borrar cancion",id)

  try {
    let FORM_DATA = new FormData()
    FORM_DATA.append('url', 'contenido')
    FORM_DATA.append('params', 'delete-song-fromfavorite')
    FORM_DATA.append('data', JSON.stringify({"id_user":sessionStorage.getItem('userId'), "id_song":id}))
    
    const REQUEST = await fetch(`${API_URL}`, {
      method: 'POST',
      body: FORM_DATA,
      headers: {
        'KEY_MUSIC': 'Z9AQBQXUWDHRN5GYE3DUG52BTSFT1NMA'
      }
    })
    const RESULT = await REQUEST.json()
    console.log(RESULT)
    getUser(sessionStorage.getItem('userId'))
  } catch(err) {
    console.error(`Hubo un problema con la petición Fetch: Error ${err.status} - ${err.statusText}`)
  }
}
async function deleteListDeFollowList(id){
  console.log("Dejar de seguir lista",id)

  try {
    let FORM_DATA = new FormData()
    FORM_DATA.append('url', 'contenido')
    FORM_DATA.append('params', 'delete-list-fromfollowlist')
    FORM_DATA.append('data', JSON.stringify({"id_my_list":id, "id_user":sessionStorage.getItem('userId')}))
    
    const REQUEST = await fetch(`${API_URL}`, {
      method: 'POST',
      body: FORM_DATA,
      headers: {
        'KEY_MUSIC': 'Z9AQBQXUWDHRN5GYE3DUG52BTSFT1NMA'
      }
    })
    const RESULT = await REQUEST.json()
    console.log(RESULT)
    getUser(sessionStorage.getItem('userId'))
  } catch(err) {
    console.error(`Hubo un problema con la petición Fetch: Error ${err.status} - ${err.statusText}`)
  }
}
async function deleteListDeMyList(id) {
  console.log("Borrar my lista",id)

  try {
    let FORM_DATA = new FormData()
    FORM_DATA.append('url', 'contenido')
    FORM_DATA.append('params', 'delete-list-frommylist')
    FORM_DATA.append('data', JSON.stringify({"id_my_list":id}))
    
    const REQUEST = await fetch(`${API_URL}`, {
      method: 'POST',
      body: FORM_DATA,
      headers: {
        'KEY_MUSIC': 'Z9AQBQXUWDHRN5GYE3DUG52BTSFT1NMA'
      }
    })
    const RESULT = await REQUEST.json()
    console.log(RESULT)
    getUser(sessionStorage.getItem('userId'))
  } catch(err) {
    console.error(`Hubo un problema con la petición Fetch: Error ${err.status} - ${err.statusText}`)
  }
}

function cerrarSesion() {
  sessionStorage.removeItem('idUserDest')
  sessionStorage.removeItem('userId')
  window.location.href = '../'
}
function viewProfile(){
  //USER__NAME esta declarada en player.js
  const idUserDest = USER__NAME.getAttribute('aria-label')
  console.log("idUserDest",idUserDest)
  sessionStorage.setItem('idUserDest', idUserDest)
  window.location.href = '../view-profile/'
}

function modoAdministrador(){
  window.location.href = '../admin/'
}