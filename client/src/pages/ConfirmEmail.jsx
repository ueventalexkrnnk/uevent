import React from 'react'
import Axios from 'axios'
import { useParams } from 'react-router-dom'
import {Link} from 'react-router-dom'


const ConfirmEmail = () => {
    
  const {token} = useParams()

  React.useEffect(() => {
    const addEmployee = () => {
      Axios.get(`http://localhost:5000/api/auth/active/${token}`, {

      }).then((res) => {
          console.log(res)
      }).catch(console.log)
    }  
    addEmployee() 
  }, [])

  return (
    <div class="bform py-5 mb-4" >
        <div class="row">
            <div class="container">
                <div class="col-lg-6 align-justify-center pr-4 pl-0 contact-form">
                    <div class="">
                        <h2 class="mb-3 font-weight-light">CHRONOS</h2>
                        <h6 class="subtitle font-weight-normal">Registration completed successfully.</h6>
                        <h6 class="subtitle font-weight-normal">Mail is confirmed.</h6>
                      
                    <div class="row">
                        <div class="col-lg-12 text-center mt-5">
                            Move to
                            <Link to={'/login'} href="/login" class="text-danger"><span> login </span></Link>
                            page.
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
)
}

export default ConfirmEmail;