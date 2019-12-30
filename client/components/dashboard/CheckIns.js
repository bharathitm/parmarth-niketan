import React from 'react';
import ReactDOM from 'react-dom';

import {blocks, floors, reservationTypes, references} from '../../constants/roomAttributes';

import {logError, checkError, createReservationsString, createRoomsString} from '../../utils/helpers';
import {API_URL} from '../../config/config';

import {fetch, store} from '../../utils/httpUtil';

import {notify} from 'react-notify-toast';

import { ReservationForm } from '../subcomponents/ReservationForm';

export class CheckIns extends React.Component {

    constructor(props) {
      super(props);

      this.state = {
        error: null,
        isLoaded: false,
        items: [
          {}
        ],
        //loaded reservations & rooms
        checkInReservations: [],
        checkInRooms: [],
      };

      this.getAllSelectedReservations = this.getAllSelectedReservations.bind(this);
      this.getAllSelectedRooms = this.getAllSelectedRooms.bind(this);
      this.updateCheckInState = this.updateCheckInState.bind(this);
    }

    
  
    componentDidMount() {
      
      fetch(API_URL, "checkins/")

        .then((response) => {
          return checkError(response);
        })
        .then((result) => {
            this.setState({
              isLoaded: true,
              items: result,
              checkInReservations: [],
              checkInRooms: []
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

      //reservation check box click
      reservationsChanged() {  

        //select or de select child rooms
        var checkboxes = document.getElementsByName("checkInReservations");  

          for(var i = 0; i < checkboxes.length; i++)  
          {  
                  if(checkboxes[i].checked) {
                    var roomCheckBoxes = checkboxes[i].nextElementSibling.nextElementSibling.nextElementSibling.getElementsByTagName("input");
                        for (var x = 0; x < roomCheckBoxes.length; x ++){
                          roomCheckBoxes[x].checked = true;
                        }
                        
                  } else {
                      var roomCheckBoxes = checkboxes[i].nextElementSibling.nextElementSibling.nextElementSibling.getElementsByTagName("input");
                          for (var x = 0; x < roomCheckBoxes.length; x ++){
                            roomCheckBoxes[x].checked = false;
                          }
                          
                  }   
            }
        } 

        //Check In button click
      handleCheckIn() {

        var selectedReservations = this.getAllSelectedReservations();
        var selectedRooms = this.getAllSelectedRooms();

        var str_reservations = createReservationsString(selectedReservations);
        var str_rooms = createRoomsString(selectedRooms);

        if ((str_reservations != '') || (str_rooms != '')){

            const payload = {
              str_reservation_ids: str_reservations,
              str_room_booking_ids: str_rooms
            };

            store(API_URL, "checkins/", JSON.stringify(payload))

            .then((response) => {
                return checkError(response);
              })
              .then((result) => {
                notify.show('Room(s) checked in successfully!', 'success');
                this.props.updateDashboardStore({
                  hasCheckInsChanged: true
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

            this.updateCheckInState(selectedReservations, selectedRooms);
          }
      }

      getAllSelectedReservations(){
          //reservations
          var selectedReservations = [];
          var checkboxes = document.getElementsByName("checkInReservations");  
      
          for(var i = 0; i < checkboxes.length; i++)  
          {  
                  if(checkboxes[i].checked) {
                    selectedReservations.push(checkboxes[i].value);     
                  }         
          }
          return selectedReservations;
      }

      getAllSelectedRooms(){
          //rooms
          var selectedRooms = [];
          var checkboxes = document.getElementsByName("checkInRooms");  
          
          for(var i = 0; i < checkboxes.length; i++)  
          {  
                  if(checkboxes[i].checked) {

                    if (checkboxes[i].id == '11'){
                      notify.show('Oops! Some rooms are in Wait List. Please re-allocate and try again!', 'error');
                      return false;
                    } else {
                        selectedRooms.push(checkboxes[i].value);  
                    }
                  }         
          }
          return selectedRooms;
        }

      updateCheckInState(selectedReservations, selectedRooms){

            //create a newData array which is a clone of state.items, remove the just selected entries from this newData 
            //and re-assign newData to state.items. This causes the component to re-render.
            var newData = this.state.items;

            for (var i =0; i < selectedRooms.length; i++){  
              for (var x=0; x< newData.length; x++){
                if (newData[x].room_booking_id == selectedRooms[i]){
                  newData.splice(x,1);
                }
              }
            }

            for (var i =0; i < selectedReservations.length; i++){  
              for (var x=0; x< newData.length; x++){
                if (newData[x].reservation_id == selectedReservations[i]){
                  newData.splice(x,1);
                }
              }
            }

            this.setState({
              items: newData
            });
      }

      openReservation(gID){
        this.props.updateDashboardHomeStore(gID);
      }


      showReservationForm(gID) {

        const element =  <ReservationForm guestId = {gID} />;

        //need to clear the span's existing content before adding new content 
        const oldPrint = document.getElementById("spReservationForm");
        while (oldPrint.firstChild) {
          oldPrint.removeChild(oldPrint.firstChild);
        }

        ReactDOM.render(element, document.getElementById("spReservationForm").appendChild(document.createElement('div')));

      }


    render() {

      let { isLoaded, items, checkInReservations, checkInRooms } = this.state;

      //clearing these as selecting check box re-renders the component and the check boxes are doubling up every time
      checkInReservations = [];
      checkInRooms = [];

      if (items.length > 0){
      
            checkInReservations.push(
                {
                    guest_id: items[0].guest_id,
                    reservation_id: items[0].reservation_id, 
                    name: items[0].first_name + " " + items[0].last_name, 
                    reservation_type_id: items[0].reservation_type_id,
                    reference_id: items[0].reference_id
                }
            );

            checkInRooms = items;
        }

    //unique reservations ids need to be captured in a separate array
      for (var i = 1; i < items.length; i++)
      {
        if (items[i].reservation_id != items[i-1].reservation_id)
        {
          checkInReservations.push(
                {
                    guest_id: items[i].guest_id,
                    reservation_id: items[i].reservation_id, 
                    name: items[i].first_name + " " + items[i].last_name, 
                    reservation_type_id: items[i].reservation_type_id,
                    reference_id: items[i].reference_id
                }
            );
        }
      }

  if (!isLoaded) {
          return <div><h4>Today's Check Ins</h4><hr />Loading...</div>;
      } else if (checkInRooms.length == 0){
          return  (
          <div><h4>Today's Check Ins</h4><hr /> No Check Ins! </div>
          );
      } else {
          return (
            <div className="divDashboardWidgets"><h4>Today's Check Ins</h4>
                <hr />
                <button type="button" className="btnBig" onClick={() => this.handleCheckIn()}>Check In</button>
                    <ol>    
                        {checkInReservations.map(item => (    

                          <li key={Math.random()}>
                                <input type="checkbox" name="checkInReservations"
                                    onClick={() => this.reservationsChanged()}
                                    value={item.reservation_id} />
                                          {reservationTypes[item.reservation_type_id]} <b><a onClick={() => this.openReservation(item.guest_id)}>{item.name}</a></b> 
                                          {item.reference_id == null? '':' - '}<b className="bRef">{references[item.reference_id]}</b>  
                                           <img src="./img/print.png" onClick={() => this.showReservationForm(item.guest_id)}/> 
                                           <span id="spReservationForm"></span> 
                                          
                                      <ul>
                                          {checkInRooms.filter(bk => bk.reservation_id == item.reservation_id).map(booking => (
                                          <li>                                           
                                            {checkInRooms.filter(bk => bk.reservation_id == item.reservation_id).length > 1?

(<span><input type="checkbox" name="checkInRooms" id={booking.block_id} value={booking.room_booking_id} /> {booking.room_no}, {floors[booking.floor_no]}, {blocks[booking.block_id]} </span>)

                                            : booking.room_no + ", " + floors[booking.floor_no] + ", " + blocks[booking.block_id]}
                                                  
                                          </li>
                                          ))}
                                      </ul>                                         
                            </li>                              
                      ))}                     
                  </ol>                    
              </div>
            );
          }
        }
      }

      export default CheckIns;