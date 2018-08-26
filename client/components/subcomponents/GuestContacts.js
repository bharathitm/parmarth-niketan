import React, { Component } from 'react';

import {logError, checkError, getFormattedDate} from '../../utils/helpers';
import {API_URL} from '../../config/config';
import {fetch, store, destroy} from '../../utils/httpUtil';

import { confirmAlert } from 'react-confirm-alert';

import DatePicker from 'react-datepicker';
import {notify} from 'react-notify-toast';

export class GuestContacts extends Component {
  constructor(props) {
    super(props);

    this.state = {
        isLoaded: false,
        error: null,
        contactFirstName: '',
        contactLastName: '',
        contactPhoneNo:'',
        contactEmailId: '',
        items: []
    }; 

    this._validateOnDemand = true; 
    this.validationCheck = this.validationCheck.bind(this);
  }

  componentDidMount() {
      this.fetchGuestContactsIfExists();
  }


  fetchGuestContactsIfExists(){
    if(this.props.getReservationStore().reservationId != null)
    {
      fetch(API_URL, "gcontacts/" + this.props.getReservationStore().reservationId)
      .then((response) => {
        return checkError(response);
      })
      .then((result) => {
          this.setState({
            isLoaded: true,
            items: result
          });
        })
      .catch((error) => {
        this.setState({
          isLoaded: false,
          error
        });
        notify.show('Oops! Something went wrong! Please try again!', 'error');
        logError(this.constructor.name + " " + error);
      });
    } 
    else {
      this.setState({
        isLoaded: null
      });
    }
  }


handleDelete(gContactId){
  confirmAlert({
    title: 'Confirm to delete',
    message: 'Are you sure you want to delete this contact details?',
    buttons: [
      {
        label: 'Yes',
        onClick: () => this.deleteGuestContact(gContactId),
      },
      {
        label: 'No',
        onClick: () => false
      }
    ]
  })
  
}

deleteGuestContact(gContactId){
  destroy(API_URL, "gcontacts/" + gContactId)
    .then((response) => {
      return checkError(response);
    })
    .then((result) => {  
      notify.show('Contact details deleted successfully!', 'success');     
    })
    .catch((error) => {
      this.setState({
        isLoaded: false,
        error
      });
      notify.show('Oops! Something went wrong! Please try again!', 'error');
      logError(error);
    });

    //create a newData array which is a clone of state.items, remove the just selected entries from this newData 
      //and re-assign newData to state.items. This causes the component to re-render.
      var newData = this.state.items;

      for (var x=0; x< newData.length; x++){
          if (newData[x].guest_contact_id == gContactId){
          newData.splice(x,1);
          }
      }

      this.setState({
        items: newData
      });
}

validationCheck() {
  if (!this._validateOnDemand)
    return;

  const userInput = this._grabUserInput(); // grab user entered vals
  const validateNewInput = this._validateData(userInput); // run the new input against the validator

  this.setState(Object.assign(userInput, validateNewInput));
}

_grabUserInput() {
  return {
    contactFirstName: this.refs.fname.value,
    contactLastName: this.refs.lname.value,
    contactPhoneNo: this.refs.phone.value,
    contactEmailId: this.refs.email.value
  };
}

_validateData(data) {
  return  {
    contactFirstNameVal: (data.contactFirstName != ''),
    contactLastNameVal: (data.contactLastName != ''),
    contactPhoneNoVal: (data.contactPhoneNo != ''),
    contactEmailIdVal: ((data.contactEmailId.toString().trim() != '')? 
    (/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(data.contactEmailId))
    : true),
  };
}



handleAdd() {
  const userInput = this._grabUserInput(); // grab user entered vals
  const validateNewInput = this._validateData(userInput); // run the new input against the validator

  // if full validation passes then save to store and pass as valid
  if (Object.keys(validateNewInput).every((k) => { return validateNewInput[k] === true })) {
      this.insertGuestContactDetails();
  }
  else {
      this.setState(Object.assign(userInput, validateNewInput));
  }
}

insertGuestContactDetails(){

  const payload = {
      reservation_id: this.props.getReservationStore().reservationId,
      guest_id: this.props.getReservationStore().guestId,
      c_first_name: this.state.contactFirstName,
      c_last_name: this.state.contactLastName,
      c_phone_no: this.state.contactPhoneNo,
      c_email_id: this.state.contactEmailId
  };

  store(API_URL, "gcontacts/", JSON.stringify(payload))
  .then((response) => {
      return checkError(response);
  })
  .then((result) => {   
      this.setState({
        isLoaded: true
      });
      this.fetchGuestContactsIfExists();
  })
  .catch((error) => {
      this.setState({
        isLoaded: false,
        error
      });
      notify.show('Oops! Something went wrong! Please try again!', 'error');
      logError(error);
  });

  if (this.state.isLoaded){
    notify.show('Contact details saved successfully!', 'success');

    this.refs.fname.value = '';
    this.refs.lname.value = '';
    this.refs.phone.value = '';
    this.refs.email.value = '';
  }
}  


  render() {
           // explicit class assigning based on validation
           let notValidClasses = {};

           /* FirstName */
           if (typeof this.state.contactFirstNameVal == 'undefined' || this.state.contactFirstNameVal) {
             notValidClasses.contactFirstNameCls = 'form-control';
           }
           else {
              notValidClasses.contactFirstNameCls = 'form-control has-error';
           }
       
           /* LastName */    
           if (typeof this.state.contactLastNameVal == 'undefined' || this.state.contactLastNameVal) {
             notValidClasses.contactLastNameCls = 'form-control';
           }
           else {
              notValidClasses.contactLastNameCls = 'form-control has-error';
           }
       
           /* Phone */    
           if (typeof this.state.contactPhoneNoVal == 'undefined' || this.state.contactPhoneNoVal) {
             notValidClasses.contactPhoneNoCls = 'form-control';
           }
           else {
               notValidClasses.contactPhoneNoCls = 'form-control has-error';
           }

          /* Email */    
          if (typeof this.state.contactEmailIdVal == 'undefined' || this.state.contactEmailIdVal) {
            notValidClasses.contactEmailIdCls = 'form-control';
          }
          else {
              notValidClasses.contactEmailIdCls = 'form-control has-error';
          }

    const { error, isLoaded, items } = this.state;

    if ((!isLoaded) && (error)){
      return <div><span id="spNoDataorError">{JSON.stringify(error.message)}</span></div>;        
     } else if (isLoaded == null){
      return <div>No contacts added yet!</div>;
     }
     else if (!isLoaded) {
        return <div>Loading...</div>;
    } else {
        return (             
                    <div className = "div-table advance-table guest-contacts">
                    <div className = "div-table-row">
                              <div className ="div-table-col div-table-col-header">
                              First Name
                              </div>
                              <div className ="div-table-col div-table-col-header">
                              Last Name
                              </div>
                              <div className ="div-table-col div-table-col-header">
                              Phone No
                              </div>
                              <div className ="div-table-col div-table-col-header">
                              Email Id
                              </div>
                              <div className ="actions div-table-col div-table-col-header">
                              Actions
                              </div>
                      </div>
                    {items.map(item => (
                        <div className = "div-table-row" key={item.donation_id}>
                              <div className ="div-table-col col-bordered">
                                {item.c_first_name}
                              </div>
                              <div className ="div-table-col col-bordered">
                               {item.c_last_name}
                              </div>
                              <div className ="div-table-col col-bordered">
                                {item.c_phone_no}
                              </div>
                              <div className ="div-table-col col-bordered">
                                {item.c_email_id}
                              </div>
                              <div className ="actions div-table-col col-bordered">
                              <img src="./img/delete.png" onClick={() => this.handleDelete(item.guest_contact_id)}/>
                              </div>
                        </div>
                        ))} 

                        {/*New Input Section */}
                                  <div className = "div-table-row">
                                        <div className ="div-table-col col-bordered text-div">
                                        {/* First Name*/}
                                          <div className="form-group col-md-12 content form-block-holder">
                                                <div className="col-md-8">
                                                <input
                                                  ref="fname"
                                                  autoComplete="off"
                                                  className={notValidClasses.contactFirstNameCls}
                                                  required
                                                  onBlur={this.validationCheck} />  
                                                
                                                  </div>
                                            </div>
                                      </div>
                                      <div className ="div-table-col col-bordered text-div">
                                        {/* Last Name */}
                                          <div className="form-group col-md-12 content form-block-holder">
                                            <div className="col-md-8">
                                              <input
                                                ref="lname"
                                                autoComplete="off"
                                                className={notValidClasses.contactLastNameCls}
                                                required
                                                onBlur={this.validationCheck} />                      
                                            
                                              </div>
                                            </div>
                                        </div>
                                      <div className ="div-table-col col-bordered text-div">
                                          {/* Phone No*/}
                                        <div className="form-group col-md-12 content form-block-holder">
                                            <div className="col-md-8">
                                              <input
                                                ref="phone"
                                                type="number"
                                                autoComplete="off"
                                                className={notValidClasses.contactPhoneNoCls}
                                                required
                                                onBlur={this.validationCheck} />
                                            </div>
                                          </div>
                                        </div>

                                         <div className ="div-table-col col-bordered text-div">
                                          {/* Email Id*/}
                                        <div className="form-group col-md-12 content form-block-holder">
                                            <div className="col-md-8">
                                              <input 
                                                ref="email"
                                                autoComplete="off"
                                                type="email"
                                                className={notValidClasses.contactEmailIdCls}
                                                required
                                                onBlur={this.validationCheck} />
                                            </div>
                                          </div>
                                        </div>
                                        <div className ="actions div-table-col col-bordered text-div">
                                          {/* Actions */}
                                        <div className="form-group col-md-12 content form-block-holder">
                                            <div className="col-md-8">
                                        <img src="./img/tick.png" onClick={() => this.handleAdd()}/>
                                        </div>
                                        </div>
                                          </div>
                                        </div>
                                   </div>
        );
      }
   }
}

export default GuestContacts;
