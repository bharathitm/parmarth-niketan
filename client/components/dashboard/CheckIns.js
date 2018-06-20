import React from 'react';

import blocks from '../../constants/blocks';
import reservationTypes from '../../constants/reservationTypes';

import {Checkbox, CheckboxGroup} from 'react-checkbox-group';

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
        //selected reservations & rooms
        selectedReservations: [],
        selectedRooms: [],
      };
    }

    

  componentDidMount() {
    
    fetch("http://localhost:3000/api/checkins/")
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            items: result,
            checkInReservations: [],
            checkInRooms: [],
            selectedReservations: [],
            selectedRooms: []
          });
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          this.setState({
            isLoaded: false,
            error
          });
        }
      )
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

    //Check In button click
    handleCheckIn() {
    
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
  
    fetch("http://localhost:3000/api/checkins/", {
        method: 'POST',
        headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)

      })
        .then(function(response) {
            return response.json()
          }).then(function(body) {
            console.log(body);
          });
      }
  
    render() {

      let { error, isLoaded, items, checkInReservations, checkInRooms } = this.state;

      //clearing these as selecting check box re-renders the component and the check boxes are doubling up every time
      checkInReservations = [];
      checkInRooms = [];

      checkInReservations.push(
        {
            reservation_id: items[0].reservation_id, 
            name: items[0].first_name + " " + items[0].last_name, 
            reservation_type_id: items[0].reservation_type_id
        }
    );

    checkInRooms = items;

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
        
      if (error) {
      return (
        <div> 
            Error: 
            {error.message}
        </div>
        );
      } else if (!isLoaded) {
          return <div>Loading...</div>;
      } else {
          return (
            <div><h4>Today's Check Ins</h4>
                <hr />
                <button onClick={() => this.handleCheckIn()}>Check In</button>
                    <ul>
                      <CheckboxGroup
                            checkboxDepth={checkInReservations.length} // This is needed to optimize the checkbox group
                            name="selectedReservations" 
                            value={this.state.selectedReservations}                    
                            onChange={this.reservationsChanged}> 
                            
                            {checkInReservations.map(item => (    

                              <li>
                               <Checkbox 
                                    value={item.reservation_id} />
                                          {reservationTypes[item.reservation_type_id]} {item.name}    

                                           <ol ref="olRooms">
                                  <CheckboxGroup
                                        checkboxDepth={checkInRooms.length} // This is needed to optimize the checkbox group
                                        name="selectedRooms" 
                                        value={this.state.selectedRooms}                    
                                        onChange={this.roomsChanged}> 
                                      
                                      {checkInRooms.filter(bk => bk.reservation_id == item.reservation_id).map(booking => (
                                        
                                        <li>
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

                          ))};
                            </CheckboxGroup>                       
                      </ul>                    
              </div>
            );
          }
        }
      }

      export default CheckIns;