import React from 'react';

import {blocks} from '../../constants/roomAttributes';

import {logError, checkError} from '../../utils/helpers';
import {API_URL} from '../../config/config';
import {fetch} from '../../utils/httpUtil';
import {notify} from 'react-notify-toast';
import { confirmAlert } from 'react-confirm-alert';
import RoomsCalendar from '../subcomponents/Calendar';


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
      fetch(API_URL, "arooms/1")
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

    showAvailabilityCalendar(){

      confirmAlert({
        customUI: ({ onClose }) => {
          return (
            <div className="row room-details">
            <form id="Form" className="form-horizontal">  
                <h4>Room Availability</h4>  
                <b>Note:</b> Yoga Village rooms are not considered in the count below.
                <img src="./img/close.png" className="imgClose" onClick={onClose}/>
               <RoomsCalendar></RoomsCalendar>
                </form>                    
            </div>
                )}
            })

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
   
      const { isLoaded, items } = this.state;

       if (!isLoaded) {
        return <div><h4>Today's Availability</h4><hr />Loading...</div>;
      } else if (items.length == 0){
          return  (
          <div><h4>Today's Availability</h4><hr /> No rooms! </div>
          );
      } else {
          return (
            <div><h4>Today's Availability</h4><hr />
            <div className="div-table-today">
             <ul>
                 {items.map(item => (
                  <li key={item.block_id}>
                  {}
                    <span className="spBlockCount" style={{color: item.block_id == 11? 'red': ''}}>{item.count}</span><br/>
                   <span className="spBlockName"> {blocks[item.block_id]} </span>
                  </li>
                ))}
             </ul>
             </div>
             <a id="lnkRoomsAvailability" onClick={this.showAvailabilityCalendar}>More</a>
             </div>
          );
        }
      }
    }

export default TodayAvailability;