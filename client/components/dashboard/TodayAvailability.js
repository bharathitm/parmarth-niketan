import React from 'react';

import {blocks} from '../../constants/roomAttributes';

import {logError, checkError} from '../../utils/helpers';
import {API_URL} from '../../config/config';

export class TodayAvailability extends React.Component {

    constructor(props) {
      super(props);

      this.state = {
        error: null,
        isLoaded: false,       
      };
    }


  componentDidMount() {
    this.fetchAvailableRooms();
    }

    fetchAvailableRooms(){
      fetch(API_URL + "arooms/")
      .then((response) => {
      return checkError(response);
      })
      .then((result) => {
          this.setState({
            isLoaded: true,
            items: result
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

    render() {

      if (this.props.getDashboardStore().hasURoomsChanged){
          this.props.updateDashboardStore({
              hasURoomsChanged: false
          });
        this.fetchAvailableRooms();
      }

      if (this.props.getDashboardStore().hasCheckInsChanged){
        this.props.updateDashboardStore({
              hasCheckInsChanged: false
        });
         this.fetchAvailableRooms();
      }
   
      const { isLoaded, error, items } = this.state;

       if (!isLoaded) {
        return <div><h4>Today's Availability</h4><hr />Loading...</div>;
      } else if (items.length == 0){
          return  (
          <div><h4>Today's Availability</h4><hr /> No rooms! </div>
          );
      } else {
          return (
            <div><h4>Today's Availability</h4><hr />
            <div class="div-table-today">
             <ul>
                 {items.map(item => (
                  <li key={item.block_id}>
                    <span className="spBlockCount">   {item.count} </span><br/>
                   <span className="spBlockName"> {blocks[item.block_id]} </span>
                  </li>
                ))}
             </ul>
             </div>
             </div>
          );
        }
      }
    }

export default TodayAvailability;