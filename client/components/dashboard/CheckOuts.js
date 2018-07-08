import React from 'react';

import blocks from '../../constants/blocks';
import reservationTypes from '../../constants/reservationTypes';

import {logError, checkError} from '../../utils/helpers';
import {API_URL} from '../../config/config';

export class CheckOuts extends React.Component {

    constructor(props) {
      super(props);

      this.state = {
        error: null,
        isLoaded: false,
        items: [
          {}
        ],
        //loaded reservations & rooms
        checkOutReservations: [],
        checkOutRooms: [],
      };

      this.getAllSelectedReservations = this.getAllSelectedReservations.bind(this);
      this.getAllSelectedRooms = this.getAllSelectedRooms.bind(this);
      this.createReservationsString = this.createReservationsString.bind(this);
      this.createRoomsString = this.createRoomsString.bind(this);
      this.updateCheckOutState = this.updateCheckOutState.bind(this);

    }

    componentDidMount() {
    
      fetch(API_URL + "checkouts/")
        .then((response) => {
           return checkError(response);
        })
        .then((result) => {
            this.setState({
              isLoaded: true,
              items: result,
              checkOutReservations: [],
              checkOutRooms: []
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
        var checkboxes = document.getElementsByName("checkOutReservations");  
     
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
        
      //Check Out button click
      handleCheckOut() {

          var selectedReservations = this.getAllSelectedReservations();
          var selectedRooms = this.getAllSelectedRooms();

          var str_reservations = this.createReservationsString(selectedReservations);
          var str_rooms = this.createRoomsString(selectedRooms);

          const payload = {
            str_reservation_ids: str_reservations,
            str_room_booking_ids: str_rooms
          };

          fetch(API_URL + "checkouts/", {
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

          this.updateCheckOutState(selectedReservations, selectedRooms);

          this.props.updateDashboardStore(); 
        }

        getAllSelectedReservations(){
            //reservations
            var selectedReservations = [];
            var checkboxes = document.getElementsByName("checkOutReservations");  
        
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
            var checkboxes = document.getElementsByName("checkOutRooms");  
            
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

        updateCheckOutState(selectedReservations, selectedRooms){

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

      let { error, isLoaded, items, checkOutReservations, checkOutRooms } = this.state;

      // //clearing these as selecting check box re-renders the component and the check boxes are doubling up every time
      checkOutReservations = [];
      checkOutRooms = [];

      if (this.state.items.length > 0){

      checkOutReservations.push(
        {
            reservation_id: items[0].reservation_id, 
            name: items[0].first_name + " " + items[0].last_name, 
            reservation_type_id: items[0].reservation_type_id
        }
    );

    checkOutRooms = items;
    }

      for (var i = 1; i < items.length; i++)
      {
        if (items[i].reservation_id != items[i-1].reservation_id)
        {
          checkOutReservations.push(
                {
                    reservation_id: items[i].reservation_id, 
                    name: items[i].first_name + " " + items[i].last_name, 
                    reservation_type_id: items[i].reservation_type_id
                }
            );
        }
      }
      

     if ((!isLoaded) && (error)){
          return <div><h4>Today's Check Outs</h4><hr /><span id="spNoDataorError">{JSON.stringify(error.message)}</span></div>;        
     } else if (!isLoaded) {
          return <div><h4>Today's Check Outs</h4><hr />Loading...</div>;
      } else if (checkOutRooms.length == 0){
          return  (
          <div><h4>Today's Check Outs</h4><hr /> No Check Outs! </div>
          );
      } else {
          return (
            <div className="divDashboardWidgets"><h4>Today's Check Outs</h4>
                <hr />
                <button type="button" className="btnBig" onClick={() => this.handleCheckOut()}>Check Out</button>
                    <ol>
                        {checkOutReservations.map(item => (    

                          <li key={Math.random()}>
                            <input type="checkbox" name="checkOutReservations"
                                onClick={() => this.reservationsChanged()}
                                value={item.reservation_id} />
                                      {reservationTypes[item.reservation_type_id]} {item.name}    

                                <ul>
                                  
                                  {checkOutRooms.filter(bk => bk.reservation_id == item.reservation_id).map(booking => (
                                    
                                    <li key={Math.random()}>
                                        <input type="checkbox" name="checkOutRooms"
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


      export default CheckOuts;