
import {API_URL} from '../config/config';
import {notify} from 'react-notify-toast';
import moment from 'moment';

export function logError(error) {
    const payload = {
        error_message: error.toString()
    }

    fetch(API_URL + "error/", {
        method: 'POST',
        headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
  
      })
      .then(function(response) {
          return response.json()
      })
}

export function checkError(response) {
    if (response.status == 200) {
        return response.data;
      } 
     else if (response.status == 403){
        this.failedLogin();
     } 
    else {
        throw new Error(response.statusText);
    }
}

export function getFormattedDate(dt) {
    // var date = new Date(dt);
    // var month = date.getMonth() + 1;
    // var day = date.getDate();
    // var year = date.getFullYear();
    // return year + "-" + month + "-" + day ;

    return moment(dt).format('YYYY' + '-'  + 'MM' + '-' + 'DD');
}

export function createReservationsString(selectedReservations){
    //loop through selected reservations and create a | separated string to pass to POST
    var str_reservations = "";
    for (var i =0; i < selectedReservations.length; i++)
    {  
      str_reservations+= selectedReservations[i] + "|";
    }
    str_reservations = str_reservations.substring(0,str_reservations.length-1);
    return str_reservations;
} 

export function createRoomsString(selectedRooms){
    //loop through selected rooms and create a | separated string to pass to POST
    var str_rooms = "";
    for (var i =0; i < selectedRooms.length; i++)
    {  
      str_rooms+= selectedRooms[i] + "|";
    }
    str_rooms = str_rooms.substring(0,str_rooms.length-1);
    return str_rooms;
}

export function failedLogin(){
    sessionStorage.removeItem('accessToken');
    sessionStorage.removeItem('userName');
    
    notify.show("User doesn't have access to portal!", "error");

    setTimeout(this.redirectAgain, 2000);
}

export function redirectAgain(){    
    document.location.href = "https://www.google.com/accounts/Logout?continue=https://appengine.google.com/_ah/logout?continue=" + API_URL.substring(0,(API_URL).length-5);
}