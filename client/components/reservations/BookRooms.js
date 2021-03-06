import React, { Component } from 'react';
import { blocks, floors, roomCategories } from '../../constants/roomAttributes';

import { confirmAlert } from 'react-confirm-alert';

import { fetch, store } from '../../utils/httpUtil';

import moment from 'moment';

import { logError, checkError, getFormattedDate, createRoomsString } from '../../utils/helpers';
import { API_URL } from '../../config/config';

import SearchBox from '../subcomponents/SearchBox';
import { notify } from 'react-notify-toast';

export class BookRooms extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoaded: false,
      isReRender: false,
      error: null,
      items: []
    };

    this.handleBlocksChanged = this.handleBlocksChanged.bind(this);
    this.handleScroll = this.handleScroll.bind(this);
    this.selectWLBlock = this.selectWLBlock.bind(this);
  }

  handleScroll() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
      document.getElementById("btnBackToTop").style.display = "block";
    } else {
      document.getElementById("btnBackToTop").style.display = "none";
    }
  }

  // When the user clicks on the button, scroll to the top of the document
  goToTop() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
    if (this.props.getStore().searchResultItems.length > 0) {
      this.setAllSelectedRooms();
    }
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  setAllSelectedRooms() {
    //rooms
    var selectedRooms = JSON.parse(sessionStorage.getItem('selectedRooms'));

    if ((selectedRooms) && (selectedRooms.length > 0)) {
      for (var cnt = 0; cnt < selectedRooms.length; cnt++) {
        document.getElementById(selectedRooms[cnt]).checked = true;
        this.roomsChanged();
      }
      document.getElementById("next-button").style.visibility = "visible";
    }
  }

  handleSearch() {

    if ((this.props.getStore().arrivalDate == '') || (this.props.getStore().arrivalDate == null)) {
      this.props.updateStore({
        arrivalDate: moment()
      });
    }

    if ((this.props.getStore().departureDate == '') || (this.props.getStore().departureDate == null)) {
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

    //fetch(API_URL, "arooms/4?adate=" + this.props.getStore().arrivalDate + "&ddate=" + this.props.getStore().departureDate + "&nR=" + this.props.getStore().noOfRooms + "&rT=" + this.props.getStore().roomType)
    fetch(API_URL, "arooms/4?adate=" + this.props.getStore().arrivalDate + "&ddate=" + this.props.getStore().departureDate)
      .then((response) => {
        return checkError(response);
      })
      .then((result) => {
        this.props.updateStore({
          searchResultItems: result
        });
        this.setState({
          isLoaded: true
        });
        sessionStorage.setItem("arrivalDate", this.props.getStore().arrivalDate);
        sessionStorage.setItem("departureDate", this.props.getStore().departureDate);
      })
      .catch((error) => {
        this.setState({
          isLoaded: false,
          error
        });
        notify.show(error + 'Oops! Something went wrong! Please try again!', 'error');
        logError(this.constructor.name + " " + error);
      });

    var checkboxes = document.getElementsByClassName("chkAllRooms");
    for (var i = 0; i < checkboxes.length; i++) {
      checkboxes[i].checked = false;
    }

    var checkboxes = document.getElementsByName("chkAllBlockRooms");
    for (var i = 0; i < checkboxes.length; i++) {
      checkboxes[i].checked = false;
    }

    //reset all the totals back to 0
    document.getElementById("spGrandTotal").innerHTML = 0;
    var parentDivForBlockTotal = document.getElementsByClassName("div-block-totals");
    for (var i = 0; i < parentDivForBlockTotal.length; i++) {
      parentDivForBlockTotal[i].firstElementChild.innerHTML = 0;
    }

    //reset all the beds count back to 0
    document.getElementById("spGrandBeds").innerHTML = 0;
    var parentDivForBlockBeds = document.getElementsByClassName("div-block-beds");
    for (var i = 0; i < parentDivForBlockBeds.length; i++) {
      parentDivForBlockBeds[i].firstElementChild.innerHTML = 0;
    }
  }

  //rooms check box click
  roomsChanged() {
    var grandTotal = 0;
    var grandBeds = 0;
    for (var cnt = 0; cnt < this.props.getStore().uniqueBlocks.length; cnt++) {

      var checkboxes = document.getElementsByName(blocks[this.props.getStore().uniqueBlocks[cnt]]);

      var roomTotal = 0;
      var blockTotal = 0;
      var blockName = '';
      var room_no = 0;
      var blockBeds = 0;
      

      var aDate = moment(this.props.getStore().arrivalDate);
      var dDate = moment(this.props.getStore().departureDate);

      for (var i = 0; i < checkboxes.length; i++) {
        if (checkboxes[i].checked) {  

          roomTotal += parseFloat(checkboxes[i].value);
          blockName = checkboxes[i].name;
          room_no = checkboxes[i].id;

          if ((blockName != 'Event Halls') && (blockName != 'Wait List')) {
            blockBeds += parseFloat(checkboxes[i].getAttribute("data-beds"));
          }

          if (dDate.diff(aDate, 'days') != 0) {
            if ((blockName != 'Event Halls') && (blockName != 'Wait List')) {
                blockTotal += (roomTotal * (dDate.diff(aDate, 'days')));
            } else if ((parseInt(room_no) >= 416 && parseInt(room_no) <= 427) || (parseInt(room_no) == 431)|| (parseInt(room_no) == 442)){
                blockTotal += (roomTotal * (dDate.diff(aDate, 'days')));
            } else {
                blockTotal += roomTotal;
            }
          } else {
              blockTotal += roomTotal;
          }
          roomTotal = 0;
        }
      }
      

     

      if (document.getElementById(blocks[this.props.getStore().uniqueBlocks[cnt]]) != null) {
        document.getElementById(blocks[this.props.getStore().uniqueBlocks[cnt]]).innerHTML = blockTotal.toLocaleString('en-IN');
        document.getElementById(blocks[this.props.getStore().uniqueBlocks[cnt]]+ "_beds").innerHTML = blockBeds;
        grandTotal += blockTotal;
        grandBeds += blockBeds;
      }
      //} 

      document.getElementById("spGrandTotal").innerHTML = grandTotal.toLocaleString('en-IN');
      document.getElementById("spGrandBeds").innerHTML = grandBeds;
      sessionStorage.setItem('spGrandBeds', grandBeds);

      // var selectedRooms = this.getAllSelectedRooms();
      // var str_rooms = createRoomsString(selectedRooms);


      var wizardOl = document.getElementsByClassName("progtrckr");
      //if any room selected
      if (grandTotal != 0) {
        wizardOl[0].style.pointerEvents = "auto";
        document.getElementById("next-button").style.visibility = "visible";
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

  getAllSelectedRooms() {
    //rooms
    var selectedRooms = [];
    for (var cnt = 0; cnt < this.props.getStore().uniqueBlocks.length; cnt++) {

      if (blocks[this.props.getStore().uniqueBlocks[cnt]] != 'Wait List'){ // For Wait List, save no. of rooms specified

        var checkboxes = document.getElementsByName(blocks[this.props.getStore().uniqueBlocks[cnt]]);

        if (checkboxes.length > 0) {
          for (var i = 0; i < checkboxes.length; i++) {
            if (checkboxes[i].checked) {
              selectedRooms.push(checkboxes[i].id);

            }
          }
          sessionStorage.setItem('waitingListCnt', "");
        }
      } else {
        if (this.refs.txtWaitingListCnt != undefined){
          if (this.refs.txtWaitingListCnt.value != ""){
            sessionStorage.setItem('waitingListCnt', this.refs.txtWaitingListCnt.value);
            for (var i=0; i < this.refs.txtWaitingListCnt.value; i ++){
                selectedRooms.push(this.refs.txtWaitingListCnt.id); 
            }
          } else {
            sessionStorage.setItem('waitingListCnt', "");
          }
        }

      }
    }
    return selectedRooms;
  }

  storeRoomBookings() {
    var selectedRooms = this.getAllSelectedRooms();
    var str_rooms = createRoomsString(selectedRooms);

    if ((this.props.getStore().reservationId != null) && (selectedRooms.length > 0) && (this.props.getStore().isRequest != 1)) {

      confirmAlert({
        title: 'Add Room Bookings',
        message: 'Are you sure you want to add the selected ' + selectedRooms.length + ' room(s) to the current reservation?',
        buttons: [
          {
            label: 'Yes',
            onClick: () => this.addRoomBookings(str_rooms, document.getElementById("txtReason").value),
          },
          {
            label: 'No',
            onClick: () => false
          }
        ],
        childrenElement: () => <div><br/>Reason: <br/><textarea id="txtReason" className="form-control"></textarea></div>
      })
    }
    else if (selectedRooms.length > 0) {
      sessionStorage.setItem('selectedRooms', JSON.stringify(selectedRooms));
      sessionStorage.setItem('strSelectedRooms', str_rooms);
    }
  }

  addRoomBookings(str_rooms, strReason) {
    const payload = {
      room_ids_str: str_rooms,
      reason_str:  (strReason.toString().trim() != '')? strReason: null,
      user_id: sessionStorage.getItem('userId')
    };

    store(API_URL, "roombookings/" + this.props.getStore().reservationId, JSON.stringify(payload))
      .then((response) => {
        return checkError(response);
      })
      .then((result) => {
        notify.show('Rooms added to the reservation successfully!', 'success');
      })
      .catch((error) => {
        this.setState({
          isLoaded: false,
          error
        });
        notify.show('Oops! Something went wrong! Please try again!', 'error');
        logError(error);
      });

      if (this.props.getStore().isRequest == 1){
        this.props.jumpToStep(1);
      } else {
        this.props.jumpToStep(2);
      }
  }

  handleBlocksChanged() {

    this.props.updateStore({
      filteredBlocks: this.props.getStore().uniqueBlocks
    });

    // block names under Filter
    var checkboxes = document.getElementsByName("chkBlocks");
    var atleastOneChecked = false;

    if (checkboxes.length > 0) {
      var arr = [];
      for (var i = 0; i < checkboxes.length; i++) {

        if (checkboxes[i].checked) {
          arr.push(checkboxes[i].value);
          atleastOneChecked = true;

          this.setState({
            isReRender: true
          }, function () {

            var chkBoxes = document.getElementsByClassName("chkAllRooms");
            for(var i = 0; i < chkBoxes.length; i++)  
            { 
              chkBoxes[i].checked = false;
            }

            var chkBoxes = document.getElementsByName("chkAllBlockRooms");  
            for(var i = 0; i < chkBoxes.length; i++)  
            {  
              chkBoxes[i].checked = false;
            }
            
            //reset all the totals back to 0
            document.getElementById("spGrandTotal").innerHTML = 0;
            var parentDivForBlockTotal = document.getElementsByClassName("div-block-totals");
            for (var i = 0; i < parentDivForBlockTotal.length; i ++){
              parentDivForBlockTotal[i].firstElementChild.innerHTML = 0;
            }

            //reset all the beds back to 0
            document.getElementById("spGrandBeds").innerHTML = 0;
            var parentDivForBlockBeds = document.getElementsByClassName("div-block-beds");
            for (var i = 0; i < parentDivForBlockBeds.length; i ++){
              parentDivForBlockBeds[i].firstElementChild.innerHTML = 0;
            }

          }
          );
        } 
      }
    }
    this.props.updateStore({
      filteredBlocks: arr
    });

    if (!atleastOneChecked) {
      this.setState({
        isReRender: false
      });
    }
  }

  selectBlockRooms() {
    var checkboxes = document.getElementsByName("chkAllBlockRooms");

    for (var i = 0; i < checkboxes.length; i++) {
      var blockName = checkboxes[i].nextElementSibling.innerHTML;
      var roomCheckBoxes = document.getElementsByName(blockName);
      if (checkboxes[i].checked) {
        for (var x = 0; x < roomCheckBoxes.length; x++) {
          roomCheckBoxes[x].checked = true;
        }
      }
      else {
        for (var x = 0; x < roomCheckBoxes.length; x++) {
          roomCheckBoxes[x].checked = false;
        }
      }
      this.roomsChanged();
    }
  }

  selectWLBlock(){

    var wizardOl = document.getElementsByClassName("progtrckr");

      if (this.refs.txtWaitingListCnt != undefined){
        if (this.refs.txtWaitingListCnt.value.toString().trim() != ''){
          document.getElementById("blk_11").checked = true;
          wizardOl[0].style.pointerEvents = "auto";
          document.getElementById("next-button").style.visibility = "visible";
      }
      else {
        document.getElementById("blk_11").checked = false;
        wizardOl[0].style.pointerEvents = "none";
        document.getElementById("next-button").style.visibility = "hidden";
      }
    }
  }

  render() {
    //coming from reservations search in Dashboard, directly load Guest Details page
    if ((this.props.getStore().searchText != null) || 
        (this.props.getStore().searchGuestId != null) || 
        (this.props.getStore().searchReservationId != null)){
      this.props.jumpToStep(1);
    }

    var wizardOl = document.getElementsByClassName("progtrckr");
    //new guest, new reservation
    if ((this.props.getStore().guestId == null) && (this.props.getStore().reservationId == null) && (sessionStorage.getItem('selectedRooms') == null)) {
      if (typeof wizardOl[0] != 'undefined') {
        wizardOl[0].style.pointerEvents = "none";
        document.getElementById("next-button").style.visibility = "hidden";
      }
    } // existing guest, new reservation
    else if ((this.props.getStore().guestId != null) && (this.props.getStore().reservationId == null)) {
      wizardOl[0].style.pointerEvents = "auto";
      document.getElementById("next-button").style.visibility = "visible";
    } // existing guest, existing reservation
    else if ((this.props.getStore().guestId != null) && (this.props.getStore().reservationId != null)) {
      wizardOl[0].style.pointerEvents = "auto";
      document.getElementById("next-button").style.visibility = "visible";
    }

    let { isLoaded, isReRender } = this.state;

    //loads first time and when all filter check boxes are unchecked
    if (!isReRender) {
      this.props.updateStore({
        uniqueBlocks: [],
        uniqueRooms: []
      });

      if (this.props.getStore().searchResultItems.length > 0) {
        //show filter only if search results are available
        this.props.updateStore({
          searchLoaded: true
        });

        //first block insert
        var arrBlocks = [];
        arrBlocks.push(this.props.getStore().searchResultItems[0].block_id);

        var arrRooms = [];
        if ((this.props.getStore().noOfRooms != "null") && (this.props.getStore().noOfRooms != null)) {
          arrRooms = this.props.getStore().searchResultItems.filter(item => item.block_id == this.props.getStore().searchResultItems[0].block_id).slice(0, parseInt(this.props.getStore().noOfRooms))
        } else {
          arrRooms = this.props.getStore().searchResultItems.filter(item => item.block_id == this.props.getStore().searchResultItems[0].block_id);
        }

        var newRoomsArray = [];
        for (var i = 1; i < this.props.getStore().searchResultItems.length; i++) {
          //unique block ids need to be captured in a separate array
          if (this.props.getStore().searchResultItems[i].block_id != this.props.getStore().searchResultItems[i - 1].block_id) {

            arrBlocks.push(this.props.getStore().searchResultItems[i].block_id);

            if ((this.props.getStore().noOfRooms != "null") && (this.props.getStore().noOfRooms != null)) {

              newRoomsArray = this.props.getStore().searchResultItems.filter(item => item.block_id == this.props.getStore().searchResultItems[i].block_id).slice(0, parseInt(this.props.getStore().noOfRooms));
            }
            else {
              newRoomsArray = this.props.getStore().searchResultItems.filter(item => item.block_id == this.props.getStore().searchResultItems[i].block_id);
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
          filteredBlocks: arrBlocks
        });

        var checkboxes = document.getElementsByName("chkBlocks");

        if (checkboxes.length > 0) {
          var arr = [];
          for (var i = 0; i < checkboxes.length; i++) {
            if (checkboxes[i].checked) {
              arr.push(checkboxes[i].value);
            }
          }
          if (arr.length > 0) {
            this.props.updateStore({
              filteredBlocks: arr
            });
          }
        }
      }
      else {
        this.props.updateStore({
          searchLoaded: false
        });
      }
    }
    
    if (isLoaded && this.props.getStore().searchResultItems.length == 0) {
      notify.show('No rooms available for given search criteria!', 'error');
    }
    return (
      <div className="step step3">
        <div className="row">
          <form id="Form" className="form-horizontal">
            <h4>Book Rooms</h4>
            <SearchBox
              getSearchStore={() => (this.props.getStore())}
              updateSearchStore={(u) => { this.props.updateStore(u) }}
              handleBlocksChanged={() => (this.handleBlocksChanged())}
              handleSearch={() => (this.handleSearch())}>
            </SearchBox>
            <button type="button" onClick={() => this.goToTop()} id="btnBackToTop" title="Go to Top">Top</button>
            <div id="divSearchResults">

              <div className="div-block-totals grand-total" style={{ visibility: this.props.getStore().searchResultItems.length > 0 ? 'visible' : 'hidden', display: this.props.getStore().searchResultItems.length > 0 ? 'inline' : 'none' }}>Grand Total &#8377;<span id="spGrandTotal">0</span></div>
              <div className="div-block-totals grand-beds" style={{ visibility: this.props.getStore().searchResultItems.length > 0 ? 'visible' : 'hidden', display: this.props.getStore().searchResultItems.length > 0 ? 'inline' : 'none' }}>Total Beds <span id="spGrandBeds">0</span></div>

              {this.props.getStore().uniqueBlocks.filter(bk => this.props.getStore().filteredBlocks.find(fB => fB == bk)).map(item => (
                <div className="divBlocks">
                  <input type="checkbox" name="chkAllBlockRooms" id={"blk_" + item} onClick={() => this.selectBlockRooms()} />
                  <h4>{blocks[item]}</h4>
                  <span className="spEventHallLegend" style={{ visibility: blocks[item] == 'Event Halls' ? 'visible' : 'hidden', display: blocks[item] == 'Event Halls' ? 'block' : 'none' }}>
                  All Yoga Halls, Samadhi Mandir, Saraswati Garden(2-5 days) are on a per day basis.
                  </span>
                  <span className="div-block-totals">Total &#8377;<span id={blocks[item]}>0</span></span>
                  <span className="div-block-beds">Beds <span id={blocks[item] + "_beds"}>0</span></span>
                  <ul>
                    {this.props.getStore().uniqueRooms.filter(bk => bk.block_id == item).map(booking => (
                      <span>
                      <li style={{ visibility: booking.block_id != 11 ? 'visible' : 'hidden', display: booking.block_id != 11 ? 'block' : 'none' }}>
                        <input type="checkbox" name={blocks[item]} className="chkAllRooms"
                          onClick={() => this.roomsChanged()}
                          id={booking.room_id}
                          data-beds={booking.total_beds}
                          value={booking.room_rent} />
                        <b>{booking.room_no}</b>{", " + 
                          floors[booking.floor_no] + ", " +
                          booking.total_beds + " beds"}
                          {booking.room_category_id != null?
                          (<span className="spEventHallLegend">{" (" + roomCategories[booking.room_category_id] + ")"} </span>): null}
                        <span className="sp-block-total">&#8377;{booking.room_rent.toLocaleString('en-IN') + " "}</span>
                        <span className="spEventHallLegend">  
                          <img alt="Previous Check Out" src="./img/prev_date.png" style={{ 
                            visibility: booking.previous_departure_date != null ? 'visible' : 'hidden', 
                            display: booking.previous_departure_date != null ? 'inline' : 'none',
                            marginBottom: '-0.5em' }} />
                          {booking.previous_departure_date != null? moment(booking.previous_departure_date).format("YYYY-MM-DD") : null}
                        </span>
                        <span className="sp-block-imgs">
                          <img alt="Has AC" src="./img/ac.png" style={{ visibility: booking.has_AC == 1 ? 'visible' : 'hidden', display: booking.has_AC == 1 ? 'inline' : 'none' }} />
                        </span>
                      </li>
                       <span style={{ visibility: booking.block_id == 11 ? 'visible' : 'hidden', display: booking.block_id == 11 ? 'inline' : 'none' }}>
                       <label className="control-label col-md-4">
                          No. of Rooms:
                        </label>
                       <input type="number" ref="txtWaitingListCnt" id={booking.room_id} onChange={() => this.selectWLBlock()} />
                       </span>
                       </span>
                    ))}
                  </ul>
                </div>
              ))}

            </div>
            <div style={{ clear: 'both' }}></div>

          </form>
        </div>
      </div>
    )
  }
}

export default BookRooms;
