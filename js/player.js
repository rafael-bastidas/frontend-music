
USER__NAME = document.getElementById("USER__NAME")
LIST__NAME = document.getElementById("LIST__NAME")
const icon_play = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#4578a4" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>';
const icon_pause = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#4578a4" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="6" y="4" width="4" height="16"></rect><rect x="14" y="4" width="4" height="16"></rect></svg>';


//Array con el listado de canciones a mostrar en el reprodutor
let canciones = []


var indiceActual = new Array(1)
//Funcion para crear mediante javascript el listado de canciones
function initList() {
	function crearPlayList() {
		const listado = document.createElement('ol')
		listado.setAttribute("id", 'listadoMusica')
		for (let i = 0; i<canciones.length; i++){
			const item = document.createElement('li')
			item.appendChild(document.createTextNode(canciones[i].title)) 
			item.setAttribute("id", canciones.findIndex(element => element == canciones[i]))
			item.setAttribute("class", "list-song")
			listado.appendChild(item)
		}
		return listado
	}
	document.getElementById('playList').innerHTML = ""
	document.getElementById('playList').appendChild(crearPlayList())
	
	var listadoMusica= document.getElementById('listadoMusica')
	listadoMusica.onclick = (e) =>{
		const itemClick = e.target
		removeActive()
		itemClick.classList.add("active");
		reproduccionActual("Reproduciendo: "+ itemClick.innerText)
		loadMusic(itemClick.innerText)
		player.play()
		indiceActual[0]= e.target.id
		classIconPlay();
	
	}
}


//Funcion para cambiar el icono del reprodutor
function classIconPlay(){
	var element = document.getElementById("iconPlay")
	element.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#4578a4" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="6" y="4" width="4" height="16"></rect><rect x="14" y="4" width="4" height="16"></rect></svg>`;
}
//Funcion para control del volumen
const volumen= document.getElementById("volumen")
volumen.oninput= (e) =>{
	const vol = e.target.value
	player.volume =vol
}
//Funcion para actualizar la barra de progreso del reprodutor
const updateProgress = () =>{
	if (player.currentTime >0){
		const barra = document.getElementById('progress')
		barra.value = (player.currentTime / player.duration) * 100
		
		var duracionSegundos= player.duration.toFixed(0);
		dura=secondsToString(duracionSegundos);
		var actualSegundos = player.currentTime.toFixed(0)
		actual=secondsToString(actualSegundos);
		
		duracion= actual +' / '+ dura
		document.getElementById('timer').innerText=duracion 
	}
	if (player.ended){
		nextMusic();//Reproducir la siguiente pista
	} 
}
//Funcion para reproducir la proxima cancion
function nextMusic(){  
	const source = document.getElementById('source');
	var musicaActual= Number(indiceActual[0]);
	if (canciones.length == (musicaActual+1)){
		var siguiente = 0
	} else {
		var siguiente = musicaActual + 1
	}
	removeActive()
	var item=document.getElementById(siguiente)
	item.classList.add("active");
	loadMusic(canciones[siguiente]);
	player.play()
	indiceActual[0]= siguiente
	reproduccionActual("Reproduciendo: "+ canciones[siguiente].title)
	classIconPlay()
}
//Funcion para reproducir la cancion anterior
function prevMusic(){  
	const source = document.getElementById('source');
	var musicaActual= Number(indiceActual[0]);
	if (musicaActual==0){
		var anterior= canciones.length - 1
	} else {
		var anterior = musicaActual - 1
	}
	removeActive()
	var item=document.getElementById(anterior)
	item.classList.add("active");
	loadMusic(canciones[anterior]);
	player.play()
	indiceActual[0]= anterior
	reproduccionActual("Reproduciendo: "+ canciones[anterior].title)
	classIconPlay()
}
//Funcion para remover todas las clases css activas
function removeActive(){
	var elems = document.querySelectorAll(".active");
		[].forEach.call(elems, function(el) {
			el.classList.remove("active");
		});
		return elems
}
//Funcion para mostrar el nombre del arhivo actual en reproduccion
function reproduccionActual(texto){
	document.getElementById('currentPlay').innerText=texto
}
//Funcion para cargar las canciones en el reproductor
function loadMusic(ruta){
	var source = document.getElementById('source')
	if (ruta.title == "S/N") {
		source.src= ruta.url
	} else {
		var folder ="https://rafaelbastidas.com/apis/api-music/media"; //Carpeta donde tenemos almancenada la musica
		source.src= folder+"/"+ruta.url
	}
	var index= indiceActual[0]= canciones.findIndex(element => element.url == ruta.url)
	removeActive()
	var item=document.getElementById(index)
	item.classList.add("active");
	reproduccionActual("Reproduciendo: "+ ruta.title)
	player.load()
}
//Funcion para pausar o darle play 
function togglePlay() {
	if (player.paused){
		toggleIcon();
		return player.play();
	} else {
		toggleIcon();
		return player.pause();
	}
}
//Funcion para cambiar el icono play o pause
function toggleIcon() {
	var element = document.getElementById("iconPlay");
	if (element.innerHTML == icon_pause) {
	 element.innerHTML = icon_play;
	} else {
	 element.innerHTML = icon_pause;
	}
}
//Funcion para que al dar click sobre la barra de progeso se permita adelantar
progress.addEventListener('click', adelantar);
function adelantar(e){
	const scrubTime = (e.offsetX / progress.offsetWidth) * player.duration;
	player.currentTime = scrubTime;
	/* console.log(e); */
}
//Funcion para convertir segundos a minutos y horas
function secondsToString(seconds) {
	var hour="";
	if (seconds>3600){
		hour = Math.floor(seconds / 3600);
		hour = (hour < 10)? '0' + hour : hour;
		hour+=":"
	}
		var minute = Math.floor((seconds / 60) % 60);
	minute = (minute < 10)? '0' + minute : minute;
	var second = seconds % 60;
	second = (second < 10)? '0' + second : second;
	return hour  + minute + ':' + second;
}
/* loadMusic(canciones[0]) */


function reproducirSong(id) {
	/* console.log(SONGS) */
	let itemSong = SONGS.find(element => element.id_song == id)
	canciones = [{url:itemSong.url, title:itemSong.title}]
	initList()
	loadMusic(canciones[0])

	USER__NAME.innerText = ""
	USER__NAME.setAttribute("aria-label", "")
	LIST__NAME.innerText = "General"
}
function reproducirListg(id) {
	/* console.log(SONGS) */
	let itemList = LIST.find(element => element.id_my_list == id)
	canciones = itemList.list_id_song.map(element => {return {url:element.url, title:element.title}})
	initList()
	loadMusic(canciones[0])

	USER__NAME.innerText = itemList.name_user_creador
	USER__NAME.setAttribute("aria-label", itemList.id_user_creador)
	LIST__NAME.innerText = itemList.name
}
function reproducirListFav() {
	/* console.log("Reproducir Lista favoritos", FAVORITES) */

	canciones = FAVORITES.map(element => {return {url:element.url, title:element.title}})
	initList()
	loadMusic(canciones[0])

	USER__NAME.innerText = ""
	USER__NAME.setAttribute("aria-label", "")
	LIST__NAME.innerText = "Favoritos"

}
function reproducirListMyList(id){
	/* console.log(id) */
	let itemMyList = OWN.find(element => element.id_my_list == id)
	console.log(itemMyList)
	canciones = itemMyList.list_id_song.map(element => {return {url:element.url, title:element.title}})
	initList()
	loadMusic(canciones[0])

	USER__NAME.innerText = ""
	USER__NAME.setAttribute("aria-label", "")
	LIST__NAME.innerText = itemMyList.name
}
function reproducirListOtherList(id){
	/* console.log(id) */
	let itemOtherList = OTHERS.find(element => element.id_my_list == id)
	console.log(itemOtherList)
	canciones = itemOtherList.list.map(element => {return {url:element.url, title:element.title}})
	initList()
	loadMusic(canciones[0])

	USER__NAME.innerText = itemOtherList.name_user_creador
	USER__NAME.setAttribute("aria-label", itemOtherList.id_user_creador)
	LIST__NAME.innerText = itemOtherList.name

}
function reproducirSongByUrlLocal(url) {
	/* console.log(SONGS) */
	canciones = [{url:url, title:"S/N"}]
	initList()
	loadMusic(canciones[0])

	USER__NAME.innerText = ""
	USER__NAME.setAttribute("aria-label", "")
	LIST__NAME.innerText = "General"
}