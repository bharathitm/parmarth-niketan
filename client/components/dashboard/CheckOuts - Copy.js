import React from 'react';

import blocks from '../../constants/blocks';
import reservationTypes from '../../constants/reservationTypes';

export class CheckOuts extends React.Component {

    constructor(props) {
      super(props);

      this.state = {
        error: null,
        isLoaded: false,
        items: [
          {}
        ],
      };
    }


  componentDidMount() {
    
    fetch("http://localhost:3000/api/checkouts/")
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            items: result
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

    render() {
      const { error, isLoaded, items } = this.state;

      const uniqueReservations = [];
      const roomReservations = [];
      const currentReservation = [];

      uniqueReservations.push(
        {
            reservation_id: items[0].reservation_id, 
            name: items[0].first_name + " " + items[0].last_name, 
            reservation_type_id: items[0].reservation_type_id
        }
    );

      roomReservations.push(
          {
              reservation_id: items[0].reservation_id, 
              room_booking_id: items[0].room_booking_id, 
              room_no: items[0].room_no, 
              floor_no: items[0].floor_no, 
              block_id: items[0].block_id
          }
        );

      for (var i = 1; i < items.length; i++)
      {
        if (items[i].reservation_id != items[i-1].reservation_id)
        {
            uniqueReservations.push(
                {
                    reservation_id: items[i].reservation_id, 
                    name: items[i].first_name + " " + items[i].last_name, 
                    reservation_type_id: items[i].reservation_type_id
                }
            );
        }
        roomReservations.push(
            {
                reservation_id: items[i].reservation_id, 
                room_booking_id: items[i].room_booking_id, 
                room_no: items[i].room_no, 
                block_id: items[i].block_id
            }
          );
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

            <div><h1>Today's Check Outs</h1>
                <hr />
                    <ul>
                        {uniqueReservations.map(item => (
                            <li key={item.reservation_id}><input type="checkbox" />
                            {reservationTypes[item.reservation_type_id]} {item.name}                            
                                 <ol>
                                     
                                     {roomReservations.filter(bk => bk.reservation_id == item.reservation_id).map(booking => (
                                    <li key={booking.room_booking_id}><input type="checkbox" />{booking.room_no + ", " + blocks[booking.block_id]}
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

    export default CheckOuts;

    // const element = <CheckOuts />;
    // ReactDOM.render(
    //   element,
    //   document.getElementById('root')
    // );
