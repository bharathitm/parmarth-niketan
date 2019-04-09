import React from 'react';

import {logError, checkError} from '../../utils/helpers';
import {API_URL} from '../../config/config';

import {fetch} from '../../utils/httpUtil';
import moment from 'moment';

export class Retreats extends React.Component {

    constructor(props) {
      super(props);

      this.state = {
        error: null,
        isLoaded: false,
        retreatItems: [
          {}
        ]
      };
    }

    componentDidMount() {
      
      fetch(API_URL, "requests/2")

        .then((response) => {
          return checkError(response);
        })
        .then((result) => {
            this.setState({
              isLoaded: true,
              retreatItems: result
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

      let { isLoaded, retreatItems } = this.state;

  if (!isLoaded) {
          return <div><h4>Retreats</h4><hr />Loading...</div>;
      } else if (retreatItems.length == 0){
          return  (
          <div><h4>Retreats</h4><hr /> No new requests! </div>
          );
      } else {
          return (
            <div className="divDashboardWidgets"><h4>Retreats</h4>
                <hr />
              
                    <ol>    
                        {retreatItems.map(item => (    
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

      export default Retreats;