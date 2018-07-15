import React, { Component } from 'react';
import blocks from '../../constants/blocks';
import floors from '../../constants/floors';

import moment from 'moment';

import {logError, checkError, getFormattedDate, createRoomsString} from '../../utils/helpers';
import {API_URL} from '../../config/config';

import SearchBox from '../subcomponents/SearchBox';

export class BookRooms extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoaded: false,
      isReRender: false,
      error: null,
      items:[]
    }; 

    this.searchStore = {
      arrivalDate: moment(),
      departureDate: moment(),
      roomType: null,
      noOfRooms: null,
      searchLoaded: false,
      uniqueBlocks: [],
      uniqueRooms: [],
      filteredBlocks: []
    };

    this.handleBlocksChanged = this.handleBlocksChanged.bind(this);
  }

  getSearchStore() {
    return this.searchStore;
  }

  updateSearchStore(update) {
    this.searchStore = {
      ...this.searchStore,
      ...update,
    }
  }

  componentWillMount(){

    if (window.sessionStorage.getItem('searchResults')){
      this.setState({
        isLoaded: true,
        items: JSON.parse(window.sessionStorage.getItem('searchResults')),
      });
      window.sessionStorage.removeItem('searchResults');
    }
  }

  componentDidMount(){
    if (this.state.items.length > 0){
      document.getElementsByClassName("div-book-room-search")[0].style.cssFloat = "left";
      document.getElementById("divSearchResults").style.cssFloat = "none";

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

    for (var cnt=0; cnt < selectedRooms.length; cnt++){
      document.getElementById(selectedRooms[cnt]).checked = true; 
      this.roomsChanged();
    }
    window.sessionStorage.removeItem('selectedRooms');
  }

  handleSearch(){

    document.getElementsByClassName("div-book-room-search")[0].style.cssFloat = "left";
    document.getElementById("divSearchResults").style.cssFloat = "none";

    this.searchStore.uniqueBlocks = [];
    this.searchStore.uniqueRooms = [];

    this.searchStore.arrivalDate = (getFormattedDate(this.searchStore.arrivalDate)).toString();
    this.searchStore.departureDate = (getFormattedDate(this.searchStore.departureDate)).toString();

    const arrivalDate = this.searchStore.arrivalDate;
    const departureDate = this.searchStore.departureDate;

    this.props.updateStore({
      arrivalDate: arrivalDate,
      departureDate: departureDate
    });

    fetch(API_URL + "arooms/?adate=" + arrivalDate + "&ddate=" + departureDate + "&nR=" + this.searchStore.noOfRooms + "&rT=" + this.searchStore.roomType) 
    .then((response) => {
      return checkError(response);
    })
    .then((result) => {
        this.setState({
          isLoaded: true,
          items: result,
        });
      })
      .catch((error) => {
        this.setState({
          isLoaded: false,
          error
        });
        logError(this.constructor.name + " " + error);
      });
  }

    //rooms check box click
    roomsChanged() {  
      var grandTotal = 0;
      for (var cnt=0; cnt < this.searchStore.uniqueBlocks.length; cnt++){

        var checkboxes = document.getElementsByName(blocks[this.searchStore.uniqueBlocks[cnt]]);  

        if (checkboxes.length > 0){
          var blockTotal = 0;
            for(var i = 0; i < checkboxes.length; i++)  
            { 
                if(checkboxes[i].checked) {
                  blockTotal += parseFloat(checkboxes[i].value);
                }
            }

            document.getElementById(blocks[this.searchStore.uniqueBlocks[cnt]]).innerHTML = blockTotal;
            grandTotal += blockTotal
        } 

        document.getElementById("spGrandTotal").innerHTML = grandTotal;
        if (grandTotal != 0){
          document.getElementById("next-button").style.visibility = "visible";
        } else {
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
    for (var cnt=0; cnt < this.searchStore.uniqueBlocks.length; cnt++){

      var checkboxes = document.getElementsByName(blocks[this.searchStore.uniqueBlocks[cnt]]);  

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

    alert(this.props.getStore().reservationId);

    window.sessionStorage.setItem('selectedRooms', JSON.stringify(selectedRooms));
    window.sessionStorage.setItem('strSelectedRooms', str_rooms);
   }

   handleBlocksChanged(){

    this.searchStore.filteredBlocks = [];  

    var checkboxes = document.getElementsByName("chkBlocks"); 
    var atleastOneChecked = false;
      
    if (checkboxes.length > 0){
        for(var i = 0; i < checkboxes.length; i++)  
        { 
            if(checkboxes[i].checked) {
              this.searchStore.filteredBlocks.push(checkboxes[i].value); 
              atleastOneChecked = true;
              this.setState({
                isReRender: true
              });
            }
        }
    }

    if (!atleastOneChecked){
        this.setState({
          isReRender: false
        });
    }
   }


  render() {

    //coming from reservations search in Dashboard, directly load Guest Details page
    if(this.props.getStore().searchText != ''){
      this.props.jumpToStep(1);
    }

    //if no guest details in session, dont allow any other step other than Book Rooms
    if(this.props.getStore().firstName == ''){
      var wizardOl = document.getElementsByClassName("progtrckr");
      if (typeof wizardOl[0] != 'undefined'){
        wizardOl[0].style.pointerEvents = "none";
        document.getElementById("next-button").style.visibility = "hidden";
      }
    } // reverse whatever is done above
    else if (this.props.getStore().firstName != ''){
        var wizardOl = document.getElementsByClassName("progtrckr");
        wizardOl[0].style.pointerEvents = "auto";
        document.getElementById("next-button").style.visibility = "visible";
    }

    let { isLoaded, error, items, isReRender } = this.state;

    //loads first time and when all filter check boxes are unchecked
    if (!isReRender){
        this.searchStore.uniqueBlocks = [];
        if (items.length > 0){
              //show filter only if search results are available
              this.searchStore.searchLoaded = true;

              this.searchStore.uniqueBlocks.push(items[0].block_id); 

              if ((this.searchStore.noOfRooms != "null") && (this.searchStore.noOfRooms != null)){
                this.searchStore.uniqueRooms = items.slice(0, parseInt(this.searchStore.noOfRooms));
              } else {
                this.searchStore.uniqueRooms = items;
              }
                    
              //unique block ids need to be captured in a separate array
              for (var i = 1; i < items.length; i++)
              {
                if (items[i].block_id != items[i-1].block_id)
                {
                    this.searchStore.uniqueBlocks.push(items[i].block_id);

                    if ((this.searchStore.noOfRooms != "null") && (this.searchStore.noOfRooms != null)){
                      var newArray = items.slice(i, (i + parseInt(this.searchStore.noOfRooms)));
                      this.searchStore.uniqueRooms.push(...newArray);
                    } 
                }
              }
              this.searchStore.filteredBlocks = this.searchStore.uniqueBlocks;
          }
          else{
            this.searchStore.searchLoaded = false;
          }
      }

    if ((!isLoaded) && (error)){
      return <div><h4>Book Rooms</h4><hr /><span id="spNoDataorError">{JSON.stringify(error.message)}</span></div>;        
     } else if (!isLoaded) { // default view
        return (
          <div className="step step3">
            <div className="row">
              <form id="Form" className="form-horizontal">          
                    <h4>Book Rooms</h4>        
                    <SearchBox 
                        getSearchStore={() => (this.getSearchStore())} 
                        handleBlocksChanged={() => (this.handleBlocksChanged())}
                        updateSearchStore={(u) => {this.updateSearchStore(u)}} 
                        handleSearch={() => (this.handleSearch())}>
                </SearchBox>
            <div id="divSearchResults">
                Please select search criteria!
            </div> 
              </form>
            </div>
          </div>
        );
    } else if (items.length == 0){
        return  (
          <div className="step step3">
          <div className="row">
            <form id="Form" className="form-horizontal">          
                  <h4>Book Rooms</h4>        
                  <SearchBox 
                      getSearchStore={() => (this.getSearchStore())} 
                      handleBlocksChanged={() => (this.handleBlocksChanged())}
                      updateSearchStore={(u) => {this.updateSearchStore(u)}} 
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
        return (
          <div className="step step3">
            <div className="row">
              <form id="Form" className="form-horizontal">          
                  <h4>Book Rooms</h4>     
                  <SearchBox 
                      getSearchStore={() => (this.getSearchStore())} 
                      handleBlocksChanged={() => (this.handleBlocksChanged())}
                      updateSearchStore={(u) => {this.updateSearchStore(u)}} 
                      handleSearch={() => (this.handleSearch())}>
                  </SearchBox>  
                      <div id="divSearchResults">
                       {/* {this.searchStore.uniqueBlocks.map(item => (   */}

                       {this.searchStore.uniqueBlocks.filter(bk => this.searchStore.filteredBlocks.find( fB => fB == bk)).map(item => (  

                              <div className="divBlocks"> 
                                  <h4>{blocks[item]}</h4> 
                                  <span className="div-block-totals">Total <br/>Rs.<span id={blocks[item]}>0</span></span>
                                      <ul>
                                        {this.searchStore.uniqueRooms.filter(bk => bk.block_id == item).map(booking => (
                                          <li>
                                              <input type="checkbox" name={blocks[item]}
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
