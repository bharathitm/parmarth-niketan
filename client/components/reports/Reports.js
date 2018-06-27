import React from 'react';

import ErrorBoundary from '../ErrorBoundary'

import DatePeriodPicker from '../subcomponents/DatePeriodPicker';
import moment from 'moment';

import {logError, checkError} from '../../utils/helpers';
import {API_URL} from '../../config/config';


export class Reports extends React.Component {

    constructor(props) {
      super(props);

       this.state = {
            error: null,
            isLoaded: false,
            items: [
            {}
            ]
        };

        this.viewPrint = false;

        this.handlePrint = this.handlePrint.bind(this);

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



    handleShow(){

        const startDate = (this.getFormattedDate(this.reportStore.startDate)).toString();
        const endDate = (this.getFormattedDate(this.reportStore.endDate)).toString();

        fetch(API_URL + "checkins/?adate=" + startDate + "&ddate=" + endDate)
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
                logError(this.constructor.name + " " + error);
              });
    }

    handlePrint = () => {
        var printWindow = window.open('', '', 'height=400,width=800');
        printWindow.document.write('<html><head><title>Check In Report</title>');
        printWindow.document.write('</head><body >');
        printWindow.document.write(document.getElementById("divCheckInContents").innerHTML);
        printWindow.document.write('</body></html>');
        printWindow.document.close();
        printWindow.print();
    }


    getFormattedDate(dt) {
        var date = new Date(dt);
        var month = date.getMonth() + 1;
        var day = date. getDate();
        var year = date.getFullYear();
        return year + "-" + month + "-" + day ;
    }


    render() {
        if (!this.state.isLoaded){ //page load view
            return (
                <div className="divError">
                <ErrorBoundary>
                <DatePeriodPicker viewPrint = {false}
                    handleShow={() => (this.handleShow())} 
                    handlePrint={() => (this.handlePrint())} 
                    updateReportStore={(u) => {this.updateReportStore(u)}}>
                </DatePeriodPicker>
                </ErrorBoundary>
            </div>
            );
        } else if (this.state.items.length == 0){ // no data returned
            return  (
                <div className="divError">
                <ErrorBoundary>
                <DatePeriodPicker  viewPrint ={false}
                    handleShow={() => (this.handleShow())} 
                    handlePrint={() => (this.handlePrint())} 
                    updateReportStore={(u) => {this.updateReportStore(u)}}>
                </DatePeriodPicker>
                </ErrorBoundary>
            <div>No Check Ins for the given duration! </div>
            </div>
            );
        } else { // when data is returned
          return (
            <div className="divError">
                    <ErrorBoundary>

                            <DatePeriodPicker  viewPrint = {true}
                                handleShow={() => (this.handleShow())} 
                                handlePrint={() => (this.handlePrint())} 
                                updateReportStore={(u) => {this.updateReportStore(u)}}>
                            </DatePeriodPicker>    
                       
                
                            

             <div id="divCheckInContents" style={{fontFamily: '"Lucida Sans Unicode"'}}>
                        <h2>SWAMI SHUKDEVANAND TRUST</h2>
                        <h3 style={{margin: 0}}> PARMARTH NIKETAN</h3>                       
                        <h4>Check In Details from {(this.getFormattedDate(this.reportStore.startDate)).toString()} to {(this.getFormattedDate(this.reportStore.endDate)).toString()}</h4>

                         <table width="100%" style={{borderSpacing: 0,borderCollapse: 'collapse'}}>
                        <tbody>
                            <tr>
                                <td style={{margin: 0, padding: 2, border: '1px solid #ddd', fontWeight: 'bold'}}>Arrival Date</td>
                                <td style={{margin: 0, padding: 2, border: '1px solid #ddd', fontWeight: 'bold'}}>Guest Name</td>
                                <td style={{margin: 0, padding: 2, border: '1px solid #ddd', fontWeight: 'bold'}}>No.of People</td>
                            </tr>
                            {this.state.items.map(item => (
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
}

export default Reports;
