import React, { Component } from 'react';

export class CheckOutRoomsPopup extends Component {
  constructor(props) {
    super(props);

    this.state = {
        results: this.props.results
    }

    this._validateOnDemand = true; 
    this.validationCheck = this.validationCheck.bind(this);
    this.validateContent = this.validateContent.bind(this);

    this.clearTotalSum = this.clearTotalSum.bind(this);

  }

  clearTotalSum(){
    document.getElementById("txtTotalSum").value = ""; 
  }

  validationCheck() {
    if (!this._validateOnDemand)
      return;

    const userInput = this._grabUserInput(); 
    const validateNewInput = this._validateData(userInput); 

    this.setState(Object.assign(userInput, validateNewInput));
  }

  _grabUserInput() {
    return {
        sum: (document.getElementById("txtTotalSum").value.toString().trim() != '')? document.getElementById("txtTotalSum").value : null,
        receipt: (document.getElementById("txtReceiptNo").value.toString().trim() != '')? document.getElementById("txtReceiptNo").value : null
    };
  }

  _validateData(data) {
    return  {
    sumVal: (data.receipt != null && data.sum == null)? false : true,
    receiptVal: (data.sum != null && data.receipt == null)? false : true,
    };
  }

  validateContent() {

    const userInput = this._grabUserInput(); 
    const validateNewInput = this._validateData(userInput); 
    let isDataValid = false;

    if (Object.keys(validateNewInput).every((k) => { return validateNewInput[k] === true })) {

        this.props.sendCheckOutDetails(this.props.str_reservations, this.props.str_rooms,
            document.getElementById("txtTotalSum").value, 
            document.getElementById("txtReceiptNo").value,
            document.getElementById("txtCheckOutComments").value, this.props.callFrom); 
        this.props.onClose();
    }
    else {
        this.setState(Object.assign(userInput, validateNewInput));
    }

    return isDataValid;
  }


render() {
    let notValidClasses = {};

    let { results} = this.state;

    if (typeof this.state.sumVal == 'undefined' || this.state.sumVal) {
        notValidClasses.sumCls = 'form-control small-textbox';
    }
    else {
        notValidClasses.sumCls = 'form-control has-error';
    }

    if (typeof this.state.receiptVal == 'undefined' || this.state.receiptVal) {
        notValidClasses.receiptCls = 'form-control small-textbox';
    }
    else {
        notValidClasses.receiptCls = 'form-control has-error';
    }

    return (
            
        <div>
        <h4>Check Out Rooms</h4>  
        <img src="./img/close.png" className="imgClose" onClick={() => 
                    {this.props.onClose(); this.props.setParentPopupLoadState(false); }}/>
            
          <div className = "div-table advance-table checkout-table">
          <div className = "div-table-row">
                    <div className ="div-table-col div-table-col-header">
                   Room No
                    </div>
                    <div className ="div-table-col div-table-col-header">
                    No. of Days
                    </div>
                    <div className ="div-table-col div-table-col-header">
                   Room Donation
                    </div>
                    <div className ="div-table-col div-table-col-header">
                    Total Donation
                    </div>
            </div>
          {results.map(item => (
              <div className = "div-table-row" key={item.donation_id}>
                    <div className ="div-table-col col-bordered">
                      {item.room_no}
                    </div>
                    <div className ="div-table-col col-bordered">
                      {item.no_of_days}
                    </div>
                    <div className ="div-table-col col-bordered">
                    &#8377; {item.room_rent.toLocaleString('en-IN')}
                    </div>
                    <div className ="div-table-col col-bordered">
                    &#8377; {item.total.toLocaleString('en-IN')}
                    </div>
              </div>
              ))} 
            </div>
               <div className="form-group col-md-12 content form-block-holder">
                <label className="control-label col-md-4">
                  Reservation Donation Received So Far: <b>
                  &#8377; {(results[0].donationAmount != null? results[0].donationAmount.toLocaleString('en-IN'): "0")}</b>
                  </label>
              </div>

               <div className="form-group col-md-12 content form-block-holder">
                <label className="control-label col-md-4">
                  Total Sum: &#8377; &nbsp;
                </label>
                <div className="col-md-8">           
                  <input id="txtTotalSum" 
                  //className="form-control small-textbox" 
                  className={notValidClasses.sumCls}
                  defaultValue={((this.props.str_reservations != '')? 
                    this.props.sum - ((results[0].donationAmount != null) 
                    && (Number.isInteger(results[0].donationAmount)) ? results[0].donationAmount: 0) : '')} type="number" 
                  onBlur={this.validationCheck} />

                  <a className="aClear" onClick={() => this.clearTotalSum()}>Clear Total Sum</a>
                  </div>
            </div>

             <div className="form-group col-md-12 content form-block-holder">
                <label className="control-label col-md-4">
                  Receipt No: &nbsp;&nbsp;
                </label>
                <div className="col-md-8">
                  <input id="txtReceiptNo" 
                  //className="form-control small-textbox" 
                  className={notValidClasses.receiptCls}
                  onBlur={this.validationCheck} />
                </div>
            </div>

             <div className="form-group col-md-12 content form-block-holder">
                <label className="control-label col-md-4">
                  Comments: &nbsp;&nbsp;
                </label>
                <div className="col-md-8">
                <textarea id="txtCheckOutComments"
                    className="form-control" />
                  </div>
            </div>
        <button type="button" className="btnCheckOut btnBig" onClick={() => { this.validateContent(); }}>
        Check Out</button>
        
      </div>
)}

}

export default CheckOutRoomsPopup;