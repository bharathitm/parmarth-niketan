import React from 'react';

import {logError, checkError} from '../../utils/helpers';
import {API_URL} from '../../config/config';

import { confirmAlert } from 'react-confirm-alert';

import {fetch, destroy} from '../../utils/httpUtil';
import {notify} from 'react-notify-toast';
import moment from 'moment';

export class General extends React.Component {

    constructor(props) {
      super(props);

      this.state = {
        error: null,
        isLoaded: false,
        generalItems: [
          {}
        ]
      };
    }

    componentDidMount() {
      this.fetchGeneralRequests();
      }

      fetchGeneralRequests(){

        fetch(API_URL, "requests/1")

        .then((response) => {
          return checkError(response);
        })
        .then((result) => {
            this.setState({
              isLoaded: true,
              generalItems: result
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

      openReservation(rID, gID){
        this.props.updateRequestsHomeStore(rID, gID);
      }


      refreshGeneralTab(){
        this.fetchGeneralRequests();
      }

      handleRemove(rId){
        confirmAlert({
          title: 'Confirm to remove',
          message: 'Are you sure you want to remove this reservation request?',
          buttons: [
            {
              label: 'Yes',
              onClick: () => this.removeReqRequest(rId),
            },
            {
              label: 'No',
              onClick: () => false
            }
          ]
        })
        
      }
      
      removeReqRequest(rId){
        destroy(API_URL, "requests/" + rId)
          .then((response) => {
            return checkError(response);
          })
          .then((result) => {  
            notify.show('Reservation request removed successfully!', 'success');     
          })
          .catch((error) => {
            this.setState({
              isLoaded: false,
              error
            });
            notify.show('Oops! Something went wrong! Please try again!', 'error');
            logError(error);
          });
      
          //create a newData array which is a clone of state.items, remove the just selected entries from this newData 
            //and re-assign newData to state.items. This causes the component to re-render.
            var newData = this.state.generalItems;
      
            for (var x=0; x< newData.length; x++){
                if (newData[x].reservation_id == rId){
                newData.splice(x,1);
                }
            }
      
            this.setState({
              generalItems: newData
            });
      }




    render() {

      let { isLoaded, generalItems } = this.state;

  if (!isLoaded) {
          return <div><h4>General</h4><hr />Loading...</div>;
      } else if (generalItems.length == 0){
          return  (
          <div><h4>General</h4><hr /> No new requests! </div>
          );
      } else {
          return (
            <div className="divDashboardWidgets"><h4>General</h4>
                <hr />
              
                    <ol>    
                        {generalItems.map(item => (    
                          <li key={Math.random()}>
                                           <b><a onClick={() => this.openReservation(item.reservation_id, item.guest_id)}>{item.guest_name}</a></b>
                                           {' - '} 
                                           <b className="bRef">{moment(item.date_of_arrival).format('DD MMM, YYYY')} </b>
                                           {' - '} 
                                           {item.no_of_people} {' ppl'}
                                           <img src="./img/delete.png" onClick={() => this.handleRemove(item.reservation_id)}/>
                                           <br/> 
                                           <i>{item.user_comments}</i>
                            </li>                              
                      ))}                     
                  </ol>                    
              </div>
            );
          }
        }
      }

      export default General;