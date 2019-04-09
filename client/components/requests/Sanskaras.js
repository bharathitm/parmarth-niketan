import React from 'react';

import {logError, checkError} from '../../utils/helpers';
import {API_URL} from '../../config/config';

import {fetch} from '../../utils/httpUtil';
import moment from 'moment';

export class Sanskaras extends React.Component {

    constructor(props) {
      super(props);

      this.state = {
        error: null,
        isLoaded: false,
        sanskaraItems: [
          {}
        ]
      };
    }

    componentDidMount() {
      
      fetch(API_URL, "requests/3")

        .then((response) => {
          return checkError(response);
        })
        .then((result) => {
            this.setState({
              isLoaded: true,
              sanskaraItems: result
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

      let { isLoaded, sanskaraItems } = this.state;

  if (!isLoaded) {
          return <div><h4>Sanskaras</h4><hr />Loading...</div>;
      } else if (sanskaraItems.length == 0){
          return  (
          <div><h4>Sanskaras</h4><hr /> No new requests! </div>
          );
      } else {
          return (
            <div className="divDashboardWidgets"><h4>Sanskaras</h4>
                <hr />
              
                    <ol>    
                        {sanskaraItems.map(item => (    
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

      export default Sanskaras;