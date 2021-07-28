// console.log(document.getElementById("para"))

const handleSubmitLogin = () => {
  event.preventDefault();
  let email = document.getElementById('loginemail').value;
  let password = document.getElementById('loginpassword').value;
  console.log("login", email, password)
}

const handleSubmitSignup = () => {
  event.preventDefault();
  let email = document.getElementById('signupemail').value;
  let password = document.getElementById('signuppassword').value;
  console.log('signup', email, password)
  
}