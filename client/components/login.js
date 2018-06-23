import React from 'react';

import { GoogleLogin } from 'react-google-login';

import {logError, checkError} from '../utils/helpers';
import {API_URL} from '../config/config';


export class Login extends React.Component {

    constructor(props) {
      super(props);
      this.state = {
          accessToken:''
      };

    this.checkIfUserExists = this.checkIfUserExists.bind(this);
    }

    loadHomeTabs = () => {

     // alert(this.props.getHomeStore().userEmailId + " from login page");

      this.props.parentMethod();
    }

    responseGoogle = (response) => {
            this.checkIfUserExists(response);
    }

    checkIfUserExists(response){
        if(response.w3.U3 != '')
        {
          fetch(API_URL + "users/" + response.w3.U3)
              .then((response) => {
                return checkError(response);
                })
                .then((result) => {
                      if (result[0].is_user)  {
                          this.props.updateHomeStore({
                            accessToken: response.accessToken,
                            userName: response.w3.ig,
                            userEmailId: response.w3.U3
                          });

                          sessionStorage.setItem("accessToken", response.accessToken);

                          this.setState({
                                    isLoaded: true,
                                    accessToken: response.accessToken,
                                  }, function() {
                                        this.loadHomeTabs();
                                      }
                            );
                        }      
                  })
                  .catch((error) => {
                    this.setState({
                      isLoaded: false,
                      error
                    });
                    logError(this.constructor.name + " " + error);
                  });
          }
      }


    render() {
          return (
              <div id="divLogin">
              <h2>Parmarth Niketan Reservations Portal</h2>
              <div className = "div-table">
                    <div className = "div-table-row">
                          <div className ="div-table-col">
                              <img src="./img/pujya_swamiji.jpg" />
                          </div>
                          <div className ="div-table-col">
                          <GoogleLogin
                              clientId="965244623378-7t6cm3inoicecl57i8sqfgfis9rroqef.apps.googleusercontent.com"
                              buttonText="Login with Google"
                              onSuccess={this.responseGoogle}
                              onFailure={this.responseGoogle} />
                          </div>
                    </div>
                </div>
            
            </div>
            
          );
    }
}

export default Login;
