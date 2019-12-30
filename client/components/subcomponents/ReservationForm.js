import React, { Component } from 'react';
import moment from 'moment';
import {logError, checkError} from '../../utils/helpers';
import {API_URL} from '../../config/config';
import {notify} from 'react-notify-toast';
import {fetch} from '../../utils/httpUtil';
import countries from '../../constants/countries';

export class ReservationForm extends Component {

    constructor(props) {
      super(props);
  
      this.state = {
        ReservationDetails:  [{}]
      }; 
    }

    componentDidMount(){
        fetch(API_URL, "guests/" + this.props.guestId)
        .then((response) => {
            return checkError(response);
        })
        .then((result) => {
            this.setState({
                isLoaded:true,
                ReservationDetails: result
                }, function() {
                this.showReservationForm();
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

    showReservationForm(){
        if (this.state.ReservationDetails.length > 0){
            var printWindow = window.open('', '', 'height=600,width=800');
            try {
                    printWindow.document.write('<html><head>');
                    printWindow.document.write('</head><body style="font-family:verdana; font-size:14px;width:100%;">');
                    printWindow.document.write(document.getElementById("divReservationFormContents").innerHTML);
                    printWindow.document.write('</body></html>');
                    printWindow.document.close();
                    printWindow.print();
            } catch (e){
                notify.show('Popup blocked! Please enable popups to see this report.', 'error');
            }
        } else {
            notify.show('Oops! Something went wrong! Please try again!', 'error');
        } 
    }

     
    render() {
        return(
                <div id="divReservationFormContents" style={{width:'100%', visibility:'hidden', display:'none'}}>
                  <div style={{fontFamily: 'Calibri', fontSize:'12pt', width:'100%'}}>
                              <h4 style={{margin: 0, textAlign: 'center'}}>SWAMI SHUKDEVANAND TRUST</h4>
                              <h4 style={{margin: 0, textAlign: 'center'}}>Parmarth Niketan</h4>
                              <h4 style={{margin: 0, textAlign: 'center'}}>Rishikesh 249304</h4><br/>
                              <h5 style={{margin: 0, textAlign: 'center'}}>(In The Welfare of All)</h5><br/><br/>
                              <h3 style={{margin: 0, textAlign: 'center'}}><u>CHECK IN FORM No. {this.state.ReservationDetails[0].reservation_id}</u></h3>              
                       
                              <div id="divReservationForm" style={{marginTop:'1em', padding:'0.5em'}}>  

                              <table cellPadding="7" style={{width: '99.5%', textAlign:'left', borderCollapse: 'collapse', border: '1px solid black'}}>
                                    <tbody>
                                      <tr>
                                        <th style={{width:'35%'}}>
                                            Guest Information
                                        </th>
                                        <th style={{width:'35%'}}>
                                            Visit Information
                                        </th>
                                        <th style={{width:'25%'}}>
                                            Emergency Contact
                                        </th>
                                      </tr>
                                        <tr>
                                            <td style={{width:'35%', verticalAlign:'top'}}>
                                             <b>{this.state.ReservationDetails[0].first_name} {this.state.ReservationDetails[0].last_name} </b><br/>
                                              {this.state.ReservationDetails[0].address} <br/>
                                              {this.state.ReservationDetails[0].city} <br/>
                                              {this.state.ReservationDetails[0].state} <br/>
                                              {countries[this.state.ReservationDetails[0].country_id]} &nbsp;
                                              {this.state.ReservationDetails[0].zip_code}
                                            </td>
                                            <td style={{width:'35%', verticalAlign:'top'}}>
                                              <table>
                                                <tbody>
                                                <tr>
                                                  <td style={{width:'50%'}}>Check In:</td>
                                                  <td><b>{moment(this.state.ReservationDetails[0].date_of_arrival).format('DD-MMM-YYYY')}</b></td>
                                                </tr>
                                                  <tr>
                                                  <td style={{width:'50%'}}>Check Out:</td>
                                                  <td><b>{moment(this.state.ReservationDetails[0].date_of_departure).format('DD-MMM-YYYY')}</b></td>
                                                </tr>
                                                <tr>
                                                <td style={{width:'50%'}}># of Guests:</td>
                                                  <td>{this.state.ReservationDetails[0].no_of_people}</td>
                                                </tr>
                                                </tbody>
                                              </table>
                                          </td>
                                            <td style={{width:'25%', verticalAlign:'top'}}>
                                            {this.state.ReservationDetails[0].e_first_name} {this.state.ReservationDetails[0].e_last_name} <br/>
                                            {this.state.ReservationDetails[0].e_phone_no} <br/>
                                            {this.state.ReservationDetails[0].e_relationship}
                                          </td>
                                        </tr>
                                        </tbody>
                                        </table>
                              <br/>
                              <div style={{marginBottom:'25em'}}>
                                    <h3>Guest(s)</h3>
                                    <table cellPadding="10" style={{width: '99%', textAlign:'left', borderCollapse: 'collapse', border: '1px solid black'}}>
                                            <tbody>
                                                <tr style={{border: '1px solid black'}}>
                                                  <th>Name</th>
                                                  <th>Phone</th>
                                                  <th>Email</th>
                                                  <th>Relation</th>
                                                </tr>
                                                <tr>
                                                  <td>{this.state.ReservationDetails[0].first_name} {this.state.ReservationDetails[0].last_name}</td>
                                                  <td>{this.state.ReservationDetails[0].phone_no}</td>
                                                  <td>{this.state.ReservationDetails[0].email_id}</td>
                                                  <td>PRIMARY</td>
                                                </tr>
                                              </tbody>
                                          </table>
                              </div>
<b>I hereby declare the above information as accurate and assure you to abide by the regulations of the ashram.</b>
<br/><br/>
Signature: 
<br/><br/>
Checked In By: 
          </div>
          </div>
               </div>
               );
        }
      }
  
    export default ReservationForm;