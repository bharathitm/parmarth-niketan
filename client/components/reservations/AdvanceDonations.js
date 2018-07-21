import React, { Component } from 'react';

import {logError, checkError, getFormattedDate} from '../../utils/helpers';
import {API_URL} from '../../config/config';

import { confirmAlert } from 'react-confirm-alert';

import DatePicker from 'react-datepicker';
import moment from 'moment';

export class AdvanceDonations extends Component {
  constructor(props) {
    super(props);

    this.state = {
        isLoaded: false,
        error: null,
        advanceAmount: '',
        advanceReceivedOn: moment(),
        advanceReceiptNo:'',
        items: []
    }; 

    //this.handleDelete = this.handleDelete.bind(this);

    this._validateOnDemand = true; 
    this.validationCheck = this.validationCheck.bind(this);

    this.handleDateChange = this.handleDateChange.bind(this);
  }

  componentDidMount() {
   this.fetchAdvanceDonationsIfExists();
  }


  fetchAdvanceDonationsIfExists(){
    if(this.props.getReservationStore().reservationId != null)
    {
      fetch(API_URL + "advance/" + this.props.getReservationStore().reservationId)
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
        logError(this.constructor.name + " " + error);
      });
    } 
    else {
      this.setState({
        isLoaded: null
      });
    }
  }


handleDelete(donationId){
  confirmAlert({
    title: 'Confirm to delete',
    message: 'Are you sure you want to delete this donation detail?',
    buttons: [
      {
        label: 'Yes',
        onClick: () => this.deleteAdvanceDonation(donationId),
      },
      {
        label: 'No',
        onClick: () => false
      }
    ]
  })
  
}

deleteAdvanceDonation(donationId){
  fetch(API_URL + "advance/" + donationId, {
    method: 'DELETE',
    headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
      }
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

    //create a newData array which is a clone of state.items, remove the just selected entries from this newData 
      //and re-assign newData to state.items. This causes the component to re-render.
      var newData = this.state.items;

      for (var x=0; x< newData.length; x++){
          if (newData[x].donation_id == donationId){
          newData.splice(x,1);
          }
      }

      this.setState({
        items: newData
      });
}

handleDateChange(date) {
  this.setState({
    advanceReceivedOn: date
  });
  this.refs.date.selected = date;
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
    advanceReceivedOn: this.refs.date.selected,
    advanceAmount: this.refs.amount.value,
    advanceReceiptNo: this.refs.receipt.value
  };
}

_validateData(data) {
  return  {
    advanceReceivedOnVal:  (data.advanceReceivedOn == null || data.advanceReceivedOn == undefined)? false: true,
    advanceAmountVal: (data.advanceAmount != ''),
    advanceReceiptNoVal: (data.advanceReceiptNo != '') 
  };
}



handleAdd() {
  const userInput = this._grabUserInput(); // grab user entered vals
  const validateNewInput = this._validateData(userInput); // run the new input against the validator

  // if full validation passes then save to store and pass as valid
  if (Object.keys(validateNewInput).every((k) => { return validateNewInput[k] === true })) {
      this.insertAdvanceDonationDetails();
  }
  else {
      this.setState(Object.assign(userInput, validateNewInput));
  }
}

insertAdvanceDonationDetails(){

  const payload = {
      reservation_id: this.props.getReservationStore().reservationId,
      guest_id: this.props.getReservationStore().guestId,
      received_on: getFormattedDate(this.state.advanceReceivedOn).toString(),
      amount: this.state.advanceAmount,
      receipt_no: this.state.advanceReceiptNo,
      is_advance: 1
  };

  fetch(API_URL + "advance/", {
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
        isLoaded: true
      });
      this.fetchAdvanceDonationsIfExists();
  })
  .catch((error) => {
      this.setState({
        isLoaded: false,
        error
      });
      logError(error);
  });
}  


  render() {
           // explicit class assigning based on validation
           let notValidClasses = {};

           /* advanceReceivedOn */
           if (typeof this.state.advanceReceivedOnVal == 'undefined' || this.state.advanceReceivedOnVal) {
             notValidClasses.advanceReceivedOnCls = 'form-control';
           }
           else {
              notValidClasses.advanceReceivedOnCls = 'form-control has-error';
           }
       
           /* advanceAmount */    
           if (typeof this.state.advanceAmountVal == 'undefined' || this.state.advanceAmountVal) {
             notValidClasses.advanceAmountCls = 'form-control';
           }
           else {
              notValidClasses.advanceAmountCls = 'form-control has-error';
           }
       
           /* advanceReceiptNo */    
           if (typeof this.state.advanceReceiptNoVal == 'undefined' || this.state.advanceReceiptNoVal) {
             notValidClasses.advanceReceiptNoCls = 'form-control';
           }
           else {
               notValidClasses.advanceReceiptNoCls = 'form-control has-error';
           }

    const { error, isLoaded, items } = this.state;

    if ((!isLoaded) && (error)){
      return <div><span id="spNoDataorError">{JSON.stringify(error.message)}</span></div>;        
     } else if (isLoaded == null){
      return <div>No advance donations added yet!</div>;
     }
     else if (!isLoaded) {
        return <div>Loading...</div>;
    } else {
        return (             
                    <div className = "div-table advance-table">
                    <div className = "div-table-row">
                              <div className ="div-table-col div-table-col-header">
                              Received On
                              </div>
                              <div className ="div-table-col div-table-col-header">
                              Amount
                              </div>
                              <div className ="div-table-col div-table-col-header">
                              Receipt No.
                              </div>
                              <div className ="div-table-col div-table-col-header">
                              Actions
                              </div>
                      </div>
                    {items.map(item => (
                        <div className = "div-table-row" key={item.donation_id}>
                              <div className ="div-table-col col-bordered">
                                {getFormattedDate(item.received_on).toString()}
                              </div>
                              <div className ="div-table-col col-bordered">
                                {item.amount}
                              </div>
                              <div className ="div-table-col col-bordered">
                                {item.receipt_no}
                              </div>
                              <div className ="div-table-col col-bordered">
                              <img src="./img/delete.png" onClick={() => this.handleDelete(item.donation_id)}/>
                              </div>
                        </div>
                        ))} 

                        {/*New Input Section */}
                                  <div className = "div-table-row">
                                        <div className ="div-table-col">
                                        {/* Date*/}
                                          <div className="form-group col-md-12 content form-block-holder">
                                                <div className="col-md-8">
                                                <DatePicker ref="date"
                                                    dateFormat="YYYY-MM-DD"                                                    
                                                    selected={this.state.advanceReceivedOn}                             
                                                    onChange={this.handleDateChange} 
                                                    onBlur={this.validationCheck}
                                                    className={notValidClasses.advanceReceivedOnCls} />
                                                
                                                  </div>
                                            </div>
                                      </div>
                                      <div className ="div-table-col">
                                        {/* Amount*/}
                                          <div className="form-group col-md-12 content form-block-holder">
                                            <div className="col-md-8">
                                              <input
                                                ref="amount"
                                                autoComplete="off"
                                                className={notValidClasses.advanceAmountCls}
                                                required
                                                onBlur={this.validationCheck} />                      
                                            
                                              </div>
                                            </div>
                                        </div>
                                      <div className ="div-table-col">
                                          {/* Receipt No*/}
                                        <div className="form-group col-md-12 content form-block-holder">
                                            <div className="col-md-8">
                                              <input
                                                ref="receipt"
                                                autoComplete="off"
                                                className={notValidClasses.advanceReceiptNoCls}
                                                required
                                                onBlur={this.validationCheck} />
                                            </div>
                                          </div>
                                        </div>
                                        <div className ="div-table-col">
                                          {/* Receipt No*/}
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

export default AdvanceDonations;
