import React from 'react';

import {Checkbox, CheckboxGroup} from 'react-checkbox-group';

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
        selectedRooms: [],
      };
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


    roomsChanged = (newRooms) => {
      this.setState({
        selectedRooms: newRooms
        }
      );      
    }


     //Done button click
     handleUncleanRoom() {
  
          //loop through selected rooms and create a | separated string to pass to POST
          var str_rooms = "";
          for (var i =0; i <this.state.selectedRooms.length; i++)
          {  
            str_rooms+= this.state.selectedRooms[i] + "|";
          }
          str_rooms = str_rooms.substring(0,str_rooms.length-1);

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
            <div><h4>Housekeeping</h4>
             <hr />
                <button onClick={() => this.handleUncleanRoom()}>Done</button>
                    <ol>
                        <CheckboxGroup
                              checkboxDepth={items.length} // This is needed to optimize the checkbox group
                              name="selectedRooms"
                              value={this.state.selectedRooms}
                              onChange={this.roomsChanged}>

                            {items.map(item => (
                                 <li key={Math.random()}>
                                <Checkbox value={item.room_booking_id}/>                     
                                {item.room_no}                         
                                </li>
                            ))} 
                          </CheckboxGroup>     
                    </ol>
              </div>
            );
        }
      }
    }

    export default URooms;