import React from 'react';

import ErrorBoundary from './ErrorBoundary';

import {Login } from './login'; 
import {Tabs, TabLink, TabContent} from 'react-tabs-redux';
import { Dashboard } from './dashboard/Dashboard';
import { Reservations } from './reservations/Reservations';
import Reports from './reports/Reports';

import Notifications from 'react-notify-toast';


export class Home extends React.Component {

      constructor(props) {
        super(props);

        this.state = {
            validUser: false,
            selectedTab: "Dashboard"
        };

        this.homeStore = {
              validUser: false,
              selectedTab: 'Dashboard',
              searchText:''
        };
  
      this.redirectOnSuccessfulLogin = this.redirectOnSuccessfulLogin.bind(this);
      }

      selectTab = tabName => {
            this.setState({ selectedTab: tabName });
          };

      getHomeStore() {
            return this.homeStore;
      }
        
      updateHomeStore(update) {

            this.homeStore = {
                  ...this.homeStore,
                  ...update,
                  }     

            this.selectTab(this.homeStore.selectedTab);
      }
      

      redirectOnSuccessfulLogin(){
            this.setState({
                  validUser:true
            });        
      }

      logout(){
            window.sessionStorage.removeItem('accessToken');
            window.sessionStorage.removeItem('userName');
            location.reload();
      }

      render() {

            return(
                  <div>
                        <ErrorBoundary>
                              <Notifications />
                              <div style={{ visibility: sessionStorage.getItem('accessToken') != null? 'hidden':'visible', display: sessionStorage.getItem('accessToken') != null? 'none':'inline' }}>
                              <Login  parentMethod={this.redirectOnSuccessfulLogin} getHomeStore={() => (this.getHomeStore())} updateHomeStore={(u) => {this.updateHomeStore(u)}} />
                              </div>
                              <div style={{ visibility: sessionStorage.getItem('accessToken') != null? 'visible':'hidden', display: sessionStorage.getItem('accessToken') != null? 'inline':'none' }}> 
                               <span id="spGreeting">Welcome, <span id="spUserName">{sessionStorage.getItem('userName') != null? sessionStorage.getItem('userName'):''}</span>!&nbsp;
                               <a href="#" onClick={this.logout}>Logout</a>
                               </span> 
                              <div id="divHeaderBand">
                              <div id="divLogoBand">
                                    <img src="./img/logo.png" />
                              </div>
                              </div>

                        <Tabs className="tabs" handleSelect={this.selectTab} selectedTab={this.state.selectedTab}>
                              <div className="tab-links">            
                                    <TabLink to="Dashboard">Dashboard</TabLink>     
                                    <TabLink to="Reservations">Reservations</TabLink>  
                                    <TabLink to="Reports">Reports</TabLink>
                              </div>  
                                    <TabContent for="Dashboard"><h3>Dashboard</h3><Dashboard updateHomeStore={(u) => {this.updateHomeStore(u)}}/></TabContent>
                                    <TabContent for="Reservations"><h3>Reservations</h3><Reservations getHomeStore={() => (this.getHomeStore())} updateHomeStore={(u) => {this.updateHomeStore(u)}}/></TabContent>
                                    <TabContent for="Reports"><h3>Check In Report</h3><Reports/></TabContent> 
                        </Tabs>
                             
                              </div>
                        </ErrorBoundary>
                  </div>
            )
      }
}

export default Home;