// checks if exist any saved userId value
var checkIdUser = () => {
    if (sessionStorage.getItem("userId")) {
      if (sessionStorage.getItem('userId') != "1") {
        window.location.href = '../'
      }
    }
  }
  
  window.addEventListener('load', () => {
    setVh()
    checkIdUser()
    getSongs()
    /* document.getElementById('allList').addEventListener('click', (event)=>{ controllerListGral(event) }) */
    // menuBtn()
  })