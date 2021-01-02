import React from 'react';

import {blocks, floors} from '../../constants/roomAttributes';

import {logError, checkError, createRoomsString} from '../../utils/helpers';
import {API_URL} from '../../config/config';
import {fetch, store} from '../../utils/httpUtil';

import {notify} from 'react-notify-toast';

export class URooms extends React.Component {

    constructor(props) {
      super(props);

      this.state = {
        error: null,
        isLoaded: false,
        items: [
          {}
        ],
         //loaded blocks & rooms
         uncleanBlocks: [],
         uncleanRooms: [],
      };

      this.getAllSelectedRooms = this.getAllSelectedRooms.bind(this);
      this.updateUncleanRoomsState = this.updateUncleanRoomsState.bind(this);
    }


  componentDidMount() {
    this.fetchUncleanRooms();
    }

    fetchUncleanRooms(){
      fetch(API_URL, "urooms/")
        .then((response) => {
          return checkError(response);
        })
        .then((result) => {
            this.setState({
              isLoaded: true,
              items: result,
              uncleanBlocks: [],
              uncleanRooms: []
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

      //blocks check box click
      blocksChanged() {  

      //select or de select child rooms
      var checkboxes = document.getElementsByName("uncleanBlocks");  

        for(var i = 0; i < checkboxes.length; i++)  
        {  
                if(checkboxes[i].checked) {

                  var roomCheckBoxes = checkboxes[i].parentElement.lastChild.getElementsByTagName("input");
                      for (var x = 0; x < roomCheckBoxes.length; x ++){
                        roomCheckBoxes[x].checked = true;
                      }
                      
                } else {
                    var roomCheckBoxes = checkboxes[i].parentElement.lastChild.getElementsByTagName("input");
                        for (var x = 0; x < roomCheckBoxes.length; x ++){
                          roomCheckBoxes[x].checked = false;
                        }
                        
                }   
          }
      } 

     //Done button click
    handleUncleanRoom() {
          var selectedRooms = this.getAllSelectedRooms();
          var str_rooms = createRoomsString(selectedRooms); 

            if (str_rooms != ''){

              const payload = {
                str_room_booking_ids: str_rooms
              };
                    
          store(API_URL, "urooms/", JSON.stringify(payload))
            .then((response) => {
              return checkError(response);
            })
            .then((result) => {
              notify.show('Room(s) marked as cleaned successfully!', 'success');
              this.props.updateDashboardStore({
                hasURoomsChanged: true
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
 
            this.updateUncleanRoomsState(selectedRooms);  
          }
        }    

    getAllSelectedRooms(){
        //rooms
        var selectedRooms = [];
        var checkboxes = document.getElementsByName("uncleanRooms");  
        
        for(var i = 0; i < checkboxes.length; i++)  
        {  
                if(checkboxes[i].checked) {
                  selectedRooms.push(checkboxes[i].value);  
                }         
        }
        return selectedRooms;
    }

    updateUncleanRoomsState(selectedRooms){
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

            this.setState({
              items: newData
            });

            // //the next row is getting selected after save hence loop through and unselect all
            // var checkboxes = document.getElementsByName("uncleanRooms");
            // if (checkboxes.length > 0){
            //   for(var i = 0; i < checkboxes.length; i++)  
            //   {      
            //     checkboxes[i].checked = false;
            //   }
            // }
    }
    

    render() {      
      let { isLoaded, items, uncleanBlocks, uncleanRooms } = this.state;

      if (this.props.getDashboardStore().hasCheckOutsChanged){
        this.props.updateDashboardStore({
          hasCheckOutsChanged: false
        });
        this.fetchUncleanRooms();
      }

       //clearing these as selecting check box re-renders the component and the check boxes are doubling up every time
       uncleanBlocks = [];
       uncleanRooms = [];
 
       if (items.length > 0){
       
          uncleanBlocks.push(
                  {
                      room_booking_id: items[0].room_booking_id,
                      room_no: items[0].room_no,
                      block_id: items[0].block_id,
                      floor_no: items[0].floor_no
                  }
              );
 
             uncleanRooms = items;
         }
 
     //unique block ids need to be captured in a separate array
       for (var i = 1; i < items.length; i++)
       {
         if (items[i].block_id != items[i-1].block_id)
         {
          uncleanBlocks.push(
                 {
                     room_booking_id: items[i].room_booking_id,
                     room_no: items[i].room_no,
                     block_id: items[i].block_id,
                     floor_no: items[0].floor_no
                 }
             );
         }
       }

      

     if (!isLoaded) {
          return <div><h4>Housekeeping</h4><hr />Loading...</div>;
      } else if (items.length == 0){
          return  (
          <div><h4>Housekeeping</h4><hr /> No Rooms! </div>
          );
      } else {
          return (
            <div className="divDashboardWidgets"><h4>Housekeeping</h4>
             <hr />
                <button type="button" className="btnBig" onClick={() => this.handleUncleanRoom()}>Done</button>
                    <ul>
                        {uncleanBlocks.map(item => (    
                              <li key={Math.random()}>
                                    <input type="checkbox" name="uncleanBlocks"
                                        onClick={() => this.blocksChanged()}
                                        value={item.block_id} />
                                             <b>{blocks[item.block_id]}</b> 
                                          <ol>
                                              {uncleanRooms.filter(bk => bk.block_id == item.block_id).map(booking => (
                                              <li>  

                {/* {uncleanRooms.filter(bk => bk.block_id == item.block_id).length > 1? */}

                  <span><input type="checkbox" name="uncleanRooms" id={booking.block_id} value={booking.room_booking_id} /> 
                  
                  {booking.room_no}, {floors[booking.floor_no]}</span>
                                                  
              
                                              </li>
                                              ))}
                                          </ol>                                         
                                </li>                              
                              ))}                    
                    </ul>
              </div>
            );
        }
      }
    }

    export default URooms;