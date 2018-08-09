import React, {Component } from 'react';

import {reservationTypes, sanskaras, reservationStatuses} from '../../constants/roomAttributes';

import { confirmAlert } from 'react-confirm-alert'; 

import DatePicker from 'react-datepicker';
import moment from 'moment';

import {logError, checkError, getFormattedDate} from '../../utils/helpers';
import {API_URL} from '../../config/config';
import {fetch, store, destroy} from '../../utils/httpUtil';
import { RoomBookings } from '../subcomponents/RoomBookings';

import Collapsible from 'react-collapsible';
import { AdvanceDonations } from './AdvanceDonations';
import {notify} from 'react-notify-toast';

export class ReservationDetails extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoaded: false,
      error: null,
      arrivalDate: props.getStore().arrivalDate,
      departureDate: props.getStore().departureDate,
      arrivalTime: '',
      reservationTypeId: props.getStore().reservationTypeId,
      sanskaraId: props.getStore().sanskaraId,
      noOfPpl: props.getStore().noOfPpl,
      advanceReminderOn: '',
      comments: props.getStore().comments,
      reservationId: props.getStore().reservationId      
    };

    this.reservationStore = {
      guestId: props.getStore().guestId,
      reservationId: props.getStore().reservationId
    };
      
    this.handleAdvanceReminderChange = this.handleAdvanceReminderChange.bind(this);
    this.handleArrivalTimeChange = this.handleArrivalTimeChange.bind(this);

    this._validateOnDemand = true; 

    this.validationCheck = this.validationCheck.bind(this);
    this.isValidated = this.isValidated.bind(this);

    this.changeCollapsibleOverflow = this.changeCollapsibleOverflow.bind(this);
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
    if (this.props.getStore().guestId != null){
      this.fetchReservationDetailsIfExists();
      document.getElementById("next-button").style.marginTop = "0em";
    }
   
    this.refs.arrivalDate.innerHTML = moment(this.props.getStore().arrivalDate).format('MMMM Do YYYY');
    this.refs.departureDate.innerHTML = moment(this.props.getStore().departureDate).format('MMMM Do YYYY');

    //hide Sanskara Div by default
    this.refs.divSanskara.style.visibility = "hidden";
  }

  fetchReservationDetailsIfExists(){
      if(this.props.getStore().reservationId != null)
      {
        fetch(API_URL, "reservations/" + this.props.getStore().reservationId)
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
                notify.show('Oops! Something went wrong! Please try again!', 'error');
                logError(this.constructor.name + " " + error);
              });
        }
  }


  loadReservationDetails(){

    let items = this.state.items;

    if (items.length != 0)
    {
      var aDate = moment(items[0].date_of_arrival);
      var aReminder = moment(items[0].advance_reminder_on);

      this.props.updateStore({
        reservationId: items[0].reservation_id,
        arrivalDate: aDate.format("YYYY-MM-DD"),
        departureDate: items[0].date_of_departure,
        noOfPpl: items[0].no_of_people,
        comments: (items[0].reservation_comments == null)? '': items[0].reservation_comments,
        reservationTypeId: items[0].reservation_type_id,
        reservationStatusId: items[0].reservation_status_id,
        sanskaraId: (items[0].sanskara_id == null)? 0 : items[0].sanskara_id,
        advanceReminderOn: (items[0].advance_reminder_on == null)? '' : aReminder,
        arrivalTime: aDate
      });

      this.setState({
        reservationId: items[0].reservation_id,
        arrivalDate: aDate.format("YYYY-MM-DD"),
        departureDate: items[0].date_of_departure,
        noOfPpl: items[0].no_of_people,
        comments: (items[0].reservation_comments == null)? '': items[0].reservation_comments,
        reservationTypeId: items[0].reservation_type_id,
        reservationStatusId: items[0].reservation_status_id,
        sanskaraId: (items[0].sanskara_id == null)? 0 : items[0].sanskara_id,
        advanceReminderOn: (items[0].advance_reminder_on == null)? '' : aReminder,
        arrivalTime: aDate
      });

    
      this.refs.arrivalDate.innerHTML = moment(aDate.format("YYYY-MM-DD")).format('MMMM Do YYYY');
      this.refs.departureDate.innerHTML = moment(items[0].date_of_departure).format('MMMM Do YYYY');
      this.refs.noOfPpl.value = items[0].no_of_people;
      this.refs.comments.value = (items[0].reservation_comments == null)? '': items[0].reservation_comments;
      this.refs.reservationTypeId.value = items[0].reservation_type_id;
      this.refs.arrivalTime.selected = aDate;
      this.refs.advanceReminderOn.selected = (items[0].advance_reminder_on == null)? '' : aReminder;
      this.refs.sanskaraId.value = (items[0].sanskara_id == null)? 0 : items[0].sanskara_id;
      this.refs.reservationStatus.innerHTML = reservationStatuses[items[0].reservation_status_id];  

      if (items[0].reservation_status_id == 2){
        this.refs.reservationStatus.style.backgroundColor = 'orange';
        this.refs.reservationStatus.style.width = '10%';
      } else {
        this.refs.reservationStatus.style.backgroundColor = 'green';
        this.refs.reservationStatus.style.width = '15%';
      }
      
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

    const userInput = this._grabUserInput(); 
    const validateNewInput = this._validateData(userInput); 
    let isDataValid = false;

    if (Object.keys(validateNewInput).every((k) => { return validateNewInput[k] === true })) {
        if (
          this.props.getStore().arrivalTime != userInput.arrivalTime || 
          this.props.getStore().reservationTypeId != userInput.reservationTypeId ||
          this.props.getStore().noOfPpl != userInput.noOfPpl ||
          this.props.getStore().sanskaraId != userInput.sanskaraId ||
          this.props.getStore().advanceReminderOn != userInput.advanceReminderOn ||
          this.props.getStore().comments.toString() != userInput.comments.toString()
        ) { 
          this.props.updateStore({
            ...userInput,
            savedToCloud: false 
          });  

          if (this.state.reservationId != null){
            this.updateReservationDetails();
          }
          else {
              this.insertReservationDetails();
          }
        }
        isDataValid = true;
    }
    else {
        this.setState(Object.assign(userInput, validateNewInput));
    }  

    if (isDataValid){
      this.props.redirectToDashboard();
    }

    return isDataValid;
  }

  insertReservationDetails(){

    var dt_arrival =  this.state.arrivalDate + " " + moment(this.state.arrivalTime).format("HH:mm").toString();
    
    alert(this.state.advanceReminderOn);
    const payload = {
      guest_id: this.props.getStore().guestId,
      date_of_arrival: dt_arrival,
      date_of_departure: this.state.departureDate,
      no_of_people: this.state.noOfPpl,
      reservation_comments: this.state.comments,
      reservation_type_id: this.state.reservationTypeId,
      sanskara_id: (this.state.sanskaraId == null)? 0 : this.state.sanskaraId,
      is_a_reference: '0',
      advance_reminder_on: ((this.state.advanceReminderOn == '') || (this.state.advanceReminderOn == null))? '' : getFormattedDate(this.state.advanceReminderOn).toString(),
      room_ids_str: window.sessionStorage.getItem('strSelectedRooms').toString()
    };

    store(API_URL, "reservations/", JSON.stringify(payload))
    .then((response) => {
      return checkError(response);
    })
    .then((result) => {  
          notify.show('New reservation added successfully!', 'success');     
    })
    .catch((error) => {
      this.setState({
        isLoaded: false,
        error
      });
      notify.show('Oops! Something went wrong! Please try again!', 'error');
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
      advance_reminder_on: ((this.state.advanceReminderOn == '') || (this.state.advanceReminderOn == null))? '' : getFormattedDate(this.state.advanceReminderOn).toString(),
    };

    store(API_URL, "reservations/" + this.state.reservationId, JSON.stringify(payload))
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
      notify.show('Reservation details updated successfully!', 'success');
    }
  }

  validationCheck() {

    if (!this._validateOnDemand)
      return;

    const userInput = this._grabUserInput(); 
    const validateNewInput = this._validateData(userInput); 

    this.setState(Object.assign(userInput, validateNewInput));
  }

   _validateData(data) {
    return  {
      arrivalTimeVal: (data.arrivalTime == null || data.arrivalTime == '')? false: true,
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
      //sanskaraId: (this.refs.sanskaraId.value == 0)? null : this.refs.sanskaraId.value,
      sanskaraId: this.refs.sanskaraId.value,
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

    if(this.state.reservationId != null)
    {      
      destroy(API_URL, "reservations/" + this.state.reservationId)

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
        this.clearReservationDetails();
        if (this.state.isLoaded){
          notify.show('Reservation cancelled successfully!', 'success');
        }
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
      reservationId: null,
      arrivalTime:'',
      reservation_type_id:'',
      sanskaraId:'',
      noOfPpl:'',
      advanceReminderOn:'',
      comments:''
    });   

    this.props.redirectToDashboard();
  }

  getReservationStore() {
    return this.reservationStore;
  }

  changeCollapsibleOverflow(trigger){
    var content = document.getElementsByClassName("Collapsible__contentOuter");
    if (trigger){
      content[1].style.overflow = "visible";
    } else {
      content[1].style.overflow = "hidden";
    }
  }

  render() {
    // redirect to Guest page - 
   // 1) if search from Dashboard 2) if existing guest but has no active reservation
    // if((this.props.getStore().searchText != '') || 
    //   (
    //     (this.props.getStore().guestId == null) || 
    //     (this.props.getStore().reservationId == null) && 
    //     ((window.sessionStorage.getItem('strSelectedRooms') == null) 
    //     || (window.sessionStorage.getItem('strSelectedRooms').toString().trim() == ''))
    //   )
    // ){
    //   this.props.jumpToStep(1);
    // }
 
      //new guest, new reservation
      if((this.props.getStore().reservationId == null) && (sessionStorage.getItem('strSelectedRooms') == null)){
          this.props.jumpToStep(1);
      } 
      // // existing guest, new reservation
      // else if ((this.props.getStore().guestId != null) && (this.props.getStore().reservationId == null) && (window.sessionStorage.getItem('strSelectedRooms') == null)){
      //   this.props.jumpToStep(1);
      //  } 
       // existing guest, existing reservation
      // else if ((this.props.getStore().guestId != null) && (this.props.getStore().reservationId != null)){

      // }

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
                <div className="divFloatRight" style={{ visibility: this.props.getStore().reservationId != null ? 'visible':'hidden', display: this.props.getStore().reservationId != null? 'inline':'none' }}>  
                <button type="button" className="btnBig" onClick={() => this.handleCancel()}>Cancel</button>   
                </div>
                      <div className="divDates">
                      {/* Arrival Date */}
                      <label className="col-md-4">
                            From:
                            <span ref="arrivalDate" className="spnDates" defaultValue={moment(this.state.arrivalDate).format('MMMM Do YYYY')}>
                            </span>
                            &nbsp;&nbsp;To:
                            <span ref="departureDate" className="spnDates" defaultValue={moment(this.state.departureDate).format('MMMM Do YYYY')}>
                            </span>
                      </label>
                      {/* Departure Date */}
                      <label className="col-md-4">
                      <div id="divReservationStatus" ref="reservationStatus"></div>                          
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
                                              selected={this.state.arrivalTime}
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
                          No. of People: *
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
                        minDate={moment()}  
                        selected={this.state.advanceReminderOn}
                        onChange={this.handleAdvanceReminderChange} 
                        className="form-control"/>
                      </div>
                    </div>
                </div>
                {/* <div className="div-table-col">
                <div className="form-group col-md-12 content form-block-holder">
                <div id="divReservationStatus" ref="reservationStatus"></div>
                </div>
                </div> */}
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
              <div style={{ visibility: this.props.getStore().reservationId != null ? 'visible':'hidden', display: this.props.getStore().reservationId != null? 'inline':'none' }}>
               <br/>
               <Collapsible trigger="Room Bookings">
               <RoomBookings getReservationStore={() => (this.getReservationStore())}>
               </RoomBookings>
               </Collapsible>
               <br/>
                <Collapsible trigger="Advance Donations" onOpen={() => this.changeCollapsibleOverflow(true)} 
                    onClose={() => this.changeCollapsibleOverflow(false)}>
               <AdvanceDonations getReservationStore={() => (this.getReservationStore())}>
               </AdvanceDonations>
               </Collapsible>
               <br/><br/>
               </div>
          </form>
        </div>
      </div>
    )
  }
}

export default ReservationDetails;
