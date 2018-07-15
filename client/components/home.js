import React from 'react';
import ReactDOM from 'react-dom';

import ErrorBoundary from './ErrorBoundary';

import {Login } from './login'; 
import {Tabs, TabLink, TabContent} from 'react-tabs-redux';
import { Dashboard } from './dashboard/Dashboard';
import { Reservations } from './reservations/Reservations';
import Reports from './reports/Reports';


export class Home extends React.Component {

      constructor(props) {
        super(props);

        this.state = {
            validUser: false,
            accessToken:'',
            selectedTab: "Dashboard"
        };

        this.homeStore = {
              validUser: false,
              accessToken: '',
              userName: '',
              userEmailId: '',
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
            document.getElementById("spUserName").innerHTML = this.homeStore.userName;           
      }

      render() {

            return(
                  <div>
                        <ErrorBoundary>
                             
                              {/* <div style={{ visibility: this.state.validUser? 'hidden':'visible', display: this.state.validUser? 'none':'inline' }}>
                              <Login  parentMethod={this.redirectOnSuccessfulLogin} getHomeStore={() => (this.getHomeStore())} updateHomeStore={(u) => {this.updateHomeStore(u)}} />
                              </div>
                              <div style={{ visibility: this.state.validUser? 'visible':'hidden', display: this.state.validUser? 'inline':'none' }} > */}
                              {/* <span id="spGreeting">Welcome, <span id="spUserName"></span>!</span> */}
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
                             
                              {/* </div> */}
                        </ErrorBoundary>
                  </div>
            )
      }
}

export default Home;