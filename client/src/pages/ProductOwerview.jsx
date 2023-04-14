import React from "react";
import "../App.css";
import { Link } from "react-router-dom";
import CarFoto from "../img/LogoNight.png";
import authStore from "../store/UserStore";
import { Context } from '../index'
import { useContext } from 'react'

const ProductOwerview = () => {
  const { user } = useContext(Context)

  

    return (
      <main>
        <div class="container">
          <div class="row">
            <div class="col-12 col-md-3">
              <div class="menu">
                <div class="row">
                  <img class="CarFoto" src={CarFoto} alt="" />
                </div>
              </div>
            </div>
            <div class="col-12  col-md-9">
              <div class="OverviewProduct">
                <div class="col-md-9">
                  <p class="Name">Bomb party </p>
                  <p class="Price">20000$</p>
                </div>
                <div class="col-md-9">
                  <div class="NameSelect">
                    <div class="row">
                      <div class="col-md-4">
                        <p class="LabelProperty">Type</p>
                        <p class="LabelProperty">Adress</p>
                      </div>
                      <div class="col-md-4">
                        <p class="Property"> test</p>
                        <p class="Property">test</p>
                        
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-md-9">
                  <p class="DescriptionP">Description</p>
                  <textarea cols="30" rows="3" class="Description" readOnly>
                    test
                  </textarea>
                </div>
                <div class="col-md-9">
                  <div class="UserContact">
                    <div class="row">
                      <div class="col-md-4">
                        <p class="UserName">Bob</p>
                        <p class="tex">12 tickets</p>
                      </div>
                      <div class="col-md-8">
                      {/* Проверка если чел зареган то может посмотреть номер телефона создателя ивента и купить билет */}
                      {user.isAuth &&
                      <div>
                        <input
                          type="button"
                          value="+360 657 899 234"
                          class="OverviewPhoneNumber"
                          readOnly
                        />
                        
                      </div>
                      }
                      {/* Проверка если чел НЕ зареган то НЕ может  посмотреть номер телефона создателя ивента
                       если нажмет кнопку купить то пойдет на регистрацию */}
                      {(user.isAuth == false) &&
                      <div>
                        <input
                          type="button"
                          value="+XXX XXX XXX"
                          class="OverviewPhoneNumber"
                          readOnly
                        />
                        
                      </div>}                   
                      </div>
                    </div>
                    <Link class="text-decoration-none text-black" to="/user">
                      <p>go to profile</p>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    );
}

export default ProductOwerview;
