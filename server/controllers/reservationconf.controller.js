var commonEmailText = require('../emails/common.js');

import { SendEmail } from './reservationemail.controller.js';

var mysql = require('mysql');
var mysqlconfig = require('../mysqlconfig.js');
var pool = mysql.createPool(mysqlconfig);

export function SendConfirmationEmail(name, emailId, dates, noOfRooms, 
        reservationTypeId, sanskaraId, email_comments) {

        var subjectText = 'Welcome to Parmarth Niketan - ' + name + ' - ' + dates;
        var htmlText = 'Namaste Divine Soul ' + name + ' ji,<br/><br/>Jai Gange!<br/><br/>';

        if (parseInt(reservationTypeId) == 3) // sanskara
        {
                switch (parseInt(sanskaraId)){
                        case 1: //Mundan
                                htmlText = ConstructMundanText(htmlText, dates, noOfRooms);
                                AddComments(emailId, htmlText, commonEmailText, email_comments, subjectText);
                                break;   
                        case 2: //Janeo
                                htmlText = ConstructJaneoText(htmlText, dates, noOfRooms);
                                AddComments(emailId, htmlText, commonEmailText, email_comments, subjectText);
                                break; 
                        case 3: // Marriage
                                htmlText = ConstructCommonIntro1(htmlText, dates, noOfRooms);
                                AddComments(emailId, htmlText, commonEmailText, email_comments, subjectText);
                                break;                                    
                        case 4: //Asthi Visarjan
                                htmlText = ConstructAsthiText(htmlText, dates, noOfRooms);
                                AddComments(emailId, htmlText, commonEmailText, email_comments, subjectText);
                                break;    
                        case 5: //Special Pooja
                                htmlText = ConstructPoojaText(htmlText, dates, noOfRooms);
                                AddComments(emailId, htmlText, commonEmailText, email_comments, subjectText);
                                break;                                  
                }
        }
        else if (parseInt(reservationTypeId) == 4){ // travel agent
              
                htmlText += 'We hope everything is wonderful with you and your loved ones.<br/><br/>' + 

                'As part of our efforts to curb the spread of the Coronavirus - and, in support of the Union and State ' + 
                'governments’ containment policies and procedures - we have implemented the following guidelines ' +
                'for all guests visiting Parmarth Niketan. Because we love and respect our beautiful parivar, ' +
                'and care deeply about their health and well-being, there will be no exceptions to these guidelines; ' +
                'we will ask anyone that chooses not to honour them to visit us at another time, and their reservation ' +
                'will be cancelled.  We sincerely thank you for your anticipated cooperation. <br/>' +
                '<ol>' +

                '<li> ' +
                'In order to ensure the health and safety of all of the guests and residents of Parmarth Niketan, ' + 
                'we require a negative-result RT-PCR Covid test dated within 72 hours of your check-in at the Ashram.  ' +
                'This is regardless of your vaccination status, as vaccinations do not prevent infections. ' +
                'You will not be granted accommodation without this test. There are no exceptions. ' +
                '</li> ' +

                '<li> ' +
                'If you develop symptoms before your arrival, please do not come for your planned visit. ' +
                'Traveling while ill - whether Covid-19 or a common cold - can be damaging to your health ' +
                'and to the health of anyone that you come in contact with. So, we humbly request that you ' +
                'stay home if you’re not well. ' +
                '</li> ' +
                '<li> ' +
                'Please ensure that you bring several masks, as well as hand sanitizer, with you. ' +
                'You will need both while visiting with us. ' +
                '</li> ' +
                '<li> ' +
                'Only those people named on the reservation will be admitted into the Ashram and given accommodation. ' +
                'Please do not invite friends, family or acquaintances not named on the reservation to join you inside. ' +
                '</li> ' +
                '<li> ' +
                'Upon arrival, you will be screened for symptoms, both at the gate and in Reception. ' +
                'If you are found to present with symptoms, your reservation will be cancelled and ' +
                'we will humbly ask that you join us at a future date. ' +
                '</li> ' +
                '<li> ' +
                'While at the Ashram, social distancing is required.  A minimum of 6 feet (2 meters) of separation is expected. ' +
                '</li> ' +
                '<li> ' +
                'While at the Ashram, the use of properly-worn (fully covering the mouth and nose) face masks is required ' +
                'anytime that you are out of your room. ' +
                '</li> ' +
                '<li> ' +
                'Please use hand sanitizer and properly wash your hands frequently. ' +
                '</li> ' +
                '<li> ' +
                'Please ensure that you always have your key and proof of ID with you, ' +
                'as they are necessary for access to the Ashram. ' +
                '</li> ' +
                '<li> ' +
                'The Ashram is the home to many older immuno-compromised Sadhus, Saints and Matajis, ' +
                'some of whom have made Parmarth Niketan their home for decades.  We anticipate that you will ' +
                'honour them and their long and beautiful lives - as well as the lives of the entire Ashram family ' +
                'and community - by exercising the utmost caution when you’re around them, and by making choices that ' +
                'will ensure their health and well-being - choices such as wearing masks, washing/sanitizing hands, ' +
                'refraining from risky behaviours, etc.  ' +
                '</li> ' +
                '<li> ' +
                'Any and all objects (food items, souvenir purchases, etc) purchased outside the Ashram will be subject to ' +
                'inspection and sanitization by our guards upon return.  All bags, including purses and totes, ' +
                'will be inspected.  Any items withheld, by mistake or intentionally, will be confiscated and the owner ' +
                'will be asked to reschedule the remainder of their visit. ' +
                '</li> ' +
                '</ol> <br/> ';
                
                htmlText += 'It is wonderful that your clients have chosen Parmarth Niketan Ashram for their stay in Rishikesh.<br/><br/>';
                htmlText += 'This is a <b>tentative</b> confirmation for their stay at Parmarth Niketan Ashram from <b>' + dates + '</b>.<br/><br/>';  
                htmlText += 'As requested, we have reserved <b>' + noOfRooms + ' room(s) </b> for their visit with us. <br/><br/>';

                        htmlText += 'To confirm this reservation, we would require the <b>non-refundable</b> donation to be sent to the below mentioned bank account and also the following information along with a scanned copy of the bank receipt:<br/>';
                        htmlText += '<ol>';
                        htmlText += '<li>Donation Date:</li>';
                        htmlText += '<li>Donation Amount:</li>';
                        htmlText += '<li>Bank Details (Name, Branch):</li>';
                        htmlText += '<li>Mode of Transfer (wire transfer, internet banking or direct deposit):</li>';
                        htmlText += '</ol><br/>';
                        htmlText += '<b>Bank Details</b><ul>';
                        htmlText += '<li>Account Name: <b>SWM Sukhadevanand Trust</b></li>';
                        htmlText += '<li>Account Number: <b>10373187320</b></li>';
                        htmlText += '<li>Bank: <b>State Bank of India, Swargashram Branch, Rishikesh, Distt. Pauri Garhwal, Himalayas, Uttarakhand, India</b></li>';
                        htmlText += '<li>MICR Code: <b>249002004</b></li>';
                        htmlText += '<li>IFSC Code: <b>SBIN0002493</b></li>';
                        htmlText += '<li>CIF No: <b>80288369212</b></li>';
                        htmlText += '</ul><br/>';
                        htmlText += 'Upon receipt of the above details we will <b>confirm this reservation</b>. ';
                        htmlText += "<br/><br/>";
                        AddComments(emailId, htmlText, commonEmailText, email_comments, subjectText);
               //});
        } else if (parseInt(reservationTypeId) == 6){ // kathas
                htmlText += 'We hope everything is wonderful with you and your loved ones.<br/><br/>' + 

                'As part of our efforts to curb the spread of the Coronavirus - and, in support of the Union and State ' + 
                'governments’ containment policies and procedures - we have implemented the following guidelines ' +
                'for all guests visiting Parmarth Niketan. Because we love and respect our beautiful parivar, ' +
                'and care deeply about their health and well-being, there will be no exceptions to these guidelines; ' +
                'we will ask anyone that chooses not to honour them to visit us at another time, and their reservation ' +
                'will be cancelled.  We sincerely thank you for your anticipated cooperation. <br/> ' +
                '<ol>' +

                '<li> ' +
                'In order to ensure the health and safety of all of the guests and residents of Parmarth Niketan, ' + 
                'we require a negative-result RT-PCR Covid test dated within 72 hours of your check-in at the Ashram.  ' +
                'This is regardless of your vaccination status, as vaccinations do not prevent infections. ' +
                'You will not be granted accommodation without this test. There are no exceptions. ' +
                '</li> ' +

                '<li> ' +
                'If you develop symptoms before your arrival, please do not come for your planned visit. ' +
                'Traveling while ill - whether Covid-19 or a common cold - can be damaging to your health ' +
                'and to the health of anyone that you come in contact with. So, we humbly request that you ' +
                'stay home if you’re not well. ' +
                '</li> ' +
                '<li> ' +
                'Please ensure that you bring several masks, as well as hand sanitizer, with you. ' +
                'You will need both while visiting with us. ' +
                '</li> ' +
                '<li> ' +
                'Only those people named on the reservation will be admitted into the Ashram and given accommodation. ' +
                'Please do not invite friends, family or acquaintances not named on the reservation to join you inside. ' +
                '</li> ' +
                '<li> ' +
                'Upon arrival, you will be screened for symptoms, both at the gate and in Reception. ' +
                'If you are found to present with symptoms, your reservation will be cancelled and ' +
                'we will humbly ask that you join us at a future date. ' +
                '</li> ' +
                '<li> ' +
                'While at the Ashram, social distancing is required.  A minimum of 6 feet (2 meters) of separation is expected. ' +
                '</li> ' +
                '<li> ' +
                'While at the Ashram, the use of properly-worn (fully covering the mouth and nose) face masks is required ' +
                'anytime that you are out of your room. ' +
                '</li> ' +
                '<li> ' +
                'Please use hand sanitizer and properly wash your hands frequently. ' +
                '</li> ' +
                '<li> ' +
                'Please ensure that you always have your key and proof of ID with you, ' +
                'as they are necessary for access to the Ashram. ' +
                '</li> ' +
                '<li> ' +
                'The Ashram is the home to many older immuno-compromised Sadhus, Saints and Matajis, ' +
                'some of whom have made Parmarth Niketan their home for decades.  We anticipate that you will ' +
                'honour them and their long and beautiful lives - as well as the lives of the entire Ashram family ' +
                'and community - by exercising the utmost caution when you’re around them, and by making choices that ' +
                'will ensure their health and well-being - choices such as wearing masks, washing/sanitizing hands, ' +
                'refraining from risky behaviours, etc.  ' +
                '</li> ' +
                '<li> ' +
                'Any and all objects (food items, souvenir purchases, etc) purchased outside the Ashram will be subject to ' +
                'inspection and sanitization by our guards upon return.  All bags, including purses and totes, ' +
                'will be inspected.  Any items withheld, by mistake or intentionally, will be confiscated and the owner ' +
                'will be asked to reschedule the remainder of their visit. ' +
                '</li> ' +
                '</ul> <br/>';
                
                htmlText += 'This is a confirmation for your stay at Parmarth Niketan Ashram from <b>' + dates + '</b>.<br/><br/>';
                htmlText += 'As requested, we have reserved <b>' + noOfRooms + ' room(s) </b> for your visit with us.<br/><br/>';
               AddComments(emailId, htmlText, commonEmailText, email_comments, subjectText);
        }
        else { // every thing else
                htmlText = ConstructCommonIntro1(htmlText, dates, noOfRooms);
                AddComments(emailId, htmlText, commonEmailText, email_comments, subjectText);
        }  
}

//     function GetDonationSplitUp(reservationId, _callback){
//             var call_stored_proc = "CALL sp_GetReservationDonationSplitUp('" + reservationId + "')";
          
//             pool.getConnection(function(error, connection) {
//                 if (error) {
//                     errorController.LogError(error);
//                     return res.send(error.code);
//                 } 
        
//                 connection.query(call_stored_proc, true, (error, results, fields) => {
//                         if (results){
//                                 arrSplitUpResults = results[0];
//                                 _callback();
//                                 }
//                         connection.release();
        
//                         if (error) {
//                                 errorController.LogError(error);
//                                 return res.send(error.code);
//                         }
        
//                 });
//             });    
//     }

//  function ConstructSplitUpStr(reservationTypeId){
//             var str = "";
//             if (arrSplitUpResults.length > 0){
//                 str += "<ul>";
//                 for (var i=0; i< arrSplitUpResults.length; i++){
//                         str += "<li>";
//                         if (arrSplitUpResults[i].block_id != "10"){
//                                 str += arrSplitUpResults[i].category_name + ": ";
//                                 str += arrSplitUpResults[i].rooms_cnt + " room(s) (" + arrSplitUpResults[i].total_beds + " beds)";
//                         } else {
//                                 str += arrSplitUpResults[i].room_no + ": "; 
//                         }
                         
//                         str += " @ &#8377; " + arrSplitUpResults[i].room_rent.toLocaleString('en-IN') 
//                                 + ' X ' + arrSplitUpResults[i].noOfDays + " day(s) " 
//                                 + parseFloat(arrSplitUpResults[i].rooms_cnt * arrSplitUpResults[i].noOfDays 
//                                         * arrSplitUpResults[i].room_rent).toLocaleString('en-IN') 
//                                 + "</b>";
                        
//                         str += "</li>";
//                 }
//                 str += "</ul>";

//           ConstructMinDonationChart(str, reservationTypeId);

//           return str;
//     }
// }

// function ConstructMinDonationChart(strSplitUp, reservationTypeId){

//         var str = strSplitUp;

//        // str += "<br/>";
//         str += "The minimum donation chart for <b> accommodation only </b> is as follows:<br/>";
//         str += "<table style='border:solid 1px silver'>";

//         str += "<tr>";
//         str += "<th>Room Type</th>";
//         str += "<th>2-Bed Room</th>";
//         str += "<th>3-Bed Room</th>";
//         str += "<th>4-Bed Room</th>";
//         str += "</tr>";

//         str += "<tr>";
//         str += "<td style='border:solid 1px silver;padding:0.2em;'>Economy Cooler</td>";
//         str += "<td style='border:solid 1px silver;padding:0.2em;'>&#8377; 800/night</td>";              
//         str += "<td style='border:solid 1px silver;padding:0.2em;'>&#8377; 900/night</td>"; 
//         str += "<td style='border:solid 1px silver;padding:0.2em;'>&#8377; 1200/night</td>"; 
//         str += "</tr>";


//         str += "<tr>";
//         str += "<td style='border:solid 1px silver;padding:0.2em;'>Standard Cooler</td>";
//         str += "<td style='border:solid 1px silver;padding:0.2em;'>&#8377; 1200/night</td>";              
//         str += "<td style='border:solid 1px silver;padding:0.2em;'>&#8377; 1800/night</td>"; 
//         str += "<td style='border:solid 1px silver;padding:0.2em;'>&#8377; 2000/night</td>"; 
//         str += "</tr>";

//         str += "<tr>";
//         str += "<td style='border:solid 1px silver;padding:0.2em;'>Standard AC</td>";
//         str += "<td style='border:solid 1px silver;padding:0.2em;'>&#8377; 1600/night</td>";              
//         str += "<td style='border:solid 1px silver;padding:0.2em;'>&#8377; 2100/night</td>"; 
//         str += "<td style='border:solid 1px silver;padding:0.2em;'>&#8377; 2400/night</td>"; 
//         str += "</tr>";

//         str += "<tr>";
//         str += "<td style='border:solid 1px silver;padding:0.2em;'>Deluxe AC</td>";
//         str += "<td style='border:solid 1px silver;padding:0.2em;'>&#8377; 2200/night</td>";              
//         str += "<td style='border:solid 1px silver;padding:0.2em;'>&#8377; 2400/night</td>"; 
//         str += "<td style='border:solid 1px silver;padding:0.2em;'> - </td>";
//         str += "</tr>"; 

//         str += "</table>";
//         str += "<br/>";
        
//         return str;
//     }

   

function ConstructCommonIntro1(commonText, dates, noOfRooms){
       
        commonText += 'We hope everything is wonderful with you and your loved ones.<br/><br/>' + 

        'As part of our efforts to curb the spread of the Coronavirus - and, in support of the Union and State ' + 
        'governments’ containment policies and procedures - we have implemented the following guidelines ' +
        'for all guests visiting Parmarth Niketan. Because we love and respect our beautiful parivar, ' +
        'and care deeply about their health and well-being, there will be no exceptions to these guidelines; ' +
        'we will ask anyone that chooses not to honour them to visit us at another time, and their reservation ' +
        'will be cancelled.  We sincerely thank you for your anticipated cooperation. <br/> ' +
        '<ol>' +

        '<li> ' +
        'In order to ensure the health and safety of all of the guests and residents of Parmarth Niketan, ' + 
        'we require a negative-result RT-PCR Covid test dated within 72 hours of your check-in at the Ashram.  ' +
        'This is regardless of your vaccination status, as vaccinations do not prevent infections. ' +
        'You will not be granted accommodation without this test. There are no exceptions. ' +
        '</li> ' +

        '<li> ' +
        'If you develop symptoms before your arrival, please do not come for your planned visit. ' +
        'Traveling while ill - whether Covid-19 or a common cold - can be damaging to your health ' +
        'and to the health of anyone that you come in contact with. So, we humbly request that you ' +
        'stay home if you’re not well. ' +
        '</li> ' +
        '<li> ' +
        'Please ensure that you bring several masks, as well as hand sanitizer, with you. ' +
        'You will need both while visiting with us. ' +
        '</li> ' +
        '<li> ' +
        'Only those people named on the reservation will be admitted into the Ashram and given accommodation. ' +
        'Please do not invite friends, family or acquaintances not named on the reservation to join you inside. ' +
        '</li> ' +
        '<li> ' +
        'Upon arrival, you will be screened for symptoms, both at the gate and in Reception. ' +
        'If you are found to present with symptoms, your reservation will be cancelled and ' +
        'we will humbly ask that you join us at a future date. ' +
        '</li> ' +
        '<li> ' +
        'While at the Ashram, social distancing is required.  A minimum of 6 feet (2 meters) of separation is expected. ' +
        '</li> ' +
        '<li> ' +
        'While at the Ashram, the use of properly-worn (fully covering the mouth and nose) face masks is required ' +
        'anytime that you are out of your room. ' +
        '</li> ' +
        '<li> ' +
        'Please use hand sanitizer and properly wash your hands frequently. ' +
        '</li> ' +
        '<li> ' +
        'Please ensure that you always have your key and proof of ID with you, ' +
        'as they are necessary for access to the Ashram. ' +
        '</li> ' +
        '<li> ' +
        'The Ashram is the home to many older immuno-compromised Sadhus, Saints and Matajis, ' +
        'some of whom have made Parmarth Niketan their home for decades.  We anticipate that you will ' +
        'honour them and their long and beautiful lives - as well as the lives of the entire Ashram family ' +
        'and community - by exercising the utmost caution when you’re around them, and by making choices that ' +
        'will ensure their health and well-being - choices such as wearing masks, washing/sanitizing hands, ' +
        'refraining from risky behaviours, etc.  ' +
        '</li> ' +
        '<li> ' +
        'Any and all objects (food items, souvenir purchases, etc) purchased outside the Ashram will be subject to ' +
        'inspection and sanitization by our guards upon return.  All bags, including purses and totes, ' +
        'will be inspected.  Any items withheld, by mistake or intentionally, will be confiscated and the owner ' +
        'will be asked to reschedule the remainder of their visit. ' +
        '</li> ' +
        '</ol> <br/> ';

        commonText += 'This is a confirmation for your stay at Parmarth Niketan Ashram from <b>' + dates + '</b>.<br/><br/>';
        commonText += 'As requested, we have reserved <b>' + noOfRooms + ' room(s) </b> for your visit with us. ';
        commonText += 'We’ve noted your preference for the rooms (if any) and will intimate you upon arrival if the exact room(s) ';
        commonText += 'you requested is available. Our guest services representatives will be happy to assist you in meeting your requirements.<br/><br/>';
        return commonText;
}

function ConstructCommonIntro2(commonText, dates, noOfRooms){

        commonText += 'We hope everything is wonderful with you and your loved ones.<br/><br/>' + 

        'As part of our efforts to curb the spread of the Coronavirus - and, in support of the Union and State ' + 
        'governments’ containment policies and procedures - we have implemented the following guidelines ' +
        'for all guests visiting Parmarth Niketan. Because we love and respect our beautiful parivar, ' +
        'and care deeply about their health and well-being, there will be no exceptions to these guidelines; ' +
        'we will ask anyone that chooses not to honour them to visit us at another time, and their reservation ' +
        'will be cancelled.  We sincerely thank you for your anticipated cooperation. <br/> ' +
        '<ol>' +

        '<li> ' +
        'In order to ensure the health and safety of all of the guests and residents of Parmarth Niketan, ' + 
        'we require a negative-result RT-PCR Covid test dated within 72 hours of your check-in at the Ashram.  ' +
        'This is regardless of your vaccination status, as vaccinations do not prevent infections. ' +
        'You will not be granted accommodation without this test. There are no exceptions. ' +
        '</li> ' +
        
        '<li> ' +
        'If you develop symptoms before your arrival, please do not come for your planned visit. ' +
        'Traveling while ill - whether Covid-19 or a common cold - can be damaging to your health ' +
        'and to the health of anyone that you come in contact with. So, we humbly request that you ' +
        'stay home if you’re not well. ' +
        '</li> ' +
        '<li> ' +
        'Please ensure that you bring several masks, as well as hand sanitizer, with you. ' +
        'You will need both while visiting with us. ' +
        '</li> ' +
        '<li> ' +
        'Only those people named on the reservation will be admitted into the Ashram and given accommodation. ' +
        'Please do not invite friends, family or acquaintances not named on the reservation to join you inside. ' +
        '</li> ' +
        '<li> ' +
        'Upon arrival, you will be screened for symptoms, both at the gate and in Reception. ' +
        'If you are found to present with symptoms, your reservation will be cancelled and ' +
        'we will humbly ask that you join us at a future date. ' +
        '</li> ' +
        '<li> ' +
        'While at the Ashram, social distancing is required.  A minimum of 6 feet (2 meters) of separation is expected. ' +
        '</li> ' +
        '<li> ' +
        'While at the Ashram, the use of properly-worn (fully covering the mouth and nose) face masks is required ' +
        'anytime that you are out of your room. ' +
        '</li> ' +
        '<li> ' +
        'Please use hand sanitizer and properly wash your hands frequently. ' +
        '</li> ' +
        '<li> ' +
        'Please ensure that you always have your key and proof of ID with you, ' +
        'as they are necessary for access to the Ashram. ' +
        '</li> ' +
        '<li> ' +
        'The Ashram is the home to many older immuno-compromised Sadhus, Saints and Matajis, ' +
        'some of whom have made Parmarth Niketan their home for decades.  We anticipate that you will ' +
        'honour them and their long and beautiful lives - as well as the lives of the entire Ashram family ' +
        'and community - by exercising the utmost caution when you’re around them, and by making choices that ' +
        'will ensure their health and well-being - choices such as wearing masks, washing/sanitizing hands, ' +
        'refraining from risky behaviours, etc.  ' +
        '</li> ' +
        '<li> ' +
        'Any and all objects (food items, souvenir purchases, etc) purchased outside the Ashram will be subject to ' +
        'inspection and sanitization by our guards upon return.  All bags, including purses and totes, ' +
        'will be inspected.  Any items withheld, by mistake or intentionally, will be confiscated and the owner ' +
        'will be asked to reschedule the remainder of their visit. ' +
        '</li> ' +
        '</ol> <br/> ';
        
        commonText += 'This is a confirmation for your stay at Parmarth Niketan Ashram from <b>' + dates + '</b>.<br/><br/>';  
        commonText += 'As requested, we have reserved <b>' + noOfRooms + ' room(s) </b> for your visit with us. ';
        commonText += 'We’ve noted your preference for the rooms (if any) and will intimate you upon arrival if the exact room(s) ';
        commonText += 'you requested is available. Our guest services representatives will be happy to assist you in meeting your requirements.<br/><br/>';
        return commonText;
}

function ConstructCommonMid1(commonText){
        commonText += 'To honour this auspicious occasion, families like to give a financial donation. Whatever you feel inspired and can comfortably give is greatly appreciated and gratefully accepted. ';
        commonText += 'It is only with the generosity of divine souls that we are able to continue our services to humanity.<br/><br/>';
        commonText += 'If you are interested in performing a Gau Pooja or hosting a Bhandara for the Swamis, Rishikumars and Brahmacharis at the Ashram or ';
        commonText += 'sponsoring clothes for the Rishikumars etc, please discuss with the office reception staff when you are at the Ashram.<br/><br/>';
        commonText += 'Please send us the following Sanskara specific information:<ul>';
        commonText += '<li>Date of Arrival:</li>';
        commonText += '<li>Date of Departure:</li>';
        commonText += '<li>Name of child for Sanskara:</li>';
        commonText += '<li>Date of birth of child for Sanskara:</li>';
        commonText += '<li>Gender (Daughter / Son):</li>';
        commonText += '<li>Child’s Mother’s Name:</li>';
        commonText += '<li>Child’s Father’s Name:</li>';
        commonText += '<li>Contact Email Id:</li>';
        commonText += '<li>Mobile No:</li>';
        commonText += '<li># of adults:</li>';
        commonText += '<li># of children:</li>';
        commonText += '</ul><br/>';  
        return commonText;
}

function ConstructMundanText(mundanText, dates, noOfRooms){
        mundanText = ConstructCommonIntro1(mundanText, dates, noOfRooms);
        mundanText += 'Parmarth Niketan Ashram is humbled to arrange this most important Sanskara, ';
        mundanText += 'sanctified by the power and the presence of the holy Mother Goddess Ganga and the sacred Himalayas, as well as the ';
        mundanText += 'divine energies of the saints, sages and rishis who have performed their meditation and sadhana in this holy land for millenia.';
        mundanText += 'This Chudakarana sanskara / Mundan is said to bring long life to the child free of undesirable traits from past lives ';
        mundanText += 'and stimulates proper growth of the brain and nerves. ';
        mundanText += 'The ceremony will be conducted by a qualified pandit / acharya and Parmarth Gurukul’s Rishikumars. ';
        mundanText += 'The hair will be symbolically offered to Mother Ganga. Your family will also perform sacred Yagna / Havan and divine Ganga Aarti.<br/><br/>';
        mundanText += 'This Mundan ceremony is offered to families as a free service from Parmarth Niketan Ashram. '; 
        mundanText = ConstructCommonMid1(mundanText);
        return mundanText;
}

function ConstructJaneoText(janeoText, dates, noOfRooms){
        janeoText = ConstructCommonIntro1(janeoText, dates, noOfRooms);
        janeoText += 'Parmarth Niketan Ashram is humbled to arrange this most important Sanskara, ';
        janeoText += 'sanctified by the power and the presence of the holy Mother Goddess Ganga and the sacred Himalayas, as well as the ';
        janeoText += 'divine energies of the saints, sages and rishis who have performed their meditation and sadhana in this holy land for millenia.';
        janeoText += 'The Upanayana Sankara marks a new life. The child enters the brahmacharya stage of life – a time of celibacy and complete ';
        janeoText += 'immersion in studies and spiritual growth.  The child is now consciously developing the foundation of life.';
        janeoText += 'This Sanskara ceremony can take place anytime between the ages of 5 – 12 when the child moves into the stage of ';
        janeoText += 'serious study and sadhana.  It is regarded as one of the most important and essential Sanskara, thus can be performed '
        janeoText += 'at anytime the individual ready to move into sadhana.<br/><br/>';
        janeoText += 'This Upanayana Sankara / Janeo is offered to families as a free service from Parmarth Niketan Ashram. '; 
        janeoText = ConstructCommonMid1(janeoText);
        return janeoText;
}

function ConstructAsthiText(asthiText, dates, noOfRooms){
        asthiText += 'We hope this finds you and your loved ones in the best of health, peace and vitality. ';
        asthiText += 'Our condolences are with you and your loved ones at this time of mourning.<br/><br/>';
        asthiText = ConstructCommonIntro2(asthiText, dates, noOfRooms);
        asthiText += 'Parmarth Niketan Ashram is humbled to assist with the Asthi Visarjan pooja and the immersion of the ashes in Mother Ganga. ';
        asthiText += 'The pooja will be conducted by a qualified pandit / acharya and the Parmarth Gurukul’s Rishikumars according to the traditional Vedic rites. ';
        asthiText += 'Parmarth Ashram will provide all the samagri for the pooja. All you need to bring are the ashes and a picture of your beloved.<br/><br/>';
        asthiText += 'This Asthi Visarjan ceremony is offered to families as a free service from Parmarth Niketan Ashram. ';
        asthiText += 'To honour loved ones, families like to give a financial donation. Whatever you feel inspired and can comfortably give is greatly appreciated and gratefully accepted. ';
        asthiText += 'It is only with the generosity of divine souls that we are able to continue our services to humanity.<br/><br/>';
        asthiText += 'If you are interested in performing a Gau Pooja or hosting a Bhandara for the Swamis, Rishikumars and Brahmacharis at the Ashram or ';
        asthiText += 'sponsoring clothes for the Rishikumars etc, please discuss with the office reception staff when you are at the Ashram.<br/><br/>';
        asthiText += 'Please send us the following Sanskara specific information:<ul>';
        asthiText += '<li>Name of the deceased:</li>';
        asthiText += '<li>Date of demise:</li>';
        asthiText += '<li>Birth date of the deceased:</li>';
        asthiText += '<li>Deceased’s relationship to you:</li>';
        asthiText += '</ul><br/>';  
        return asthiText;
}

function ConstructPoojaText(poojaText, dates, noOfRooms){
        poojaText += 'We hope this finds you and your loved ones in the best of health, peace and vitality. ';
        poojaText = ConstructCommonIntro2(poojaText, dates, noOfRooms);
        poojaText += 'Parmarth Niketan Ashram is humbled to assist with the Special pooja. ';
        poojaText += 'The pooja will be conducted by a qualified pandit / acharya and the Parmarth Gurukul’s Rishikumars according to the traditional Vedic rites. ';
        poojaText += 'Parmarth Ashram will provide all the samagri for the pooja.<br/><br/>';
        poojaText += 'This Special pooja is offered to families as a free service from Parmarth Niketan Ashram. ';
        poojaText += 'To honour this occasion, families like to give a financial donation. Whatever you feel inspired and can comfortably give is greatly appreciated and gratefully accepted. ';
        poojaText += 'It is only with the generosity of divine souls that we are able to continue our services to humanity.<br/><br/>';
        poojaText += 'If you are interested in performing a Gau Pooja or hosting a Bhandara for the Swamis, Rishikumars and Brahmacharis at the Ashram or ';
        poojaText += 'sponsoring clothes for the Rishikumars etc, please discuss with the office reception staff when you are at the Ashram.<br/><br/>';
        return poojaText;
}

function AddComments(emailId, emailText, commonEmailText, email_comments, subjectText){

        var htmlText = "";
        htmlText = emailText;
        
        if (email_comments != null){
                htmlText += "<b>Comments from Parmarth Niketan Reservations Team:</b><br/>";
                htmlText += "<i>" + email_comments + "</i>";
                htmlText += "<br/><br/>";
        }
        SendEmail(emailId, subjectText, htmlText + commonEmailText, 1, function (emailResponse){
                //res.send(emailResponse);
        });  
        
}

