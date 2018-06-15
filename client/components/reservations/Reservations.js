import React from 'react';

import MultiStep from 'react-multistep';

import { GuestContacts } from './GuestContacts';
import { EmergencyContacts } from './EmergencyContacts';

export class Reservations extends React.Component {

    constructor(props) {
      super(props);
      this.state = {
        steps: [
            {}
        ],
      };
    }


    render() {
          return (
            <div>
           { this.state.steps = [
              {name: 'StepOne', component: <GuestContacts/>},
              {name: 'StepTwo', component: <EmergencyContacts/>},
              {name: 'StepThree', component: <StepThree/>},
              {name: 'StepFour', component: <StepFour/>}
            ]}
            
            <Multistep showNavigation={true} steps={this.state.steps}/>
            </div>
          );
    }
}

export default Reservations;