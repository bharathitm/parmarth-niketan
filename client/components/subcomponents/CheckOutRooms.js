import React, { Component } from 'react';

import {logError, checkError} from '../../utils/helpers';
import {API_URL} from '../../config/config';
import {store} from '../../utils/httpUtil';
import { confirmAlert } from 'react-confirm-alert'; 
import {notify} from 'react-notify-toast';
import {CheckOutRoomsPopup} from './CheckOutRoomsPopup';

export class CheckOutRooms extends Component {
  constructor(props) {
    super(props);

    this.state = {
        str_reservation_ids : this.props.str_reservations,
        str_room_booking_ids: this.props.str_rooms,
        callFrom: this.props.callFrom
    }

    this.setParentPopupLoadState = this.setParentPopupLoadState.bind(this);
  }

  clearTotalSum(){
    document.getElementById("txtTotalSum").value = ""; 
  }

  componentDidMount(){
    this.fetchCheckOutTotal();
  }

  fetchCheckOutTotal(){

    const payload = {
      str_reservation_ids: this.props.str_reservations,
      str_room_booking_ids: this.props.str_rooms
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

  setParentPopupLoadState(reload){ // to reload the parent (CheckOuts or Reservations content)

    this.props.setPopupLoadState(null); //set PopupLoad to false so that the popup does not open

    if (reload){ // true if checkout details saved. false if popup is closed
        this.props.updateParentState();
    }    
  }

  
  loadCheckOutTotalDetails(results){

    confirmAlert({
      customUI: ({ onClose }) => {

        var sum = 0;
        for (var i = 0; i < results.length; i++) {
          sum += results[i].total;
        }

        return (
         <CheckOutRoomsPopup results={results} sum={sum} onClose={onClose} callFrom = {this.state.callFrom}
         setParentPopupLoadState={this.setParentPopupLoadState} sendCheckOutDetails = {this.checkOutRooms} 
                str_reservations = {this.state.str_reservation_ids}
                str_rooms = {this.state.str_room_booking_ids} />
        )       
      }
    })

  }

  checkOutRooms(str_reservation_ids, str_room_booking_ids, amount, receipt_no, comments, callFrom){

    this.setParentPopupLoadState(true);
 
    const payload = {
      int_reservation_id: str_reservation_ids,
      str_room_booking_ids: str_room_booking_ids,
      amount: amount,
      receipt_no: receipt_no,
      comments: comments,
      user_id: sessionStorage.getItem('userId')
    };
   
    store(API_URL, "checkouts/", JSON.stringify(payload))
      .then((response) => {
        return checkError(response);
      })
      .then((result) => {
        if (callFrom == 1) //1 = Reservations 2 = CheckOuts
        {
            notify.show('Reservation checked out successfully!', 'success');  
        } else {
            notify.show('Room(s) checked out successfully!', 'success');  
        }                  
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
    return (
            <div></div>
)}

}

export default CheckOutRooms;