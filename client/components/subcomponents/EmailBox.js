import React, { Component } from 'react';

import {logError, checkError} from '../../utils/helpers';
import {API_URL} from '../../config/config';
import {store} from '../../utils/httpUtil';


import {notify} from 'react-notify-toast';

export class EmailBox extends Component {
  constructor(props) {
    super(props);

    this.state = {
  
    }


    this._validateOnDemand = true; 
    this.validationCheck = this.validationCheck.bind(this);
    this.validateContent = this.validateContent.bind(this);

    this.sendEmail = this.sendEmail.bind(this);
  }

  validationCheck() {
    if (!this._validateOnDemand)
      return;

    const userInput = this._grabUserInput(); 
    const validateNewInput = this._validateData(userInput); 

    this.setState(Object.assign(userInput, validateNewInput));
  }

  _grabUserInput() {
    return {
        emailSub: (this.refs.emailSub.value.toString().trim() != '')? this.refs.emailSub.value : null,
        emailContent: (this.refs.emailBox.value.toString().trim() != '')? this.refs.emailBox.value : null
    };
  }

  _validateData(data) {
    return  {
      emailSubVal: (data.emailSub == null || data.emailSub == undefined)? false: true,
      emailContentVal: (data.emailContent == null || data.emailContent == undefined)? false: true
    };
  }

  validateContent() {

    const userInput = this._grabUserInput(); 
    const validateNewInput = this._validateData(userInput); 
    let isDataValid = false;

    if (Object.keys(validateNewInput).every((k) => { return validateNewInput[k] === true })) {

        if (this.state.emailContent != null){
          this.sendEmail();
        }
    }
    else {
        this.setState(Object.assign(userInput, validateNewInput));
    }

    return isDataValid;
  }

  sendEmail(){
    const payload = {
      name: this.props.name,
      to:  this.props.emailId,      
      subject: this.state.emailSub.toString().trim(),
      content: this.state.emailContent.toString().trim()      
    };

    store(API_URL, "email/", JSON.stringify(payload))
    .then((response) => {
      return checkError(response);
    })
    .then(
        (result) => {
          this.props.forClose();
          notify.show('Email successfully sent!', 'success');
    })
    .catch((error) => {
      this.setState({
        error
      });
      notify.show('Oops! Something went wrong! Please try again!', 'error');
      logError(error);
    });
  }


render() {
    let notValidClasses = {};

    if (typeof this.state.emailSubVal == 'undefined' || this.state.emailSubVal) {
        notValidClasses.emailSubCls = 'form-control';
    }
    else {
        notValidClasses.emailSubCls = 'form-control has-error';
    }

    if (typeof this.state.emailContentVal == 'undefined' || this.state.emailContentVal) {
        notValidClasses.emailContentCls = 'form-control';
    }
    else {
        notValidClasses.emailContentCls = 'form-control has-error';
    }
    
    return (
            
    <div>
      To: {this.props.name + " <" + this.props.emailId + ">"}
      <br/>
      Subject: <br/>
      <textarea style={{width:'90%', height:'20px'}}
            ref="emailSub"
            autoComplete="off"
            defaultValue ="Inquiry"
            className={notValidClasses.emailSubCls}
            required
            onBlur={this.validationCheck} />
    <br/>
      Content: <br/>
        <textarea style={{width:'90%', height:'200px'}}
            ref="emailBox"
            autoComplete="off"
            className={notValidClasses.emailContentCls}
            required
            onBlur={this.validationCheck} />

<button type="button" className="btnCheckOut btnBig" onClick={() => 
                    { this.validateContent(); 
                      }}>Send</button>
    </div>  
)}

}

export default EmailBox;