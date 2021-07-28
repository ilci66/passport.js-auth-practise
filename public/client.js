const handleSubmitLogin = () => {
  event.preventDefault();
  let email = document.getElementById('loginemail').value;
  let password = document.getElementById('loginpassword').value;
  console.log("login", email, password)
}
//another way of doing the same thing 
document.getElementById('signupform').addEventListener('submit', e => {
  e.preventDefault();
  // console.log(e.target[0].value)
  let email = e.target[0].value;
  let password = e.target[1].value;
  console.log(email, password)
  const register = async () => {
    const rawResponse = await fetch(
      `/signup/?email=${email}&password=${password}`, 
      {
        method : 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      }
    );
    console.log("this is the rawresponse", rawResponse)
    const content = await rawResponse.json();

    console.log("content >>>", content)
  }
  register();
})