const ALL_LIST = document.getElementById('allList')
const TITLE_SONG = document.getElementById('title')
const ALBUM_SONG = document.getElementById('album')
const GROUP_SONG = document.getElementById('group')
let FILE_AUDIO = ""
let data_Song_id = ""
FILE_AUDIO_DURATION = ""

function printSongs(songs) {
  let fragmentSongs = createSongs(songs)
  ALL_LIST.innerHTML = ""
  ALL_LIST.append(fragmentSongs)
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
                          <button onclick="reproducirSong(${song.id_song})" class="form__button" style="line-height:normal; margin: 0px; width: auto;">Reproducir</button>
                          <button onclick="editSong(event)" class="form__button" style="line-height:normal; margin: 0px; margin-left:10px; width: auto;">Editar</button>
                          <button onclick="delSong(event)" class="form__button" style="line-height:normal; margin: 0px; margin-left:10px; width: auto;">Borrar</button>
                        </li>
                      </ul>`
    fragment.append(li)
  })
  return fragment
}

var getSongs = async () => {
  try {
    let FORM_DATA = new FormData()
    FORM_DATA.append('url', 'contenido')
    FORM_DATA.append('params', 'get-init')
    FORM_DATA.append('data', JSON.stringify({id_user: sessionStorage.getItem('userId')}))
    const REQUEST = await fetch(`${API_URL}`, {
      method: 'POST',
      body: FORM_DATA,
      headers: {
        'KEY_MUSIC': 'Z9AQBQXUWDHRN5GYE3DUG52BTSFT1NMA'
      }
    })
    const RESULT = await REQUEST.json()
    
    SONGS = RESULT.response.all_songs
    printSongs(SONGS)
  } catch(err) {
    console.error(`Hubo un problema con la petición Fetch: Error ${err.status} - ${err.statusText}`)
  }
}

function editSong(event){
    let elementEvent = event.path[2]
    console.log(elementEvent)
    data_Song_id = elementEvent.id
    FILE_AUDIO_DURATION = elementEvent.children[1].ariaLabel
    TITLE_SONG.value = elementEvent.children[0].ariaLabel
    ALBUM_SONG.value = elementEvent.children[2].ariaLabel
    GROUP_SONG.value = elementEvent.children[3].ariaLabel
    reproducirSong(song.id_song)
}
async function delSong(event){
    let elementEvent = event.path[2]
    console.log(elementEvent)

    try {
    let FORM_DATA = new FormData()
    FORM_DATA.append('url', 'contenido')
    FORM_DATA.append('params', 'delete-song')
    FORM_DATA.append('data', JSON.stringify({id_song: elementEvent.id}))
    const REQUEST = await fetch(`${API_URL}`, {
      method: 'POST',
      body: FORM_DATA,
      headers: {
        'KEY_MUSIC': 'Z9AQBQXUWDHRN5GYE3DUG52BTSFT1NMA'
      }
    })
    const RESULT = await REQUEST.json()
    console.log(RESULT)
    getSongs()
  } catch(err) {
    console.error(`Hubo un problema con la petición Fetch: Error ${err.status} - ${err.statusText}`)
  }
}

async function saveChangeSong() {
    let FORM_DATA = new FormData()
    FORM_DATA.append('url', 'contenido')
    let dataForm = {}
    if(data_Song_id  != ""){
        dataForm = {id_song:data_Song_id, title:TITLE_SONG.value, duration:FILE_AUDIO_DURATION, album:ALBUM_SONG.value, group:GROUP_SONG.value}
        console.log("Guardar cambio", dataForm)
        FORM_DATA.append('params', 'edit-song')
        FILE_AUDIO != "" ? FORM_DATA.append('file_song', FILE_AUDIO) : ""
    } else if (data_Song_id == "" && FILE_AUDIO_DURATION != "" && FILE_AUDIO != "") {
        dataForm = {title:TITLE_SONG.value, album:ALBUM_SONG.value, group:GROUP_SONG.value, duration:FILE_AUDIO_DURATION}
        console.log("Nuevo registro", dataForm)
        FORM_DATA.append('params', 'upload-song')
        FORM_DATA.append('file_song', FILE_AUDIO)
    } else {
        console.log("Debe ingresar un audio")
    }
    try {
        
        FORM_DATA.append('data', JSON.stringify(dataForm))
        const REQUEST = await fetch(`${API_URL}`, {
          method: 'POST',
          body: FORM_DATA,
          headers: {
            'KEY_MUSIC': 'Z9AQBQXUWDHRN5GYE3DUG52BTSFT1NMA'
          }
        })
        const RESULT = await REQUEST.json()
        console.log(RESULT)
        resetCambios()
        getSongs()
    } catch(err) {
        console.error(`Hubo un problema con la petición Fetch: Error ${err.status} - ${err.statusText}`)
    }
}
function resetCambios(){
    data_Song_id = ""
    TITLE_SONG.value = ""
    ALBUM_SONG.value = ""
    GROUP_SONG.value = ""
    FILE_AUDIO_DURATION = ""
}

function controllerFileAudio(event) {
    if (event.target.files.length > 0) {

        FILE_AUDIO = event.target.files[0]
        const objectURL = URL.createObjectURL(FILE_AUDIO)
        var objProv = document.createElement('audio')
        objProv.preload = 'metadata'
        objProv.onloadedmetadata = function() {
            console.log(objProv.duration)
            FILE_AUDIO_DURATION = secondsToString(objProv.duration)
            FILE_AUDIO_DURATION = FILE_AUDIO_DURATION.length > 5 ? FILE_AUDIO_DURATION.substring(0,5) : FILE_AUDIO_DURATION
        }
        objProv.src = objectURL
        objProv.setAttribute("controls", "controls")

        reproducirSongByUrlLocal(objectURL)
    }
}

function backView(){
    //USER__NAME esta declarada en player.js
    window.location.href = '../user/'
  }