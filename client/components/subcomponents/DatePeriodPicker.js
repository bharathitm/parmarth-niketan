import React, { Component } from 'react';

import DatePicker from 'react-datepicker';
import moment from 'moment';

export class DatePickerInput extends Component {

    constructor(props) {
      super(props);
  
      this.state = {
        startDate: moment(),
        endDate: moment()
      }; 

      

      this.handleStartDateChange = this.handleStartDateChange.bind(this);
      this.handleEndDateChange = this.handleEndDateChange.bind(this);
    }

    handleStartDateChange(date) {
        this.setState({
            startDate: date
        });

        this.props.updateReportStore({
            startDate: date
        });
    }

    handleEndDateChange(date) {
        this.setState({
            endDate: date
        });

        this.props.updateReportStore({
            endDate: date
        });
    }
      
    render() {
            return(
                    <div>
                    <table>
                    <tbody>
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
                    <button onClick={() => this.props.handleShow()}>Show</button>
                    </td>                 
                    </tr>
                    </tbody>
                    </table>
                    </div>
                );
        }
    }

    export default DatePickerInput;