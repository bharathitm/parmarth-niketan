import React from 'react';

import {reservationTypes} from '../../constants/roomAttributes';

import {logError, checkError} from '../../utils/helpers';
import {API_URL} from '../../config/config';
import {fetch} from '../../utils/httpUtil';


export class RequestsCount extends React.Component {

    constructor(props) {
      super(props);

      this.state = {
        error: null,
        isLoaded: false,       
      };
    }


  componentDidMount() {
    this.fetchRequestsCount();
    }

    fetchRequestsCount(){
      fetch(API_URL, "requests/")
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
        notify.show('Oops! Something went wrong! Please try again!', 'error');
        logError(this.constructor.name + " " + error);
      });
    }

    refreshRequestsCount(){
      this.fetchRequestsCount();
    }

    render() {
   
      const { isLoaded, items } = this.state;

       if (!isLoaded) {
        return <div><h4>Count</h4><hr />Loading...</div>;
      } else if (items.length == 0){
          return  (
          <div><h4>Count</h4><hr /> No new requests! </div>
          );
      } else {
          return (
            <div><h4>Count</h4><hr />
            <div className="div-table-today">
             <ul>
                 {items.map(item => (
                  <li key={item.reservation_type_id} style={{ visibility: item.reservation_type_id != 5 ? 'visible':'hidden', display: item.reservation_type_id != 5? 'inline':'none' }}>
                    <span className="spCount">{item.cnt}</span><br/>
                   <span className="spNameCount"> {reservationTypes[item.reservation_type_id]} </span>
                  </li>
                ))}
             </ul>
             </div>
            
             </div>
          );
        }
      }
    }

export default RequestsCount;