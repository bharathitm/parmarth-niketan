import React, { Component } from 'react';

import reservationTypes from '../../constants/reservationTypes';
import sanskaras from '../../constants/sanskaras';

import { confirmAlert } from 'react-confirm-alert'; 

import DatePicker from 'react-datepicker';
import moment from 'moment';

import {logError, checkError, getFormattedDate} from '../../utils/helpers';
import {API_URL} from '../../config/config';
import { RoomBookings } from '../subcomponents/RoomBookings';

export class ReservationDetails extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoaded: false,
      error: null,
      arrivalDate: props.getStore().arrivalDate,
      departureDate: props.getStore().departureDate,
      arrivalTime: moment(),
      reservationTypeId: props.getStore().reservationTypeId,
      sanskaraId: props.getStore().sanskaraId,
      noOfPpl: props.getStore().noOfPpl,
      advanceReminderOn: '',
      comments: props.getStore().comments,
      reservationId: props.getStore().reservationId      
    };

    this.reservationStore = {
      guestId: props.getStore().guestId
    };
    

   
    this.handleAdvanceReminderChange = this.handleAdvanceReminderChange.bind(this);
    this.handleArrivalTimeChange = this.handleArrivalTimeChange.bind(this);

    this._validateOnDemand = true; // this flag enables onBlur validation as user fills forms

    this.validationCheck = this.validationCheck.bind(this);
    this.isValidated = this.isValidated.bind(this);
  }

  populateReservationTypes() {
    let items = [];   

    for (let i = 1; i <= 6; i++) {             
         items.push(<option key={i} value={i}>{reservationTypes[i]}</option>);   
    }
    return items;
  } 

  populateSanskaras() {
    let items = [];   

    for (let i = 1; i <= 5; i++) {             
         items.push(<option key={i} value={i}>{sanskaras[i]}</option>);   
    }
    return items;
  } 

  componentDidMount() {
    this.fetchReservationDetailsIfExists();

    this.refs.arrivalDate.innerHTML = this.props.getStore().arrivalDate;
    this.refs.departureDate.innerHTML = this.props.getStore().departureDate;
    //this.refs.advanceReminderOn.selected = this.props.getStore().advanceReminderOn;

    //hide Sanskara Div by default
    this.refs.divSanskara.style.visibility = "hidden";
  }

  fetchReservationDetailsIfExists(){
      if(this.props.getStore().guestId != '')
      {
        fetch(API_URL + "reservations/" + this.props.getStore().guestId)
            .then((response) => {
              return checkError(response);
            })
            .then((result) => {
                this.setState({
                  isLoaded: true,
                  items: result,
                }, function() {
                  this.loadReservationDetails();
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


  loadReservationDetails(){
    if (this.state.items.length != 0)
    {
      //this has to be validated again and fixed. works in get now but not sure about insert/update
      var aDate = moment(this.state.items[0].date_of_arrival);
      var aReminder = moment(this.state.items[0].advance_reminder_on);

      this.props.updateStore({
        reservationId: this.state.items[0].reservation_id,
        //arrivalDate: aDate.format("YYYY-MM-DD"),
        //arrivalDate: aDate,
        arrivalDate: aDate.format("YYYY-MM-DD"),
        departureDate: this.state.items[0].date_of_departure,
        noOfPpl: this.state.items[0].no_of_people,
        comments: this.state.items[0].reservation_comments,
        reservationTypeId: this.state.items[0].reservation_type_id,
        reservationStatusId: this.state.items[0].reservation_status_id,
        sanskaraId: this.state.items[0].sanskara_id,
        advanceReminderOn: (this.state.items[0].advance_reminder_on == null)? '' : aReminder,
        arrivalTime: aDate
        //arrivalTime: this.state.items[0].date_of_arrival
      });

      this.setState({
        reservationId: this.state.items[0].reservation_id,
        //arrivalDate: aDate.format("YYYY-MM-DD"),
        arrivalDate: aDate.format("YYYY-MM-DD"),
        //arrivalDate: aDate,
        departureDate: this.state.items[0].date_of_departure,
        noOfPpl: this.state.items[0].no_of_people,
        comments: this.state.items[0].reservation_comments,
        reservationTypeId: this.state.items[0].reservation_type_id,
        reservationStatusId: this.state.items[0].reservation_status_id,
        sanskaraId: this.state.items[0].sanskara_id,
        advanceReminderOn: (this.state.items[0].advance_reminder_on == null)? '' : aReminder,
        arrivalTime: aDate
        //arrivalTime: aDate.format("HH:mm")
      });

      this.refs.arrivalDate.innerHTML = aDate.format("YYYY-MM-DD");
      //this.refs.arrivalDate.value = aDate;
      this.refs.departureDate.innerHTML = this.state.items[0].date_of_departure;
      this.refs.noOfPpl.value = this.state.items[0].no_of_people;
      this.refs.comments.value = this.state.items[0].reservation_comments;
      this.refs.reservationTypeId.value = this.state.items[0].reservation_type_id;
      this.refs.arrivalTime.selected = aDate;
      this.refs.advanceReminderOn.selected = (this.state.items[0].advance_reminder_on == "null")? '' : aReminder;
      this.refs.sanskaraId.value = (this.state.items[0].sanskara_id == null)? 0 : this.state.items[0].sanskara_id;
      //this.refs.reservationStatus.innerHTML = this.state.items[0].reservation_status_id;  
      
      //show Sanskara Drop down only if load returns a SanskaraId
      if (this.refs.sanskaraId.value != 0){//Sanskara
        this.refs.divSanskara.style.visibility = "visible";
      }
      else{
        this.refs.divSanskara.style.visibility = "hidden";
      }
    }
    else {
      this.props.jumpToStep(0);
    }
  }

  

  isValidated() {

    const userInput = this._grabUserInput(); // grab user entered vals
    const validateNewInput = this._validateData(userInput); // run the new input against the validator
    let isDataValid = false;

    // if full validation passes then save to store and pass as valid
    if (Object.keys(validateNewInput).every((k) => { return validateNewInput[k] === true })) {
        if (
          this.props.getStore().arrivalTime != userInput.arrivalTime || 
          this.props.getStore().reservationTypeId != userInput.reservationTypeId ||
          this.props.getStore().noOfPpl != userInput.noOfPpl ||
          this.props.getStore().sanskaraId != userInput.sanskaraId ||
          this.props.getStore().advanceReminderOn != userInput.advanceReminderOn ||
          this.props.getStore().comments != userInput.comments
        ) { 
            // only update store of something changed
          this.props.updateStore({
            ...userInput,
            savedToCloud: false // use this to notify step4 that some changes took place and prompt the user to save again
          });  // Update store here (this is just an example, in reality you will do it via redux or flux)

          if (this.state.reservationId != ''){
            this.updateReservationDetails();
          }
          else {
              this.insertReservationDetails();
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

  insertReservationDetails(){

    var dt_arrival =  this.state.arrivalDate + " " + moment(this.state.arrivalTime).format("HH:mm").toString();
    
    const payload = {
      guest_id: this.props.getStore().guestId,
      date_of_arrival: dt_arrival,
      date_of_departure: this.state.departureDate,
      no_of_people: this.state.noOfPpl,
      reservation_comments: this.state.comments,
      reservation_type_id: this.state.reservationTypeId,
      sanskara_id: (this.state.sanskaraId == null)? 0 : this.state.sanskaraId,
      is_a_reference: '0',
      advance_reminder_on: (this.state.advanceReminderOn == '')? '' : getFormattedDate(this.state.advanceReminderOn).toString(),
      room_ids_str: window.sessionStorage.getItem('strSelectedRooms').toString()
    };

    fetch(API_URL + "reservations/", {
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
            reservationId: result[0].reservation_id
          });
          this.props.updateStore({
            reservationId: result[0].reservation_id
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

  handleAdvanceReminderChange(date) {
    this.setState({
        advanceReminderOn: date
    });
    this.refs.advanceReminderOn.selected = date;
  }

  handleArrivalTimeChange(time){
    this.setState({
      arrivalTime: time
    });
    this.refs.arrivalTime.selected = time;
  }


  updateReservationDetails(){

    var dt_arrival =  this.state.arrivalDate + " " + moment(this.state.arrivalTime).format("HH:mm").toString();

    const payload = {
      date_of_arrival: dt_arrival,
      date_of_departure: this.state.departureDate,
      no_of_people: this.state.noOfPpl,
      reservation_comments: this.state.comments,
      reservation_type_id: this.state.reservationTypeId,
      sanskara_id: (this.state.sanskaraId == null)? 0 : this.state.sanskaraId,
      advance_reminder_on: (this.state.advanceReminderOn == '')? '' : getFormattedDate(this.state.advanceReminderOn).toString()
    };

    fetch(API_URL + "reservations/" + this.state.reservationId, {
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

   _validateData(data) {
    return  {
      //arrivalTimeVal: (data.arrivalTime != ''),
      arrivalTimeVal: (data.arrivalTime == null || data.arrivalTime == undefined)? false: true,
      reservationTypeVal: (data.reservationTypeId != 0), // required: anything besides N/A
      noOfPplVal: (data.noOfPpl != ''),
      commentsVal: (true),
      advanceReminderOnVal: (true),  
      sanskaraVal: (data.reservationTypeId == 3 && data.sanskaraId == 0)? false : true

      
    }
  }

  _grabUserInput() {
    
    return {
      arrivalTime: this.refs.arrivalTime.selected,
      reservationTypeId: this.refs.reservationTypeId.value,
      sanskaraId: (this.refs.sanskaraId.value == 0)? null : this.refs.sanskaraId.value,
      noOfPpl: this.refs.noOfPpl.value,
      advanceReminderOn: this.refs.advanceReminderOn.selected,
      comments: this.refs.comments.value,
    };
  }

  handleCancel(){

    this._validateOnDemand = false;

    confirmAlert({
      title: 'Confirm to cancel',
      message: 'Are you sure you want to cancel this reservation?',
      buttons: [
        {
          label: 'Yes',
          onClick: () => this.cancelReservation(),
        },
        {
          label: 'No',
          onClick: () => false
        }
      ]
    })
  }

  cancelReservation(){

    if(this.state.reservationId != '')
    {      
      fetch(API_URL + "reservations/" + this.state.reservationId, {
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
        this.clearReservationDetails();
      }
  }

  handleReservationTypeChange(){
    if (this.refs.reservationTypeId.value == 3){//Sanskara
      this.refs.divSanskara.style.visibility = "visible";
    }
    else{
      this.refs.divSanskara.style.visibility = "hidden";
    }
  }

  clearReservationDetails(){
    this.setState({
      reservationId: '',
      arrivalTime:'',
      reservation_type_id:'',
      sanskaraId:'',
      noOfPpl:'',
      advanceReminderOn:'',
      comments:''
    });   
    
    this.props.updateStore({
      reservationId: '',
      arrivalTime:'',
      reservation_type_id:'',
      sanskaraId:'',
      noOfPpl:'',
      advanceReminderOn:'',
      comments:''
    }); 

    this.refs.arrivalTime.selected = '',
    this.refs.noOfPpl.value = '',
    this.refs.comments.value = '',
    this.refs.reservationTypeId.value = '',
    this.refs.sanskaraId.value = '',
    this.refs.advanceReminderOn.selected = ''
  }

  getReservationStore() {
    return this.reservationStore;
  }

  

  render() {

    // explicit class assigning based on validation
    let notValidClasses = {};

    /* Arrival Time */
    if (typeof this.state.arrivalTimeVal == 'undefined' || this.state.arrivalTimeVal) {
      notValidClasses.arrivalTimeCls = 'form-control';
    }
    else {
       notValidClasses.arrivalTimeCls = 'form-control has-error';
    }

    /* Reservation Type */    
    if (typeof this.state.reservationTypeVal == 'undefined' || this.state.reservationTypeVal) {
      notValidClasses.reservationTypeCls = 'form-control';
    }
    else {
       notValidClasses.reservationTypeCls = 'form-control has-error';
    }

    /* No. of People */
    if (typeof this.state.noOfPplVal == 'undefined' || this.state.noOfPplVal) {
        notValidClasses.noOfPplCls = 'form-control';
    }
    else {
       notValidClasses.noOfPplCls = 'form-control has-error';
    }

     /* Sanskara */
     if (typeof this.state.sanskaraVal == 'undefined' || this.state.sanskaraVal) {
      notValidClasses.sanskaraCls = 'form-control';
  }
  else {
     notValidClasses.sanskaraCls = 'form-control has-error';
  }

    return (
      <div className="step step3 review">
        <div className="row">
          <form id="Form" className="form-horizontal">          
                <h4>Reservation Details</h4>   
                <div className="divFloatRight">  
                <button type="button" className="btnBig" onClick={() => this.handleCancel()}>Cancel</button>   
                </div>
                      <div className="divDates">
                      {/* Arrival Date */}
                      <label className="col-md-4">
                            Arrival Date: 
                            <span ref="arrivalDate" className="spnDates" defaultValue={this.state.arrivalDate}>
                            </span>
                      </label>
                      {/* Departure Date */}
                      <label className="col-md-4">
                            Departure Date: 
                          <span ref="departureDate" className="spnDates" defaultValue={this.state.departureDate}>
                          </span>
                      </label>
                    </div>

                <div className = "div-table">
                    <div className = "div-table-row">
                          <div className ="div-table-col">
                              {/* Arrival Time */}
                              <div className="form-group col-md-12 content form-block-holder">
                                    <label className="control-label col-md-4">
                                      Arrival Time: *
                                    </label>
                                    <div className="col-md-8">
                                          <DatePicker
                                              ref="arrivalTime"
                                              selected={moment(this.state.arrivalTime)}
                                              onChange={this.handleArrivalTimeChange}
                                              onBlur={this.validationCheck}
                                              showTimeSelect
                                              showTimeSelectOnly
                                              timeIntervals={60}
                                              dateFormat="LT"
                                              timeCaption="Time"
                                              className={notValidClasses.arrivalTimeCls}
                                            />
                                    </div>
                                </div>
                            </div>
                <div className ="div-table-col">
                      {/* No. of People */}
                      <div className="form-group col-md-12 content form-block-holder">
                        <label className="control-label col-md-4">
                          No. of People: 
                        </label>
                        <div className="col-md-8">
                          <input
                            ref="noOfPpl"
                            autoComplete="off"
                            className={notValidClasses.noOfPplCls}
                            required
                            defaultValue={this.state.noOfPpl}
                            onBlur={this.validationCheck} />
                        </div>
                      </div>
                  </div>
              </div>
               <div className = "div-table-row">
                <div className ="div-table-col">
                        {/* Reservation Type */}
                        <div className="form-group col-md-12 content form-block-holder">
                            <label className="control-label col-md-4">
                            Reservation Type: *
                            </label>
                            <div className="col-md-8">
                                      <select id="slReservationTypes"
                                        ref="reservationTypeId"
                                        autoComplete="off"
                                        className={notValidClasses.reservationTypeCls}
                                        required
                                        defaultValue={this.state.reservationTypeId}
                                        onChange={() => this.handleReservationTypeChange()}
                                        onBlur={this.validationCheck}>
                                        <option value="">Please select</option>
                                        {this.populateReservationTypes()}                   
                                      </select>                      
                              </div>
                            </div>
                  </div>
                <div className ="div-table-col">
                        {/* Sanskara Type */}
                        <div ref="divSanskara" className="form-group col-md-12 content form-block-holder">
                        <label className="control-label col-md-4">
                        Sanskara:*
                        </label>
                        <div className="col-md-8">

                                  <select id="slSanskaras"
                                    ref="sanskaraId"
                                    autoComplete="off"
                                    className={notValidClasses.sanskaraCls}
                                    required
                                    defaultValue={this.state.sanskaraId}
                                    onBlur={this.validationCheck}>
                                    <option value="0">Please select</option>
                                    {this.populateSanskaras()}                   
                                  </select>                      
                          </div>
                          </div>
                  </div>
              </div>
             <div className = "div-table-row">
              <div className ="div-table-col">        
                    {/* Advance Reminder On */}
                  <div className="form-group col-md-12 content form-block-holder">
                      <label className="control-label col-md-4">
                      Advance Reminder On:
                      </label>
                      <div className="col-md-8">
                      
                      <DatePicker ref="advanceReminderOn"
                        dateFormat="YYYY-MM-DD"
                       // selected={moment(this.state.advanceReminderOn)}
                        selected={this.state.advanceReminderOn}
                        onChange={this.handleAdvanceReminderChange} 
                        className="form-control"/>
                      </div>
                    </div>
                </div>
              </div>
               <div className = "div-table-row">
                  <div className ="comments-col div-table-col">
                      {/* Comments */}
                      <div className="form-group col-md-12 content form-block-holder long-col">
                          <label className="control-label col-md-4">
                            Comments:
                          </label>
                          <div className="col-md-8">
                            <textarea
                              ref="comments"
                              autoComplete="off"
                              className="form-control"
                              onBlur={this.validationCheck}
                              defaultValue={this.state.comments} />
                          </div>
                        </div>
                    </div>
              </div>
             </div>
             <RoomBookings getReservationStore={() => (this.getReservationStore())}>
               </RoomBookings>
          </form>
        </div>
      </div>
    )
  }
}

export default ReservationDetails;
