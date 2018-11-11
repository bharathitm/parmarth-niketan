import React from 'react';
import BigCalendar from 'react-big-calendar';
import moment from 'moment';
 
import {logError, checkError, getFormattedDate} from '../../utils/helpers';
import {blocks} from '../../constants/roomAttributes';

import {API_URL} from '../../config/config';
import {fetch} from '../../utils/httpUtil';
import {notify} from 'react-notify-toast';

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
        eventHalls: [{}],
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
      this.loadEventHallsAvailability(startDate);
    }

    

  componentDidMount() {
    var yearSelected = moment().year();
    var monthSelected = moment().month();
    var startDate = getFormattedDate(moment([yearSelected, monthSelected])).toString();

    this.loadRoomAvailability(startDate);
    this.loadEventHallsAvailability(startDate);
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

    loadEventHallsAvailability(startDate){
      fetch(API_URL, "arooms/5?sdate=" + startDate)
        .then((response) => {
          return checkError(response);
        })
        .then((result) => {
          this.setState({
              isLoaded:true,
              eventHalls: result,
            }, function() {
              this.loadEventHalls();
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

    loadEventHalls(){

      var events = this.state.events;
        for (var i = 0; i < this.state.eventHalls.length; i++)
        {
          events.push(
              {
                  title: this.state.eventHalls[i].event_hall,
                  start: this.state.eventHalls[i].start_date,
                  end: this.state.eventHalls[i].end_date,
                  isEventHall: true,
                  selectable: false
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

    eventStyleGetter(event, start, end, isSelected) {
      
      var style = {
      }

      if (event.isEventHall){
          style.backgroundColor = 'sandybrown';
      } else if (parseInt(event.title) < 0 ){
        style.backgroundColor = 'red';
      }
      return {
          style: style
      };
  }
    
    render() {      
          return (
                  <div height='500px'>
                      <BigCalendar
                          events={this.state.events}
                          views={['month']}
                          onNavigate={(dateSelected) => this.handleMonthChange(dateSelected)}
                          onSelectEvent={(eventSelected) => this.handleEventDateSelected(eventSelected)}
                          popup={true}
                          eventPropGetter={(this.eventStyleGetter)}
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