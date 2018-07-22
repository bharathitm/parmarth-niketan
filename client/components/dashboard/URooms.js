import React from 'react';

import {blocks, floors} from '../../constants/roomAttributes';

import {logError, checkError, createRoomsString} from '../../utils/helpers';
import {API_URL} from '../../config/config';

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
      };

      this.getAllSelectedRooms = this.getAllSelectedRooms.bind(this);
      this.updateUncleanRoomsState = this.updateUncleanRoomsState.bind(this);
    }


  componentDidMount() {
    this.fetchUncleanRooms();
    }

    fetchUncleanRooms(){
      fetch(API_URL + "urooms/")
        .then((response) => {
          return checkError(response);
        })
        .then((result) => {
            this.setState({
              isLoaded: true,
              items: result,
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

     //Done button click
     handleUncleanRoom() {
          var selectedRooms = this.getAllSelectedRooms();
          var str_rooms = createRoomsString(selectedRooms); 

          if (str_rooms != ''){
          const payload = {
            str_room_booking_ids: str_rooms
          };
      
        fetch(API_URL + "urooms/", {
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

          if (!this.state.error){
            notify.show('Room(s) marked as cleaned successfully!', 'success');
          }
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
        }
    

    render() {      
      const { error, isLoaded, items } = this.state;

      if (this.props.getDashboardStore().hasCheckOutsChanged){
        this.props.updateDashboardStore({
          hasCheckOutsChanged: false
        });
        this.fetchUncleanRooms();
      }

      if ((!isLoaded) && (error)){
        return <div><h4>Housekeeping</h4><hr /><span id="spNoDataorError">{JSON.stringify(error.message)}</span></div>;        
       } else if (!isLoaded) {
          return <div><h4>Housekeeping</h4><hr />Loading...</div>;
      } else if (items.length == 0){
          return  (
          <div><h4>Housekeeping</h4><hr /> No rooms! </div>
          );
      } else {
          return (
            <div className="divDashboardWidgets"><h4>Housekeeping</h4>
             <hr />
                <button type="button" className="btnBig" onClick={() => this.handleUncleanRoom()}>Done</button>
                    <ol>
                            {items.map(item => (
                                 <li>
                                      <input type="checkbox" 
                                            name="uncleanRooms"
                                            value={item.room_booking_id}/>                     
                                                {item.room_no + ", " + floors[item.floor_no] + ", " + blocks[item.block_id]}                        
                                </li>
                            ))}    
                    </ol>
              </div>
            );
        }
      }
    }

    export default URooms;