import React, { Component } from 'react';

import DatePicker from 'react-datepicker';
import moment from 'moment';
import blocks from '../../constants/blocks';
import floors from '../../constants/floors';

import {logError, checkError, getFormattedDate} from '../../utils/helpers';
import {API_URL} from '../../config/config';

export class RoomBookings extends Component {

    constructor(props) {
      super(props);
  
      this.state = {
        items: [],
        isLoaded: false,
        error: null,
        hasRoomBookings: false
      }; 

      this._validateOnDemand = true; // this flag enables onBlur validation as user fills forms

      this.validationCheck = this.validationCheck.bind(this);
  
      this.handleDateChange = this.handleDateChange.bind(this);
    }

    componentDidMount() {
        this.fetchRoomBookingsIfExists();
    }

    fetchRoomBookingsIfExists(){
        if(this.props.getReservationStore().guestId != '')
        {
          fetch(API_URL + "roombookings/" + this.props.getReservationStore().guestId)
              .then((response) => {
                return checkError(response);
              })
              .then((result) => {
                  this.setState({
                    isLoaded: true,
                    hasRoomBookings: true,
                    items: result
                    });
                  })
                .catch((error) => {
                  this.setState({
                    isLoaded: false,
                    hasRoomBookings:false,
                    error
                  });
                  logError(this.constructor.name + " " + error);
                });
          }
    }
    

    handleDateChange(e, room_booking_id, date_of_departure, next_arrival_date) {

        //alert(e.selected);

        // if (moment(date_of_departure) > moment(next_arrival_date)){
        //     alert("cannot be extended");
        // }

        // this.setState({
        //   advanceReceivedOn: date
        // });
        //this.refs[room_booking_id].selected = moment(date_of_departure);
         document.getElementById(room_booking_id).value = moment(date_of_departure);

         
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

        fetch(API_URL + "roombookings/", {
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
     
    
    handleDeleteRoomBooking(room_booking_id){

        fetch(API_URL + "roombookings/" + room_booking_id, {
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
                if (newData[x].room_booking_id == room_booking_id){
                newData.splice(x,1);
                }
            }

            if (newData.length == 0){
                this.setState({
                    hasRoomBookings: false
                  });
            }

            this.setState({
              items: newData
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

    if (this.state.items.length == 0){
        return  (
            <div id="divRoomBookings">
            No rooms booked yet!
            </div>
        );
    } else {
        return (  
            <div id="divRoomBookings" style={{ visibility: this.state.hasRoomBookings? 'visible':'hidden', display: this.state.hasRoomBookings? 'inline':'none' }}>
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
                                {floors[item.floor_no]},  
                                {blocks[item.block_id]}, 
                                {item.total_beds} beds
                              </div>
                              <div className ="dates div-table-col col-bordered">
                                  {getFormattedDate(item.date_of_arrival)}                             
                              </div>
                              <div className ="dates div-table-col col-bordered">
                              <DatePicker id={item.room_booking_id.toString()} refs={item.room_booking_id}
                                  dateFormat="YYYY-MM-DD"
                                  selected={moment(item.date_of_departure)} 
                                  onChange={() => this.handleDateChange(this, item.room_booking_id, item.date_of_departure, item.next_arrival_date)}                            
                                  className="form-control"/>
                              </div>
                              <div className ="dates div-table-col col-bordered">
                               {item.next_arrival_date == null? "Available" : getFormattedDate(item.next_arrival_date)} 
                              </div>
                              <div className ="actions div-table-col col-bordered">
                              <img src="./img/tick.png" onClick={() => this.handleUpdateRoomBooking(item.room_booking_id)}/>
                              <img src="./img/delete.png" onClick={() => this.handleDeleteRoomBooking(item.room_booking_id)}/>
                              </div>
                        </div>
                        ))}  
                    </div>
            </div>
            );
        }
    }
}


export default RoomBookings;