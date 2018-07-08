import React, { Component } from 'react';

import {logError, checkError} from '../../utils/helpers';
import {API_URL} from '../../config/config';

import {AdvanceDonationsInput} from '../subcomponents/AdvanceDonationsInput';

export class AdvanceDonations extends Component {
  constructor(props) {
    super(props);

    this.state = {
        isLoaded: false,
        error: null
    }; 

    //this.handleDelete = this.handleDelete.bind(this);
  }

  componentDidMount() {
   this.fetchAdvanceDonationsIfExists();
  }

  fetchAdvanceDonationsIfExists(){
    if(this.props.getStore().reservationId != '')
    {
      fetch(API_URL + "advance/" + this.props.getStore().reservationId)
      .then((response) => {
        return checkError(response);
      })
      .then((result) => {
          this.setState({
            isLoaded: true,
            items: result
          });
        })
      .catch((error) => {
        this.setState({
          isLoaded: false,
          error
        });
        logError(this.constructor.name + " " + error);
      });
    }
  }

  getFormattedDate(dt) {
    var date = new Date(dt);
    var month = date.getMonth() + 1;
    var day = date. getDate();
    var year = date.getFullYear();
    return year + "-" + month + "-" + day ;
}

handleDelete(donationId){
  fetch(API_URL + "advance/" + donationId, {
    method: 'DELETE',
    headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
      }
   })
    .then((response) => {
      return checkError(response);
    })
    .catch((error) => {
      this.setState({
        isLoaded: false,
        error
      });
      logError(error);
    });

    //create a newData array which is a clone of state.items, remove the just selected entries from this newData 
      //and re-assign newData to state.items. This causes the component to re-render.
      var newData = this.state.items;

      for (var x=0; x< newData.length; x++){
          if (newData[x].donation_id == donationId){
          newData.splice(x,1);
          }
      }

      this.setState({
        items: newData
      });
}


  render() {

    const { error, isLoaded, items } = this.state;

    if ((!isLoaded) && (error)){
      return <div><span id="spNoDataorError">{JSON.stringify(error.message)}</span></div>;        
     } else if (!isLoaded) {
        return <div>Loading...</div>;
    } else if (items.length > 0) {
        return (
          <div className="step step3">
            <div className="row">
              <form id="Form" className="form-horizontal">          
                    <h4>Advance Donations</h4>        
                    <div className = "div-table advance-table">
                    <div className = "div-table-row">
                              <div className ="div-table-col div-table-col-header">
                              Received On
                              </div>
                              <div className ="div-table-col div-table-col-header">
                              Amount
                              </div>
                              <div className ="div-table-col div-table-col-header">
                              Receipt No.
                              </div>
                              <div className ="div-table-col div-table-col-header">
                              Actions
                              </div>
                      </div>
                    {items.map(item => (
                        <div className = "div-table-row" key={item.donation_id}>
                              <div className ="div-table-col col-bordered">
                                {this.getFormattedDate(item.received_on).toString()}
                              </div>
                              <div className ="div-table-col col-bordered">
                                {item.amount}
                              </div>
                              <div className ="div-table-col col-bordered">
                                {item.receipt_no}
                              </div>
                              <div className ="div-table-col col-bordered">
                              <img src="./img/delete.png" onClick={() => this.handleDelete(item.donation_id)}/>
                              </div>
                        </div>
                        ))} 
                        <AdvanceDonationsInput></AdvanceDonationsInput>
                      </div>
              </form>
            </div>
          </div>
        );
      }
      else {
        return (
          <div className="step step3">
          <div className="row">
            <form id="Form" className="form-horizontal">          
                  <h4>Advance Donations</h4>       
        <div className = "div-table advance-table">
        <div className = "div-table-row">
                  <div className ="div-table-col div-table-col-header">
                  Received On
                  </div>
                  <div className ="div-table-col div-table-col-header">
                  Amount
                  </div>
                  <div className ="div-table-col div-table-col-header">
                  Receipt No.
                  </div>
                  <div className ="div-table-col div-table-col-header">
                              Actions
                              </div>
          </div>
          <AdvanceDonationsInput></AdvanceDonationsInput>
        </div>
        </form>
        </div>
        </div>
        );
      }
   }
}

export default AdvanceDonations;
