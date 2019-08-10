import React from 'react';

import ErrorBoundary from '../ErrorBoundary'

import RequestsCount from './RequestsCount';
import General from './General';
import Retreats from './Retreats';
import Agents from './Agents';
import Sanskaras from './Sanskaras';


export class Requests extends React.Component {

    constructor(props) {
        super(props);

        this.RequestsCount = React.createRef();
        this.General = React.createRef();
        this.Retreats = React.createRef();
        this.Sanskaras = React.createRef();
        this.Agents = React.createRef();

        this.handleReservationSearch = this.handleReservationSearch.bind(this);
    }

    componentDidMount(){
        if (sessionStorage.getItem('roleId') == 3){
            this.props.updateHomeStore({
                selectedTab: 'Dashboard',
              });
        }
    }

    refreshRequestTab(reservation_type){
        if (reservation_type != null){  
            switch (reservation_type){
                case 1:
                    this.General.current.refreshGeneralTab();
                break;
                case 2:
                    this.Retreats.current.refreshRetreatsTab();
                break;
                case 3:
                    this.Sanskaras.current.refreshSanskarasTab();
                break;
                case 4:
                    this.Agents.current.refreshAgentsTab();
                break;
            }
            this.RequestsCount.current.refreshRequestsCount();
        }
    }

    handleReservationSearch() {
        this.props.updateHomeStore({
            selectedTab: 'Reservations',
            searchText: this.refs.reservationSearch.value
          });
          this.refs.reservationSearch.value = '';
      }

      handleKeyUp(event){
        event.preventDefault();
        if (event.keyCode === 13) {
            document.getElementById("imgSearch").click();
        }
      }

      updateRequestsHomeStore(rID, gID){
        this.props.updateHomeStore({
            selectedTab: 'Reservations',
            searchReservationId: rID,
            searchGuestId: gID,
            isRequest: 1
          });
      }

    
    render() {

        var session_user_privileges = JSON.parse(sessionStorage.getItem('session_user_privileges'));

        if (sessionStorage.getItem('accessToken') != null){
          return (
            <div className="divError">    
            <ErrorBoundary>
            <div>
            <div id="divDashboardReservationSearch" className="divFloatRight">
                    <input
                        ref="reservationSearch"
                        autoComplete="off"
                        placeholder="Search by email id or phone"
                        onKeyUp={(event) => this.handleKeyUp(event)}                         
                        className="form-control email-search" />
                        <div className="button-holder">
                            <img id="imgSearch" src="./img/magnifying_glass.png" onClick={() => this.handleReservationSearch()}/>
                        </div>
              </div>
            <div className = "div-table div-dashboard-table">
                    <div className = "div-table-row">
                          <div className ="div-table-col div-today-availability-col">
                              <RequestsCount ref={this.RequestsCount} /> 
                          </div>
                          <br/>
                    </div>
                    <div className = "div-table-row">

                           <div className ="div-table-col div-dashboard-col" style={{ width: '97.3%', visibility: session_user_privileges.has_general_view != null ? 'visible':'hidden', display: session_user_privileges.has_general_view != null? 'inline':'none' }}>
                              <General ref={this.General} updateRequestsHomeStore={(r, g) => {this.updateRequestsHomeStore(r, g)}}/>
                          </div>
                           {/* <div className ="div-table-col div-dashboard-col" style={{ visibility: session_user_privileges.has_retreat_view != null ? 'visible':'hidden', display: session_user_privileges.has_retreat_view != null? 'inline':'none' }}>
                              <Retreats ref={this.Retreats} updateRequestsHomeStore={(r, g) => {this.updateRequestsHomeStore(r, g)}}/>
                          </div>
                          <div className ="div-table-col div-dashboard-col" style={{ visibility: session_user_privileges.has_sanskara_view != null ? 'visible':'hidden', display: session_user_privileges.has_sanskara_view != null? 'inline':'none' }}>
                              <Agents ref={this.Agents} updateRequestsHomeStore={(r, g) => {this.updateRequestsHomeStore(r, g)}}/>
                          </div> 
                          <div className ="div-table-col div-dashboard-col" style={{ visibility: session_user_privileges.has_agent_view != null ? 'visible':'hidden', display: session_user_privileges.has_agent_view != null? 'inline':'none' }}>
                              <Sanskaras ref={this.Sanskaras} updateRequestsHomeStore={(r, g) => {this.updateRequestsHomeStore(r, g)}}/> 
                          </div>  */}
                    </div>
              </div>
            </div>
            </ErrorBoundary>
            </div>
          );
        }
        else{
            return null;
        }
    }
}

export default Requests;
