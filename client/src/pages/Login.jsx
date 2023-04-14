import React from "react";
import "../App.css";
import { Link } from "react-router-dom";
import Axios from 'axios'

// изменение
// import { observer } from "mobx-react-lite";
import authStore from "../store/UserStore";
// -------

const Login = () => {

  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')

  function reloadThePage(){
    window.location.reload();
  } 


  // const addEmployee = (e) => {
  //   Axios.post('http://localhost:5000/api/auth/login', {
  //       email, password, 
  //   }, {withCredentials: true}).then((res) => {
  //       console.log(res)
  //   })}

  const addEmployee = (e) => {
    // изменение
    // e.preventDefault();
    // чтобы предотвратить перезагрузку страницы при отправке формы.
    //------------- 
    Axios.post('http://localhost:5000/api/auth/login', {
        email, password, 
    }, {withCredentials: true}).then((res) => {
        console.log(res)
        // if (res.status === 200) {
        //   authStore.login(email,password); // короче передаются данные на проверку
        // }
    });  
  }   

      return (
        <main>
          <div class="container">
            <div class="row">
              <div class="col-12  col-md-9">
                <div class="LoginWindow" >
                    <input value={email} name="email" type="text" placeholder='Email' class='RegistrateInput1' 
                      onChange={e => setEmail(e.target.value)}/>

                    <input value={password} name="password" type="password" placeholder='Password' class='RegistrateInput1'
                      onChange={e => setPassword(e.target.value)}/>

                    <div class="row" onClick={() => {addEmployee()
                    reloadThePage()}}>
                      <Link to={'/main'} type="submit" class='LogInButton'>Sign In</Link>
                        {/* <Link style={{padding_right:"0",padding_left: "0"}}  to="/register">
                          <input  class='LogInButton' value='Registration' />
                        </Link> */}
                    </div>
                    {/* <Link to="/ForgotPassword"> ForgotPassword</Link> */}
                </div>
            </div>
          </div>
          </div>
        </main>
      );
};
export default Login;

  