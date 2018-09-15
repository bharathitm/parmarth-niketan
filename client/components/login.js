import React from 'react';

import { GoogleLogin } from 'react-google-login';

import {logError, checkError, failedLogin} from '../utils/helpers';
import {BASE_URL, GoogleClientID} from '../config/config';
import {fetch} from './../utils/httpUtil';


export class Login extends React.Component {

    constructor(props) {
        super(props);

        this.checkIfUserExists = this.checkIfUserExists.bind(this);
    }

    loadHomeTabs = () => {
        this.props.parentMethod();
    }

    responseGoogle = (response) => {
        this.checkIfUserExists(response);
    }

   

    checkIfUserExists(response){
        if(response.w3.U3 != '')
        {
          fetch(BASE_URL, "users/" + response.w3.U3)
              .then((response) => {
                return checkError(response);
                })
                .then((result) => {
                      if (result[0].is_user)  {
                          sessionStorage.setItem("accessToken", response.accessToken);
                          sessionStorage.setItem("userName", response.w3.ig);

                          this.setState({
                                    isLoaded: true,
                                  }, function() {
                                        this.loadHomeTabs();
                                      }
                            );
                        } 
                        else{
                           failedLogin();
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
             
               <div className = "div-table-login">
               <img src="../img/logo.png"/>
               <h2>Parmarth Niketan Reservations Portal</h2>
                          <GoogleLogin
                              clientId={GoogleClientID}
                              buttonText="Login with Google"
                              onSuccess={this.responseGoogle}
                              onFailure={this.responseGoogle} />
                </div> 
            </div>
          );
    }
}

export default Login;
