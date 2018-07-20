import React, { Component } from 'react';

import DatePicker from 'react-datepicker';
import moment from 'moment';

import {logError, checkError, getFormattedDate} from '../../utils/helpers';
import {API_URL} from '../../config/config';

export class AdvanceDonationsInput extends Component {

    constructor(props) {
      super(props);
  
      this.state = {
        advanceAmount: '',
        advanceReceivedOn: moment(),
        advanceReceiptNo:'',
        items: [],
        isLoaded: false,
        error: null
      }; 

      this._validateOnDemand = true; // this flag enables onBlur validation as user fills forms

      this.validationCheck = this.validationCheck.bind(this);
  
      this.handleDateChange = this.handleDateChange.bind(this);
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
            reservation_id: this.props.getStore().reservationId,
            guest_id: this.props.getStore().guestId,
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

        return (  

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
                      className={notValidClasses.advanceReceivedOnCls}/>
                  
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
        )
    }
}


export default AdvanceDonationsInput;