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
        ReservationDetails:  [{}],
        GuestContactDetails: [{}],
        Rooms: [{}]
      };
    }

    componentDidMount(){

        fetch(API_URL, "guests/" + this.props.guestId)
        .then((response) => {
            return checkError(response);
        })
        .then((result) => {
          
            this.setState({
                ReservationDetails: result

                }, function() {

                  fetch(API_URL, "gcontacts/" + this.state.ReservationDetails[0].reservation_id)

                    
                      .then((response) => {
                        return checkError(response);
                      })
                      .then((guestContacts) => {

                        this.setState({
                          GuestContactDetails: guestContacts

                            }, function(){

                              fetch(API_URL, "roombookings/" + this.state.ReservationDetails[0].reservation_id + "?prnt=1")

                                    .then((response) => {
                                      return checkError(response);
                                    })                                  

                                    .then((roomResults) => {

                                      this.setState({
                                        Rooms: roomResults

                                    }, function(){

                                      this.showReservationForm();

                                    });                            
                                  })  
                            });                            
                      })                
                }
            );
        })
        .catch((error) => {
            this.setState({
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
                    printWindow.document.write('</head><body style="font-family:verdana; font-size:14px;width:100%;position:relative;height:98%;">');
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
                    <div style={{fontFamily: 'Calibri', fontSize:'12pt', width:'100%', minHeight:'100vh', overflow:'hidden', display:'block', positive:'relative', paddingBottom: '0'}}>
                              <h4 style={{margin: 0, textAlign: 'center'}}>SWAMI SHUKDEVANAND TRUST</h4>
                              <h4 style={{margin: 0, textAlign: 'center'}}>Parmarth Niketan</h4>
                              <h4 style={{margin: 0, textAlign: 'center'}}>Rishikesh 249304</h4><br/>
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
                                                <tr>
                                                <td style={{width:'50%'}}>Purpose:</td>
                                                  <td>
                                                    {/* {this.state.ReservationDetails[0].no_of_people} */}
                                                    </td>
                                                </tr>
                                                </tbody>
                                              </table>
                                          </td>
                                            <td style={{width:'25%', verticalAlign:'top'}}>
                                            {this.state.ReservationDetails[0].e_first_name} {this.state.ReservationDetails[0].e_last_name} <br/>
                                            {this.state.ReservationDetails[0].e_phone_no} <br/>
                                            {this.state.ReservationDetails[0].e_relationship} <br/>
                                            <b>ID Proof:</b><br/>
                                            <b>Vehicle No:</b>
                                          </td>
                                        </tr>
                                        </tbody>
                              </table>
                              <br/>
                              <div>
                                <table style={{width: '100%'}}>
                                  <tr>
                                    <td>
                                      <span style={{fontWeight: 'bolder'}}>Guest(s)</span>
                                    </td>
                                    <td style={{width:'75%', paddingRight:'1.5em', textAlign: 'right'}}>
                                    Male: ____ Female: ____ Children: _____
                                    </td>
                                  </tr>
                                  </table>
                                <br/>
                                <table cellPadding="6" style={{width: '99%', textAlign:'left', borderCollapse: 'collapse', border: '1px solid black'}}>
                                            <tbody>
                                                <tr style={{border: '1px solid black'}}>
                                                  <th>Name</th>
                                                  <th>Age</th>
                                                  <th>Relation</th>
                                                  <th>Phone/Email</th>                          
                                                  <th>Medical Condition</th>                                                  
                                                </tr>
                                                <tr>
                                                  <td>{this.state.ReservationDetails[0].first_name} {this.state.ReservationDetails[0].last_name}</td>
                                                  <td></td>
                                                  <td>PRIMARY</td>
                                                  <td>{this.state.ReservationDetails[0].phone_no} / 
                                                  {this.state.ReservationDetails[0].email_id}</td>
                                                  <td></td>                                                  
                                                </tr>

                                              {this.state.GuestContactDetails.map(contact => (
                                                    <tr>
                                                    <td>{contact.c_first_name} {contact.c_last_name}</td>
                                                    <td></td>
                                                    <td></td>
                                                    <td>{contact.c_phone_no} {(contact.c_email_id != null)? '/' : null} 
                                                    &nbsp;{contact.c_email_id}</td>
                                                    <td></td>                                                  
                                                    </tr>
                                                    ))}
                                              </tbody>
                                          </table>
                            

                 <br/>
        <div><b>Room No(s):</b> {this.state.Rooms[0].room_nos}</div>
                        </div>
                        </div>
                          
                      <div id="divFooter" style={{position: 'absolute', bottom: '0', width:'100%'}}>
                            <b>I hereby declare the above information as accurate and assure you we have gone over the rules and regulations of the ashram mentioned on your website/email and shall abide by the same.</b>
                            <br/><br/>
                            Signature:
                            <br/><br/>
                            <hr/>
                            <i>For Office Use Only</i><br/>
                            Receipt No: __________<br/>
                            Checked In By:
                        </div>
                    </div>     
                </div> //divReservationFormContents
               );
        }
      }

    export default ReservationForm;