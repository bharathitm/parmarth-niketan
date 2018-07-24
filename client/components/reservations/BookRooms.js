import React, {Component } from 'react';
import {blocks, floors } from '../../constants/roomAttributes';

import { confirmAlert } from 'react-confirm-alert'; 

import moment from 'moment';

import {logError, checkError, getFormattedDate, createRoomsString} from '../../utils/helpers';
import {API_URL} from '../../config/config';

import SearchBox from '../subcomponents/SearchBox';
import {notify} from 'react-notify-toast';

export class BookRooms extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoaded: false,
      isReRender: false,
      error: null,
      items:[]
    }; 

    this.handleBlocksChanged = this.handleBlocksChanged.bind(this);
  }

  componentDidMount(){

    if (window.sessionStorage.getItem('searchResults')){
      this.setState({
        isLoaded: true,
        items: JSON.parse(window.sessionStorage.getItem('searchResults')),
      });
      window.sessionStorage.removeItem('searchResults');
    }

    if (this.state.items.length > 0){
      // document.getElementsByClassName("div-book-room-search")[0].style.cssFloat = "left";
      // document.getElementById("divSearchResults").style.cssFloat = "none";

      this.setAllSelectedRooms();
    }
  }


  componentWillUnmount(){
    if (this.state.isLoaded){
      window.sessionStorage.removeItem('searchResults');
      window.sessionStorage.setItem('searchResults', JSON.stringify(this.state.items));
    }
  }

  setAllSelectedRooms(){

    //rooms
    var selectedRooms = JSON.parse(window.sessionStorage.getItem('selectedRooms'));

    if ((selectedRooms) && (selectedRooms.length > 0)){
        for (var cnt=0; cnt < selectedRooms.length; cnt++){
          document.getElementById(selectedRooms[cnt]).checked = true; 
          this.roomsChanged();
        }
        window.sessionStorage.removeItem('selectedRooms');
    }
  }

  handleSearch(){

    // document.getElementsByClassName("div-book-room-search")[0].style.cssFloat = "left";
    // document.getElementById("divSearchResults").style.cssFloat = "none";

    if ((this.props.getStore().arrivalDate == '') || (this.props.getStore().arrivalDate == null)){
      this.props.updateStore({
        arrivalDate: moment()
      });
    }

    if ((this.props.getStore().departureDate == '') || (this.props.getStore().departureDate == null)){
      this.props.updateStore({
        departureDate: moment()
      });
    }

    this.props.updateStore({
      uniqueBlocks: [],
      uniqueRooms: [],
      arrivalDate: (getFormattedDate(this.props.getStore().arrivalDate)).toString(),
      departureDate: (getFormattedDate(this.props.getStore().departureDate)).toString()
    });

    this.setState({
      isReRender: false
    });

    if (typeof this.props.getStore().noOfRooms == 'undefined'){
      this.props.updateStore({
        noOfRooms: null
      });
    }

    if (typeof this.props.getStore().roomType == 'undefined'){
      this.props.updateStore({
        roomType: null
      });
    }

    fetch(API_URL + "arooms/?adate=" + this.props.getStore().arrivalDate + "&ddate=" + this.props.getStore().departureDate + "&nR=" + this.props.getStore().noOfRooms + "&rT=" + this.props.getStore().roomType) 
    .then((response) => {
      return checkError(response);
    })
    .then((result) => {
        this.setState({
          isLoaded: true,
          items: result
        });
      })
      .catch((error) => {
        this.setState({
          isLoaded: false,
          error
        });
        notify.show('Oops! Something went wrong! Please try again!', 'error');
        logError(this.constructor.name + " " + error);
      });

      var checkboxes = document.getElementsByClassName("chkAllRooms");
      if (checkboxes.length > 0){
          for(var i = 0; i < checkboxes.length; i++)  
          { 
              checkboxes[i].checked = false;
          }
        }
  }

    //rooms check box click
    roomsChanged() {  
      var grandTotal = 0;
      for (var cnt=0; cnt < this.props.getStore().uniqueBlocks.length; cnt++){

        var checkboxes = document.getElementsByName(blocks[this.props.getStore().uniqueBlocks[cnt]]);  

        if (checkboxes.length > 0){
          var blockTotal = 0;
            for(var i = 0; i < checkboxes.length; i++)  
            { 
                if(checkboxes[i].checked) {
                  blockTotal += parseFloat(checkboxes[i].value);
                }
            }

            document.getElementById(blocks[this.props.getStore().uniqueBlocks[cnt]]).innerHTML = blockTotal;
            grandTotal += blockTotal
        } 

        document.getElementById("spGrandTotal").innerHTML = grandTotal;
        var wizardOl = document.getElementsByClassName("progtrckr");
        //if any room selected
         if (grandTotal != 0){
           wizardOl[0].style.pointerEvents = "auto";
           document.getElementById("next-button").style.visibility = "visible";
           document.getElementById("next-button").style.marginTop = "-2.6em";
         } else { // no room selected
           wizardOl[0].style.pointerEvents = "none";
           document.getElementById("next-button").style.visibility = "hidden";
         }
      }
    } 

  isValidated() {

    this.storeRoomBookings();
    return true;
  }

  getAllSelectedRooms(){

    //rooms
    var selectedRooms = [];
    for (var cnt=0; cnt < this.props.getStore().uniqueBlocks.length; cnt++){

      var checkboxes = document.getElementsByName(blocks[this.props.getStore().uniqueBlocks[cnt]]);  

      if (checkboxes.length > 0){
          for(var i = 0; i < checkboxes.length; i++)  
          { 
              if(checkboxes[i].checked) {
                selectedRooms.push(checkboxes[i].id); 
              }
          }
      } 
    }
    return selectedRooms;
  }

  storeRoomBookings(){
    var selectedRooms = this.getAllSelectedRooms();
    var str_rooms = createRoomsString(selectedRooms);

    if((this.props.getStore().reservationId != null) && (selectedRooms.length > 0)){

      confirmAlert({
        title: 'Add Room Bookings',
        message: 'Are you sure you want to add these selected rooms to the current reservation?',
        buttons: [
          {
            label: 'Yes',
            onClick: () => this.addRoomBookings(str_rooms),
          },
          {
            label: 'No',
            onClick: () => false
          }
        ]
      })
    }
    else {
      window.sessionStorage.setItem('selectedRooms', JSON.stringify(selectedRooms));
      window.sessionStorage.setItem('strSelectedRooms', str_rooms);
    }
   }

   addRoomBookings(str_rooms){

    const payload = {
      room_ids_str: str_rooms
    };

    fetch(API_URL + "roombookings/" + this.props.getStore().reservationId, {
      method: 'POST',
      headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload)
    })
    .then((response) => {
      return checkError(response);
    })
    .catch((error) => {
      this.setState({
        isLoaded: false,
        error
      });
      notify.show('Oops! Something went wrong! Please try again!', 'error');
      logError(error);
    });

    this.props.jumpToStep(2);

   }

   handleBlocksChanged(){

    this.props.updateStore({
      filteredBlocks: this.props.getStore().uniqueBlocks
    });

    var checkboxes = document.getElementsByName("chkBlocks"); 
    var atleastOneChecked = false;
      
    if (checkboxes.length > 0){
      var arr = [];
        for(var i = 0; i < checkboxes.length; i++)  
        { 
            if(checkboxes[i].checked) {
              arr.push(checkboxes[i].value); 
              atleastOneChecked = true;
              this.setState({
                isReRender: true
              });
            }
        }
        this.props.updateStore({
          filteredBlocks: arr
        });
    }

    if (!atleastOneChecked){
        this.setState({
          isReRender: false
        });
        this.props.updateStore({
          filteredBlocks: this.props.getStore().uniqueBlocks
        });
        //alert(this.props.getStore.filteredBlocks.length + " atleast");
    }
   }


  render() {

    //coming from reservations search in Dashboard, directly load Guest Details page
    if(this.props.getStore().searchText != ''){
      this.props.jumpToStep(1);
    }

    //if no guest details in session, dont allow any other step other than Book Rooms
    // if(this.props.getStore().firstName == ''){
    //   var wizardOl = document.getElementsByClassName("progtrckr");
    //   if (typeof wizardOl[0] != 'undefined'){
    //     wizardOl[0].style.pointerEvents = "none";
    //     alert("hide next button");
    //     document.getElementById("next-button").style.visibility = "hidden";
    //   }
    // } // reverse whatever is done above
    // else if (this.props.getStore().firstName != ''){
    //     var wizardOl = document.getElementsByClassName("progtrckr");
    //     wizardOl[0].style.pointerEvents = "auto";
    //     document.getElementById("next-button").style.visibility = "visible";
    // }

    var wizardOl = document.getElementsByClassName("progtrckr");
    //new guest, new reservation
    if((this.props.getStore().guestId == null) && (this.props.getStore().reservationId == null)){
      if (typeof wizardOl[0] != 'undefined'){
        wizardOl[0].style.pointerEvents = "none";
        document.getElementById("next-button").style.visibility = "hidden";
      }
    } // existing guest, new reservation
    else if ((this.props.getStore().guestId != null) && (this.props.getStore().reservationId == null)){
        wizardOl[0].style.pointerEvents = "auto";
        document.getElementById("next-button").style.visibility = "visible";
        document.getElementById("next-button").style.marginTop = "-2.6em";
    } // existing guest, existing reservation
    else if ((this.props.getStore().guestId != null) && (this.props.getStore().reservationId != null)){
      wizardOl[0].style.pointerEvents = "auto";
      document.getElementById("next-button").style.marginTop = "-2.6em";
      document.getElementById("next-button").style.visibility = "visible";
    }

    let { isLoaded, error, items, isReRender } = this.state;

    //loads first time and when all filter check boxes are unchecked
    if (!isReRender){
         this.props.updateStore({
           uniqueBlocks: [],
           uniqueRooms: []
         });
        
        if (items.length > 0){
          
              //show filter only if search results are available
              this.props.updateStore({
                searchLoaded: true
              });

              //first block insert
              var arrBlocks = [];
              arrBlocks.push(items[0].block_id);

              var arrRooms = [];
              if ((this.props.getStore().noOfRooms != "null") && (this.props.getStore().noOfRooms != null)){
                arrRooms = items.filter(item => item.block_id == items[0].block_id).slice(0, parseInt(this.props.getStore().noOfRooms))
              } else {
                arrRooms = items.filter(item => item.block_id == items[0].block_id);
              }

              var newRoomsArray = [];    
              for (var i = 1; i < items.length; i++)
              {
                //unique block ids need to be captured in a separate array
                if (items[i].block_id != items[i-1].block_id)
                {
                    arrBlocks.push(items[i].block_id);

                    if ((this.props.getStore().noOfRooms != "null") && (this.props.getStore().noOfRooms != null)){
                      
                      newRoomsArray = items.filter(item => item.block_id == items[i].block_id).slice(0, parseInt(this.props.getStore().noOfRooms));                   
                    } 
                    else{
                      newRoomsArray = items.filter(item => item.block_id == items[i].block_id);
                    }
                    arrRooms.push(...newRoomsArray);
                }
              
              }

              this.props.updateStore({
                uniqueBlocks: arrBlocks
              });

              this.props.updateStore({
                uniqueRooms: arrRooms
              });

              this.props.updateStore({
                filteredBlocks:  arrBlocks
              });
              
              var checkboxes = document.getElementsByName("chkBlocks"); 
                
              if (checkboxes.length > 0){
                var arr = [];
                  for(var i = 0; i < checkboxes.length; i++)  
                  { 
                      if(checkboxes[i].checked) {                        
                        arr.push(checkboxes[i].value); 
                      }
                  }
                  this.props.updateStore({
                    filteredBlocks: arr
                  });
              }
          }
          else{
            this.props.updateStore({
              searchLoaded:  false
            });
          }

         // alert(this.props.getStore().filteredBlocks + " before loading");
      }


      if (!isLoaded) { // default view
        return (
          <div className="step step3">
            <div className="row">
              <form id="Form" className="form-horizontal">          
                    <h4>Book Rooms</h4>        
                    <SearchBox 
                          getSearchStore={() => (this.props.getStore())} 
                          updateSearchStore={(u) => {this.props.updateStore(u)}}

                        handleBlocksChanged={() => (this.handleBlocksChanged())}
                        handleSearch={() => (this.handleSearch())}>
                </SearchBox>
            <div id="divSearchResults">
                Please select search criteria!
            </div> 
            <div style={{clear: 'both'}}></div>
              </form>
            </div>
          </div>
        );
    } 
    else if (items.length == 0){
        return  (
          <div className="step step3">
          <div className="row">
            <form id="Form" className="form-horizontal">          
                  <h4>Book Rooms</h4>        
                  <SearchBox 
                      getSearchStore={() => (this.props.getStore())} 
                      updateSearchStore={(u) => {this.props.updateStore(u)}}

                      handleBlocksChanged={() => (this.handleBlocksChanged())}                      
                      handleSearch={() => (this.handleSearch())}>
              </SearchBox>
          <div id="divSearchResults">
              No rooms available for given search criteria!
          </div> 
          <div style={{clear: 'both'}}></div>
            </form>
          </div>
        </div>
        );
    } else {
     // alert(this.props.getStore().filteredBlocks.length);
        return (
          <div className="step step3">
            <div className="row">
              <form id="Form" className="form-horizontal">          
                  <h4>Book Rooms</h4>     
                  <SearchBox 
                        getSearchStore={() => (this.props.getStore())} 
                        updateSearchStore={(u) => {this.props.updateStore(u)}}
                      handleBlocksChanged={() => (this.handleBlocksChanged())}                      
                      handleSearch={() => (this.handleSearch())}>
                  </SearchBox>  
                      <div id="divSearchResults">
  
                       {this.props.getStore().uniqueBlocks.filter(bk => this.props.getStore().filteredBlocks.find( fB => fB == bk)).map(item => (  
                              <div className="divBlocks"> 
                                  <h4>{blocks[item]}</h4> 
                                  <span className="div-block-totals">Total <br/>Rs.<span id={blocks[item]}>0</span></span>
                                      <ul>
                                        {this.props.getStore().uniqueRooms.filter(bk => bk.block_id == item).map(booking => (
                                          <li>
                                              <input type="checkbox" name={blocks[item]} className="chkAllRooms"
                                                    onClick={() => this.roomsChanged()}
                                                    id = {booking.room_id} 
                                                    value={booking.room_rent} />
                                                   <b>{booking.room_no}</b>{", " + 
                                                    floors[booking.floor_no] + ", " + 
                                                    booking.total_beds + " beds" }  
                                                     <span className="sp-block-total">Rs. {booking.room_rent}</span> 
                                                    <span className="sp-block-imgs">  
 
  <img src="./img/ac1.png" style={{ visibility: booking.has_AC == 1? 'visible':'hidden', display: booking.has_AC == 1? 'inline':'none' }} /> 
                                                     </span>  
                                                             
                                          </li>
                                          ))} 
                                        </ul> 
                                </div>                                
                            ))} 
                             <div className="div-block-totals grand-total">Grand Total <br/>Rs.<span id="spGrandTotal">0</span></div>                     
                      </div>
                      <div style={{clear: 'both'}}></div>
                     
              </form>
            </div>
          </div>
        )
      }
    }
}

export default BookRooms;
