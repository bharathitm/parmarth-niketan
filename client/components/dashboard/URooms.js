import React from 'react';

import {logError, checkError} from '../../utils/helpers';
import {API_URL} from '../../config/config';

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
      this.createRoomsString = this.createRoomsString.bind(this);
      this.updateUncleanRoomsState = this.updateUncleanRoomsState.bind(this);

    }


  componentDidMount() {
    
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
          var str_rooms = this.createRoomsString(selectedRooms);
  
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
          .catch((error) => {
            this.setState({
              isLoaded: false,
              error
            });
            logError(error);
          });

          this.updateUncleanRoomsState(selectedRooms);      
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

      if ((!isLoaded) && (error)){
        return <div><h4>Housekeeping</h4><hr /><span id="spNoDataorError">{JSON.stringify(error.message)}</span></div>;        
       } else if (!isLoaded) {
          return <div>Loading...</div>;
      } else if (items.length == 0){
          return  (
          <div><h4>Housekeeping</h4><hr /> No rooms! </div>
          );
      } else {
          return (
            <div className="divDashboardWidgets"><h4>Housekeeping</h4>
             <hr />
                <button onClick={() => this.handleUncleanRoom()}>Done</button>
                    <ol>
                            {items.map(item => (
                                 <li key={Math.random()}>
                                      <input type="checkbox" 
                                            name="uncleanRooms"
                                            value={item.room_booking_id}/>                     
                                                {item.room_no}                         
                                </li>
                            ))}    
                    </ol>
              </div>
            );
        }
      }
    }

    export default URooms;