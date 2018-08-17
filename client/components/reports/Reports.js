import React from 'react';

import ErrorBoundary from '../ErrorBoundary'

import DatePeriodPicker from '../subcomponents/DatePeriodPicker';
import moment from 'moment';
import {blocks, reservationStatuses} from '../../constants/roomAttributes';
import {countries} from '../../constants/countries';

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
            CheckOutItems: [{}],
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
                    ReservationItems: result,
                    AvailabilityItems : []
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
                    CheckInItems: result,
                    AvailabilityItems : []
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
                    CheckOutItems: result,
                    AvailabilityItems : []
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
                    printWindow.document.write('<html><head><title>Reservations Report</title>');
                    printWindow.document.write('</head><body style="font-family:verdana; font-size:18px;">');
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
                    printWindow.document.write('<html><head><title>Check In Report</title>');
                    printWindow.document.write('</head><body style="font-family:verdana; font-size:18px;">');
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
                    printWindow.document.write('<html><head><title>Check Out Report</title>');
                    printWindow.document.write('</head><body style="font-family:verdana; font-size:18px;">');
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
                                handleReservations={() => (this.handleReservations())}
                                handleCheckIns={() => (this.handleCheckIns())}
                                handleCheckOuts={() => (this.handleCheckOuts())}
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

                  {/* Reservations */}

             <div id="divReservationContents" style={{fontFamily: 'Courier', visibility:'hidden'}}>
                        <h3 style={{textAlign: 'center'}}>SWAMI SHUKDEVANAND TRUST</h3>
                        <h4 style={{margin: 0, textAlign: 'center'}}> PARMARTH NIKETAN</h4>
                        <h5 style={{textAlign: 'center'}}>Reservation Details from {moment(this.reportStore.startDate).format('dddd, MMMM Do YYYY')} to {moment(this.reportStore.endDate).format('dddd, MMMM Do YYYY')}</h5>

                         <table width="100%" style={{borderSpacing: 0,borderCollapse: 'collapse'}}>
                        <tbody>
                            <tr>
                               
                                <td style={{margin: 0, padding: 2, border: '1px solid #ddd', fontWeight: 'bold'}}>Guest Name</td>
                                <td style={{margin: 0, padding: 2, border: '1px solid #ddd', fontWeight: 'bold'}}>Arrival Date</td>
                                <td style={{margin: 0, padding: 2, border: '1px solid #ddd', fontWeight: 'bold'}}>Departure Date</td>
                                <td style={{margin: 0, padding: 2, border: '1px solid #ddd', fontWeight: 'bold'}}>No. of People</td>
                                <td style={{margin: 0, padding: 2, border: '1px solid #ddd', fontWeight: 'bold'}}>Reservation Status</td>
                            </tr>
                            {this.state.ReservationItems.map(item => (
                            <tr>
                                <td style={{margin: 0, padding: 2, border: '1px solid #ddd'}}>
                                    {item.guest_name}
                                </td>
                                <td style={{margin: 0, padding: 2, border: '1px solid #ddd'}}>
                                    {item.date_of_arrival}
                                </td>
                                <td style={{margin: 0, padding: 2, border: '1px solid #ddd'}}>
                                    {item.date_of_departure}
                                </td>
                                <td style={{margin: 0, padding: 2, border: '1px solid #ddd'}}>
                                    {item.no_of_people}
                                </td>
                                <td style={{margin: 0, padding: 2, border: '1px solid #ddd'}}>
                                    {reservationStatuses[item.reservation_status_id]}
                                </td>
                            </tr>
                            ))}
                        </tbody>
                        </table>
                </div>

                {/* Check Ins */}

             <div id="divCheckInContents" style={{fontFamily: 'Courier', visibility:'hidden'}}>
                        <h3 style={{textAlign: 'center'}}>SWAMI SHUKDEVANAND TRUST</h3>
                        <h4 style={{margin: 0, textAlign: 'center'}}> PARMARTH NIKETAN</h4>
                        <h5 style={{textAlign: 'center'}}>Check In Details from {moment(this.reportStore.startDate).format('dddd, MMMM Do YYYY')} to {moment(this.reportStore.endDate).format('dddd, MMMM Do YYYY')}</h5>

                         <table width="100%" style={{borderSpacing: 0,borderCollapse: 'collapse'}}>
                        <tbody>
                            <tr>
                                <td style={{margin: 0, padding: 2, border: '1px solid #ddd', fontWeight: 'bold'}}>Arrival Date</td>
                                <td style={{margin: 0, padding: 2, border: '1px solid #ddd', fontWeight: 'bold'}}>Guest Name</td>
                                <td style={{margin: 0, padding: 2, border: '1px solid #ddd', fontWeight: 'bold'}}>Address</td>
                                <td style={{margin: 0, padding: 2, border: '1px solid #ddd', fontWeight: 'bold'}}>Email Id</td>
                                <td style={{margin: 0, padding: 2, border: '1px solid #ddd', fontWeight: 'bold'}}>Phone No.</td>
                                <td style={{margin: 0, padding: 2, border: '1px solid #ddd', fontWeight: 'bold'}}>No. of People</td>
                            </tr>
                            {this.state.CheckInItems.map(item => (
                            <tr>
                                <td style={{margin: 0, padding: 2, border: '1px solid #ddd'}}>
                                    {item.on_date}
                                </td>
                                <td style={{margin: 0, padding: 2, border: '1px solid #ddd'}}>
                                    {item.guest_name}
                                </td>
                                <td style={{margin: 0, padding: 2, border: '1px solid #ddd'}}>
                                    {item.full_address + ", " + countries[item.country_id]} 
                                </td>
                                <td style={{margin: 0, padding: 2, border: '1px solid #ddd'}}>
                                    {item.email_id}
                                </td>
                                <td style={{margin: 0, padding: 2, border: '1px solid #ddd'}}>
                                    {item.phone_no}
                                </td>
                                <td style={{margin: 0, padding: 2, border: '1px solid #ddd'}}>
                                    {item.no_of_people}
                                </td>
                            </tr>
                            ))}
                        </tbody>
                        </table>
                </div>

                {/* Check Outs */}

                 <div id="divCheckOutContents" style={{fontFamily: 'Courier', visibility:'hidden'}}>
                        <h3 style={{textAlign: 'center'}}>SWAMI SHUKDEVANAND TRUST</h3>
                        <h4 style={{margin: 0, textAlign: 'center'}}> PARMARTH NIKETAN</h4>
                        <h5 style={{textAlign: 'center'}}>Check Out Details from {moment(this.reportStore.startDate).format('dddd, MMMM Do YYYY')} to {moment(this.reportStore.endDate).format('dddd, MMMM Do YYYY')}</h5>

                         <table width="100%" style={{borderSpacing: 0,borderCollapse: 'collapse'}}>
                        <tbody>
                            <tr>
                                <td style={{margin: 0, padding: 2, border: '1px solid #ddd', fontWeight: 'bold'}}>Departure Date</td>
                                <td style={{margin: 0, padding: 2, border: '1px solid #ddd', fontWeight: 'bold'}}>Guest Name</td>
                                <td style={{margin: 0, padding: 2, border: '1px solid #ddd', fontWeight: 'bold'}}>Address</td>
                                <td style={{margin: 0, padding: 2, border: '1px solid #ddd', fontWeight: 'bold'}}>Email Id</td>
                                <td style={{margin: 0, padding: 2, border: '1px solid #ddd', fontWeight: 'bold'}}>Phone No.</td>
                                <td style={{margin: 0, padding: 2, border: '1px solid #ddd', fontWeight: 'bold'}}>No. of People</td>
                            </tr>
                            {this.state.CheckOutItems.map(item => (
                            <tr>
                                <td style={{margin: 0, padding: 2, border: '1px solid #ddd'}}>
                                    {item.on_date}
                                </td>
                                <td style={{margin: 0, padding: 2, border: '1px solid #ddd'}}>
                                    {item.guest_name}
                                </td>
                                <td style={{margin: 0, padding: 2, border: '1px solid #ddd'}}>
                                    {item.full_address + ", " + countries[item.country_id]} 
                                </td>
                                <td style={{margin: 0, padding: 2, border: '1px solid #ddd'}}>
                                    {item.email_id}
                                </td>
                                <td style={{margin: 0, padding: 2, border: '1px solid #ddd'}}>
                                    {item.phone_no}
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
