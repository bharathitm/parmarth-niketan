import React, { Component } from 'react';
import {logError, checkError} from '../../utils/helpers';
import {API_URL} from '../../config/config';
import {fetch} from '../../utils/httpUtil';
import {notify} from 'react-notify-toast';
import moment from 'moment';


export class CheckInReport extends Component {
  constructor(props) {
    super(props);

    this.state = {
        isLoaded: false,
        error: null,
        startDate: this.props.startDate,
        endDate: this.props.endDate,
        CheckInItems: [{}],
    }; 
  }

  componentDidMount() {
      this.fetchCheckInReportDetails();
  }

  fetchCheckInReportDetails(){
    fetch(API_URL, "checkins/?adate=" + this.state.startDate + "&ddate=" + this.state.endDate)
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

  showCheckInReport(){
    if (this.state.CheckInItems.length > 0){
        var printWindow = window.open('', '', 'height=600,width=800');
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
    this.props.setRenderView(null);
}

  render() {
           
    const { items } = this.state;
    if (this.state.isLoaded == true) {
        return (         
            
        <div>
          // {/* Check Ins */}
                <div id="divCheckInContents" style={{visibility:'hidden'}}>
                            <h4 style={{margin: 0, textAlign: 'center'}}>SWAMI SHUKDEVANAND TRUST</h4>
                            <h5 style={{margin: 0, textAlign: 'center'}}>PARMARTH NIKETAN, SWARAGASHRAM, RISHIKESH</h5>
                            <h5 style={{margin: 0, textAlign: 'center'}}>PAN NO: AADTS4740C</h5>
                            <h5 style={{margin: 0, textAlign: 'center'}}>STAY OF SUMMARY</h5>
                            <h6 style={{textAlign: 'center'}}>Check In Details from {moment(this.state.startDate).format('dddd, MMMM Do YYYY')} to {moment(this.state.endDate).format('dddd, MMMM Do YYYY')}</h6>

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
       
        </div>
        );
    } else {

        return null;
    }
      }
      
}

export default CheckInReport;
