import React, { Component } from 'react';

import {logError, checkError, getFormattedDate} from '../../utils/helpers';
import {API_URL} from '../../config/config';
import {fetch, store, destroy} from '../../utils/httpUtil';

import { confirmAlert } from 'react-confirm-alert';

import DatePicker from 'react-datepicker';
import moment from 'moment';
import {notify} from 'react-notify-toast';

export class AdvanceDonations extends Component {
  constructor(props) {
    super(props);

    this.state = {
        isLoaded: false,
        error: null,
        advanceAmount: '',
        advanceReceivedOn: null,
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
      fetch(API_URL, "advance/" + this.props.getReservationStore().reservationId)
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
    destroy(API_URL, "advance/" + donationId)
      .then((response) => {
        return checkError(response);
      })
      .then((result) => {  
        notify.show('Advance Donation details deleted successfully!', 'success');     
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
        is_advance: 1,
        comments: this.refs.comments.value,
        user_id: sessionStorage.getItem('userId')
    };

    store(API_URL, "advance/", JSON.stringify(payload))
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
        notify.show('Oops! Something went wrong! Please try again!', 'error');
        logError(error);
    });

    if (this.state.isLoaded){
      notify.show('Advance Donation details saved successfully!', 'success');
      this.setState({
        advanceReceivedOn: null
      });
      this.refs.amount.value = '';
      this.refs.receipt.value = '';
      this.refs.comments.value = '';
    }
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

    const { isLoaded, items } = this.state;

   if (isLoaded == null){
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
                              Donation Amount
                              </div>
                              <div className ="div-table-col div-table-col-header">
                              Receipt No.
                              </div>
                              <div className ="comments div-table-col div-table-col-header">
                              Comments
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
                              &#8377; {item.amount.toLocaleString('en-IN')}
                              </div>
                              <div className ="div-table-col col-bordered">
                                {item.receipt_no}
                              </div>
                              <div className ="comments div-table-col col-bordered">
                                {item.comments}
                              </div>
                              <div className ="div-table-col col-bordered">
                              <img src="./img/delete.png" onClick={() => this.handleDelete(item.donation_id)}/>
                              </div>
                        </div>
                        ))} 

                        {/*New Input Section */}
                                  <div className = "div-table-row">
                                        <div className ="div-table-col col-bordered text-div">
                                        {/* Date*/}
                                          <div className="form-group col-md-12 content form-block-holder">
                                                <div className="col-md-8">
                                                <DatePicker ref="date"
                                                    dateFormat="YYYY-MM-DD"                                                    
                                                    selected={this.state.advanceReceivedOn}                             
                                                    onChange={this.handleDateChange} 
                                                    onBlur={this.validationCheck}
                                                    maxDate={moment()}
                                                    className={notValidClasses.advanceReceivedOnCls} />
                                                
                                                  </div>
                                            </div>
                                      </div>
                                      <div className ="div-table-col col-bordered text-div">
                                        {/* Amount*/}
                                          <div className="form-group col-md-12 content form-block-holder">
                                            <div className="col-md-8">
                                              <input
                                                ref="amount"
                                                type="number"
                                                autoComplete="off"
                                                className={notValidClasses.advanceAmountCls}
                                                required
                                                onBlur={this.validationCheck} />                      
                                            
                                              </div>
                                            </div>
                                        </div>
                                      <div className ="div-table-col col-bordered text-div">
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

                                         <div className ="comments div-table-col col-bordered text-div">
                                          {/* Comments*/}
                                        <div className="form-group col-md-12 content form-block-holder">
                                            <div className="col-md-8">
                                              <textarea 
                                                ref="comments"
                                                autoComplete="off"
                                                className="form-control advance-textarea" />
                                            </div>
                                          </div>
                                        </div>
                                        <div className ="div-table-col col-bordered text-div">
                                          {/* Actions */}
                                        <div className="form-group col-md-12 content form-block-holder">
                                            <div className="col-md-8">
                                        <img src="./img/edit.png" onClick={() => this.handleAdd()}/>
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
