import React from 'react';

import StepZilla from 'react-stepzilla';

import ErrorBoundary from '../ErrorBoundary'

import { GuestContacts } from './GuestContacts';
import { ReservationDetails } from './ReservationDetails';
import { AdvanceDonations } from './AdvanceDonations';
import { Empty } from './Empty';
import { BookRooms } from './BookRooms';

export class Reservations extends React.Component {

    constructor(props) {
      super(props);
      
      this.state = {
        name: null
      };

      this.sampleStore = {
        arrivalDate: '',
        departureDate: '',
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
        noOfPpl: '',
        advanceReminderOn: '',
        comments: '',
        guestId: '',
        guestEmergencyContactId:'',
        reservationId:'',
        advanceAmount: '',
        advanceReceivedOn: '',
        advanceReceiptNo: '',
        savedToCloud: false,
        searchText: ''
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

    loadName(name){
      this.setState({
        name: name
      });
    }

    componentDidMount(){
      //hide Empty component
      var pageLis = document.getElementsByTagName("li");
      pageLis[4].style.visibility = "hidden";
    }

    clearGuestSession(){

      var wizardOl = document.getElementsByClassName("progtrckr");
      wizardOl[0].firstChild.className = "progtrckr-doing";
      wizardOl[0].firstChild.click();

      for(var i = 1; i < wizardOl[0].children.length; i++){
        wizardOl[0].children[i].className = "progtrckr-todo";
      }

      
      this.setState({
        name: null
      });

      this.sampleStore = {
        arrivalDate: '',
        departureDate: '',
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
        noOfPpl: '',
        advanceReminderOn: '',
        comments: '',
        guestId: '',
        guestEmergencyContactId:'',
        reservationId:'',
        advanceAmount: '',
        advanceReceivedOn: '',
        advanceReceiptNo: '',
        savedToCloud: false,
        searchText: ''
      };
    }


    render() {
      if(this.props.getHomeStore().searchText != ''){
        this.sampleStore.searchText = this.props.getHomeStore().searchText;

        this.props.updateHomeStore({
          searchText: ''
        });
      }

        const steps =
        [
            {name: 'Book Rooms', component: <BookRooms getStore={() => (this.getStore())} updateStore={(u) => {this.updateStore(u)}}/>},
            {name: 'Guest', component: <GuestContacts getStore={() => (this.getStore())} loadName={(u) => {this.loadName(u)}} updateStore={(u) => {this.updateStore(u)}}/>},
            {name: 'Reservation', component: <ReservationDetails getStore={() => (this.getStore())} updateStore={(u) => {this.updateStore(u)}}/>},
            {name: 'Advance Donation', component: <AdvanceDonations getStore={() => (this.getStore())} updateStore={(u) => {this.updateStore(u)}}/>},
            {name: 'Empty', component: <Empty/>}
        ]

          return (
            <div className="divError">
            <ErrorBoundary>
            <div className='step-progress'>    

           {this.state.name != null? (<div id="divSelectedGuest"><span>{this.state.name}</span><img src="./img/close.png" onClick={() => this.clearGuestSession()}/></div>):""}

            <StepZilla steps={steps} 
                stepsNavigation={true}
                nextTextOnFinalActionStep={"Save"}
                //startAtStep={window.sessionStorage.getItem('step') ? parseFloat(window.sessionStorage.getItem('step')) : 0}
                startAtStep={0}
                onStepChange={(step) => window.sessionStorage.setItem('step', step)}
            />
            </div>
            </ErrorBoundary>
            </div>
          );
    }
}

export default Reservations;