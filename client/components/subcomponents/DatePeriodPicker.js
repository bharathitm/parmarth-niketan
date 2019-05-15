import React, { Component } from 'react';

import DatePicker from 'react-datepicker';
import moment from 'moment';

export class DatePickerInput extends Component {

    constructor(props) {
      super(props);
  
      this.state = {
        startDate: null,
        endDate: null
      }; 
      
      this.handleStartDateChange = this.handleStartDateChange.bind(this);
      this.handleEndDateChange = this.handleEndDateChange.bind(this);

      this._validateOnDemand = true; // this flag enables onBlur validation as user fills forms

      this.validationCheck = this.validationCheck.bind(this);
      this.isValidated = this.isValidated.bind(this);

    }

    handleStartDateChange(date) {
        this.setState({
            startDate: date
        });

        this.props.updateReportStore({
            startDate: date
        });

        this.refs.startDate.selected = date;
    }

    handleEndDateChange(date) {
        this.setState({
            endDate: date
        });

        this.props.updateReportStore({
            endDate: date
        });
        this.refs.endDate.selected = date;
    }

    handleReservations(){
        if (this.isValidated()){
            this.props.handleReservations();
        }
    }

    handleCheckIns(){
        if (this.isValidated()){
            this.props.handleCheckIns();
        }
    }

    handleCheckOuts(){
        if (this.isValidated()){
            this.props.handleCheckOuts();
        }
    }

    handleKathas(){
        if (this.isValidated()){
            this.props.handleKathas();
        }
    }

    _grabUserInput() {
        return {
          startDate: this.refs.startDate.selected,
          endDate: this.refs.endDate.selected
        };
      }
    
      _validateData(data) {
        return  {
          startDateVal: (data.startDate == null || data.startDate == undefined)? false: true,
          endDateVal: (data.endDate == null || data.endDate == undefined)? false: true
        };
      }

    validationCheck() {
        if (!this._validateOnDemand)
          return;
    
        const userInput = this._grabUserInput(); 
        const validateNewInput = this._validateData(userInput); 
    
        this.setState(Object.assign(userInput, validateNewInput));
      }
    
      isValidated() {
        const userInput = this._grabUserInput(); 
        const validateNewInput = this._validateData(userInput); 
        let isDataValid = false;
    
        if (Object.keys(validateNewInput).every((k) => { return validateNewInput[k] === true })) {
            isDataValid = true;
        }
        else {
            this.setState(Object.assign(userInput, validateNewInput));
        }
    
        return isDataValid;
      }
      
    render() {

    let notValidClasses = {};

    /* Start Date */
    if (typeof this.state.startDateVal == 'undefined' || this.state.startDateVal) {
        notValidClasses.startDateCls = 'form-control';
      }
      else {
         notValidClasses.startDateCls = 'form-control has-error';
      }
  
      /* End Date */    
      if (typeof this.state.endDateVal == 'undefined' || this.state.endDateVal) {
        notValidClasses.endDateCls = 'form-control';
      }
      else {
         notValidClasses.endDateCls = 'form-control has-error';
      }
            return(
                    <div>
                    <div className = "div-table div-report-table">
                        <div className = "div-table-row">
                          <div className ="div-table-col">        
                                <div className="form-group col-md-12 content form-block-holder">
                                        <label className="control-label col-md-4">
                                            Start Date:
                                        </label>
                                        <div>
                                            <DatePicker
                                            ref="startDate"
                                            dateFormat="YYYY-MM-DD"
                                            selected={this.state.startDate}
                                            onBlur={this.validationCheck}
                                            onChange={this.handleStartDateChange} 
                                            // className="form-control" 
                                            className={notValidClasses.startDateCls} />                       
                                        </div>
                                    </div>
                                </div>
                            <div className ="div-table-col">  
                                <div className="form-group col-md-12 content form-block-holder">
                                    <label className="control-label col-md-4">
                                         End Date:
                                    </label>
                                    <div>
                                        <DatePicker ref="endDate"
                                        dateFormat="YYYY-MM-DD"
                                        selected={this.state.endDate}
                                        onBlur={this.validationCheck}
                                        minDate={this.state.startDate} 
                                        onChange={this.handleEndDateChange} 
                                        // className="form-control"
                                        className={notValidClasses.endDateCls} />
                                    </div>
                                    </div>
                                </div>
                            <div className ="div-table-col">  
                                    <button type="button" className="btnBig" onClick={() => this.handleReservations()}>Reservations</button>&nbsp;&nbsp;&nbsp;
                                    <button type="button" className="btnBig" onClick={() => this.handleCheckIns()}>Check Ins</button>&nbsp;&nbsp;&nbsp;
                                    <button type="button" className="btnBig" onClick={() => this.handleCheckOuts()}>Check Outs</button>&nbsp;&nbsp;&nbsp;
                                    <button type="button" className="btnBig" onClick={() => this.handleKathas()}>Kathas/Retreats</button>
                            </div>
                        </div>
                    </div>
                    </div>
                );
        }
    }

    export default DatePickerInput;