import React from 'react';

import {Checkbox, CheckboxGroup} from 'react-checkbox-group';

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
    
    fetch("http://localhost:3000/api/urooms/")
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            items: result,
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
      //alert(str_rooms + " room ids");

        const payload = {
          str_room_booking_ids: str_rooms
    };
  
    fetch("http://localhost:3000/api/urooms/", {
        method: 'POST',
        headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)

      })
        .then(function(response) {
         
          // alert(this.state.selectedRooms.length);
          // this.setState({
          //   items: this.state.items.filter(x => !this.state.selectedRooms.includes(x))
          // });

            return response.json()
          }).then(function(body) {
            console.log(body);
          });

        // var newData = [];
        // for (var i =0; i <this.state.selectedRooms.length; i++)
        // {  
        //   newData.push(this.state.selectedRooms[i]);
        // }

        // alert(newData.length);          
          
      }
  

    render() {
      const { error, isLoaded, items } = this.state;

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
                                <li>
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