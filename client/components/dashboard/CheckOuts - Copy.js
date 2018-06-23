import React from 'react';

import blocks from '../../constants/blocks';
import reservationTypes from '../../constants/reservationTypes';

import {Checkbox, CheckboxGroup} from 'react-checkbox-group';

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
        //selected reservations & rooms
        selectedReservations: [],
        selectedRooms: [],
      };
    }

    //Check Out button click
    handleCheckOut() {
        
          //loop through selected reservations and create a | separated string to pass to POST
          var str_reservations = "";
          for (var i =0; i <this.state.selectedReservations.length; i++)
          {  
            str_reservations+= this.state.selectedReservations[i] + "|";
          }
          str_reservations = str_reservations.substring(0,str_reservations.length-1);
          //alert(str_reservations + " reservation ids");

          //loop through selected rooms and create a | separated string to pass to POST
          var str_rooms = "";
          for (var i =0; i <this.state.selectedRooms.length; i++)
          {  
            str_rooms+= this.state.selectedRooms[i] + "|";
          }
          str_rooms = str_rooms.substring(0,str_rooms.length-1);
          //alert(str_rooms + " room ids");

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


          //create a newData array which is a clone of state.items, remove the just selected entries from this newData 
          //and re-assign newData to state.items. This causes the component to re-render.
          var newData = this.state.items;

          for (var i =0; i <this.state.selectedRooms.length; i++){  
            for (var x=0; x< newData.length; x++){
              if (newData[x].room_booking_id == this.state.selectedRooms[i]){
                newData.splice(x,1);
              }
            }
          }

          for (var i =0; i <this.state.selectedReservations.length; i++){  
            for (var x=0; x< newData.length; x++){
              if (newData[x].reservation_id == this.state.selectedReservations[i]){
                newData.splice(x,1);
              }
            }
          }

          this.setState({
            items: newData
          });
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
            checkOutRooms: [],
            selectedReservations: [],
            selectedRooms: []
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

    reservationsChanged = (newReservations) => {  
      this.setState({
        selectedReservations: newReservations
        }
      );
    }

    roomsChanged = (newRooms) => {
      this.setState({
        selectedRooms: newRooms
        }
      );      
    }
  
    render() {

      let { error, isLoaded, items, checkOutReservations, checkOutRooms } = this.state;

      //clearing these as selecting check box re-renders the component and the check boxes are doubling up every time
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
        

          //alert(checkOutRooms.length + " check out rooms length");

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
            <div><h4>Today's Check Outs</h4>
                <hr />
                <button onClick={() => this.handleCheckOut()}>Check Out</button>
                    <ul>
                      <CheckboxGroup
                            checkboxDepth={checkOutReservations.length} // This is needed to optimize the checkbox group
                            name="selectedReservations" 
                            value={this.state.selectedReservations}                    
                            onChange={this.reservationsChanged}> 
                            
                            {checkOutReservations.map(item => (    

                              <li key={Math.random()}>
                               <Checkbox 
                                    value={item.reservation_id} />
                                          {reservationTypes[item.reservation_type_id]} {item.name}    

                                           <ol ref="olRooms">
                                  <CheckboxGroup
                                        checkboxDepth={checkOutRooms.length} // This is needed to optimize the checkbox group
                                        name="selectedRooms" 
                                        value={this.state.selectedRooms}                    
                                        onChange={this.roomsChanged}> 
                                      
                                      {checkOutRooms.filter(bk => bk.reservation_id == item.reservation_id).map(booking => (
                                        
                                        <li key={Math.random()}>
                                           <Checkbox 
                                              key={booking.reservation_id} 
                                              name={booking.reservation_id} 
                                              value={booking.room_booking_id}/>
                                                {booking.room_no + ", " + blocks[booking.block_id]}                   
                                        </li>
                                      ))}
                                     </CheckboxGroup>
                                  </ol>                                         
                              </li>                              

                          ))}
                            </CheckboxGroup>                       
                      </ul>                    
              </div>
            );
          }
        }
      }

      export default CheckOuts;