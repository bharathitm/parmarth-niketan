import React from 'react';

import { GoogleLogin } from 'react-google-login';

import {logError, checkError} from '../utils/helpers';
import {API_URL, GoogleClientID} from '../config/config';
import {notify} from 'react-notify-toast';


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

    failedLogin(){
        window.sessionStorage.removeItem('accessToken');
        window.sessionStorage.removeItem('userName');
        
        notify.show("User doesn't have access to portal!", "error");

        setTimeout(this.redirectAgain, 3000)
    }

    redirectAgain(){    
        document.location.href = "https://www.google.com/accounts/Logout?continue=https://appengine.google.com/_ah/logout?continue=" + API_URL.substring(0,(API_URL).length-5);
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
                           this.failedLogin();
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
