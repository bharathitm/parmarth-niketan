import React from 'react';

// import ReactDOM from 'react-dom';

import ErrorBoundary from '../ErrorBoundary'

import DatePeriodPicker from '../subcomponents/DatePeriodPicker';
import moment from 'moment';
import {reservationStatuses, floors} from '../../constants/roomAttributes';

import {logError, checkError, getFormattedDate} from '../../utils/helpers';
import {API_URL} from '../../config/config';
import {fetch} from '../../utils/httpUtil';
import {notify} from 'react-notify-toast';

import ReactExport from "react-data-export";

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

export class Reports extends React.Component {

    constructor(props) {
      super(props);

       this.state = {
            error: null,
            isLoaded: false,
            ReservationItems: [{}],
            CheckInItems: [{}],
            CheckOutItems: [{}],
            KathaItems: [{}]
        };

        this.reportStore = {
            startDate: moment(),
            endDate: moment()
        };

        this.checkOutSum = 0;

        this.dataSet1 = []
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

        fetch(API_URL, "reservations/?type=1&adate=" + startDate + "&ddate=" + endDate)
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

    handleKathas(){
        const startDate = (getFormattedDate(this.reportStore.startDate)).toString();
        const endDate = (getFormattedDate(this.reportStore.endDate)).toString();

        fetch(API_URL, "reservations/?type=2&adate=" + startDate + "&ddate=" + endDate)
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

    showKathaReport(){

        if (this.state.KathaItems.length > 0){
            document.getElementById("divKathaContents").style.visibility="visible";
        } else {
            document.getElementById("divKathaContents").style.visibility="hidden";
            notify.show('No Kathas for given date period!', 'error');
        } 

        // if (this.state.KathaItems.length > 0){
        //     var printWindow = window.open('', '', 'height=600,width=800');
        //     try {
        //             printWindow.document.write('<html><head>');
        //             printWindow.document.write('</head><body style="font-family:verdana; font-size:14px;width:100%;">');
        //             printWindow.document.write(document.getElementById("divKathaContents").innerHTML);
        //             printWindow.document.write('</body></html>');
        //             printWindow.document.close();
        //             printWindow.print();
        //     } catch (e){
        //         notify.show('Popup blocked! Please enable popups to see this report.', 'error');
        //     }
        // } else {
        //     notify.show('No Kathas for given date period!', 'error');
        // } 
    }

    /*checkLocale(subItem){
        if (subItem == undefined){
            return subItem;
        }
        else {
            return subItem.toLocaleString('en-IN');
        }
    }*/

    /*getCheckOutRows(){

        var arrCheckOutItems = [];
        var arrReceipts = [];
        var arrAmount = [];
        
        if (this.state.CheckOutItems.length > 0){

            arrReceipts.push(this.state.CheckOutItems[0].receipt_no);
            arrAmount.push(this.state.CheckOutItems[0].amount);
      
            arrCheckOutItems.push(
                {
                    guest_name: this.state.CheckOutItems[0].guest_name,
                    email_id: this.state.CheckOutItems[0].email_id, 
                    phone_no: this.state.CheckOutItems[0].phone_no, 
                    arr_date: this.state.CheckOutItems[0].arr_date,
                    dep_date: this.state.CheckOutItems[0].dep_date,
                    no_of_people: this.state.CheckOutItems[0].no_of_people//,

                }
            );
        }


      for (var i = 1; i < this.state.CheckOutItems.length; i++)
      {
            if (this.state.CheckOutItems[i].email_id == this.state.CheckOutItems[i-1].email_id)
            {
                arrReceipts.push(this.state.CheckOutItems[i].receipt_no);
                arrAmount.push(this.state.CheckOutItems[i].amount);
            }
            else {
                arrCheckOutItems[arrCheckOutItems.length-1].receipt_no = arrReceipts;
                arrCheckOutItems[arrCheckOutItems.length-1].amount = arrAmount;
                
                arrReceipts = [];
                arrAmount = [];

                arrCheckOutItems.push(
                    {
                        guest_name: this.state.CheckOutItems[i].guest_name,
                        email_id: this.state.CheckOutItems[i].email_id, 
                        phone_no: this.state.CheckOutItems[i].phone_no, 
                        arr_date: this.state.CheckOutItems[i].arr_date,
                        dep_date: this.state.CheckOutItems[i].dep_date,
                        no_of_people: this.state.CheckOutItems[i].no_of_people
                    }
                );

                arrReceipts.push(this.state.CheckOutItems[i].receipt_no);
                arrAmount.push(this.state.CheckOutItems[i].amount);
            }
        }

        if (arrCheckOutItems.length > 1){
            arrCheckOutItems[arrCheckOutItems.length-1].receipt_no = arrReceipts;
            arrCheckOutItems[arrCheckOutItems.length-1].amount = arrAmount;
        
        return arrCheckOutItems.map(item => (
           
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
                     {item.receipt_no.map((subItem) => (
                      <p>{subItem} </p>
                        ))}
                </td>
                <td style={{margin: 0, padding: '1em', borderBottom: '1px dotted black'}}>
                    {item.amount.map((subItem) => (
                        <p>&#8377;{this.checkLocale(subItem)}</p>
                
                            ))}
                </td>
            </tr>
            ));
                    }
        }*/


    render() {   
        
        // To fill the total amount for CheckOuts report
        if (this.state.CheckOutItems.length > 1){
            for (var i = 0; i < this.state.CheckOutItems.length; i++) {
                if ((this.state.CheckOutItems[i].amt != null) && (this.state.CheckOutItems[i].amt.indexOf(",") != -1)){
                    var multipleAmts = this.state.CheckOutItems[i].amt.split(",");
                    for (var cnt = 0; cnt < multipleAmts.length; cnt++){
                        this.checkOutSum += parseFloat(multipleAmts[cnt]) 
                    }
                } else {
                    this.checkOutSum += parseFloat(this.state.CheckOutItems[i].amt);  
                }
            }
        }

          return (
            <div className="divError">
                    <ErrorBoundary>
                            <DatePeriodPicker
                                handleReservations={() => (this.handleReservations())}
                                handleCheckIns={() => (this.handleCheckIns())}
                                handleCheckOuts={() => (this.handleCheckOuts())}
                                handleKathas={() => (this.handleKathas())}
                                updateReportStore={(u) => {this.updateReportStore(u)}}>
                            </DatePeriodPicker>

            {/* Kathas */}
             <div id="divKathaContents" style={{visibility:'hidden', margin:'1em'}}>

                {/* <ExcelFile hideElement="true" filename="Katha Details">  + {moment(this.reportStore.startDate).format('dddd, MMMM Do YYYY')} + "to" {moment(this.reportStore.endDate).format('dddd, MMMM Do YYYY')} */}
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
                                <td style={{margin: 0, padding: '1em', fontWeight: 'bold', borderTop: 'solid 1px black', borderBottom: 'solid 1px black', width: '15%'}}>Guest Name</td>
                                <td style={{margin: 0, padding: '1em', fontWeight: 'bold', borderTop: 'solid 1px black', borderBottom: 'solid 1px black', width: '15%'}}>Contact Details</td>
                                <td style={{margin: 0, padding: '1em', fontWeight: 'bold', borderTop: 'solid 1px black', borderBottom: 'solid 1px black', width: '10%'}}>Arrival Date</td>
                                <td style={{margin: 0, padding: '1em', fontWeight: 'bold', borderTop: 'solid 1px black', borderBottom: 'solid 1px black', width: '10%'}}>Departure Date</td>                                                           
                                <td style={{margin: 0, padding: '1em', fontWeight: 'bold', borderTop: 'solid 1px black', borderBottom: 'solid 1px black', width: '2%'}}>Pax</td>
                                <td style={{margin: 0, padding: '1em', fontWeight: 'bold', borderTop: 'solid 1px black', borderBottom: 'solid 1px black'}}>Room Nos</td>
                                <td style={{margin: 0, padding: '1em', fontWeight: 'bold', borderTop: 'solid 1px black', borderBottom: 'solid 1px black', width: '15%'}}>Reservation Status / Comments / Donation</td>
                            </tr>
                                {this.state.ReservationItems.map(item => (
                                <tr>   
                                    <td style={{margin: 0, padding: '1em', borderBottom: '1px dotted black'}}>
                                        {item.guest_name} 
                                    </td>
                                    <td style={{margin: 0, padding: '1em', borderBottom: '1px dotted black'}}>
                                        {item.phone_no} <br/> {item.email_id}
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
                                        {item.room_nos}
                                    </td>
                                    <td style={{margin: 0, padding: '1em', borderBottom: '1px dotted black'}}>
                                        {reservationStatuses[item.reservation_status_id]}
                                        <br/> <u> { item.reservation_comments} </u>
                                        <br/>{item.donationAmount}
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
                                <td style={{margin: 0, padding: '1em', fontWeight: 'bold', borderTop: 'solid 1px black', borderBottom: 'solid 1px black', width: '15%'}}>Guest Name</td>
                                <td style={{margin: 0, padding: '1em', fontWeight: 'bold', borderTop: 'solid 1px black', borderBottom: 'solid 1px black', width: '15%'}}>Contact Details</td>
                                <td style={{margin: 0, padding: '1em', fontWeight: 'bold', borderTop: 'solid 1px black', borderBottom: 'solid 1px black', width: '10%'}}>Arrival Date</td>
                                <td style={{margin: 0, padding: '1em', fontWeight: 'bold', borderTop: 'solid 1px black', borderBottom: 'solid 1px black', width: '10%'}}>Departure Date</td>                                                  
                                <td style={{margin: 0, padding: '1em', fontWeight: 'bold', borderTop: 'solid 1px black', borderBottom: 'solid 1px black', width: '2%'}}>Pax</td>
                                <td style={{margin: 0, padding: '1em', fontWeight: 'bold', borderTop: 'solid 1px black', borderBottom: 'solid 1px black'}}>Room Nos</td>
                            </tr>
                            {this.state.CheckInItems.map(item => (
                            <tr>
                                 <td style={{margin: 0, padding: '1em', borderBottom: '1px dotted black'}}>
                                    {item.guest_name}
                                </td>
                                <td style={{margin: 0, padding: '1em', borderBottom: '1px dotted black'}}>
                                    {item.phone_no} <br/> {item.email_id}
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
                                    {item.room_nos} 
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
                                <td style={{margin: 0, padding: '1em', fontWeight: 'bold', borderTop: 'solid 1px black', borderBottom: 'solid 1px black', width: '15%'}}>Guest Name</td>
                                <td style={{margin: 0, padding: '1em', fontWeight: 'bold', borderTop: 'solid 1px black', borderBottom: 'solid 1px black', width: '15%'}}>Contact Details</td>
                                <td style={{margin: 0, padding: '1em', fontWeight: 'bold', borderTop: 'solid 1px black', borderBottom: 'solid 1px black', width: '10%'}}>Arrival Date</td>
                                <td style={{margin: 0, padding: '1em', fontWeight: 'bold', borderTop: 'solid 1px black', borderBottom: 'solid 1px black', width: '10%'}}>Departure Date</td>                                                           
                                <td style={{margin: 0, padding: '1em', fontWeight: 'bold', borderTop: 'solid 1px black', borderBottom: 'solid 1px black', width: '2%'}}>Pax</td>
                                <td style={{margin: 0, padding: '1em', fontWeight: 'bold', borderTop: 'solid 1px black', borderBottom: 'solid 1px black'}}>Room Nos</td>
                                <td style={{margin: 0, padding: '1em', fontWeight: 'bold', borderTop: 'solid 1px black', borderBottom: 'solid 1px black', width: '7%'}}>Receipt No</td>
                                <td style={{margin: 0, padding: '1em', fontWeight: 'bold', borderTop: 'solid 1px black', borderBottom: 'solid 1px black', width: '7%'}}>Donation Amount</td>
                            </tr>
                            {/* {this.getCheckOutRows()} */}
                            {this.state.CheckOutItems.map(item => (
                            <tr>
                                 <td style={{margin: 0, padding: '1em', borderBottom: '1px dotted black'}}>
                                    {item.guest_name}
                                </td>
                                <td style={{margin: 0, padding: '1em', borderBottom: '1px dotted black'}}>
                                    {item.phone_no} <br/> {item.email_id}
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
                                    {item.room_nos}
                                </td>
                                <td style={{margin: 0, padding: '1em', borderBottom: '1px dotted black'}}>
                                    {item.rec_no} <br/> {item.checkout_comments}
                                </td>
                                <td style={{margin: 0, padding: '1em', borderBottom: '1px dotted black'}}>
                                   {item.amt}
                                </td>
                            </tr>
                            ))}
                            <tr>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td style={{fontSize:'12pt'}}><b>Total:</b></td>
                                <td style={{fontSize:'12pt'}}><b>{this.checkOutSum}</b></td>
                            </tr>
                        </tbody>
                        </table>
                </div>

            </ErrorBoundary>
            </div>
          );
        }
}

export default Reports;
