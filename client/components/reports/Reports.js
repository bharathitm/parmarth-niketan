import React from 'react';

import ErrorBoundary from '../ErrorBoundary'

import DatePeriodPicker from '../subcomponents/DatePeriodPicker';
import moment from 'moment';
import {blocks} from '../../constants/roomAttributes';

import {logError, checkError, getFormattedDate} from '../../utils/helpers';
import {API_URL} from '../../config/config';
import {fetch} from '../../utils/httpUtil';
import {notify} from 'react-notify-toast';


export class Reports extends React.Component {

    constructor(props) {
      super(props);

       this.state = {
            error: null,
            isLoaded: false,
            CheckInItems: [{}],
            AvailabilityItems:[]

        };

        this.reportStore = {
            startDate: moment(),
            endDate: moment()
        };
    }

    updateReportStore(update) {
        this.reportStore = {
          ...this.reportStore,
          ...update,
        }
      }

      handleCheckIns(){

        const startDate = (getFormattedDate(this.reportStore.startDate)).toString();
        const endDate = (getFormattedDate(this.reportStore.endDate)).toString();

        fetch(API_URL, "checkins/?adate=" + startDate + "&ddate=" + endDate)
            .then((response) => {
                return checkError(response);
            })
            .then((result) => {
                this.setState({
                    isLoaded:true,
                    CheckInItems: result,
                    AvailabilityItems : []
                  }, function() {
                    this.showPrintReport();
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

    showPrintReport(){
        if (this.state.CheckInItems.length > 0){
            var printWindow = window.open('', '', 'height=400,width=800');
            try {
            printWindow.document.write('<html><head><title>Check In Report</title>');
            printWindow.document.write('</head><body >');
            printWindow.document.write(document.getElementById("divCheckInContents").innerHTML);
            printWindow.document.write('</body></html>');
            printWindow.document.close();
            printWindow.print();
            } catch (e){
                notify.show('Popup blocked! Please enable popups to see this report.', 'error');
            }
        } else {
            notify.show('No Check Ins for given date period!', 'error');
        } 
    }

    handleAvailability(){

        const startDate = (getFormattedDate(this.reportStore.startDate)).toString();
        const endDate = (getFormattedDate(this.reportStore.endDate)).toString();

        fetch(API_URL, "arooms/2?adate=" + startDate + "&ddate=" + endDate)
            .then((response) => {
                return checkError(response);
            })
            .then((result) => {
                this.setState({
                    isLoaded:true,
                    AvailabilityItems: result,
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
          return (
            <div className="divError">
                    <ErrorBoundary>
                            <DatePeriodPicker
                                handleCheckIns={() => (this.handleCheckIns())}
                                handleAvailability={() => (this.handleAvailability())}
                                updateReportStore={(u) => {this.updateReportStore(u)}}>
                            </DatePeriodPicker>
                <div className="div-table availability-table" style={{ visibility: this.state.AvailabilityItems.length > 0 ? 'visible':'hidden'}}>  
                <h4>Rooms Availability from {moment(this.reportStore.startDate).format('dddd, MMMM Do YYYY')} to {moment(this.reportStore.endDate).format('dddd, MMMM Do YYYY')}</h4>
                    <div className = "div-table-row">
                              <div className ="div-table-col div-table-col-header">
                                    Blocks
                              </div>
                              <div className ="div-table-col div-table-col-header">
                                    Rooms Available
                              </div>
                      </div>
                    {this.state.AvailabilityItems.map(item => (
                        <div className = "div-table-row">
                              <div className ="div-table-col">
                                {blocks[item.block_id]}
                              </div>
                              <div className ="div-table-col">
                                {item.rooms}
                              </div>
                        </div>
                        ))} 
                </div>

             <div id="divCheckInContents" style={{fontFamily: '"Lucida Sans Unicode"', visibility:'hidden'}}>
                        <h2>SWAMI SHUKDEVANAND TRUST</h2>
                        <h3 style={{margin: 0}}> PARMARTH NIKETAN</h3>
                        <h4>Check In Details from {moment(this.reportStore.startDate).format('dddd, MMMM Do YYYY')} to {moment(this.reportStore.endDate).format('dddd, MMMM Do YYYY')}</h4>

                         <table width="100%" style={{borderSpacing: 0,borderCollapse: 'collapse'}}>
                        <tbody>
                            <tr>
                                <td style={{margin: 0, padding: 2, border: '1px solid #ddd', fontWeight: 'bold'}}>Arrival Date</td>
                                <td style={{margin: 0, padding: 2, border: '1px solid #ddd', fontWeight: 'bold'}}>Guest Name</td>
                                <td style={{margin: 0, padding: 2, border: '1px solid #ddd', fontWeight: 'bold'}}>No.of People</td>
                            </tr>
                            {this.state.CheckInItems.map(item => (
                            <tr>
                                <td style={{margin: 0, padding: 2, border: '1px solid #ddd'}}>
                                    {item.on_date}
                                </td>
                                <td style={{margin: 0, padding: 2, border: '1px solid #ddd'}}>
                                    {item.first_name} {item.last_name}
                                </td>
                                <td style={{margin: 0, padding: 2, border: '1px solid #ddd'}}>
                                    {item.no_of_people}
                                </td>
                            </tr>
                            ))}
                        </tbody>
                        </table>
                </div>
            </ErrorBoundary>
            </div>
          );
    }
}

export default Reports;
