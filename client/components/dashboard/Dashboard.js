import React from 'react';

import ErrorBoundary from '../ErrorBoundary'

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
            <div className="divError">
            <ErrorBoundary>
            <div>
              <table width="100%">
              <tbody>
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
                </tbody>
                </table>
            </div>
            </ErrorBoundary>
            </div>
          );
    }
}

export default Dashboard;
