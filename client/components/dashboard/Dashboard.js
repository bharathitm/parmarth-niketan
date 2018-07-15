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
            hasCheckOutsChanged: false,
            hasURoomsChanged: false
        };

        this.handleReservationSearch = this.handleReservationSearch.bind(this);
    }

    getDashboardStore(){
        return this.dashboardStore;
    }

    updateDashboardStore(update) {
            this.dashboardStore = {
              ...this.dashboardStore,
              ...update,
            }

            if ((this.dashboardStore.hasCheckOutsChanged == true) || (this.dashboardStore.hasURoomsChanged == true)){
                this.setState({
                    hasChanged: true
                });
            }
    }

    handleReservationSearch() {
        this.props.updateHomeStore({
            selectedTab: 'Reservations',
            searchText: this.refs.reservationSearch.value
          });
      }

    
    render() {
          return (
            <div className="divError">    
            <ErrorBoundary>
            <div>
            <div id="divDashboardReservationSearch" className="divFloatRight">
                    <input
                        ref="reservationSearch"
                        autoComplete="off"
                        placeholder="Search by email id or phone"
                        className="form-control email-search" />
                        <div className="button-holder">
                            <img src="./img/magnifying_glass.png" onClick={() => this.handleReservationSearch()}/>
                        </div>
              </div>
            <div className = "div-table div-dashboard-table">
                    <div className = "div-table-row">
                          <div className ="div-table-col div-today-availability-col">
                              <TodayAvailability getDashboardStore={() => (this.getDashboardStore())} updateDashboardStore={(u) => {this.updateDashboardStore(u)}}/> 
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
