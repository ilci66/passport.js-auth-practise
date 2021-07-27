// console.log(document.getElementById("para"))

const handleSubmitLogin = () => {
  event.preventDefault();
  let username = document.getElementById('loginemail').value;
  let password = document.getElementById('loginpassword').value;
  console.log(username, password)
}