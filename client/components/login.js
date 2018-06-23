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
              <div>
              <h2>Test</h2>
              <p>
              Hyundai Motor Group today said it has signed an agreement with Audi AG to jointly develop electronics vehicles powered by fuel cell. Under the multi-year agreement signed on Wednesday, Hyundai’s affiliates, including Kia and Audi’s parent company Volkswagen AG, will share components, supply chains and patent licensing.
              The duration of the partnership wasn’t disclosed.

                Hyundai, the world’s fifth-largest auto maker, began to mass produce fuel cell vehicles in 2013. But in South Korea and elsewhere, wider adoption of hydrogen fuel cell vehicles has been slow largely due to a dearth of refuelling stations.
                </p>
             <GoogleLogin
                clientId="965244623378-7t6cm3inoicecl57i8sqfgfis9rroqef.apps.googleusercontent.com"
                buttonText="Login with Google"
                onSuccess={this.responseGoogle}
                onFailure={this.responseGoogle}
            />
            </div>
            
          );
    }
}

export default Login;
