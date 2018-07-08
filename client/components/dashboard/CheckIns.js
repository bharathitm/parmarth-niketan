import React from 'react';

import blocks from '../../constants/blocks';
import reservationTypes from '../../constants/reservationTypes';

import {logError, checkError} from '../../utils/helpers';
import {API_URL} from '../../config/config';

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
      this.createReservationsString = this.createReservationsString.bind(this);
      this.createRoomsString = this.createRoomsString.bind(this);
      this.updateCheckInState = this.updateCheckInState.bind(this);
    }

  
    componentDidMount() {
      
      fetch(API_URL + "checkins/")
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
                    var roomCheckBoxes = checkboxes[i].nextElementSibling.getElementsByTagName("input");
                        for (var x = 0; x < roomCheckBoxes.length; x ++){
                          roomCheckBoxes[x].checked = true;
                        }
                        
                  } else {
                      var roomCheckBoxes = checkboxes[i].nextElementSibling.getElementsByTagName("input");
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

        var str_reservations = this.createReservationsString(selectedReservations);
        var str_rooms = this.createRoomsString(selectedRooms);

        const payload = {
          str_reservation_ids: str_reservations,
          str_room_booking_ids: str_rooms
        };

        fetch(API_URL + "checkins/", {
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

        this.updateCheckInState(selectedReservations, selectedRooms);
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
                    selectedRooms.push(checkboxes[i].value);  
                  }         
          }
          return selectedRooms;
        }

      createReservationsString(selectedReservations){
            //loop through selected reservations and create a | separated string to pass to POST
            var str_reservations = "";
            for (var i =0; i < selectedReservations.length; i++)
            {  
              str_reservations+= selectedReservations[i] + "|";
            }
            str_reservations = str_reservations.substring(0,str_reservations.length-1);
            return str_reservations;
      } 

      createRoomsString(selectedRooms){
            //loop through selected rooms and create a | separated string to pass to POST
            var str_rooms = "";
            for (var i =0; i < selectedRooms.length; i++)
            {  
              str_rooms+= selectedRooms[i] + "|";
            }
            str_rooms = str_rooms.substring(0,str_rooms.length-1);
            return str_rooms;
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


    render() {

      let { isLoaded, error, items, checkInReservations, checkInRooms } = this.state;

      //clearing these as selecting check box re-renders the component and the check boxes are doubling up every time
      checkInReservations = [];
      checkInRooms = [];

      if (items.length > 0){
      
            checkInReservations.push(
                {
                    reservation_id: items[0].reservation_id, 
                    name: items[0].first_name + " " + items[0].last_name, 
                    reservation_type_id: items[0].reservation_type_id
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
                    reservation_id: items[i].reservation_id, 
                    name: items[i].first_name + " " + items[i].last_name, 
                    reservation_type_id: items[i].reservation_type_id
                }
            );
        }
      }

      if ((!isLoaded) && (error)){
        return <div><h4>Today's Check Ins</h4><hr /><span id="spNoDataorError">{JSON.stringify(error.message)}</span></div>;        
       } else if (!isLoaded) {
          return <div>Loading...</div>;
      } else if (checkInRooms.length == 0){
          return  (
          <div><h4>Today's Check Ins</h4>
          <hr /> No Check Ins! </div>
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
                                          {reservationTypes[item.reservation_type_id]} {item.name}      

                                      <ul>
                                
                                          {checkInRooms.filter(bk => bk.reservation_id == item.reservation_id).map(booking => (
                                  
                                          <li>
                                              <input type="checkbox" name="checkInRooms"
                                                  key={booking.reservation_id} 
                                                  value={booking.room_booking_id} />
                                                    {booking.room_no + ", " + blocks[booking.block_id]}                 
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