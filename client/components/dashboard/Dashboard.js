import React from 'react';

import TodayAvailability from './TodayAvailability';
import CheckIns from './CheckIns';
import CheckOuts from './CheckOuts';
import URooms from './URooms';


export class Dashboard extends React.Component {

    constructor(props) {
      super(props);
    }


    render() {
          return (
            <div>
              <table width="100%">
                <tr>
                  <td>
                  <TodayAvailability /> 
                 </td>
                 </tr>
                 <tr>
                 <td>
                 <CheckIns />
                 </td>
                 <td>
               <CheckOuts /> 
                </td>
                <td>
                <URooms />  
                </td>
                </tr>
                </table>
            </div>
          );
    }
}

export default Dashboard;
