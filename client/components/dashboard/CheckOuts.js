import React from 'react';

import {blocks, floors, reservationTypes} from '../../constants/roomAttributes';
import {logError, checkError, createRoomsString} from '../../utils/helpers';
import {API_URL} from '../../config/config';
import {fetch} from '../../utils/httpUtil';
import {notify} from 'react-notify-toast';

import {Suspense, lazy} from 'react';


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

        str_reservations: null,
        str_rooms: null,
        popupLoad: null,
        selectedRooms: null

      };

      this.createReservationsString = this.createReservationsString.bind(this);
      this.getAllSelectedRooms = this.getAllSelectedRooms.bind(this);
      this.updateCheckOutState = this.updateCheckOutState.bind(this);

    }

      componentDidMount() {
    
      fetch(API_URL, "checkouts/")
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
            notify.show('Oops! Something went wrong! Please try again!', 'error');
            logError(this.constructor.name + " " + error);
          });
      }

      //reservation check box click
      reservationsChanged(rID) {  
        //select or de select child rooms
        var checkboxes = document.getElementsByName("checkOutReservations");  
     
          for(var i = 0; i < checkboxes.length; i++)  
          {  
              if (checkboxes[i].value != rID){
                checkboxes[i].checked = false;
              }   
              
              if(checkboxes[i].checked) {
                var roomCheckBoxes = checkboxes[i].nextElementSibling.nextElementSibling.getElementsByTagName("input");
                    for (var x = 0; x < roomCheckBoxes.length; x ++){
                      roomCheckBoxes[x].checked = true;
                    }
                    
                } else {
                  var roomCheckBoxes = checkboxes[i].nextElementSibling.nextElementSibling.getElementsByTagName("input");
                      for (var x = 0; x < roomCheckBoxes.length; x ++){
                        roomCheckBoxes[x].checked = false;
                      } 
                }
            }
      } 

      //rooms check box click
      roomsChanged(rID) { 
        //de select child rooms if not same reservation id
        var checkboxes = document.getElementsByName("checkOutRooms");  
     
          for(var i = 0; i < checkboxes.length; i++)  
          {  
              if ((checkboxes[i].className != rID) && (checkboxes[i].checked)){
                checkboxes[i].checked = false;
              } 
          }

          var checkboxes = document.getElementsByName("checkOutReservations");  
     
          for(var i = 0; i < checkboxes.length; i++)  
          {  
            checkboxes[i].checked = false; 
          } 
      } 
      
      //Check Out button click
      handleCheckOut() {
          
          var str_reservations = this.createReservationsString();
          var selectedRooms = this.getAllSelectedRooms();
          var str_rooms = createRoomsString(selectedRooms);

          if ((str_reservations != '') || (str_rooms != '')){

            this.setState({
              str_reservations: str_reservations,
              str_rooms: str_rooms,
              selectedRooms: selectedRooms,
              popupLoad: true
            });
          } 
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

      createReservationsString(){
          //loop through selected reservations and create a string to pass to POST
          var str_reservations = "";
          var checkboxes = document.getElementsByName("checkOutReservations");
          for (var i =0; i < checkboxes.length; i++)
          {  
            if(checkboxes[i].checked) {
              str_reservations = checkboxes[i].value;
            }
          }
          return str_reservations;
      } 
        

      updateCheckOutState(){
          this.props.updateDashboardStore({
            hasCheckOutsChanged: true
          });    
            //create a newData array which is a clone of state.items, remove the just selected entries from this newData 
            //and re-assign newData to state.items. This causes the component to re-render.
            var newData = this.state.items;

            for (var i =0; i < this.state.selectedRooms.length; i++){  
              for (var x=0; x< newData.length; x++){
                if (newData[x].room_booking_id == this.state.selectedRooms[i]){
                  newData.splice(x,1);
                }
              }
            }

              for (var x=0; x< newData.length; x++){
                if (newData[x].reservation_id == this.state.str_reservations){
                  newData.splice(x,1);
                }
              }

              this.setState({
                items: newData
              });

            var checkboxes = document.getElementsByName("checkOutReservations");  
        
            for(var i = 0; i < checkboxes.length; i++)  
            {  
              checkboxes[i].checked = false;      
            }

            var checkboxes = document.getElementsByName("checkOutRooms");  
          
            for(var i = 0; i < checkboxes.length; i++)  
            {  
              checkboxes[i].checked = false;      
            }


      }
    
      openReservation(gID){
        this.props.updateDashboardHomeStore(gID);
      }
  
    render() {

      let { isLoaded, items, checkOutReservations, checkOutRooms } = this.state;

      if (this.state.popupLoad == true){
        const CheckOutRooms = lazy(() => import('../subcomponents/CheckOutRooms'));

        return (<Suspense fallback={<div id="loader" class="loaderCenter"></div> }>
            <CheckOutRooms callFrom = {2} //1 = Reservations 2 = CheckOuts
                  setPopupLoadState={i => this.setState({popupLoad: i})}
                    str_reservations = {this.state.str_reservations}
                    str_rooms = {this.state.str_rooms} 
                    updateParentState={() => (this.updateCheckOutState())} />
                </Suspense>
        );
      }

      // //clearing these as selecting check box re-renders the component and the check boxes are doubling up every time
      checkOutReservations = [];
      checkOutRooms = [];

      if (this.state.items.length > 0){

      checkOutReservations.push(
        {
            guest_id: items[0].guest_id,
            reservation_id: items[0].reservation_id, 
            name: items[0].first_name + " " + items[0].last_name, 
            reservation_type_id: items[0].reservation_type_id,
            is_full_reservation: items[0].is_full_reservation
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
                    guest_id: items[i].guest_id,
                    reservation_id: items[i].reservation_id, 
                    name: items[i].first_name + " " + items[i].last_name, 
                    reservation_type_id: items[i].reservation_type_id,
                    is_full_reservation: items[i].is_full_reservation
                }
            );
        }
      }
      

  if (!isLoaded) {
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

                          <li> {item.is_full_reservation == '1'? 
                            (<input type="checkbox" name="checkOutReservations"
                                onClick={() => this.reservationsChanged(item.reservation_id)}
                                value={item.reservation_id} />): null }
                                      {reservationTypes[item.reservation_type_id]} <b>
                                        <a onClick={() => this.openReservation(item.guest_id)}>{item.name}</a></b>
                                <ul>
                                  {checkOutRooms.filter(bk => bk.reservation_id == item.reservation_id).map(booking => (                                    
                                    <li>

                                      {checkOutRooms.filter(bk => bk.reservation_id == item.reservation_id).length > 1? 
                                        (<span><input type="checkbox" name="checkOutRooms"
                                            className={booking.reservation_id} onClick={() => this.roomsChanged(booking.reservation_id)}
                                            value={booking.room_booking_id} />
                                              {booking.room_no} ,  {floors[booking.floor_no]}, {blocks[booking.block_id]}</span>) 

                                              : (item.is_full_reservation == '0')? 
                                              
                                              (<span><input type="checkbox" name="checkOutRooms"
                                            className={booking.reservation_id} onClick={() => this.roomsChanged(booking.reservation_id)}
                                            value={booking.room_booking_id} />
                                              {booking.room_no} ,  {floors[booking.floor_no]}, {blocks[booking.block_id]}</span>)
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


      export default CheckOuts;