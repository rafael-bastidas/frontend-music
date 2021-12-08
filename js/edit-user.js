// checks if exist any saved userId value
var checkIdUser = () => {
    if (sessionStorage.getItem("userId")) {
      getUser(sessionStorage.getItem('userId'))
    }
  }
  
  window.addEventListener('load', () => {
    setVh()
    checkIdUser()
    document.getElementById('btnSaveChange').addEventListener('click', () => saveProfile(sessionStorage.getItem('userId')));
    const file = document.getElementById('file')
    file.addEventListener('change', (event) => photoProfile(event));
    document.getElementById('profileImg').addEventListener('click', () => file.click())
    // menuBtn()
  })