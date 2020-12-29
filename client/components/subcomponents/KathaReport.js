import React, { Component } from 'react';
import {logError, checkError} from '../../utils/helpers';
import {API_URL} from '../../config/config';
import {fetch} from '../../utils/httpUtil';
import {notify} from 'react-notify-toast';
import moment from 'moment';

import ReactExport from "react-data-export";
const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;


export class KathaReport extends Component {
  constructor(props) {
    super(props);

    this.state = {
        isLoaded: false,
        error: null,
        startDate: this.props.startDate,
        endDate: this.props.endDate,
        KathaItems: [{}],
    }; 

    this.dataSet1 = []
  }

  componentDidMount() {
      this.fetchKathaReportDetails();
  }

  fetchKathaReportDetails(){
    fetch(API_URL, "reservations/?type=2&adate=" + this.state.startDate + "&ddate=" + this.state.endDate)
            .then((response) => {
                return checkError(response);
            })
            .then((result) => {
                this.setState({
                    isLoaded:true,
                    KathaItems: result
                  }, function() {

                    if (this.state.KathaItems.length > 0){
                        for (var i=0; i < this.state.KathaItems.length; i++){
                            
                            this.dataSet1.push({     
                                guest_name: this.state.KathaItems[i].guest_name,       
                                arrival: moment(this.state.KathaItems[i].date_of_arrival).format('DD-MM-YYYY'),
                                departure: moment(this.state.KathaItems[i].date_of_departure).format('DD-MM-YYYY'),
                                block: this.state.KathaItems[i].block_name,
                                room_no: this.state.KathaItems[i].room_no,
                                floor_no: floors[this.state.KathaItems[i].floor_no],
                                beds: this.state.KathaItems[i].total_beds,
                                has_ac: (this.state.KathaItems[i].has_AC ? "Yes": "No"), 
                                has_cooler: (this.state.KathaItems[i].has_cooler? "Yes": "No"),     
                                has_indian: (this.state.KathaItems[i].has_indian_toilet? "Yes": "No"),  
                                has_western: (this.state.KathaItems[i].has_western_toilet? "Yes": "No"), 
                                has_geyser: (this.state.KathaItems[i].has_solar_geyser? "Yes": "No")     
                            })
                        }
                    }
                    this.showKathaReport();
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

  showKathaReport(){
    if (this.state.KathaItems.length > 0){
        document.getElementById("divKathaContents").style.visibility="visible";
    } else {
        document.getElementById("divKathaContents").style.visibility="hidden";
        notify.show('No Kathas for given date period!', 'error');
    } 
    this.props.setRenderView(null);
}

  render() {
           
    const { items } = this.state;
    if (this.state.isLoaded == true) {
        return (         
            
        <div>
          // {/* Kathas */}
                <div id="divKathaContents" style={{visibility:'hidden', margin:'1em'}}>

                        <ExcelFile filename="Details">
                        <ExcelSheet data={this.dataSet1} name="Details">
                            <ExcelColumn label="Guest Name" value="guest_name"/>
                            <ExcelColumn label="Date of Arrival" value="arrival"/>
                            <ExcelColumn label="Date of Departure" value="departure"/>
                            <ExcelColumn label="Block" value="block"/>
                            <ExcelColumn label="Room No." value="room_no"/>
                            <ExcelColumn label="Floor" value="floor_no"/>
                            <ExcelColumn label="No. of Beds" value="beds"/>
                            <ExcelColumn label="AC" value="has_ac"/>
                            <ExcelColumn label="Cooler" value="has_cooler"/>
                            <ExcelColumn label="Indian Toilet" value="has_indian"/>
                            <ExcelColumn label="Western Toilet" value="has_western"/>
                            <ExcelColumn label="Solar Geyser" value="has_geyser"/>
                        </ExcelSheet>
                    </ExcelFile>         
                    </div> 
       
        </div>
        );
    } else {

        return null;
    }
      }
      
}

export default KathaReport;
