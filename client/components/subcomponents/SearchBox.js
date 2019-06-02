import React, { Component } from 'react';

import DatePicker from 'react-datepicker';
import moment from 'moment';

import { blocks} from '../../constants/roomAttributes';

export class SearchBox extends Component {
  constructor(props) {
    super(props);

    this.state = {
      arrivalDate: null,
      departureDate: null
    }; 

    this.handleArrivalDateChange = this.handleArrivalDateChange.bind(this);
    this.handleDepartureDateChange = this.handleDepartureDateChange.bind(this);

    this.populateBlocks = this.populateBlocks.bind(this);

    this._validateOnDemand = true; 

    this.validationCheck = this.validationCheck.bind(this);
    this.isValidated = this.isValidated.bind(this);

    this.handleSearchBox = this.handleSearchBox.bind(this);
  }

  componentDidMount(){
      if(this.props.getSearchStore().arrivalDate != null){
      this.setState({
        arrivalDate: moment(this.props.getSearchStore().arrivalDate),
        departureDate: moment(this.props.getSearchStore().departureDate)
      });
      this.refs.arrivalDate.selected = moment(this.props.getSearchStore().arrivalDate);
      this.refs.departureDate.selected = moment(this.props.getSearchStore().departureDate);
      this.props.handleSearch();
    }   
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
    };
  }

  populateBlocks(){
    let items = []; 

    for (let i = 0; i < this.props.getSearchStore().uniqueBlocks.length; i++) {           
      var blockRooms = this.props.getSearchStore().uniqueRooms.filter(bk => bk.block_id == this.props.getSearchStore().uniqueBlocks[i]);

      if (this.props.getSearchStore().uniqueBlocks[i] == 10){
        items.push(<li>
          <input type="checkbox" name="chkBlocks" onClick={() => this.props.handleBlocksChanged()} value={this.props.getSearchStore().uniqueBlocks[i]} /> 
        {blocks[this.props.getSearchStore().uniqueBlocks[i]]}     
        </li>); 
      } else if (this.props.getSearchStore().uniqueBlocks[i] != 11){
        items.push(<li>
          <input type="checkbox" name="chkBlocks" onClick={() => this.props.handleBlocksChanged()} value={this.props.getSearchStore().uniqueBlocks[i]} /> 
        {blocks[this.props.getSearchStore().uniqueBlocks[i]]}  
        ({blockRooms.length})  
        </li>); 

      }  
    }
    return items;
  }


  handleSearchBox(){
    if (this.isValidated()){
      this.props.handleSearch();
    }
  }

  validationCheck() {
    if (!this._validateOnDemand)
      return;

    const userInput = this._grabUserInput(); 
    const validateNewInput = this._validateData(userInput); 

    this.setState(Object.assign(userInput, validateNewInput));
  }

  isValidated() {
    const userInput = this._grabUserInput(); 
    const validateNewInput = this._validateData(userInput); 
    let isDataValid = false;

    if (Object.keys(validateNewInput).every((k) => { return validateNewInput[k] === true })) {
        isDataValid = true;
    }
    else {
        this.setState(Object.assign(userInput, validateNewInput));
    }

    return isDataValid;
  }


render() {
      let notValidClasses = {};

  if((this.props.getSearchStore().reservationId != null) && (document.getElementById("divArrivalDate") != null)){
        document.getElementById("divArrivalDate").className = "disabledDiv";
        document.getElementById("divDepartureDate").className = "disabledDiv";
      }
  else if((this.props.getSearchStore().reservationId == null) && (document.getElementById("divArrivalDate") != null)){
    document.getElementById("divArrivalDate").className = notValidClasses.arrivalDateCls;
    document.getElementById("divDepartureDate").className = notValidClasses.departureDateCls;
  } 

    /* Arrival Date */
    if (typeof this.state.arrivalDateVal == 'undefined' || this.state.arrivalDateVal) {
      notValidClasses.arrivalDateCls = 'form-control';
    }
    else {
       notValidClasses.arrivalDateCls = 'form-control has-error';
    }

    /* Departure Date */    
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
                    <div id="divArrivalDate" className="col-md-8">
                            <DatePicker ref="arrivalDate"
                                dateFormat="YYYY-MM-DD"
                                selected={this.state.arrivalDate}
                                onChange={this.handleArrivalDateChange} 
                                 onBlur={this.validationCheck} 
                                 minDate={moment().subtract(2, 'days')}                        
                                className={notValidClasses.arrivalDateCls}/>
                    </div>
        </div>


      <div className="form-group col-md-12 content form-block-holder">
            <label className="control-label col-md-4">
              Check Out Date:*
            </label>
            <div id="divDepartureDate" className="col-md-8">
                  <DatePicker ref="departureDate"
                dateFormat="YYYY-MM-DD"
                selected={this.state.departureDate}
                onChange={this.handleDepartureDateChange} 
                 onBlur={this.validationCheck}
                 minDate={this.state.arrivalDate} 
                className={notValidClasses.departureDateCls}/>
              </div>
      </div>

      {/* <div className="form-group col-md-12 content form-block-holder"> 
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
                                required 
                                {this.populateRoomTypes()}                   
                              </select>         
              </div>
          </div> */}

          <div className="form-group col-md-12 content form-block-holder">
          <button type="button" className="btnBig"  onClick={() => this.handleSearchBox()}>Search</button>
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