import React from 'react';

import StepZilla from 'react-stepzilla';

import ErrorBoundary from '../ErrorBoundary'

import { GuestContacts } from './GuestContacts';
import { EmergencyContacts } from './EmergencyContacts';
import { ReservationDetails } from './ReservationDetails';
import { AdvanceDonations } from './AdvanceDonations';
import { Empty } from './Empty';
import { BookRooms } from './BookRooms';

export class Reservations extends React.Component {

    constructor(props) {
      super(props);
      this.state = {
        guestId: ''
      };

      this.sampleStore = {
        arrivalDate: '2018-06-16',
        departureDate: '2018-06-30',
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
        savedToCloud: false
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

    componentDidMount(){
      //hide Empty component
      var pageLis = document.getElementsByTagName("li");
      pageLis[4].style.visibility = "hidden";
      //pageLis[3].style.visibility = "hidden";

    }


    render() {

        const steps =
        [
            // {name: 'Book Room', component: <BookRooms getStore={() => (this.getStore())} updateStore={(u) => {this.updateStore(u)}}/>},
            {name: 'Guest', component: <GuestContacts getStore={() => (this.getStore())} updateStore={(u) => {this.updateStore(u)}}/>},
            {name: 'Emergency Contact', component: <EmergencyContacts getStore={() => (this.getStore())} updateStore={(u) => {this.updateStore(u)}}/>},
            {name: 'Reservation', component: <ReservationDetails getStore={() => (this.getStore())} updateStore={(u) => {this.updateStore(u)}}/>},
            {name: 'Advance Donation', component: <AdvanceDonations getStore={() => (this.getStore())} updateStore={(u) => {this.updateStore(u)}}/>},
            {name: 'Empty', component: <Empty/>}
        ]

          return (
            <div className="divError">
            <ErrorBoundary>
            <div className='step-progress'>            
            <StepZilla steps={steps} 
              stepsNavigation={true}
              nextTextOnFinalActionStep={"Save"}
              startAtStep={window.sessionStorage.getItem('step') ? parseFloat(window.sessionStorage.getItem('step')) : 0}
              onStepChange={(step) => window.sessionStorage.setItem('step', step)}
            />
            </div>
            </ErrorBoundary>
            </div>
          );
    }
}

export default Reservations;