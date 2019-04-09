import React from 'react';

import ErrorBoundary from './ErrorBoundary';

import {Login } from './login'; 
import {Tabs, TabLink, TabContent} from 'react-tabs-redux';
import { Requests } from './requests/Requests';
import { Dashboard } from './dashboard/Dashboard';
import { Rooms } from './Rooms';
import { Reservations } from './reservations/Reservations';
import Reports from './reports/Reports';
import Notifications from 'react-notify-toast';


export class Home extends React.Component {

      constructor(props) {
        super(props);
        this.Requests = React.createRef();
     
        this.state = {
            validUser: false,
            selectedTab: null
        };

        this.homeStore = {
              validUser: false,
              selectedTab: null,
              searchText: null,
              searchGuestId: null,
              searchReservationId: null,
              isRequest: 0,
              refreshRequestTab: null
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

            if (this.homeStore.refreshRequestTab != null){
                  this.Requests.current.refreshRequestTab(this.homeStore.refreshRequestTab);
            }
      }
      

      redirectOnSuccessfulLogin(){

            var selectedTab = "";
            if ((sessionStorage.getItem('roleId') == 1) || (sessionStorage.getItem('roleId') == 2)) {
                  selectedTab = "Requests"
            } else {
                  selectedTab = "Dashboard"
            }

            this.setState({
                  validUser:true,
                  selectedTab: selectedTab
            });   
            
            this.homeStore = {
              selectedTab: selectedTab
        };
            
      }

      redirectToSettings(){
            this.setState({
                  selectedTab:'Settings'
            });   
      }

      logout(){
            sessionStorage.removeItem('accessToken');
            sessionStorage.removeItem('userName');
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
                               <div id="divGreeting"><span id="spGreeting">Welcome, <span id="spUserName">{sessionStorage.getItem('userName') != null? sessionStorage.getItem('userName'):''}</span></span>!&nbsp;
                               <img className="imgHome" src="./img/settings.png"  onClick={() => this.redirectToSettings()} />&nbsp;
                               <img className="imgHome" src="./img/logout.png" onClick={this.logout}/>
                               </div> 
                              <div id="divHeaderBand">
                              <div id="divLogoBand">
                                    <img src="./img/logo.png" />
                              </div>
                              </div> 

                        <Tabs renderActiveTabContentOnly={true} className="tabs" handleSelect={this.selectTab} selectedTab={this.state.selectedTab}>
                              <div className="tab-links">     
                                    <div style={{ visibility: sessionStorage.getItem('roleId') != 3? 'visible':'hidden', display: sessionStorage.getItem('roleId') != 3? 'inline':'none' }}>   
                                          <TabLink to="Requests">Requests</TabLink> 
                                    </div>    
                                    <div style={{ visibility: sessionStorage.getItem('roleId') != 2? 'visible':'hidden', display: sessionStorage.getItem('roleId') != 2? 'inline':'none' }}>    
                                          <TabLink to="Dashboard">Dashboard</TabLink>    
                                    </div>
                                          <TabLink to="Reservations">Reservations</TabLink>  
                                          <TabLink to="Reports">Reports</TabLink>
                              </div>  
                              <div style={{ visibility: sessionStorage.getItem('roleId') != 3? 'visible':'hidden', display: sessionStorage.getItem('roleId') != 3? 'inline':'none' }}>   
                                    <TabContent for="Requests"><h3>Requests</h3><Requests ref={this.Requests} getHomeStore={() => (this.getHomeStore())} updateHomeStore={(u) => {this.updateHomeStore(u)}}/></TabContent>  
                              </div>
                              <div style={{ visibility: sessionStorage.getItem('roleId') != 2? 'visible':'hidden', display: sessionStorage.getItem('roleId') != 2? 'inline':'none' }}>   
                                    <TabContent for="Dashboard"><h3>Dashboard</h3><Dashboard updateHomeStore={(u) => {this.updateHomeStore(u)}}/></TabContent>    
                              </div>
                                    <TabContent for="Reservations"><h3>Reservations</h3><Reservations getHomeStore={() => (this.getHomeStore())} updateHomeStore={(u) => {this.updateHomeStore(u)}}/></TabContent>
                                    <TabContent for="Reports"><h3>Reports</h3><Reports/></TabContent> 
                                    <TabContent for="Settings"><h3>Rooms</h3><Rooms updateHomeStore={(u) => {this.updateHomeStore(u)}}/></TabContent>
                        </Tabs> 
                   </div>   
                             
                        </ErrorBoundary>
                  </div>
            )
      }
}

export default Home;