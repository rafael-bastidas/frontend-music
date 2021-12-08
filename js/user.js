// checks if exist any saved userId value
var checkIdUser = () => {
  if (sessionStorage.getItem("userId")) {
    const PANEL__ADMIN = document.getElementById('PANEL__ADMIN')
    if (sessionStorage.getItem('userId') == "1") {
      let btnAdmin = document.createElement('button')
      btnAdmin.onclick = modoAdministrador
      btnAdmin.setAttribute("class", "form__button")
      btnAdmin.setAttribute("style", "line-height:normal; margin: 0px; margin-right: 20px; width: auto; height: 40px; background-color: #FFBB50; color: #EC4B5F;")
      btnAdmin.id = "btnAdminSong"
      btnAdmin.innerText = "Admin. Canciones"
      PANEL__ADMIN.appendChild(btnAdmin)
    }
    getUser(sessionStorage.getItem('userId'))
  }
}

window.addEventListener('load', () => {
  setVh()
  checkIdUser()
  document.getElementById('btnEditProfile').addEventListener('click', ()=>{ window.location.href = './edit-profile/' })
  document.getElementById('btnSearch').addEventListener('click', ()=>{ filterList() })
  document.getElementById('checkboxAll').addEventListener('click', (event)=>{ controllerCheckbox(event.target) })
  document.getElementById('checkboxTitle').addEventListener('click', (event)=>{ controllerCheckbox(event.target) })
  document.getElementById('checkboxGroup').addEventListener('click', (event)=>{ controllerCheckbox(event.target) })
  document.getElementById('checkboxAlbum').addEventListener('click', (event)=>{ controllerCheckbox(event.target) })
  document.getElementById('checkboxList').addEventListener('click', (event)=>{ controllerCheckbox(event.target) })
  /* document.getElementById('allList').addEventListener('click', (event)=>{ controllerListGral(event) }) */
  document.getElementById('myList').addEventListener('click', (event)=>{ reproducirListMyList(event.path[1].id) })
  document.getElementById('otherList').addEventListener('click', (event)=>{ reproducirListOtherList(event.path[1].id) })
  // menuBtn()
  
})

{/* <button onclick="modoAdministrador()"
          class="form__button"
          style="line-height:normal; margin: 0px; margin-right: 20px; width: auto; height: 40px; background-color: #FFBB50; color: #EC4B5F;"
          id="btnAdminSong">Admin. Canciones</button> */}