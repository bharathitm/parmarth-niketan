import React from 'react';

import {blocks, floors, reservationTypes} from '../../constants/roomAttributes';

import {logError, checkError, createRoomsString} from '../../utils/helpers';
import { confirmAlert } from 'react-confirm-alert'; 
import {API_URL} from '../../config/config';

import {notify} from 'react-notify-toast';


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

      this.createReservationsString = this.createReservationsString.bind(this);
      this.getAllSelectedRooms = this.getAllSelectedRooms.bind(this);
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
                //alert(roomCheckBoxes.length);
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
        
      //Check Out button click
      handleCheckOut() {
          var selectedRooms = this.getAllSelectedRooms();

          var str_reservations = this.createReservationsString();
          var str_rooms = createRoomsString(selectedRooms);

          if ((str_reservations != '') || (str_rooms != '')){
            this.fetchCheckOutTotal(str_reservations, str_rooms);
          } 
        }

        fetchCheckOutTotal(str_reservations, str_rooms){

          const payload = {
            str_reservation_ids: str_reservations,
            str_room_booking_ids: str_rooms
          };

          fetch(API_URL + "checkouts/id=1", {
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
                  {/* <button type="button" className="btnCancel btnBig" onClick={onClose}>Cancel</button>   */}
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
                             Room Rent
                              </div>
                              <div className ="div-table-col div-table-col-header">
                              Total
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
                              &#8377; {item.room_rent}
                              </div>
                              <div className ="div-table-col col-bordered">
                              &#8377; {item.total}
                              </div>
                        </div>
                        ))} 
                      </div>
                         <div className="form-group col-md-12 content form-block-holder">
                          <label className="control-label col-md-4">
                            Donation Received: 
                            &#8377; {(results[0].donationAmount != null? results[0].donationAmount: "0")}
                            </label>
                        </div>

                         <div className="form-group col-md-12 content form-block-holder">
                          <label className="control-label col-md-4">
                            Total Sum: &#8377; &nbsp;
                          </label>
                          <div className="col-md-8">
                            <input id="txtTotalSum" className="form-control small-textbox" defaultValue={sum} />
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
                  <button type="button" className="btnCheckOut btnBig" onClick={() => { this.checkOutRooms(document.getElementById("txtTotalSum").value, document.getElementById("txtReceiptNo").value); onClose() }}>Check Out</button>
                  
                </div>
              )
            }
          })

        }

        checkOutRooms(amount, receipt_no){

          var selectedRooms = this.getAllSelectedRooms();

          var str_reservations = this.createReservationsString();
          var str_rooms = createRoomsString(selectedRooms);

          const payload = {
            int_reservation_id: str_reservations,
            str_room_booking_ids: str_rooms,
            amount: amount,
            receipt_no: receipt_no
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
            .then((result) => {
              notify.show('Room(s) checked out successfully!', 'success');
              this.props.updateDashboardStore({
                hasCheckOutsChanged: true
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

          this.updateCheckOutState(str_reservations, selectedRooms);
          
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

        updateCheckOutState(str_reservations, selectedRooms){

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

                for (var x=0; x< newData.length; x++){
                  if (newData[x].reservation_id == str_reservations){
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

                          <li>
                            <input type="checkbox" name="checkOutReservations"
                                onClick={() => this.reservationsChanged(item.reservation_id)}
                                value={item.reservation_id} />
                                      {reservationTypes[item.reservation_type_id]} <b>{item.name}</b>
                                <ul>
                                  {checkOutRooms.filter(bk => bk.reservation_id == item.reservation_id).map(booking => (                                    
                                    <li>
                                        <input type="checkbox" name="checkOutRooms"
                                            className={booking.reservation_id} onClick={() => this.roomsChanged(booking.reservation_id)}
                                            value={booking.room_booking_id} />
                                              {booking.room_no + ", " + floors[booking.floor_no] + ", " + blocks[booking.block_id]}                   
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