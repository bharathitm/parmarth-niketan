import React from 'react';
import ReactDOM from 'react-dom';

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
            accessToken:''
        };

        this.homeStore = {
              validUser: false,
              accessToken: '',
              userName: '',
              userEmailId: ''
        };
  
      this.redirectOnSuccessfulLogin = this.redirectOnSuccessfulLogin.bind(this);
      }

      getHomeStore() {
            return this.homeStore;
      }
        
      updateHomeStore(update) {
      this.homeStore = {
            ...this.homeStore,
            ...update,
            }
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
                        <div style={{ visibility: this.state.validUser? 'hidden':'visible', display: this.state.validUser? 'none':'inline' }}>
                        <Login  parentMethod={this.redirectOnSuccessfulLogin} getHomeStore={() => (this.getHomeStore())} updateHomeStore={(u) => {this.updateHomeStore(u)}} />
                        </div>
                        <div style={{ visibility: this.state.validUser? 'visible':'hidden', display: this.state.validUser? 'inline':'none' }} >
                        <span id="spGreeting">Welcome, <span id="spUserName"></span>!</span>
                        <Tabs className="tabs" getHomeStore={() => (this.getHomeStore())} updateHomeStore={(u) => {this.updateHomeStore(u)}}>            
                              <TabLink to="Reservations">Reservations</TabLink>
                              {/*<TabLink to="Dashboard">Dashboard</TabLink>
                              <TabLink to="Reports">Reports</TabLink> */}
                                    <hr/>
                  
                              <TabContent for="Reservations"><h3>Add a Reservation</h3><Reservations/></TabContent>
                              {/*  <TabContent for="Dashboard"><h3>Dashboard</h3><Dashboard/></TabContent>
                              <TabContent for="Reports"><h3>Reports</h3><Reports/></TabContent> */}
                        </Tabs>
                        </div>
                  </div>
            )
      }
}

export default Home;

// ReactDOM.render(
            
//        <Tabs class="tabs">
       
//               <TabLink to="Reservations">Reservations</TabLink>
//              {/*<TabLink to="Dashboard">Dashboard</TabLink>
//              <TabLink to="Reports">Reports</TabLink> */}
//                    <hr/>
            
//               <TabContent for="Reservations"><h3>Add a Reservation</h3><Reservations/></TabContent>
//            {/*  <TabContent for="Dashboard"><h3>Dashboard</h3><Dashboard/></TabContent>
//              <TabContent for="Reports"><h3>Reports</h3><Reports/></TabContent> */}
//        </Tabs>,
//         document.getElementById('root')
//   );