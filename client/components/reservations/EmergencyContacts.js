import React, { Component } from 'react';

import {logError, checkError} from '../../utils/helpers';
import {API_URL} from '../../config/config';

export class EmergencyContacts extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoaded: false,
      error: null,
      eFirstName: props.getStore().eFirstName,
      eLastName: props.getStore().eLastName,
      ePhone: props.getStore().ePhone,     
      eRelationship: props.getStore().eRelationship,
      guestEmergencyContactId: props.getStore().guestEmergencyContactId
    }; 

    this._validateOnDemand = true; // this flag enables onBlur validation as user fills forms

    this.validationCheck = this.validationCheck.bind(this);
    this.isValidated = this.isValidated.bind(this);
  }

  componentDidMount() {
   this.fetchEmergencyContactsIfExists();
  }

  fetchEmergencyContactsIfExists(){
        if(this.props.getStore().guestId != '')
        {
          fetch(API_URL + "econtacts/" + this.props.getStore().guestId)
              .then((response) => {
                return checkError(response);
              })
              .then((result) => {
                  this.setState({
                    isLoaded: true,
                    items: result,
                  }, function() {
                    this.loadEmergencyContactDetails();
                  }
                );        
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

  loadEmergencyContactDetails(){
    if (this.state.items.length != 0)
    {
      this.props.updateStore({
        guestEmergencyContactId: this.state.items[0].guest_emergency_contact_id,
        eFirstName: this.state.items[0].first_name,
        eLastName: this.state.items[0].last_name,
        ePhone: this.state.items[0].phone_no,
        eRelationship: this.state.items[0].relationship
      });

      this.setState({
        guestEmergencyContactId: this.state.items[0].guest_emergency_contact_id,
        eFirstName: this.state.items[0].first_name,
        eLastName: this.state.items[0].last_name,
        ePhone: this.state.items[0].phone_no,
        eRelationship: this.state.items[0].relationship
      });

      this.refs.eFirstName.value = this.state.items[0].first_name,
      this.refs.eLastName.value = this.state.items[0].last_name,
      this.refs.ePhone.value = this.state.items[0].phone_no,
      this.refs.eRelationship.value = this.state.items[0].relationship
    }
  }


  isValidated() {
    const userInput = this._grabUserInput(); // grab user entered vals
    const validateNewInput = this._validateData(userInput); // run the new input against the validator
    let isDataValid = false;

    // if full validation passes then save to store and pass as valid
    if (Object.keys(validateNewInput).every((k) => { return validateNewInput[k] === true })) {
        if (
          this.props.getStore().eFirstName != userInput.eFirstName 
        || this.props.getStore().eLastName != userInput.eLastName
        || this.props.getStore().ePhone != userInput.ePhone
        || this.props.getStore().eRelationship != userInput.eRelationship
        ) { // only update store of something changed
          this.props.updateStore({
            ...userInput,
            savedToCloud: false // use this to notify step4 that some changes took place and prompt the user to save again
          });  // Update store here (this is just an example, in reality you will do it via redux or flux)

          if (this.state.guestEmergencyContactId != ''){
            this.updateEmergencyContactData();
          }
          else {
              this.insertEmergencyContactData();
          }
        }
        isDataValid = true;
    }
    else {
        // if anything fails then update the UI validation state but NOT the UI Data State
        this.setState(Object.assign(userInput, validateNewInput));
    }

    return isDataValid;
  }

  _grabUserInput() {
    return {
      eFirstName: this.refs.eFirstName.value,
      eLastName: this.refs.eLastName.value,
      ePhone: this.refs.ePhone.value,
      eRelationship: this.refs.eRelationship.value,
    };
  }

  _validateData(data) {
    return  {
      eFirstNameVal: (data.eFirstName != ''),
      eLastNameVal: (data.eLastName != ''),
      ePhoneVal: (data.ePhone != ''),
      eRelationshipVal: (data.eRelationship != '')
    }
  }

  insertEmergencyContactData(){

        const payload = {
          guest_id: this.props.getStore().guestId,
          first_name: this.state.eFirstName,
          last_name: this.state.eLastName,
          phone_no: this.state.ePhone,
          relationship: this.state.eRelationship
        };

        fetch(API_URL + "econtacts/", {
          method: 'POST',
          headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload)
        })
        .then((response) => {
          return checkError(response);
        })
        .then((result) => {   
              this.setState({
                isLoaded: true,
                guestEmergencyContactId: result[0].guest_emergency_contact_id
              });
              this.props.updateStore({
                guestEmergencyContactId: result[0].guest_emergency_contact_id
              });     
        })
        .catch((error) => {
          this.setState({
            isLoaded: false,
            error
          });
          logError(error);
        });
   }

   updateEmergencyContactData(){

    const payload = {
      guest_emergency_contact_id: this.state.guestEmergencyContactId,
      first_name: this.state.eFirstName,
      last_name: this.state.eLastName,
      phone_no: this.state.ePhone,
      relationship: this.state.eRelationship
    };


    fetch(API_URL + "econtacts/" + this.state.guestEmergencyContactId, {
      method: 'POST',
      headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload)
    })
    .then((response) => {
      return checkError(response);
    })
    .catch((error) => {
      this.setState({
        isLoaded: false,
        error
      });
      logError(error);
    });
   }

  validationCheck() {
    if (!this._validateOnDemand)
      return;

    const userInput = this._grabUserInput(); // grab user entered vals
    const validateNewInput = this._validateData(userInput); // run the new input against the validator

    this.setState(Object.assign(userInput, validateNewInput));
  }


  render() {
    // explicit class assigning based on validation
    let notValidClasses = {};

    /* First Name */
    if (typeof this.state.eFirstNameVal == 'undefined' || this.state.eFirstNameVal) {
      notValidClasses.eFirstNameCls = 'form-control';
    }
    else {
       notValidClasses.eFirstNameCls = 'form-control has-error';
    }

    /* Last Name */    
    if (typeof this.state.eLastNameVal == 'undefined' || this.state.eLastNameVal) {
      notValidClasses.eLastNameCls = 'form-control';
    }
    else {
       notValidClasses.eLastNameCls = 'form-control has-error';
    }

    /* Phone */    
    if (typeof this.state.ePhoneVal == 'undefined' || this.state.ePhoneVal) {
      notValidClasses.ePhoneCls = 'form-control';
    }
    else {
        notValidClasses.ePhoneCls = 'form-control has-error';
    }

    /* Relationship */    
    if (typeof this.state.eRelationshipVal == 'undefined' || this.state.eRelationshipVal) {
      notValidClasses.eRelationshipCls = 'form-control';
    }
    else {
        notValidClasses.eRelationshipCls = 'form-control has-error';
    }

    return (
      <div className="step step3">
        <div className="row">
          <form id="Form" className="form-horizontal">          
                <h4>Guest's Emergency Contact Details</h4>        
                <div className = "div-table">
                    <div className = "div-table-row">
                          <div className ="div-table-col">
                   {/* First Name */}
                    <div className="form-group col-md-12 content form-block-holder">
                          <label className="control-label col-md-4">
                            First Name:*
                          </label>
                          <div className="col-md-8">
                            <input
                              ref="eFirstName"
                              autoComplete="off"
                              className={notValidClasses.eFirstNameCls}
                              required
                              defaultValue={this.state.eFirstName}
                              onBlur={this.validationCheck} />
                            </div>
                      </div>
              </div>
                <div className ="div-table-col">
                   {/* Last Name */}
                    <div className="form-group col-md-12 content form-block-holder">
                      <label className="control-label col-md-4">
                        Last Name:*
                      </label>
                      <div className="col-md-8">
                        <input
                          ref="eLastName"
                          autoComplete="off"
                          className={notValidClasses.eLastNameCls}
                          required
                          defaultValue={this.state.eLastName}
                          onBlur={this.validationCheck} />                      
                        </div>
                      </div>
                </div>
            </div>
             <div className = "div-table-row">
                <div className ="div-table-col">
                    {/* Phone */}
                  <div className="form-group col-md-12 content form-block-holder">
                      <label className="control-label col-md-4">
                        Phone: *
                      </label>
                      <div className="col-md-8">
                        <input
                          type="number"
                          ref="ePhone"
                          autoComplete="off"
                          className={notValidClasses.ePhoneCls}
                          required
                          defaultValue={this.state.ePhone}
                          onBlur={this.validationCheck} />
                      </div>
                    </div>
                </div>
                  <div className ="div-table-col">
                      {/* Relationship */}
                      <div className="form-group col-md-12 content form-block-holder">
                          <label className="control-label col-md-4">
                            Relationship: *
                          </label>
                          <div className="col-md-8">
                            <input
                              ref="eRelationship"
                              autoComplete="off"
                              className={notValidClasses.eRelationshipCls}
                              required
                              defaultValue={this.state.eRelationship}
                              onBlur={this.validationCheck} />
                            </div>
                        </div>
                  </div>
            </div>
                          </div>
          </form>
        </div>
      </div>
    )
  }
}

export default EmergencyContacts;
