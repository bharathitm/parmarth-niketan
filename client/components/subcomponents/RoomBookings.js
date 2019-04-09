import React, { Component } from 'react';

import DatePicker from 'react-datepicker';
import moment from 'moment';
import {blocks, floors} from '../../constants/roomAttributes';

import {logError, checkError, getFormattedDate} from '../../utils/helpers';
import {API_URL} from '../../config/config';
import {fetch, store, destroy} from '../../utils/httpUtil';
import { confirmAlert } from 'react-confirm-alert';
import {notify} from 'react-notify-toast';

export class RoomBookings extends Component {

    constructor(props) {
      super(props);

      this.state = {
        items: [],
        isLoaded: false,
        error: null,
        hasRoomBookings: false,
        dDAtes: [
            {}
          ]
      };

      this._validateOnDemand = true;
      this.validationCheck = this.validationCheck.bind(this);

      this.handleDateChange = this.handleDateChange.bind(this);

      this.handleDeleteAllRoomBookings = this.handleDeleteAllRoomBookings.bind(this);
      this.handleDeleteWLRoomBookings = this.handleDeleteWLRoomBookings.bind(this);
    }

    componentDidMount() {
        this.fetchRoomBookingsIfExists();
    }

    fetchRoomBookingsIfExists(){
        if(this.props.getReservationStore().reservationId != null)
        {
          fetch(API_URL, "roombookings/" + this.props.getReservationStore().reservationId)
              .then((response) => {
                return checkError(response);
              })
              .then((result) => {
                  this.setState({
                    isLoaded: true,
                    hasRoomBookings: true,
                    items: result
                    });

                    var depDates = [];

                    var totalAmount = 0;
                    var totalBeds = 0;

                    for (var i = 0; i < this.state.items.length; i++)
                    {
                        depDates.push(this.state.items[i].date_of_departure);
                        totalAmount += parseFloat(this.state.items[i].room_rent);
                        totalBeds += parseFloat(this.state.items[i].total_beds);
                    }

                    this.refs.totalAmount.innerHTML = totalAmount;
                    this.refs.totalBeds.innerHTML = totalBeds;

                    this.setState({
                          dDAtes: depDates
                    });
                  })
                .catch((error) => {
                  this.setState({
                    isLoaded: false,
                    hasRoomBookings:false,
                    error
                  });
                  notify.show('Oops! Something went wrong! Please try again!', 'error');
                  logError(this.constructor.name + " " + error);
                });
          }
    }


    handleDateChange(date, index) {
        var newArray = this.state.dDAtes;
        newArray[index] = date;
        this.setState({
          dDates: newArray
        });
        this.refs[index].selected = moment(date);
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

    handleUpdateRoomBooking(room_booking_id){

        const payload = {
            room_booking_id: room_booking_id,
            date_of_departure: document.getElementById(room_booking_id).value
        };

        store(API_URL, "roombookings/", JSON.stringify(payload))
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
            notify.show('Oops! Something went wrong! Please try again!', 'error');
            logError(error);
        });

        if (this.state.isLoaded){
            notify.show('Room booking updated successfully!', 'success');
          }
    }


    handleDeleteRoomBooking(room_booking_id){

        confirmAlert({
            title: 'Confirm to remove',
            message: 'Are you sure you want to remove this room from the reservation?',
            buttons: [
              {
                label: 'Yes',
                onClick: () => this.deleteRoomBooking(room_booking_id),
              },
              {
                label: 'No',
                onClick: () => false
              }
            ]
          })
        }

        deleteRoomBooking(room_booking_id){
            destroy(API_URL, "roombookings/" + room_booking_id)
                .then((response) => {
                  return checkError(response);
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
                    notify.show('Room removed from the reservation successfully!', 'success');
                  }

                //create a newData array which is a clone of state.items, remove the just selected entries from this newData
                  //and re-assign newData to state.items. This causes the component to re-render.
                  var newData = this.state.items;

                  for (var x=0; x< newData.length; x++){
                      if (newData[x].room_booking_id == room_booking_id){
                      newData.splice(x,1);
                      }
                  }

                  if (newData.length == 0){
                      this.setState({
                          hasRoomBookings: false
                        });
                  }

                  var totalAmount = 0;
                  var totalBeds = 0;

                  for (var i = 0; i < newData.length; i++)
                  {
                      totalAmount += parseFloat(newData[i].room_rent);
                      totalBeds += parseFloat(newData[i].total_beds);
                  }

                  this.refs.totalAmount.innerHTML = totalAmount;
                  this.refs.totalBeds.innerHTML = totalBeds;

                  this.setState({
                    items: newData
                  });
        }

        handleDeleteAllRoomBookings(){

            this._validateOnDemand = false;

            confirmAlert({
              title: 'Confirm to cancel',
              message: 'Are you sure you want to remove all ' + this.state.items.length + ' room bookings for this current reservation?',
              buttons: [
                {
                  label: 'Yes',
                  onClick: () => this.removeAllRooms(),
                },
                {
                  label: 'No',
                  onClick: () => false
                }
              ]
            })
          }

          removeAllRooms(){
            if(this.props.getReservationStore().reservationId != null)
            {
                destroy(API_URL, "roombookings/1?rId=" + this.props.getReservationStore().reservationId)

                .then((response) => {
                  return checkError(response);
                })
                .then((result) => {
                    notify.show('All rooms removed successfully', 'success');
                  })
                .catch((error) => {
                  this.setState({
                    isLoaded: false,
                    error
                  });
                  notify.show('Oops! Something went wrong! Please try again!', 'error');
                  logError(error);
                });
                this.fetchRoomBookingsIfExists();
              }
          }

          handleDeleteWLRoomBookings(){

            this._validateOnDemand = false;

            confirmAlert({
              title: 'Confirm to cancel',
              message: 'Are you sure you want to remove all the Wait List room bookings for this current reservation?',
              buttons: [
                {
                  label: 'Yes',
                  onClick: () => this.removeWLRooms(),
                },
                {
                  label: 'No',
                  onClick: () => false
                }
              ]
            })
          }

          removeWLRooms(){
            if(this.props.getReservationStore().reservationId != null)
            {
                destroy(API_URL, "roombookings/2?rId=" + this.props.getReservationStore().reservationId)

                .then((response) => {
                  return checkError(response);
                })
                .then((result) => {
                    notify.show('All Wait List rooms removed successfully', 'success');
                  })
                .catch((error) => {
                  this.setState({
                    isLoaded: false,
                    error
                  });
                  notify.show('Oops! Something went wrong! Please try again!', 'error');
                  logError(error);
                });
                this.fetchRoomBookingsIfExists();
              }
          }


    render() {

    let notValidClasses = {};

    const arrRoomNos = this.state.items.map((item) => {
      return (
        item.room_no
      );
    });

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

    if (this.state.items.length == 0){
        return  (
            <div id="divRoomBookings">
            No rooms booked yet!
            </div>
        );
    } else {

        return (
            <div id="divRoomBookings" style={{ visibility: this.state.hasRoomBookings? 'visible':'hidden', display: this.state.hasRoomBookings? 'inline':'none' }}>
                 <table style={{width: '100%'}}>
                   <tbody>
                   <tr>
                     <td style={{width: '80%'}}>
             <div className = "div-table advance-table">
                    <div className = "div-table-row">
                              <div className ="room-no div-table-col div-table-col-header">
                              Room No.
                              </div>
                              <div className ="details div-table-col div-table-col-header">
                              Details
                              </div>
                              <div className ="dates div-table-col div-table-col-header">
                                 From
                              </div>
                              <div className ="dates div-table-col div-table-col-header">
                                 To
                              </div>
                              <div className ="dates div-table-col div-table-col-header">
                                 Available Till
                              </div>
                              <div className ="actions div-table-col div-table-col-header">
                              Actions
                              </div>
                      </div>
                    {this.state.items.map(item => (
                        <div className = "div-table-row">
                              <div className ="room-no div-table-col col-bordered">
                               {item.room_no}
                              </div>
                              <div className ="details div-table-col col-bordered">
                                {floors[item.floor_no] +", " + blocks[item.block_id] + ", " + item.total_beds + " beds"}
                              </div>
                              <div className ="dates div-table-col col-bordered">
                                  {getFormattedDate(item.date_of_arrival)}
                              </div>
                              <div className ="dates div-table-col col-bordered">
                              <DatePicker id={item.room_booking_id.toString()} ref={this.state.items.indexOf(item)}
                                    dateFormat="YYYY-MM-DD"
                                    minDate={moment(item.date_of_arrival)}
                                    maxDate={(item.next_arrival_date == null)? null: item.next_arrival_date}
                                    selected={moment(this.state.dDAtes[this.state.items.indexOf(item)])}
                                    onChange={(value) => this.handleDateChange(value, this.state.items.indexOf(item))}
                                    className="form-control"/>
                              </div>
                              <div className ="dates div-table-col col-bordered">
                               {item.next_arrival_date == null? "Available" : getFormattedDate(item.next_arrival_date)}
                              </div>
                              <div className ="actions div-table-col col-bordered">
                              <img src="./img/edit.png" onClick={() => this.handleUpdateRoomBooking(item.room_booking_id)}/> &nbsp;
                              <img src="./img/delete.png" onClick={() => this.handleDeleteRoomBooking(item.room_booking_id)}/>
                              </div>
                        </div>
                        ))}
                    </div>

                    </td>
                     <td style={{width: '20%', fontSize: '10pt'}}>
                       <div> 
                      <span className="spReservationDetails">Total Amount: &#8377; <span ref="totalAmount"></span></span>
                      <br/>
                      <span className="spReservationDetails">Total Beds: <span ref="totalBeds"></span></span>   
                    </div>
                    <div>
                      <a onClick={() => this.handleDeleteAllRoomBookings()}>Remove all rooms?</a> <br/>
                      <a style={{
                          visibility: arrRoomNos.includes("WL") == true ? 'visible':'hidden', 
                          display: arrRoomNos.includes("WL") == true? 'inline':'none' }} 
                          onClick={() => this.handleDeleteWLRoomBookings()}>
                          Remove Waiting List rooms?
                      </a>        
                    </div>

                     </td>
                   </tr>
                   </tbody>
                  </table>

            </div>
            );
        }
    }
}


export default RoomBookings;