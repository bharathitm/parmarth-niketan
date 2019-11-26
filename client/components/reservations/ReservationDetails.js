import React, {Component } from 'react';

import {reservationTypes, sanskaras, reservationStatuses} from '../../constants/roomAttributes';

import { confirmAlert } from 'react-confirm-alert'; 

import DatePicker from 'react-datepicker';
import moment from 'moment';

import {logError, checkError} from '../../utils/helpers';
import {API_URL} from '../../config/config';
import {fetch, store, destroy} from '../../utils/httpUtil';


import Collapsible from 'react-collapsible';
import { RoomBookings } from '../subcomponents/RoomBookings';
import { GuestContacts } from '../subcomponents/GuestContacts';
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
      comments: props.getStore().comments,
      emailComments: null,
      reservationId: props.getStore().reservationId   
    };

    this.reservationStore = {
      guestId: props.getStore().guestId,
      reservationId: props.getStore().reservationId
    };
      
    this.handleArrivalTimeChange = this.handleArrivalTimeChange.bind(this);

    this._validateOnDemand = true; 

    this.validationCheck = this.validationCheck.bind(this);
    this.isValidated = this.isValidated.bind(this);

    this.changeADCollapsibleOverflow = this.changeADCollapsibleOverflow.bind(this);
    this.changeGCCollapsibleOverflow = this.changeGCCollapsibleOverflow.bind(this);
  }


  populateReservationTypes() {
    let items = [];   

    for (let i = 1; i <= 7; i++) {             
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
    //  if (this.props.getStore().searchReservationId != null){
    //   this.props.updateStore({
    //     searchReservationId: null
    //   });
    //    this.props.jumpToStep(0);
    //  }
    }
   
    this.refs.arrivalDate.innerHTML = moment(this.props.getStore().arrivalDate).format('ddd, MMM Do YYYY');
    this.refs.departureDate.innerHTML = moment(this.props.getStore().departureDate).format('ddd, MMM Do YYYY');

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

      this.props.updateStore({
        reservationId: items[0].reservation_id,
        arrivalDate: aDate.format("YYYY-MM-DD"),
        departureDate: items[0].date_of_departure,
        noOfPpl: items[0].no_of_people,
        comments: (items[0].reservation_comments == null)? '': items[0].reservation_comments,
        reservationTypeId: items[0].reservation_type_id,
        reservationStatusId: items[0].reservation_status_id,
        sanskaraId: (items[0].sanskara_id == null)? 0 : items[0].sanskara_id,
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
        arrivalTime: aDate
      });

    
      this.refs.arrivalDate.innerHTML = moment(aDate.format("YYYY-MM-DD")).format('ddd, MMM Do YYYY');
      this.refs.departureDate.innerHTML = moment(items[0].date_of_departure).format('ddd, MMM Do YYYY');
      this.refs.noOfPpl.value = items[0].no_of_people;
      this.refs.comments.value = (items[0].reservation_comments == null)? '': items[0].reservation_comments;
      this.refs.reservationTypeId.value = items[0].reservation_type_id;
      this.refs.arrivalTime.selected = aDate;
      this.refs.sanskaraId.value = (items[0].sanskara_id == null)? 0 : items[0].sanskara_id;
      this.refs.reservationStatus.innerHTML = reservationStatuses[items[0].reservation_status_id];  

      if (items[0].reservation_status_id == 2){
        this.refs.reservationStatus.style.color = 'orange';
      } else if (items[0].reservation_status_id == 7){
        this.refs.reservationStatus.style.color = 'red';
      } else {
        this.refs.reservationStatus.style.color = 'green';
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

  handleAddAnotherReservation(){

    this.setState({
      reservationId: null,
      arrivalTime: '',
      noOfPpl: '',
      comments: '',
      reservationTypeId: 0
    });

    this.props.updateStore({
      reservationId: null,
      arrivalTime: '',
      noOfPpl: '',
      comments: '',
      reservationTypeId: 0
    });

    if (sessionStorage.getItem('selectedRooms') == null){

      this.setState({
        arrivalDate: null,
        departureDate: null
      });

      this.props.updateStore({
        arrivalDate: null,
        departureDate: null
      });

      this.props.jumpToStep(0);

    } else {


      this.refs.arrivalDate.innerHTML = moment(sessionStorage.getItem("arrivalDate")).format('ddd, MMM Do YYYY');
      this.refs.departureDate.innerHTML = moment(sessionStorage.getItem("departureDate")).format('ddd, MMM Do YYYY');

      this.refs.reservationStatus.innerHTML = "";

      this.refs.arrivalTime.selected = '';
      this.refs.reservationTypeId.value = 0;
      this.refs.noOfPpl.value = '';
      this.refs.comments.value = '';

      this.setState({
        arrivalDate: sessionStorage.getItem("arrivalDate"),
        departureDate: sessionStorage.getItem("departureDate")
      });

      this.props.updateStore({
        arrivalDate: sessionStorage.getItem("arrivalDate"),
        departureDate: sessionStorage.getItem("departureDate")
      });

    }
  }

  isValidated() {

    const userInput = this._grabUserInput(); 
    const validateNewInput = this._validateData(userInput); 

    sessionStorage.setItem("arrivalDate", null);
    sessionStorage.setItem("departureDate", null);

    let isDataValid = false;

    if (Object.keys(validateNewInput).every((k) => { return validateNewInput[k] === true })) {
        if (
          this.props.getStore().arrivalTime != userInput.arrivalTime || 
          this.props.getStore().reservationTypeId != userInput.reservationTypeId ||
          this.props.getStore().noOfPpl != userInput.noOfPpl ||
          this.props.getStore().sanskaraId != userInput.sanskaraId ||
          this.props.getStore().comments.toString() != userInput.comments.toString() ||
          (this.props.getStore().isRequest == 1) // update happens even if no data is changed. only reservation_status needs to be changed and email sent out. Can be re-written!
        ) { 

          this.props.updateStore({
            ...userInput
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

    if (isDataValid && this.props.getStore().isRequest == 1){
      this.props.redirectToRequests(this.props.getStore().reservationTypeId);
    } else if(isDataValid) {
      this.props.redirectToDashboard();
    }

    return isDataValid;
  }

  insertReservationDetails(){

    var dt_arrival =  this.state.arrivalDate + " " + moment(this.state.arrivalTime).format("HH:mm").toString();
    
    const payload = {
      guest_id: this.props.getStore().guestId,
      email_id: this.props.getStore().email,
      name : this.props.getStore().firstName + " " + this.props.getStore().lastName,
      date_of_arrival: dt_arrival,
      date_of_departure: this.state.departureDate,
      no_of_people: this.state.noOfPpl,
      reservation_comments: this.state.comments,
      reservation_type_id: this.state.reservationTypeId,
      sanskara_id: (this.state.sanskaraId == null)? 0 : this.state.sanskaraId,
      room_ids_str: sessionStorage.getItem('strSelectedRooms').toString(),
      reference_id: this.props.getStore().referenceId,
      has_WL: (sessionStorage.getItem('waitingListCnt').toString().trim() != ''? 1: 0),
      email_comments: this.state.emailComments,
      total_beds: sessionStorage.getItem('spGrandBeds')
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
      notify.show('Oops! Something went wrong! Please try again reservations insert!', 'error');
      logError(error);
    });
  }

  handleArrivalTimeChange(time){
    this.setState({
      arrivalTime: time
    });
    this.refs.arrivalTime.selected = time;
  }


  updateReservationDetails(){

    var dt_arrival =  this.state.arrivalDate + " " + moment(this.state.arrivalTime).format("HH:mm").toString();

    var payload = {};

    if (this.props.getStore().isRequest == 0){
      payload = {
        date_of_arrival: dt_arrival,
        date_of_departure: this.state.departureDate,
        no_of_people: this.state.noOfPpl,
        reservation_comments: this.state.comments,
        reservation_type_id: this.state.reservationTypeId,
        sanskara_id: (this.state.sanskaraId == null)? 0 : this.state.sanskaraId,
        isRequest: this.props.getStore().isRequest
      };
    } else {
      payload = {
        date_of_arrival: dt_arrival,
        date_of_departure: this.state.departureDate,
        no_of_people: this.state.noOfPpl,
        reservation_comments: this.state.comments,
        reservation_type_id: this.state.reservationTypeId,
        sanskara_id: (this.state.sanskaraId == null)? 0 : this.state.sanskaraId,
        isRequest: this.props.getStore().isRequest,
        email_id: this.props.getStore().email,
        name : this.props.getStore().firstName + " " + this.props.getStore().lastName,
        reference_id: this.props.getStore().referenceId,
        has_WL: (sessionStorage.getItem('waitingListCnt').toString().trim() != ''? 1: 0),
        email_comments: this.state.emailComments
      };
    }

    store(API_URL, "reservations/" + this.state.reservationId, JSON.stringify(payload))
    .then((response) => {
      return checkError(response);
    })
    .catch((error) => {
      this.setState({
        isLoaded: false,
        error
      });
      notify.show('Oops! Something went wrong! Please try again reservations update!', 'error');
      logError(error);
    });

    if (this.state.isLoaded && this.props.getStore().isRequest == 1){
      notify.show('New reservation added successfully!', 'success');
      
    } else if (this.state.isLoaded){
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
      noOfPplVal: (data.noOfPpl.toString().trim() != ''),
      commentsVal: (true), 
      sanskaraVal: (data.reservationTypeId == 3 && data.sanskaraId == 0)? false : true,
      referenceVal: (true)
    }
  }

  _grabUserInput() {
    
    return {
      arrivalTime: this.refs.arrivalTime.selected,
      reservationTypeId: this.refs.reservationTypeId.value,
      sanskaraId: (this.refs.reservationTypeId.value != 3)? 0: this.refs.sanskaraId.value,
      noOfPpl: this.refs.noOfPpl.value,
      comments: this.refs.comments.value,
      emailComments: (this.refs.emailComments.value.toString().trim() != '')? this.refs.emailComments.value : null
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
      comments:''
    });   

    this.props.redirectToDashboard();
  }

  getReservationStore() {
    return this.reservationStore;
  }

  changeADCollapsibleOverflow(trigger){
    var content = document.getElementsByClassName("Collapsible__contentOuter");
    if (trigger){
      content[1].style.overflow = "visible";
    } else {
      content[1].style.overflow = "hidden";
    }
  }

  changeGCCollapsibleOverflow(trigger){
    var content = document.getElementsByClassName("Collapsible__contentOuter");
    if (trigger){
      content[2].style.overflow = "visible";
    } else {
      content[2].style.overflow = "hidden";
    }
  }

   //Check Out button click
   handleEarlyCheckOut() {

    var str_reservations = this.state.reservationId;

    if (str_reservations != ''){
      this.fetchCheckOutTotal(str_reservations);
    } 
  }

  fetchCheckOutTotal(str_reservations){

    const payload = {
      str_reservation_ids: str_reservations,
      str_room_booking_ids: ''
    };

    store(API_URL, "checkouts/id=1", JSON.stringify(payload))
      .then((response) => {
        return checkError(response);
      })
      .then((result) => {
        this.loadCheckOutTotalDetails(result);
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

  loadCheckOutTotalDetails(results){

    confirmAlert({
      customUI: ({ onClose }) => {

        var sum = 0;
        for (var i = 0; i < results.length; i++) {
          sum += results[i].total;
        }

        return (
          <div>
            <h4>Check Out Rooms</h4>  
            <img src="./img/close.png" className="imgClose" onClick={onClose}/>
                
              <div className = "div-table advance-table checkout-table">
              <div className = "div-table-row">
                        <div className ="div-table-col div-table-col-header">
                       Room No
                        </div>
                        <div className ="div-table-col div-table-col-header">
                        No. of Days
                        </div>
                        <div className ="div-table-col div-table-col-header">
                       Room Donation
                        </div>
                        <div className ="div-table-col div-table-col-header">
                        Total Donation
                        </div>
                </div>
              {results.map(item => (
                  <div className = "div-table-row" key={item.donation_id}>
                        <div className ="div-table-col col-bordered">
                          {item.room_no}
                        </div>
                        <div className ="div-table-col col-bordered">
                          {item.no_of_days}
                        </div>
                        <div className ="div-table-col col-bordered">
                        &#8377; {item.room_rent.toLocaleString('en-IN')}
                        </div>
                        <div className ="div-table-col col-bordered">
                        &#8377; {item.total.toLocaleString('en-IN')}
                        </div>
                  </div>
                  ))} 
                </div>
                   <div className="form-group col-md-12 content form-block-holder">
                    <label className="control-label col-md-4">
                      Donation Received: 
                      &#8377; {(results[0].donationAmount != null? results[0].donationAmount.toLocaleString('en-IN'): "0")}
                      </label>
                  </div>

                   <div className="form-group col-md-12 content form-block-holder">
                    <label className="control-label col-md-4">
                      Total Sum: &#8377; &nbsp;
                    </label>
                    <div className="col-md-8">
                      <input id="txtTotalSum" className="form-control small-textbox" defaultValue={sum} type="number" />
                      </div>
                </div>

                 <div className="form-group col-md-12 content form-block-holder">
                    <label className="control-label col-md-4">
                      Receipt No: &nbsp;&nbsp;
                    </label>
                    <div className="col-md-8">
                      <input id="txtReceiptNo" className="form-control small-textbox" />
                      </div>
                </div>

                 <div className="form-group col-md-12 content form-block-holder">
                    <label className="control-label col-md-4">
                      Comments: &nbsp;&nbsp;
                    </label>
                    <div className="col-md-8">
                    <textarea id="txtCheckOutComments"
                        className="form-control" />
                      </div>
                </div>
            <button type="button" className="btnCheckOut btnBig" onClick={() => 
              { this.checkOutRooms(
                    document.getElementById("txtTotalSum").value, 
                    document.getElementById("txtReceiptNo").value,
                    document.getElementById("txtCheckOutComments").value); 
                onClose() }}>Check Out</button>
            
          </div>
        )
      }
    })

  }

  checkOutRooms(amount, receipt_no, comments){

    var str_reservations = this.state.reservationId;

    const payload = {
      int_reservation_id: str_reservations,
      str_room_booking_ids: '',
      amount: amount,
      receipt_no: receipt_no,
      comments: comments
    };
   
    store(API_URL, "checkouts/", JSON.stringify(payload))
      .then((response) => {
        return checkError(response);
      })
      .then((result) => {
        this.clearReservationDetails();
        notify.show('Reservation checked out successfully!', 'success');  
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


  render() { 
      //new guest, new reservation
      if((this.props.getStore().reservationId == null) && (sessionStorage.getItem('strSelectedRooms') == null)){
          this.props.jumpToStep(1);
      } 

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
                  <a style={{fontWeight: 'bolder', color: '#ED823A', visibility: (this.props.getStore().reservationId != null && this.props.getStore().isRequest != 1) ? 'visible':'hidden', display: (this.props.getStore().reservationId != null && this.props.getStore().isRequest != 1)? 'inline':'none'}} onClick={() => this.handleAddAnotherReservation()}>Add Another Reservation?</a>  
                <button type="button" className="btnBig" style={{ backgroundColor: 'grey', visibility: ( this.props.getStore().reservationStatusId == 1 || this.props.getStore().reservationStatusId == 2) ? 'visible':'hidden', display: (this.props.getStore().reservationStatusId == 1 || this.props.getStore().reservationStatusId == 2)? 'inline':'none' }} onClick={() => this.handleCancel()}>Cancel</button>
                <button type="button" className="btnBig" style={{ visibility: (this.props.getStore().reservationStatusId == 3) ? 'visible':'hidden', display: (this.props.getStore().reservationStatusId == 3)? 'inline':'none' }} onClick={() => this.handleEarlyCheckOut()}>Early Check Out</button>   
                </div>
                      <div className="divDates">
                      {/* Arrival Date */}
                      <label className="col-md-4">
                            From:
                            <span ref="arrivalDate" className="spnDates" defaultValue={moment(this.state.arrivalDate).format('ddd, MMM Do YYYY')}>
                            </span>
                            &nbsp;&nbsp;To:
                            <span ref="departureDate" className="spnDates" defaultValue={moment(this.state.departureDate).format('ddd, MMM Do YYYY')}>
                            </span>
                      </label>
                      {/* Departure Date */}
                      <label className="col-md-4">
                      <div id="divReservationStatus" className="spReservationDetails" ref="reservationStatus"></div>                      
                      </label>
                    </div>

                <div className = "div-table">
                    <div className = "div-table-row">
                          <div className ="div-table-col">
                              {/* Arrival Time */}
                              <div className="form-group col-md-12 content form-block-holder">
                                    <label className="control-label col-md-4">
                                      Arrival Time:
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
                          No. of People:
                        </label>
                        <div className="col-md-8">
                          <input
                            ref="noOfPpl"
                            autoComplete="off"
                            className={notValidClasses.noOfPplCls}
                            required
                            type="number"
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
                            Reservation Type:
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
                                        <option value="0">Please select</option>
                                        {this.populateReservationTypes()}                   
                                      </select>                      
                              </div>
                            </div>
                  </div>
                <div className ="div-table-col">
                        {/* Sanskara Type */}
                        <div ref="divSanskara" className="form-group col-md-12 content form-block-holder">
                        <label className="control-label col-md-4">
                        Sanskara:
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

               <div className = "div-table-row" style={{ visibility: this.props.getStore().reservationId == null || this.props.getStore().isRequest == 1 ? 'visible':'hidden', display: this.props.getStore().reservationId == null || this.props.getStore().isRequest == 1? 'inline':'none' }}>
                  <div className ="comments-col div-table-col">
                      {/* Email Comments */}
                      <div className="form-group col-md-12 content form-block-holder long-col">
                          <label className="control-label col-md-4">
                            Email Comments:
                          </label>
                          <div className="col-md-8">
                            <textarea
                              ref="emailComments"
                              autoComplete="off"
                              className="form-control"
                              onBlur={this.validationCheck}
                              defaultValue={this.state.emailComments} />
                          </div>
                        </div>
                    </div>
              </div>

             </div>
              <div style={{ visibility: this.props.getStore().reservationId != null && this.props.getStore().reservationStatusId != 1? 'visible':'hidden', display: this.props.getStore().reservationId != null && this.props.getStore().reservationStatusId != 1? 'inline':'none' }}>
               <br/>
               <Collapsible trigger="Room Bookings" lazyRender="true">
               <RoomBookings getReservationStore={() => (this.getReservationStore())} updateReservationStore={(u) => {this.updateReservationStore(u)}}>
               </RoomBookings>
               </Collapsible>
               <br/>
                <Collapsible trigger="Advance Donations" lazyRender="true" onOpen={() => this.changeADCollapsibleOverflow(true)} 
                    onClose={() => this.changeADCollapsibleOverflow(false)}>
               <AdvanceDonations getReservationStore={() => (this.getReservationStore())}>
               </AdvanceDonations>
               </Collapsible>
               <br/>
               <Collapsible trigger="Guest Contacts" lazyRender="true" onOpen={() => this.changeGCCollapsibleOverflow(true)} 
                    onClose={() => this.changeGCCollapsibleOverflow(false)}>
               <GuestContacts getReservationStore={() => (this.getReservationStore())}>
               </GuestContacts>
               </Collapsible>
               <br/>
               <br/>
               </div>
          </form>
        </div>
      </div>
    )
  }
}

export default ReservationDetails;
