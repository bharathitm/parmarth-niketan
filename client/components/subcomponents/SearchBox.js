import React, { Component } from 'react';

import DatePicker from 'react-datepicker';
import moment from 'moment';

import roomTypes from '../../constants/roomTypes';
import blocks from '../../constants/blocks';

export class SearchBox extends Component {
  constructor(props) {
    super(props);

    this.state = {
      arrivalDate: moment(),
      departureDate: moment()
    }; 

    this.handleArrivalDateChange = this.handleArrivalDateChange.bind(this);
    this.handleDepartureDateChange = this.handleDepartureDateChange.bind(this);

    this.populateNoOfRooms  = this.populateNoOfRooms.bind(this);
    this.handleNoOfRoomsChange = this.handleNoOfRoomsChange.bind(this);

    this.populateRoomTypes = this.populateRoomTypes.bind(this);
    this.handleRoomTypeChange = this.handleRoomTypeChange.bind(this);

    this.populateBlocks = this.populateBlocks.bind(this);

    this._validateOnDemand = true; // this flag enables onBlur validation as user fills forms

    this.validationCheck = this.validationCheck.bind(this);
  }

  handleArrivalDateChange(date) {
    this.setState({
        arrivalDate: date
    });

    this.props.updateSearchStore({
        arrivalDate: date
    });

    this.refs.arrivalDate.selected = date;
  }

  handleDepartureDateChange(date){
    this.setState({
      departureDate: date
    });

    this.props.updateSearchStore({
        departureDate: date
    });

    this.refs.departureDate.selected = date;
  }

  handleNoOfRoomsChange(){
    this.props.updateSearchStore({
      noOfRooms: this.refs.noOfRooms.value
    });
}

  handleRoomTypeChange(){
      this.props.updateSearchStore({
        roomType: this.refs.roomTypes.value
      });
  }

  
  validationCheck() {
    if (!this._validateOnDemand)
      return;

    const userInput = this._grabUserInput(); // grab user entered vals
    const validateNewInput = this._validateData(userInput); // run the new input against the validator

    this.setState(Object.assign(userInput, validateNewInput));
  }

  _grabUserInput() {
    return {
      arrivalDate: this.refs.arrivalDate.selected,
      departureDate: this.refs.departureDate.selected
    };
  }

  _validateData(data) {
    return  {
      arrivalDateVal: (data.arrivalDate == null || data.arrivalDate == undefined)? false: true,
      departureDateVal: (data.departureDate == null || data.departureDate == undefined)? false: true
    }
  }

  
  populateNoOfRooms() {
    let items = [];
    
    items.push(<option value="null"> No. Of Rooms</option>); 
    items.push(<option key={1} value={1}>{1} room</option>);   

    for (let i = 2; i <= 10; i++) {             
         items.push(<option key={i} value={i}>{i} rooms</option>);   
    }

    items.push(<option value="null">Multiple rooms</option>);  
    return items;
  } 


  populateRoomTypes() {
    let items = [];   

    items.push(<option value="null">Room Type</option>); 

    for (let i = 1; i <= 10; i++) {             
         items.push(<option key={i} value={i}>{roomTypes[i]}</option>);   
    }
    return items;
  } 

  populateBlocks(){
    let items = []; 

    for (let i = 0; i < this.props.getSearchStore().uniqueBlocks.length; i++) {           
      var blockRooms = this.props.getSearchStore().uniqueRooms.filter(bk => bk.block_id == this.props.getSearchStore().uniqueBlocks[i]);
      items.push(<li><input type="checkbox" name="chkBlocks" onClick={() => this.props.handleBlocksChanged()} value={this.props.getSearchStore().uniqueBlocks[i]} /> {blocks[this.props.getSearchStore().uniqueBlocks[i]]} ({blockRooms.length})</li>);   
    }
    return items;
  }

render() {

    // explicit class assigning based on validation
    let notValidClasses = {};

    /* First Name */
    if (typeof this.state.arrivalDateVal == 'undefined' || this.state.arrivalDateVal) {
      notValidClasses.arrivalDateCls = 'form-control';
    }
    else {
       notValidClasses.arrivalDateCls = 'form-control has-error';
    }

    /* Last Name */    
    if (typeof this.state.departureDateVal == 'undefined' || this.state.departureDateVal) {
      notValidClasses.departureDateCls = 'form-control';
    }
    else {
       notValidClasses.departureDateCls = 'form-control has-error';
    }

    return (
    <div className = "div-book-room-search">
                  
    {/* Search Box */}
    <h4>Search</h4>
        <div className="form-group col-md-12 content form-block-holder">
            <label className="control-label col-md-4">
                Check In Date:*
            </label>
                    <div className="col-md-8">
                            <DatePicker ref="arrivalDate"
                                dateFormat="YYYY-MM-DD"
                                selected={this.state.arrivalDate}
                                onBlur={this.validationCheck}
                                onChange={this.handleArrivalDateChange} 
                                className={notValidClasses.arrivalDateCls}/>
                    </div>
        </div>


      <div className="form-group col-md-12 content form-block-holder">
            <label className="control-label col-md-4">
              Check Out Date:*
            </label>
            <div className="col-md-8">
                  <DatePicker ref="departureDate"
                dateFormat="YYYY-MM-DD"
                selected={this.state.departureDate}
                onBlur={this.validationCheck}
                onChange={this.handleDepartureDateChange} 
                className={notValidClasses.departureDateCls}/>
              </div>
      </div>

      <div className="form-group col-md-12 content form-block-holder">
          <div className="col-md-8">
                <select id="slNoOfRooms"
                              ref="noOfRooms"
                              autoComplete="off"
                              className="form-control"
                              onChange={() => this.handleNoOfRoomsChange()}>
                              {this.populateNoOfRooms()}                   
                            </select>         
            </div>
            </div>
        <div className="form-group col-md-12 content form-block-holder"> 
            <div className="col-md-8">
                  <select id="slRoomTypes"
                                ref="roomTypes"
                                autoComplete="off"
                                className="form-control"
                                onChange={() => this.handleRoomTypeChange()}>
                               /* required  removing required from here results in clearing arrival / departure dates */
                                {this.populateRoomTypes()}                   
                              </select>         
              </div>
          </div>
          <div className="form-group col-md-12 content form-block-holder">
          <button type="button" className="btnBig"  onClick={() => this.props.handleSearch()}>Search</button>
          </div>
<br/>
           <div id="divFilter"  style={{ visibility:this.props.getSearchStore().searchLoaded? 'visible':'hidden', display: this.props.getSearchStore().searchLoaded? 'inline':'none' }}>
    <h4>Filter By Blocks</h4>         
          <ul>
             {this.populateBlocks()}
          </ul>
           </div> 
</div>
)}

}

export default SearchBox;