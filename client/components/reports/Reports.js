import React from 'react';

// import ReactDOM from 'react-dom';

import ErrorBoundary from '../ErrorBoundary'

import DatePeriodPicker from '../subcomponents/DatePeriodPicker';
import moment from 'moment';
import {blocks, reservationStatuses} from '../../constants/roomAttributes';

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
            ReservationItems: [{}],
            CheckInItems: [{}],
            CheckOutItems: [{}]
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

      handleReservations(){
        const startDate = (getFormattedDate(this.reportStore.startDate)).toString();
        const endDate = (getFormattedDate(this.reportStore.endDate)).toString();

        fetch(API_URL, "reservations/?adate=" + startDate + "&ddate=" + endDate)
            .then((response) => {
                return checkError(response);
            })
            .then((result) => {
                this.setState({
                    isLoaded:true,
                    ReservationItems: result
                  }, function() {
                    this.showReservationReport();
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
                    CheckInItems: result
                  }, function() {
                    this.showCheckInReport();
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

      handleCheckOuts(){

        const startDate = (getFormattedDate(this.reportStore.startDate)).toString();
        const endDate = (getFormattedDate(this.reportStore.endDate)).toString();

        fetch(API_URL, "checkouts/?adate=" + startDate + "&ddate=" + endDate)
            .then((response) => {
                return checkError(response);
            })
            .then((result) => {
                this.setState({
                    isLoaded:true,
                    CheckOutItems: result
                  }, function() {
                    this.showCheckOutReport();
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

    showReservationReport(){
        if (this.state.ReservationItems.length > 0){
            var printWindow = window.open('', '', 'height=600,width=800');
            try {
                    printWindow.document.write('<html><head>');
                    printWindow.document.write('</head><body style="font-family:verdana; font-size:14px;width:100%;">');
                    printWindow.document.write(document.getElementById("divReservationContents").innerHTML);
                    printWindow.document.write('</body></html>');
                    printWindow.document.close();
                    printWindow.print();
            } catch (e){
                notify.show('Popup blocked! Please enable popups to see this report.', 'error');
            }
        } else {
            notify.show('No Reservations for given date period!', 'error');
        } 
    }

    showCheckInReport(){
        if (this.state.CheckInItems.length > 0){
            var printWindow = window.open('', '', 'height=400,width=800');
            try {
                    printWindow.document.write('<html><head>');
                    printWindow.document.write('</head><body style="font-family:verdana; font-size:14px;width:100%;">');
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

    showCheckOutReport(){
        if (this.state.CheckOutItems.length > 0){
            var printWindow = window.open('', '', 'height=400,width=800');
            try {
                    printWindow.document.write('<html><head>');
                    printWindow.document.write('</head><body style="font-family:verdana; font-size:14px;width:100%;">');
                    printWindow.document.write(document.getElementById("divCheckOutContents").innerHTML);
                    printWindow.document.write('</body></html>');
                    printWindow.document.close();
                    printWindow.print();
            } catch (e){
                notify.show('Popup blocked! Please enable popups to see this report.', 'error');
            }
        } else {
            notify.show('No Check Outs for given date period!', 'error');
        } 
    }

    render() {

     
          return (
            <div className="divError">
                    <ErrorBoundary>
                            <DatePeriodPicker
                                handleReservations={() => (this.handleReservations())}
                                handleCheckIns={() => (this.handleCheckIns())}
                                handleCheckOuts={() => (this.handleCheckOuts())}
                                updateReportStore={(u) => {this.updateReportStore(u)}}>
                            </DatePeriodPicker>
                  {/* Reservations */}

             <div id="divReservationContents" style={{visibility:'hidden'}}>
                        <h4 style={{margin: 0, textAlign: 'center'}}>SWAMI SHUKDEVANAND TRUST</h4>
                        <h5 style={{margin: 0, textAlign: 'center'}}>PARMARTH NIKETAN, SWARAGASHRAM, RISHIKESH</h5>
                        <h5 style={{margin: 0, textAlign: 'center'}}>PAN NO: AADTS4740C</h5>
                        <h5 style={{margin: 0, textAlign: 'center'}}>STAY OF SUMMARY</h5>
                        <h6 style={{textAlign: 'center'}}>Reservation Details from {moment(this.reportStore.startDate).format('dddd, MMMM Do YYYY')} to {moment(this.reportStore.endDate).format('dddd, MMMM Do YYYY')}</h6>

                        <table style={{borderSpacing: 0,borderCollapse: 'collapse', position: 'absolute', width: '100%', fontSize: 12}}>
                        <tbody>
                            <tr>
                                <td style={{margin: 0, padding: '1em', fontWeight: 'bold', borderTop: 'solid 1px black', borderBottom: 'solid 1px black'}}>Guest Name</td>
                                <td style={{margin: 0, padding: '1em', fontWeight: 'bold', borderTop: 'solid 1px black', borderBottom: 'solid 1px black'}}>Arrival Date</td>
                                <td style={{margin: 0, padding: '1em', fontWeight: 'bold', borderTop: 'solid 1px black', borderBottom: 'solid 1px black'}}>Departure Date</td>                                                           
                                <td style={{margin: 0, padding: '1em', fontWeight: 'bold', borderTop: 'solid 1px black', borderBottom: 'solid 1px black'}}>Pax</td>
                                <td style={{margin: 0, padding: '1em', fontWeight: 'bold', borderTop: 'solid 1px black', borderBottom: 'solid 1px black'}}>Reservation Status</td>

                            </tr>
                            {this.state.ReservationItems.map(item => (
                            <tr>
                                <td style={{margin: 0, padding: '1em', borderBottom: '1px dotted black'}}>
                                    {item.guest_name}
                                </td>
                                <td style={{margin: 0, padding: '1em', borderBottom: '1px dotted black'}}>
                                    {item.date_of_arrival}
                                </td>
                                <td style={{margin: 0, padding: '1em', borderBottom: '1px dotted black'}}>
                                    {item.date_of_departure}
                                </td>
                                <td style={{margin: 0, padding: '1em', borderBottom: '1px dotted black'}}>
                                    {item.no_of_people}
                                </td>
                                <td style={{margin: 0, padding: '1em', borderBottom: '1px dotted black'}}>
                                    {reservationStatuses[item.reservation_status_id]}
                                </td>
                            </tr>
                            ))}
                        </tbody>
                        </table>
                </div>

                {/* Check Ins */}

             <div id="divCheckInContents" style={{visibility:'hidden'}}>
                        <h4 style={{margin: 0, textAlign: 'center'}}>SWAMI SHUKDEVANAND TRUST</h4>
                        <h5 style={{margin: 0, textAlign: 'center'}}>PARMARTH NIKETAN, SWARAGASHRAM, RISHIKESH</h5>
                        <h5 style={{margin: 0, textAlign: 'center'}}>PAN NO: AADTS4740C</h5>
                        <h5 style={{margin: 0, textAlign: 'center'}}>STAY OF SUMMARY</h5>
                        <h6 style={{textAlign: 'center'}}>Check In Details from {moment(this.reportStore.startDate).format('dddd, MMMM Do YYYY')} to {moment(this.reportStore.endDate).format('dddd, MMMM Do YYYY')}</h6>

                        <table style={{borderSpacing: 0,borderCollapse: 'collapse', position: 'absolute', width: '100%', fontSize: 12}}>
                        <tbody>
                            <tr>
                                <td style={{margin: 0, padding: '1em', fontWeight: 'bold', borderTop: 'solid 1px black', borderBottom: 'solid 1px black'}}>Guest Name</td>
                                <td style={{margin: 0, padding: '1em', fontWeight: 'bold', borderTop: 'solid 1px black', borderBottom: 'solid 1px black'}}>Email Id</td>
                                <td style={{margin: 0, padding: '1em', fontWeight: 'bold', borderTop: 'solid 1px black', borderBottom: 'solid 1px black'}}>Phone No</td>
                                <td style={{margin: 0, padding: '1em', fontWeight: 'bold', borderTop: 'solid 1px black', borderBottom: 'solid 1px black'}}>Arrival Date</td>                                                      
                                <td style={{margin: 0, padding: '1em', fontWeight: 'bold', borderTop: 'solid 1px black', borderBottom: 'solid 1px black'}}>Pax</td>
                            </tr>
                            {this.state.CheckInItems.map(item => (
                            <tr>
                                 <td style={{margin: 0, padding: '1em', borderBottom: '1px dotted black'}}>
                                    {item.guest_name}
                                </td>
                                <td style={{margin: 0, padding: '1em', borderBottom: '1px dotted black'}}>
                                    {item.email_id}
                                </td>
                                <td style={{margin: 0, padding: '1em', borderBottom: '1px dotted black'}}>
                                    {item.phone_no} 
                                </td>
                                <td style={{margin: 0, padding: '1em', borderBottom: '1px dotted black'}}>
                                    {item.on_date}
                                </td>
                                <td style={{margin: 0, padding: '1em', borderBottom: '1px dotted black'}}>
                                    {item.no_of_people}
                                </td>
                            </tr>
                            ))}
                        </tbody>
                        </table>
                </div>

                {/* Check Outs */}

                 <div id="divCheckOutContents" style={{visibility:'hidden'}}>
                        <h4 style={{margin: 0, textAlign: 'center'}}>SWAMI SHUKDEVANAND TRUST</h4>
                        <h5 style={{margin: 0, textAlign: 'center'}}>PARMARTH NIKETAN, SWARAGASHRAM, RISHIKESH</h5>
                        <h5 style={{margin: 0, textAlign: 'center'}}>PAN NO: AADTS4740C</h5>
                        <h5 style={{margin: 0, textAlign: 'center'}}>STAY OF SUMMARY</h5>
                        <h6 style={{textAlign: 'center'}}>Check Out Details from {moment(this.reportStore.startDate).format('dddd, MMMM Do YYYY')} to {moment(this.reportStore.endDate).format('dddd, MMMM Do YYYY')}</h6>

                         <table style={{borderSpacing: 0,borderCollapse: 'collapse', position: 'absolute', width: '100%', fontSize: 12}}>
                        <tbody>
                            <tr>
                                <td style={{margin: 0, padding: '1em', fontWeight: 'bold', borderTop: 'solid 1px black', borderBottom: 'solid 1px black'}}>Guest Name</td>
                                <td style={{margin: 0, padding: '1em', fontWeight: 'bold', borderTop: 'solid 1px black', borderBottom: 'solid 1px black'}}>Email Id</td>
                                <td style={{margin: 0, padding: '1em', fontWeight: 'bold', borderTop: 'solid 1px black', borderBottom: 'solid 1px black'}}>Phone No</td>
                                <td style={{margin: 0, padding: '1em', fontWeight: 'bold', borderTop: 'solid 1px black', borderBottom: 'solid 1px black'}}>Arrival Date</td>
                                <td style={{margin: 0, padding: '1em', fontWeight: 'bold', borderTop: 'solid 1px black', borderBottom: 'solid 1px black'}}>Departure Date</td>                                                           
                                <td style={{margin: 0, padding: '1em', fontWeight: 'bold', borderTop: 'solid 1px black', borderBottom: 'solid 1px black'}}>Pax</td>
                                <td style={{margin: 0, padding: '1em', fontWeight: 'bold', borderTop: 'solid 1px black', borderBottom: 'solid 1px black'}}>Receipt No</td>
                                <td style={{margin: 0, padding: '1em', fontWeight: 'bold', borderTop: 'solid 1px black', borderBottom: 'solid 1px black'}}>Donation Amount</td>
                            </tr>
                            {this.state.CheckOutItems.map(item => (
                            <tr>
                                <td style={{margin: 0, padding: '1em', borderBottom: '1px dotted black'}}>
                                    {item.guest_name}
                                </td>
                                <td style={{margin: 0, padding: '1em', borderBottom: '1px dotted black'}}>
                                    {item.email_id}
                                </td>
                                <td style={{margin: 0, padding: '1em', borderBottom: '1px dotted black'}}>
                                    {item.phone_no} 
                                </td>
                                <td style={{margin: 0, padding: '1em', borderBottom: '1px dotted black'}}>
                                    {item.arr_date}
                                </td>
                                <td style={{margin: 0, padding: '1em', borderBottom: '1px dotted black'}}>
                                    {item.dep_date}
                                </td>
                                <td style={{margin: 0, padding: '1em', borderBottom: '1px dotted black'}}>
                                    {item.no_of_people}
                                </td>
                                <td style={{margin: 0, padding: '1em', borderBottom: '1px dotted black'}}>
                                     <div id="divReceiptCheckOut"></div>
                                     {/* {ReactDOM.render({item.receipt_no}, document.getElementById('divReceiptCheckOut'))} */}
                                </td>
                                <td style={{margin: 0, padding: '1em', borderBottom: '1px dotted black'}}>
                                    {item.amount}
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
