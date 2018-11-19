import React, { Component } from 'react';

import {floors, roomTypes} from '../../constants/roomAttributes';

import {logError, checkError} from '../../utils/helpers';
import {API_URL} from '../../config/config';
import {fetch, store} from '../../utils/httpUtil';
import {notify} from 'react-notify-toast';

export class RoomDetails extends Component {

    constructor(props) {
      super(props);
  
      this.state = {
        items: [],
        isLoaded: false,
        error: null
      }; 

      this._validateOnDemand = true;
      this.validationCheck = this.validationCheck.bind(this);
    }

    componentDidMount(){
        this.fetchRoomDetails();
    }

    fetchRoomDetails(){
        if (this.props.getRoomStore().roomId != null){
            fetch(API_URL, "rooms/" + this.props.getRoomStore().roomId)
            .then((response) => {
            return checkError(response);
            })
            .then((result) => {
                this.setState({
                    isLoaded: true,
                    roomId: this.props.getRoomStore().roomId,
                    items: result
                });
                this.loadRoomDetails();
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
    }

    loadRoomDetails(){

        this.props.updateRoomStore({
            roomNo: this.state.items[0].room_no,
            floorNo: this.state.items[0].floor_no,
            totalBeds: this.state.items[0].total_beds,
            roomDonation: this.state.items[0].room_rent,
            hasAC: this.state.items[0].has_AC,
            hasCooler: this.state.items[0].has_cooler,
            hasSolarGeyser: this.state.items[0].has_solar_geyser,
            hasIndianToilet: this.state.items[0].has_indian_toilet,
            hasWesternToilet: this.state.items[0].has_western_toilet,
            isAvailable: this.state.items[0].is_available,
            notes: this.state.items[0].notes
          });

        this.setState({
            roomNo: this.state.items[0].room_no,
            floorNo: this.state.items[0].floor_no,
            totalBeds: this.state.items[0].total_beds,
            roomDonation: this.state.items[0].room_rent,
            hasAC: this.state.items[0].has_AC,
            hasCooler: this.state.items[0].has_cooler,
            hasSolarGeyser: this.state.items[0].has_solar_geyser,
            hasIndianToilet: this.state.items[0].has_indian_toilet,
            hasWesternToilet: this.state.items[0].has_western_toilet,
            isAvailable: this.state.items[0].is_available,
            notes: this.state.items[0].notes
          });

        this.refs.totalBeds.value = this.state.items[0].total_beds,
        this.refs.floorNo.value = this.state.items[0].floor_no,
        this.refs.notes.value = this.state.items[0].notes

        var rdAC = document.getElementsByName("hasAC");
        (this.state.items[0].has_AC == 1? rdAC[0].checked = true: rdAC[1].checked = true); 

        var rdCooler = document.getElementsByName("hasCooler");
        (this.state.items[0].has_cooler == 1? rdCooler[0].checked = true: rdCooler[1].checked = true); 

        var rdWToilet = document.getElementsByName("hasWesternToilet");
        (this.state.items[0].has_western_toilet == 1? rdWToilet[0].checked = true: rdWToilet[1].checked = true); 

        var rdIToilet = document.getElementsByName("hasIndianToilet");
        (this.state.items[0].has_indian_toilet == 1? rdIToilet[0].checked = true: rdIToilet[1].checked = true); 

        var rdSGeyser = document.getElementsByName("hasSolarGeyser");
        (this.state.items[0].has_solar_geyser == 1? rdSGeyser[0].checked = true: rdSGeyser[1].checked = true); 

        var rdisAvailable = document.getElementsByName("isAvailable");
        (this.state.items[0].is_available == 1? rdisAvailable[0].checked = true: rdisAvailable[1].checked = true); 

    }

    populateFloors() {
        let items = [];   
    
        for (let i = 0; i <= 3; i++) {             
             items.push(<option key={i} value={i}>{floors[i]}</option>);   
        }
        return items;
    }

    populateRoomTypes() {
        let items = [];   
    
        for (let i = 1; i <= 11; i++) {             
             items.push(<option key={i} value={i}>{roomTypes[i]}</option>);   
        }
        return items;
    }


    validationCheck() {
        if (!this._validateOnDemand)
          return;
    
        const userInput = this._grabUserInput(); // grab user entered vals
        const validateNewInput = this._validateData(userInput); // run the new input against the validator
    
        this.setState(Object.assign(userInput, validateNewInput));
    }

    _grabUserInput() {

        var rdAC = document.getElementsByName("hasAC");
        var rdCooler = document.getElementsByName("hasCooler");
        var rdWToilet = document.getElementsByName("hasWesternToilet");
        var rdIToilet = document.getElementsByName("hasIndianToilet");
        var rdSGeyser = document.getElementsByName("hasSolarGeyser");
        var rdisAvailable = document.getElementsByName("isAvailable");

        return {
          roomNo: this.refs.roomNo.value,
          floorNo: this.refs.floorNo.value,
          roomDonation: this.refs.roomDonation.value,
          totalBeds: this.refs.totalBeds.value,
          hasAC: (rdAC[0].checked? 1: 0),
          hasCooler: (rdCooler[0].checked? 1: 0),
          hasWesternToilet: (rdWToilet[0].checked? 1: 0),
          hasIndianToilet: (rdIToilet[0].checked? 1: 0),
          hasSolarGeyser: (rdSGeyser[0].checked? 1: 0),
          isAvailable: (rdisAvailable[0].checked? 1: 0),
          notes: (this.refs.notes.value.toString().trim() != ''? this.refs.notes.value: null)
          //notes: this.refs.notes.value
        };
    }
    
    _validateData(data) {
        return  {
          roomNoVal:  (data.roomNo != ''),
          floorNoVal: true,
          roomDonationVal: (data.roomDonation != ''),
          totalBedsVal: true,
          hasACVal: true,
          hasCoolerVal: true,
          hasWesternToiletVal: true,
          hasIndianToiletVal: true,
          hasSolarGeyserVal: true, 
          isAvailableVal: true,
          notesVal: true
        };
    }

    saveRoomDetails() {

        const userInput = this._grabUserInput(); // grab user entered vals
        const validateNewInput = this._validateData(userInput); // run the new input against the validator

        // if full validation passes then save to store and pass as valid
        if (Object.keys(validateNewInput).every((k) => { return validateNewInput[k] === true })) {
            if (
                this.props.getRoomStore().roomNo != userInput.roomNo || 
                this.props.getRoomStore().floorNo != userInput.floorNo || 
                this.props.getRoomStore().roomDonation != userInput.roomDonation || 
                this.props.getRoomStore().totalBeds != userInput.totalBeds || 
                this.props.getRoomStore().hasAC != userInput.hasAC || 
                this.props.getRoomStore().hasCooler != userInput.hasCooler || 
                this.props.getRoomStore().hasWesternToilet != userInput.hasWesternToilet || 
                this.props.getRoomStore().hasIndianToilet != userInput.hasIndianToilet || 
                this.props.getRoomStore().hasSolarGeyser != userInput.hasSolarGeyser || 
                this.props.getRoomStore().isAvailable != userInput.isAvailable || 
                this.props.getRoomStore().notes != userInput.notes
              ) { 
                    this.updateRoomDetails();
                    this.props.onClose();
                    this.props.handleBlockChange();
              }
        }
        else {
            this.setState(Object.assign(userInput, validateNewInput));
        }
    }
    
    updateRoomDetails(){

        const payload = {
            room_id: this.state.roomId,
            room_no: this.state.roomNo,
            floor_no: this.state.floorNo,
            total_beds: this.state.totalBeds,
            room_rent: this.state.roomDonation,
            has_AC: this.state.hasAC,
            has_cooler: this.state.hasCooler,
            has_western_toilet: this.state.hasWesternToilet,
            has_indian_toilet: this.state.hasIndianToilet,
            has_solar_geyser: this.state.hasSolarGeyser,
            is_available: this.state.isAvailable,
            notes: this.state.notes
        };

        store(API_URL, "rooms/", JSON.stringify(payload))
        .then((response) => {
            return checkError(response);
        })
        .then((result) => {   
                this.setState({
                isLoaded: true
                });
                notify.show('Room details updated successfully!', 'success');
        })
        .catch((error) => {
            this.setState({
            isLoaded: false,
            error
            });
            notify.show('Oops! Something went wrong! Please try again!', 'error');
            logError(error);
        });
    }
    
    render() {
        let notValidClasses = {};

        /* roomNo */
        if (typeof this.state.roomNoVal == 'undefined' || this.state.roomNoVal) {
            notValidClasses.roomNoCls = 'form-control';
        }
        else {
            notValidClasses.roomNoCls = 'form-control has-error';
        }

        /* roomDonation */
        if (typeof this.state.roomDonationVal == 'undefined' || this.state.roomDonationVal) {
            notValidClasses.roomDonationCls = 'form-control';
        }
        else {
            notValidClasses.roomDonationCls = 'form-control has-error';
        }

        return (  
            <div className = "div-table">
            <div className = "div-table-row">
                    <div className ="div-table-col">
                            <div className="form-group col-md-12 content form-block-holder">
                                <label className="control-label col-md-4">
                                Room No:
                                </label>
                                <div className="col-md-8">
                                    <input ref="roomNo"
                                        autoComplete="off"
                                        className={notValidClasses.roomNoCls}
                                        required
                                        defaultValue={this.state.roomNo}
                                        onBlur={this.validationCheck} />
                                </div>
                                </div>
                        </div>
            
                    <div className ="div-table-col">
                            <div className="form-group col-md-12 content form-block-holder">
                                <label className="control-label col-md-4">
                                    Floor No:
                                </label>
                                <div className="col-md-8">
                                <select ref="floorNo"
                                    className="form-control"
                                    onBlur={this.validationCheck}
                                    defaultValue={this.state.floorNo}>
                                    {this.populateFloors()}                   
                                </select>    
                                </div>
                            </div>
                    </div>
                </div>
       <div className = "div-table-row">
                    <div className ="div-table-col">
                    <div className="form-group col-md-12 content form-block-holder">
                                <label className="control-label col-md-4">
                                    Donation:  &#8377;
                                </label>
                                <div className="col-md-8">
                               <input ref="roomDonation"
                                            autoComplete="off"
                                            className={notValidClasses.roomDonationCls}
                                            required
                                            type="number"
                                            defaultValue={this.state.roomDonation}
                                            onBlur={this.validationCheck} />
                                </div>
                            </div>
                        </div>
            
                    <div className ="div-table-col">
                             <div className="form-group col-md-12 content form-block-holder">
                                <label className="control-label col-md-4">
                                Total Beds:
                                </label>
                                <div className="col-md-8">
                                <select ref="totalBeds"
                                    className="form-control"
                                    onBlur={this.validationCheck}
                                    defaultValue={this.state.totalBeds}>
                                    {this.populateRoomTypes()}                   
                                </select>    
                                </div>
                                </div>

                    </div>
                </div>

                <div className = "div-table-row">
                    <div className ="div-table-col">
                            <div className="form-group col-md-12 content form-block-holder">
                                <label className="control-label col-md-4">
                                AC:   
                                </label>
                                <div className="col-md-8"  onBlur={this.validationCheck}>
                                    <input type="radio" name="hasAC" value="1" /> Yes
                                    <input type="radio" name="hasAC" value="0" />No
                                </div>
                                </div>
                        </div>
            
                    <div className ="div-table-col">
                            <div className="form-group col-md-12 content form-block-holder">
                                <label className="control-label col-md-4">
                                    Cooler:
                                </label>
                                <div className="col-md-8" onBlur={this.validationCheck}>
                                    <input type="radio" name="hasCooler" value="1" />Yes
                                    <input type="radio" name="hasCooler" value="0" />No
                                </div>
                            </div>
                    </div>
                </div>

                <div className = "div-table-row">
                    <div className ="div-table-col">
                            <div className="form-group col-md-12 content form-block-holder">
                                <label className="control-label col-md-4">
                                Western Toilet:
                                </label>
                                <div className="col-md-8" onBlur={this.validationCheck}>
                                    <input type="radio" name="hasWesternToilet" value="1" /> Yes
                                    <input type="radio" name="hasWesternToilet" value="0" />No
                                </div>
                            </div>
                        </div>
            
                    <div className ="div-table-col">
                            <div className="form-group col-md-12 content form-block-holder">
                                <label className="control-label col-md-4">
                                    Indian Toilet:
                                </label>
                                <div className="col-md-8" onBlur={this.validationCheck}>
                                    <input type="radio" name="hasIndianToilet" value="1" /> Yes
                                    <input type="radio" name="hasIndianToilet" value="0" />No
                                </div>
                            </div>
                    </div>
                
                </div>

                <div className = "div-table-row">
                    <div className ="div-table-col">
                    <div className="form-group col-md-12 content form-block-holder">
                                <label className="control-label col-md-4">
                                Solar Geyser:
                                </label>
                                <div className="col-md-8" onBlur={this.validationCheck}>
                                    <input type="radio" name="hasSolarGeyser" value="1" /> Yes
                                    <input type="radio" name="hasSolarGeyser" value="0" />No
                                </div>
                                </div>
                        </div>
            
                    <div className ="div-table-col">
                            <div className="form-group col-md-12 content form-block-holder">
                                <label className="control-label col-md-4">
                                    Is Available:
                                </label>
                                <div className="col-md-8" onBlur={this.validationCheck}>
                                    <input type="radio" name="isAvailable" value="1" /> Yes 
                                    <input type="radio" name="isAvailable" value="0" />No
                                </div>
                            </div>
                    </div>
                    <div className = "div-table-row">
                            <div className ="comments-col div-table-col">
                                {/* Notes */}
                                <div className="form-group col-md-12 content form-block-holder long-col">
                                    <label className="control-label col-md-4">
                                        Notes:
                                    </label>
                                    <div className="col-md-8">
                                        <textarea
                                        ref="notes"
                                        autoComplete="off"
                                        className="form-control"
                                        onBlur={this.validationCheck}
                                        defaultValue={this.state.notes} />
                                    </div>
                                    </div>
                                </div>
                        </div>

                <button type="button" className="btnCheckOut btnBig" onClick={() => 
                    { this.saveRoomDetails(); }}>Save</button>

            </div>
        </div>
            );
    }
}

export default RoomDetails;