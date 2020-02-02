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
        if(response.getBasicProfile().getEmail() != '')
        {
          fetch(BASE_URL, "users/" + response.getBasicProfile().getEmail())
              .then((response) => {
                return checkError(response);
                })
                .then((result) => {
                      if (result.length > 0)
                      {

                        var session_user_privileges = {
                          has_general_view: result[0].has_general_view,
                          has_retreat_view: result[0].has_retreat_view,
                          has_sanskara_view: result[0].has_sanskara_view,
                          has_agent_view: result[0].has_agent_view                         
                        };

                          sessionStorage.setItem('session_user_privileges', JSON.stringify(session_user_privileges));
                          sessionStorage.setItem("accessToken", response.accessToken);
                          sessionStorage.setItem("userName", response.getBasicProfile().getName());
                          sessionStorage.setItem("userId", result[0].user_id);
                          sessionStorage.setItem("roleId", result[0].role_id);

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
