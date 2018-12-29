import React, { Component } from 'react';

import {blocks} from '../constants/roomAttributes';

import {logError, checkError} from '../utils/helpers';
import {API_URL} from '../config/config';
import {fetch} from '../utils/httpUtil';
import { confirmAlert } from 'react-confirm-alert'; 
import {notify} from 'react-notify-toast';

import RoomDetails from './subcomponents/RoomDetails';

export class Rooms extends Component {

    constructor(props) {
      super(props);
  
      this.state = {
        items: [],
        isLoaded: false,
        error: null
      };
      
      this.roomStore = {
        roomId: null,
        roomNo: '',
        floorNo: '',
        totalBeds: '',
        roomDonation: '',
        hasAC: '',
        hasCooler: '',
        hasSolarGeyser: '',
        hasIndianToilet: '',
        hasWesternToilet: '',
        isAvailable: '',
        notes: ''
      };

    }

    populateBlocks() {
        let items = [];   
    
        for (let i = 1; i <= 10; i++) {             
             items.push(<option key={i} value={i}>{blocks[i]}</option>);   
        }
        return items;
    }

    handleBlockChange(){
        fetch(API_URL, "rooms/?bId=" + this.refs.blockId.value)
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

    getRoomStore() {
        return this.roomStore;
      }

    updateRoomStore(update) {
    this.roomStore = {
        ...this.roomStore,
        ...update,
    }
    }

    handleUpdateRoom(roomId){

        this.roomStore = {
            roomId: roomId
        };

        confirmAlert({
            customUI: ({ onClose }) => {
              return (
                <div className="row room-details">
                <form id="Form" className="form-horizontal">  
                    <h4>Room Details</h4>  
                    <img src="./img/close.png" className="imgClose" onClick={onClose}/>
                    <RoomDetails getRoomStore={() => (this.getRoomStore())} updateRoomStore={(u) => {this.updateRoomStore(u)}}  onClose={() => onClose()} handleBlockChange={() => (this.handleBlockChange())}></RoomDetails>
                    </form>                    
                </div>
                    )}
                })
        }
    
    render() {

        return (  
            <div>
                    <div className="form-group col-md-12 content form-block-holder">
                    <label className="control-label col-md-4">
                    Blocks: <br/>
                    </label>
                    <div className="col-md-8">
                            <select id="slBlocks"
                                ref="blockId"
                                className="form-control"
                                onChange={() => this.handleBlockChange()}>
                                <option value="0">Please select</option>
                                {this.populateBlocks()}                   
                            </select>                      
                    </div>
                    </div>
<br/><br/><br/>
                    <div id="divRoomBookings" style={{ visibility: this.state.isLoaded? 'visible':'hidden', display: this.state.isLoaded? 'inline':'none' }}>
                    <div className = "div-table advance-table">
                            <div className = "div-table-row">
                                    <div className ="room-no div-table-col div-table-col-header">
                                    Room No.
                                    </div>
                                     <div className ="details div-table-col div-table-col-header">
                                    Notes
                                    </div>
                                    <div className ="actions div-table-col div-table-col-header">
                                    Actions
                                    </div>
                            </div>
                            {this.state.items.map(item => (
                                <div className = "div-table-row">
                                    <div className ="room-no div-table-col col-bordered" style={{backgroundColor: item.is_available? '': 'lightgrey' }}>
                                    {item.room_no}
                                    </div>
                                    <div className ="details div-table-col col-bordered" style={{backgroundColor: item.is_available? '': 'lightgrey' }}>
                                        {item.notes}
                                    </div>
                                    <div className ="actions div-table-col col-bordered">
                                    <img src="./img/tick.png" onClick={() => this.handleUpdateRoom(item.room_id)}/>
                                    </div>
                                </div>
                                ))}  
                            </div>
                    </div>
                </div>
            );
    }
}

export default Rooms;