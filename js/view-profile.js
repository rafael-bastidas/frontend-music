// checks if exist any saved userId value
var checkIdUser = () => {
    if (sessionStorage.getItem("idUserDest")) {
      getUser(sessionStorage.getItem('idUserDest'))
    }
  }
  
  window.addEventListener('load', () => {
    setVh()
    checkIdUser()
    document.getElementById('myList').addEventListener('click', (event)=>{ reproducirListMyList(event.path[1].id) })
    document.getElementById('otherList').addEventListener('click', (event)=>{ reproducirListOtherList(event.path[1].id) })
    // menuBtn()
  })