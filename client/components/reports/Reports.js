import React from 'react';

import ErrorBoundary from '../ErrorBoundary'

import DatePeriodPicker from '../subcomponents/DatePeriodPicker';
import moment from 'moment';

import {logError, checkError, getFormattedDate} from '../../utils/helpers';
import {API_URL} from '../../config/config';
import {notify} from 'react-notify-toast';


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

        const startDate = (getFormattedDate(this.reportStore.startDate)).toString();
        const endDate = (getFormattedDate(this.reportStore.endDate)).toString();

        fetch(API_URL + "checkins/?adate=" + startDate + "&ddate=" + endDate)
            .then((response) => {
                return checkError(response);
            })
            .then((result) => {
                this.setState({
                    isLoaded:true,
                    items: result,
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
        if (this.state.items.length > 0){
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

    render() {
          return (
            <div className="divError">
                    <ErrorBoundary>
                            <DatePeriodPicker
                                handleShow={() => (this.handleShow())}
                                updateReportStore={(u) => {this.updateReportStore(u)}}>
                            </DatePeriodPicker>

             <div id="divCheckInContents" style={{fontFamily: '"Lucida Sans Unicode"', visibility:'hidden'}}>
                        <h2>SWAMI SHUKDEVANAND TRUST</h2>
                        <h3 style={{margin: 0}}> PARMARTH NIKETAN</h3>
                        <h4>Check In Details from {(getFormattedDate(this.reportStore.startDate)).toString()} to {(getFormattedDate(this.reportStore.endDate)).toString()}</h4>

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

export default Reports;
