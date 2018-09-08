import React from 'react';

import StepZilla from 'react-stepzilla';

import ErrorBoundary from '../ErrorBoundary'

import { BookRooms } from './BookRooms';
import { Guests } from './Guests';
import { ReservationDetails } from './ReservationDetails';
import { Empty } from './Empty';

export class Reservations extends React.Component {

    constructor(props) {
      super(props);
      
      this.state = {
        name: null
      };

      this.sampleStore = {
        arrivalDate: null,
        departureDate: null,
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        pin: '',
        region: '',
        country: '',
        eFirstName: '',
        eLastName: '',
        ePhone: '',
        eRelationship:'',
        arrivalTime: '',
        reservationTypeId: '',
        sanskaraId: '',
        referenceId: '',
        noOfPpl: '',
        advanceReminderOn: '',
        comments: '',
        guestId: null,
        guestEmergencyContactId:'',
        reservationId: null,
        advanceAmount: '',
        advanceReceivedOn: '',
        advanceReceiptNo: '',
        savedToCloud: false,
        searchText: '',
        searchGuestId: null,
        searchLoaded: false,
        searchResultItems: []
      };
    }

    getStore() {
      return this.sampleStore;
    }
  
    updateStore(update) {
      this.sampleStore = {
        ...this.sampleStore,
        ...update,
      }
    }

    getName(){
      return this.state.name;
    }

    loadName(name){
      this.setState({
        name: name
      });
    }

    componentDidMount(){
      //hide Empty component
      var pageLis = document.getElementsByTagName("li");
      if (pageLis.length > 0){
        pageLis[3].style.visibility = "hidden";
      }
    }

    redirectToDashboard() {
      this.clearGuestSession();
      this.props.updateHomeStore({
          selectedTab: 'Dashboard'
        });
    }

    clearGuestSession(){

      var wizardOl = document.getElementsByClassName("progtrckr");
      wizardOl[0].firstChild.className = "progtrckr-doing";
      wizardOl[0].firstChild.click();

      for(var i = 1; i < wizardOl[0].children.length; i++){
        wizardOl[0].children[i].className = "progtrckr-todo";
      }

      window.sessionStorage.removeItem('searchResults');
      window.sessionStorage.removeItem('selectedRooms');
      window.sessionStorage.removeItem('strSelectedRooms');
    
      this.sampleStore = {
        arrivalDate: null,
        departureDate: null,
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        pin: '',
        region: '',
        country: '',
        eFirstName: '',
        eLastName: '',
        ePhone: '',
        eRelationship:'',
        arrivalTime: '',
        reservationTypeId: '',
        reservationStatusId:'',
        sanskaraId: '',
        referenceId: '',
        noOfPpl: '',
        advanceReminderOn: '',
        comments: '',
        guestId: null,
        guestEmergencyContactId:'',
        reservationId:null,
        advanceAmount: '',
        advanceReceivedOn: '',
        advanceReceiptNo: '',
        savedToCloud: false,
        searchText: '',
        searchGuestId: null,
        roomType: null,
        noOfRooms: null,
        searchLoaded: false,
        uniqueBlocks: [],
        uniqueRooms: [],
        filteredBlocks: [],
        searchResultItems: []

      };

      this.setState({
        name: null
      });
    }

    render() {
      if(this.props.getHomeStore().searchText != ''){
        this.sampleStore.searchText = this.props.getHomeStore().searchText;

        this.props.updateHomeStore({
          searchText: ''
        });
      }

      if(this.props.getHomeStore().searchGuestId != null){
        this.sampleStore.searchGuestId = this.props.getHomeStore().searchGuestId;

        this.props.updateHomeStore({
          searchGuestId: null
        });
      }

        const steps =
        [
            {name: 'Book Rooms', component: <BookRooms getStore={() => (this.getStore())} redirectToDashboard={() => (this.redirectToDashboard())} getName={() => (this.getName())} updateStore={(u) => {this.updateStore(u)}}/>},
            {name: 'Guest', component: <Guests getStore={() => (this.getStore())} redirectToDashboard={() => (this.redirectToDashboard())} loadName={(u) => {this.loadName(u)}} updateStore={(u) => {this.updateStore(u)}}/>},
            {name: 'Reservation', component: <ReservationDetails getStore={() => (this.getStore())} redirectToDashboard={() => (this.redirectToDashboard())} updateStore={(u) => {this.updateStore(u)}}/>},
            {name: 'E', component: <Empty/>}
        ]

          return (
            <div className="divError">
            <ErrorBoundary>
            <div className='step-progress'>    

           {this.state.name != null? (<div id="divSelectedGuest"><span>{this.state.name}</span><img src="./img/close.png" onClick={() => this.clearGuestSession()}/></div>):""}

            <StepZilla steps={steps} 
                stepsNavigation={true}
                nextTextOnFinalActionStep={"Save"}
                startAtStep={window.sessionStorage.getItem('step') ? parseFloat(window.sessionStorage.getItem('step')) : 0}
                //startAtStep={0}
                onStepChange={(step) => window.sessionStorage.setItem('step', step)}
            />
            </div>
            </ErrorBoundary>
            </div>
          );
    }
}

export default Reservations;