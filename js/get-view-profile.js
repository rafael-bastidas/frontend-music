// get user
const PROFILE_NAME = document.getElementById('profileName')
const PROFILE_IMG = document.getElementById('profileImg')
const PROFILE_BIO = document.getElementById('profileBio')
const FAVORITE_LIST = document.getElementById('favList')
const PERSONAL_LIST = document.getElementById('myList')
const OTHER_LIST = document.getElementById('otherList')
let OWN = null
let FAVORITES = null
let OTHERS = null

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
    const REQUEST = await fetch(`${API_URL}`, {
      method: 'POST',
      body: FORM_DATA,
      headers: {
        'KEY_MUSIC': 'Z9AQBQXUWDHRN5GYE3DUG52BTSFT1NMA'
      }
    })
    const RESULT = await REQUEST.json()
    const PROFILE = RESULT.response.profile[0]
    OWN = RESULT.response.my_list
    FAVORITES = RESULT.response.favorite_list[0].list_id_song
    OTHERS = RESULT.response.follow_list
    printProfile(PROFILE)
    printFavList(FAVORITES)
    printOwnList(OWN)
    printOtherList(OTHERS)
  } catch(err) {
    console.error(`Hubo un problema con la petición Fetch: Error ${err.status} - ${err.statusText}`)
  }
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
function backView(){
  //USER__NAME esta declarada en player.js
  sessionStorage.removeItem('idUserDest')
  window.location.href = '../user/'
}