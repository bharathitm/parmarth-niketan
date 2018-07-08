import React from 'react';

import ErrorBoundary from '../ErrorBoundary'

import TodayAvailability from './TodayAvailability';
import CheckIns from './CheckIns';
import CheckOuts from './CheckOuts';
import URooms from './URooms';


export class Dashboard extends React.Component {

    constructor(props) {
      super(props);

      this.state = {
        hasChanged: false
      };

      this.dashboardStore = {
            hasChanged: false
        };
    }

    getDashboardStore(){
        return this.dashboardStore;
    }

    updateDashboardStore(update) {
            this.dashboardStore = {
              ...this.dashboardStore,
              ...update,
            }
          
          this.setState({
            hasChanged: true
          });
    }

    render() {
          return (
            <div className="divError">
            <ErrorBoundary>
            <div>
            <div className = "div-table div-dashboard-table">
                    <div className = "div-table-row">
                          <div className ="div-table-col div-today-availability-col">
                              <TodayAvailability getDashboardStore={() => (this.getDashboardStore())}/> 
                          </div>
                          <br/>
                    </div>
                    <div className = "div-table-row">
                          <div className ="div-table-col div-dashboard-col">
                              <CheckIns />
                          </div>
                          <div className ="div-table-col div-dashboard-col">
                              <CheckOuts  getDashboardStore={() => (this.getDashboardStore())} updateDashboardStore={(u) => {this.updateDashboardStore(u)}}/> 
                          </div>
                          <div className ="div-table-col div-dashboard-col">
                              <URooms getDashboardStore={() => (this.getDashboardStore())} updateDashboardStore={(u) => {this.updateDashboardStore(u)}}/>  
                          </div>
                    </div>
              </div>
            </div>
            </ErrorBoundary>
            </div>
          );
    }
}

export default Dashboard;
