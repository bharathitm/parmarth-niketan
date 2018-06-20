import React from 'react';

import DatePicker from 'react-datepicker';
import moment from 'moment';


export class Reports extends React.Component {

    constructor(props) {
      super(props);

       this.state = {
            error: null,
            isLoaded: false,
            items: [
            {}
            ],
            startDate: moment(),
            endDate: moment()
        };

        this.handleStartDateChange = this.handleStartDateChange.bind(this);
        this.handleEndDateChange = this.handleEndDateChange.bind(this);
    }



    handleShow(){

        const startDate = (this.getFormattedDate(this.state.startDate)).toString();
        const endDate = (this.getFormattedDate(this.state.endDate)).toString();

        fetch("http://localhost:3000/api/checkins/?adate=" + startDate + "&ddate=" + endDate)
        .then(res => res.json())
        .then(
          (result) => {
            this.setState({
              isLoaded: true,
              items: result
            });

          },
          // Note: it's important to handle errors here
          // instead of a catch() block so that we don't swallow
          // exceptions from actual bugs in components.
          (error) => {
            this.setState({
              isLoaded: false,
              error
            });
          }
        )

    }

    handlePrint(){
        var printWindow = window.open('', '', 'height=400,width=800');
        printWindow.document.write('<html><head><title>Check In Report</title>');
        printWindow.document.write('</head><body >');
        printWindow.document.write(document.getElementById("divContents").innerHTML);
        printWindow.document.write('</body></html>');
        printWindow.document.close();
        printWindow.print();
    }

    handleStartDateChange(date) {
        this.setState({
            startDate: date
        });
      }

      handleEndDateChange(date) {
        this.setState({
          endDate: date
        });
      }

      getFormattedDate(dt) {
        var date = new Date(dt);
        var month = date.getMonth() + 1;
        var day = date. getDate();
        var year = date.getFullYear();
        return year + "-" + month + "-" + day ;
    }


    render() {
        if (!this.state.isLoaded){
            return (
                <div>
                <table>
                    <tr>
                    <td>
                   

                    <div className="form-group col-md-12 content form-block-holder">
                        <label className="control-label col-md-4">
                        Start Date:
                        </label>
                        {/* <div className={notValidClasses.advanceReminderOnCls}> */}
                        <div>
                        <DatePicker
                        ref="startDate"
                        dateFormat="YYYY-MM-DD"
                        selected={this.state.startDate}
                        onChange={this.handleStartDateChange} 
                        className="form-control" />                       
                        </div>
                        </div>
                    </td>
                    <td>
                    <div className="form-group col-md-12 content form-block-holder">
                        <label className="control-label col-md-4">
                        End Date:
                        </label>
                        {/* <div className={notValidClasses.advanceReminderOnCls}> */}
                        <div>
                        <DatePicker ref="endDate"
                        dateFormat="YYYY-MM-DD"
                        selected={this.state.endDate}
                        onChange={this.handleEndDateChange} 
                        className="form-control"/>
                        </div>
                        </div>
                    </td>  
                    <td>
                    <button onClick={() => this.handleShow()}>Show</button>
                        </td>                 
                    </tr>
                    </table>
                    </div>
            );
        }
        else {
          return (
            <div>
                <table>
                    <tr>
                    <td>
                    <div className="form-group col-md-12 content form-block-holder">
                        <label className="control-label col-md-4">
                        Start Date:
                        </label>
                        {/* <div className={notValidClasses.advanceReminderOnCls}> */}
                        <div>
                        <DatePicker
                        ref="startDate"
                        dateFormat="YYYY-MM-DD"
                        selected={this.state.startDate}
                        onChange={this.handleStartDateChange} 
                        className="form-control" />                          
                        </div>
                        </div>
                    </td>
                    <td>
                    <div className="form-group col-md-12 content form-block-holder">
                        <label className="control-label col-md-4">
                        End Date:
                        </label>
                        {/* <div className={notValidClasses.advanceReminderOnCls}> */} 
                        <div>

                        <DatePicker ref="endDate"
                        dateFormat="YYYY-MM-DD"
                        selected={this.state.endDate}
                        onChange={this.handleEndDateChange} 
                        className="form-control"/>                    
                        </div>
                        </div>
                    </td> 
                    <td>
                    <button onClick={() => this.handleShow()}>Show</button>
                        </td> 
                        <td> <button onClick={() => this.handlePrint()}>Print</button>
                        </td>             
                    </tr>
                    </table>
                    <div id="divContents">
                        <h2>SWAMI SHUKDEVANAND TRUST</h2>
                        <h2> PARMARTH NIKETAN</h2>                       
                        <h3>Check In Details from {(this.getFormattedDate(this.state.startDate)).toString()} to {(this.getFormattedDate(this.state.endDate)).toString()}</h3>
                        <table width="100%">
                            <tr>
                                <td>Arrival Date</td>
                                <td>Guest Name</td>
                                <td>No.of People</td>
                            </tr>
                            {this.state.items.map(item => (
                            <tr>
                                <td>
                                    {item.on_date}
                                </td>
                                <td>
                                    {item.first_name} {item.last_name}
                                </td>
                                <td>
                                    {item.no_of_people}
                                </td>
                            </tr>
                            ))}
                        </table>
                        </div>
                </div>
          );
        }
    }
}

export default Reports;
