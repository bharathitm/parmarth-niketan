import React, { Component } from 'react';
import {logError, checkError} from '../../utils/helpers';
import {API_URL} from '../../config/config';
import {fetch} from '../../utils/httpUtil';
import {notify} from 'react-notify-toast';
import moment from 'moment';
import { blocks} from '../../constants/roomAttributes';


export class GridCheckInReport extends Component {
  constructor(props) {
    super(props);

    this.state = {
        isLoaded: false,
        error: null,
        GridCheckInItems: [{}],
        checkInGrid:[]
    }; 

    this.checkOutSum = 0;
  }

  componentDidMount() {
      this.fetchGridCheckInReportDetails();
  }

  fetchGridCheckInReportDetails(){
    fetch(API_URL, "checkins/?tGrid=1")
            .then((response) => {
                return checkError(response);
            })
            .then((result) => {
                this.setState({
                    isLoaded:true,
                    GridCheckInItems: result
                  }, function() {
                    this.showGridCheckInReport();
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

  showGridCheckInReport(){
    if (this.state.GridCheckInItems.length > 0){
        var printWindow = window.open('', '', 'height=400,width=800');
        try {
                printWindow.document.write('<html><head>');
                printWindow.document.write('</head><body style="font-family:verdana; font-size:14px;width:100%;">');
                printWindow.document.write(document.getElementById("divGridCheckInContents").innerHTML);
                printWindow.document.write('</body></html>');
                printWindow.document.close();
                printWindow.print();
        } catch (e){
            notify.show('Popup blocked! Please enable popups to see this report.', 'error');
        }
    } else {
        notify.show('No Check In Summary for given date period!', 'error');
    } 
    this.props.setRenderView(null);
}

  render() {
    const { GridCheckInItems, checkInGrid } = this.state;

    if (this.state.isLoaded == true) {
        if (GridCheckInItems.length > 0){
            //variables for specific counts & total
            var var_block_id, var_is_walkin, var_is_online, var_is_walkin_ref, var_is_online_ref;
            var_block_id = var_is_walkin = var_is_online = var_is_walkin_ref = var_is_online_ref = 0;
            var total_is_walkin, total_is_online, total_is_walkin_ref, total_is_online_ref, grandTotal;
            total_is_walkin = total_is_online = total_is_walkin_ref = total_is_online_ref = grandTotal = 0;
            
            //first block id
            var_block_id = GridCheckInItems[0].block_id;
            var_is_walkin = ((GridCheckInItems[0].is_walkin == 1) && (GridCheckInItems[0].is_referred == 0)? GridCheckInItems[0].no_of_rooms: 0); // is walkin 
            var_is_online = ((GridCheckInItems[0].is_walkin == 0) && (GridCheckInItems[0].is_referred == 0)? GridCheckInItems[0].no_of_rooms: 0); // is online
            var_is_walkin_ref = ((GridCheckInItems[0].is_walkin == 1) && (GridCheckInItems[0].is_referred >= 1)? GridCheckInItems[0].no_of_rooms: 0); // is walkin referenced
            var_is_online_ref = ((GridCheckInItems[0].is_walkin == 0) && (GridCheckInItems[0].is_referred >= 1)? GridCheckInItems[0].no_of_rooms: 0); // is online referenced

            //second record onwards
            for (var i = 1; i < GridCheckInItems.length; i++)
            {
                if (GridCheckInItems[i].block_id == GridCheckInItems[i-1].block_id) // if same block id, fill all the 4 cols one by one
                {
                    if (var_is_walkin == 0) {
                        var_is_walkin = ((GridCheckInItems[i].is_walkin == 1) && (GridCheckInItems[i].is_referred == 0)? GridCheckInItems[i].no_of_rooms: 0);
                    }
                    if (var_is_online == 0) {
                        var_is_online = ((GridCheckInItems[i].is_walkin == 0) && (GridCheckInItems[i].is_referred == 0)? GridCheckInItems[i].no_of_rooms: 0);
                    }
                    if (var_is_walkin_ref == 0) {
                        var_is_walkin_ref = ((GridCheckInItems[i].is_walkin == 1) && (GridCheckInItems[i].is_referred >= 1)? GridCheckInItems[i].no_of_rooms: 0);
                    }
                    if (var_is_online_ref == 0) {
                        var_is_online_ref = ((GridCheckInItems[i].is_walkin == 1) && (GridCheckInItems[i].is_referred >= 1)? GridCheckInItems[i].no_of_rooms: 0);
                    } 
                } else { // clear variables and push into array so that each block id is a distinct record
                    checkInGrid.push(
                        {
                            block_id: var_block_id,
                            is_walkin: var_is_walkin,
                            is_online: var_is_online,
                            is_walkin_ref: var_is_walkin_ref,
                            is_online_ref: var_is_online_ref
                        }  
                    );

                    total_is_walkin += var_is_walkin;
                    total_is_online += var_is_online;
                    total_is_walkin_ref += var_is_walkin_ref;
                    total_is_online_ref += var_is_online_ref;

                    var_is_walkin = var_is_online = var_is_walkin_ref = var_is_online_ref = 0;

                    var_block_id = GridCheckInItems[i].block_id;
                    var_is_walkin = ((GridCheckInItems[i].is_walkin == 1) && (GridCheckInItems[i].is_referred == 0)? GridCheckInItems[i].no_of_rooms: 0);
                    var_is_online = ((GridCheckInItems[i].is_walkin == 0) && (GridCheckInItems[i].is_referred == 0)? GridCheckInItems[i].no_of_rooms: 0); 
                    var_is_walkin_ref = ((GridCheckInItems[i].is_walkin == 1) && (GridCheckInItems[i].is_referred >= 1)? GridCheckInItems[i].no_of_rooms: 0); 
                    var_is_online_ref = ((GridCheckInItems[i].is_walkin == 0) && (GridCheckInItems[i].is_referred >= 1)? GridCheckInItems[i].no_of_rooms: 0);     
                }   
            }
            //last record
            checkInGrid.push(
                {
                    block_id: var_block_id,
                    is_walkin: var_is_walkin,
                    is_online: var_is_online,
                    is_walkin_ref: var_is_walkin_ref,
                    is_online_ref: var_is_online_ref
                }
            );

            total_is_walkin += var_is_walkin;
            total_is_online += var_is_online;
            total_is_walkin_ref += var_is_walkin_ref;
            total_is_online_ref += var_is_online_ref;
            grandTotal = total_is_walkin + total_is_online + total_is_walkin_ref + total_is_online_ref;

            var_is_walkin = var_is_online = var_is_walkin_ref = var_is_online_ref = 0;
      }    
    

        return (         
        <div>
          // {/* Summary of Check Ins */}
                <div id="divGridCheckInContents" style={{visibility:'hidden'}}>
                        <h4 style={{margin: 0, textAlign: 'center'}}>SWAMI SHUKDEVANAND TRUST</h4>
                        <h5 style={{margin: 0, textAlign: 'center'}}>PARMARTH NIKETAN, SWARAGASHRAM, RISHIKESH</h5>
                        <h5 style={{margin: 0, textAlign: 'center'}}>PAN NO: AADTS4740C</h5>
                        <h5 style={{margin: 0, textAlign: 'center'}}>STAY OF SUMMARY</h5>
                        <h5 style={{textAlign: 'center'}}>Summary of Room Check Ins on {moment(this.state.startDate).format('dddd, MMMM Do YYYY')}</h5>

                         <table style={{borderSpacing: 0,borderCollapse: 'collapse', position: 'absolute', width: '50%', fontSize: 12, border: 'solid 1px black'}}>
                        <tbody>
                            <tr>
                                <td style={{margin: 0, padding: '1em', fontWeight: 'bold', borderTop: 'solid 1px black', borderBottom: 'solid 1px black', width: '20%'}}>Block</td>
                                <td style={{margin: 0, padding: '1em', fontWeight: 'bold', borderTop: 'solid 1px black', borderBottom: 'solid 1px black', width: '15%'}}>Walkins</td>
                                <td style={{margin: 0, padding: '1em', fontWeight: 'bold', borderTop: 'solid 1px black', borderBottom: 'solid 1px black', width: '15%'}}>Online</td>
                                <td style={{margin: 0, padding: '1em', fontWeight: 'bold', borderTop: 'solid 1px black', borderBottom: 'solid 1px black', width: '20%'}}>Walkins - References</td>
                                <td style={{margin: 0, padding: '1em', fontWeight: 'bold', borderTop: 'solid 1px black', borderBottom: 'solid 1px black', width: '20%'}}>Online - References</td>
                                <td style={{margin: 0, padding: '1em', fontWeight: 'bold', borderTop: 'solid 1px black', borderBottom: 'solid 1px black', width: '10%'}}>Total</td>                                                           
                            </tr>
        
                            {this.state.checkInGrid.map(item => (
                            <tr>
                                 <td style={{margin: 0, padding: '1em', borderBottom: '1px dotted black'}}>
                                    {blocks[item.block_id]}
                                </td>
                                <td style={{margin: 0, padding: '1em', borderBottom: '1px dotted black'}}>
                                    {item.is_walkin}
                                </td>
                                <td style={{margin: 0, padding: '1em', borderBottom: '1px dotted black'}}>
                                    {item.is_online}
                                </td>
                                <td style={{margin: 0, padding: '1em', borderBottom: '1px dotted black'}}>
                                    {item.is_walkin_ref}
                                </td>
                                <td style={{margin: 0, padding: '1em', borderBottom: '1px dotted black'}}>
                                    {item.is_online_ref}
                                </td>    
                                <td style={{margin: 0, padding: '1em', borderBottom: '1px dotted black'}}>
                                    {parseInt(item.is_walkin) + parseInt(item.is_online) + parseInt(item.is_walkin_ref) + parseInt(item.is_online_ref)}
                                </td>                           
                            </tr>                           
                            ))}
                             <tr>
                                <td style={{margin: 0, padding: '1em', borderBottom: '1px dotted black'}}><b>Total</b></td>
                                <td style={{margin: 0, padding: '1em', borderBottom: '1px dotted black'}}><b>{total_is_walkin}</b></td>
                                <td style={{margin: 0, padding: '1em', borderBottom: '1px dotted black'}}><b>{total_is_online}</b></td>
                                <td style={{margin: 0, padding: '1em', borderBottom: '1px dotted black'}}><b>{total_is_walkin_ref}</b></td>
                                <td style={{margin: 0, padding: '1em', borderBottom: '1px dotted black'}}><b>{total_is_online_ref}</b></td>
                                <td style={{margin: 0, padding: '1em', borderBottom: '1px dotted black'}}><b>{grandTotal}</b></td>                              
                            </tr> 
                            <tr>
                                <td style={{margin: 0, padding: '1em', borderBottom: '1px dotted black'}}><b>Percentage</b></td>
                                <td style={{margin: 0, padding: '1em', borderBottom: '1px dotted black'}}><b>{((total_is_walkin/grandTotal)*100).toFixed(2)+"%"}</b></td>
                                <td style={{margin: 0, padding: '1em', borderBottom: '1px dotted black'}}><b>{((total_is_online/grandTotal)*100).toFixed(2)+"%"}</b></td>
                                <td style={{margin: 0, padding: '1em', borderBottom: '1px dotted black'}}><b>{((total_is_walkin_ref/grandTotal)*100).toFixed(2)+"%"}</b></td>
                                <td style={{margin: 0, padding: '1em', borderBottom: '1px dotted black'}}><b>{((total_is_online_ref/grandTotal)*100).toFixed(2)+"%"}</b></td>
                                <td style={{margin: 0, padding: '1em', borderBottom: '1px dotted black'}}><b>{"100%"}</b></td>                                
                            </tr> 
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

export default GridCheckInReport;
