import React, { Component } from 'react';

import DatePicker from 'react-datepicker';
import moment from 'moment';

export class AdvanceDonationsInput extends Component {

    constructor(props) {
      super(props);
  
      this.state = {
        donationID: '',
        receivedOn: moment(),
        amount: '',
        receipt:'',
        items: {}
      }; 

      this.handleDateChange = this.handleDateChange.bind(this);
    }

    handleDateChange(date) {
        this.setState({
          advanceReceivedOn: date
        });
    
        var selectedTR = document.getElementsByClassName("active")[0];
        var selectedDate = selectedTR.getElementsByTagName("input")[0].value;
    
        selectedDate.selected = date;
      }
    

    render() {
        let notValidClasses = {};

        return (
                <tr className="active">
                <td>
                {/* Date 1*/}
                    <div className="form-group col-md-12 content form-block-holder">
                        <label className="control-label col-md-4">
                            Date:*
                        </label>
                        <div className={notValidClasses.date1Cls}>
                        <DatePicker
                            dateFormat="YYYY-MM-DD"
                            selected={this.state.advanceReceivedOn}                             
                            onChange={this.handleDateChange} 
                            onBlur={this.validationCheck}
                            className="form-control"/>
                            <div className={notValidClasses.date1ValGrpCls}>{this.state.date1ValMsg}</div>
                            </div>
                    </div>
                </td>
                <td>
                {/* Amount 1*/}
                    <div className="form-group col-md-12 content form-block-holder">
                    <label className="control-label col-md-4">
                        Amount:*
                    </label>
                    <div className={notValidClasses.amount1Cls}>
                        <input
                            autoComplete="off"
                            className="form-control"
                            required
                            onBlur={this.validationCheck} />                      
                        <div className={notValidClasses.amount1ValGrpCls}>{this.state.amount1ValMsg}</div>
                        </div>
                    </div>
                </td>
                <td>
                    {/* Receipt No 1*/}
                <div className="form-group col-md-12 content form-block-holder">
                    <label className="control-label col-md-4">
                        Receipt No:*
                    </label>
                    <div className={notValidClasses.receipt1Cls}>
                        <input
                            autoComplete="off"
                            className="form-control"
                            required
                            onBlur={this.validationCheck} />
                        <div className={notValidClasses.receipt1ValGrpCls}>{this.state.receipt1ValMsg}</div>
                    </div>
                    </div>
                </td>
                </tr>
        )
    }
}


export default AdvanceDonationsInput;