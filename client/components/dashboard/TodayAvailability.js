import React from 'react';

import blocks from '../../constants/blocks';

import {logError, checkError} from '../../utils/helpers';
import {API_URL} from '../../config/config';

export class TodayAvailability extends React.Component {

    constructor(props) {
      super(props);

      this.state = {
        error: null,
        isLoaded: false,       
      };
    }


  componentDidMount() {
    
    fetch(API_URL + "arooms/")
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

    render() {
      const { isLoaded, error, items } = this.state;

      if ((!isLoaded) && (error)){
        return <div><h4>Today's Availability</h4><hr /><span id="spNoDataorError">{JSON.stringify(error.message)}</span></div>;        
       } else if (!isLoaded) {
        return <div><h4>Today's Availability</h4><hr />Loading...</div>;
      } else if (items.length == 0){
          return  (
          <div><h4>Today's Availability</h4><hr /> No rooms! </div>
          );
      } else {
          return (
            <div><h4>Today's Availability</h4><hr />
             <ul>
                 {items.map(item => (
                  <li key={item.block_id}>
                    <a href="#">
                      {item.count} <br/>
                    {blocks[item.block_id]} 
                    
                    </a>
                  </li>
                ))}
             </ul>
             </div>
          );
        }
      }
    }

export default TodayAvailability;