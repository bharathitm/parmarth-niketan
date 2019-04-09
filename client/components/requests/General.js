import React from 'react';

import {logError, checkError} from '../../utils/helpers';
import {API_URL} from '../../config/config';

import {fetch} from '../../utils/httpUtil';
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