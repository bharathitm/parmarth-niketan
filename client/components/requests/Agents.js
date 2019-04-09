import React from 'react';

import {logError, checkError} from '../../utils/helpers';
import {API_URL} from '../../config/config';

import {fetch} from '../../utils/httpUtil';
import moment from 'moment';

export class Agents extends React.Component {

    constructor(props) {
      super(props);

      this.state = {
        error: null,
        isLoaded: false,
        agentItems: [
          {}
        ]
      };
    }

    componentDidMount() {
      
      fetch(API_URL, "requests/4")

        .then((response) => {
          return checkError(response);
        })
        .then((result) => {
            this.setState({
              isLoaded: true,
              agentItems: result
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

      openReservation(gID){
        this.props.updateDashboardHomeStore(gID);
      }


    render() {

      let { isLoaded, agentItems } = this.state;

  if (!isLoaded) {
          return <div><h4>Agents</h4><hr />Loading...</div>;
      } else if (agentItems.length == 0){
          return  (
          <div><h4>Agents</h4><hr /> No new requests! </div>
          );
      } else {
          return (
            <div className="divDashboardWidgets"><h4>Agents</h4>
                <hr />
              
                    <ol>    
                        {agentItems.map(item => (    
                          <li key={Math.random()}>
                                           <b><a onClick={() => this.openReservation(item.guest_id)}>{item.guest_name}</a></b>
                                           - 
                                           {moment(item.date_of_arrival).format('DD MMM, YYYY')}
                                            - 
                                           {item.no_of_people}
                                           <br/> 
                                           {item.reservation_comments}  
                            </li>                              
                      ))}                     
                  </ol>                    
              </div>
            );
          }
        }
      }

      export default Agents;