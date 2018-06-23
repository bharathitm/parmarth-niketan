import React, { Component } from 'react';

import {API_URL} from '../config/config';

export class ErrorBoundary extends React.Component {
    constructor(){
        super()
        this.state = {
            hasError:false
        }
    }

    componentDidCatch(error, info){
        alert(error + "got called");

        this.setState({ hasError: true })
        //send to error reporting service

        const payload = {
            error_message: error.toString()
        }

        fetch(API_URL + "error/", {
            method: 'POST',
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload)      
          })
          .then((response) => {
            return checkError(response);
          });
    }

    render(){
        if (this.state.hasError){
            return (
                <div>Oh no, something went wrong! </div>
            )
        } else{
            return this.props.children
        }
        
    }
}

export default ErrorBoundary;