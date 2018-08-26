import React from 'react';
import BigCalendar from 'react-big-calendar';
import moment from 'moment';

// import events from './events'
 
import {logError, checkError, getFormattedDate} from '../../utils/helpers';
import {blocks} from '../../constants/roomAttributes';

import {API_URL} from '../../config/config';
import {fetch} from '../../utils/httpUtil';
import {notify} from 'react-notify-toast';
import { confirmAlert } from 'react-confirm-alert';

BigCalendar.setLocalizer(BigCalendar.momentLocalizer(moment));

export class RoomsCalendar extends React.Component {

    constructor(props) {
      super(props);

      this.state = {
        error: null,
        isLoaded: false,
        items: [
          {}
        ],
        events : [],
        eventDetails: []
      };

      this.loadRoomAvailability = this.loadRoomAvailability.bind(this);
    }

    handleMonthChange(dateSelected){

      var yearSelected = moment(dateSelected).year();
      var monthSelected = moment(dateSelected).month();
      var startDate = getFormattedDate(moment([yearSelected, monthSelected])).toString();
  
      this.loadRoomAvailability(startDate);
    }

    

  componentDidMount() {
    var yearSelected = moment().year();
    var monthSelected = moment().month();
    var startDate = getFormattedDate(moment([yearSelected, monthSelected])).toString();

    this.loadRoomAvailability(startDate);
    }

loadRoomAvailability(startDate){
      fetch(API_URL, "arooms/2?sdate=" + startDate)
        .then((response) => {
          return checkError(response);
        })
        .then((result) => {
          this.setState({
              isLoaded:true,
              items: result,
            }, function() {
              this.loadEvents();
            }
          );
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
  

    loadEvents(){

      var events = [];
        for (var i = 0; i < this.state.items.length; i++)
        {
          events.push(
              {
                  title: this.state.items[i].no_of_rooms,
                  start: this.state.items[i].day_of_month,
                  end: this.state.items[i].day_of_month
              }
          );
        }

        this.setState({
          events: events
        });
    }

    handleEventDateSelected(eventSelected){
      var startDate = getFormattedDate(moment(eventSelected.end).toString());

      fetch(API_URL, "arooms/3?sdate=" + startDate)
        .then((response) => {
          return checkError(response);
        })
        .then((result) => {
          this.setState({
            eventDetails: result
          });
          
          //this.loadEventDetails(result);
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

    loadEventDetails(items){

      document.getElementById("divEventDetails").innerHTML = items.length;
      // confirmAlert({
      //   customUI: ({ onClose }) => {
      //     return (
      //       <div className="row room-details">
      //       <form id="Form" className="form-horizontal">  
      //           <h4>Block Wise Room Availability</h4>  
      //           <img src="./img/close.png" className="imgClose" onClick={onClose}/>
      //          {alert(items.length)}
      //           </form>                    
      //       </div>
      //           )}
      //       })
    }
    
    render() {      
          return (

                  <div height='500px'>
                      <BigCalendar
                          events={this.state.events}
                          views={['month']}
                          onNavigate={(dateSelected) => this.handleMonthChange(dateSelected)}
                          onSelectEvent={(eventSelected) => this.handleEventDateSelected(eventSelected)}
                          // max={dates.add(dates.endOf(new Date(2015, 17, 1), 'day'), -1, 'hours')}
                          defaultView="month" />


                          <div id="divEventDetails" className="div-table availability-table" style={{ visibility: this.state.eventDetails.length > 0 ? 'visible':'hidden'}}>  
              
                                  <div className = "div-table-row">
                                            <div className ="div-table-col div-table-col-header">
                                                  Blocks
                                            </div>
                                            <div className ="div-table-col div-table-col-header">
                                                  Rooms Available
                                            </div>
                                    </div>
                                  {this.state.eventDetails.map(item => (
                                      <div className = "div-table-row">
                                            <div className ="div-table-col">
                                              {blocks[item.block_id]}
                                            </div>
                                            <div className ="div-table-col">
                                              {item.no_of_rooms}
                                            </div>
                                      </div>
                                      ))} 
                              </div>
                    </div>
                  );
        }
    }

     export default RoomsCalendar;