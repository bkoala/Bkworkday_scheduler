// save reference to important DOM elements
var currentDaydisplay = $('#currentDay');
var sheduleDisplayEl = $('#schedule-content');


// handle displaying the time
function displayTime() {
  var rightNow = moment().format('LLLL');
  let myArr =  rightNow.split(",");
  rightNow=myArr[0] + "," +myArr[1];
  currentDaydisplay.text(rightNow);
}
//Find current time and compare to calendar scheduler
function compare_time(){
  let currentTime=moment().format("HH:mm").split(":");
  var totCurrentime=(currentTime[0] *60)+ currentTime[1];
  totCurrentime=750;
  // 
  for(ii=9;ii<=17;ii++){
    //convert hours to mn
    var timeNow= (ii*60);
    var timeLater=timeNow+60;
    //Compare to current time to find out window of current block
    if ((totCurrentime >=timeNow) && (totCurrentime<timeLater))
    {
      return ii;
    }
  }
  return 0;
}
function compare_time(){
  let currentTime=moment().format("HH:mm").split(":");
  var totCurrentime=(currentTime[0] *60)+ currentTime[1];
  totCurrentime=950;
  for(ii=9;ii<=17;ii++){
    //convert hours to mn
    var timeNow= (ii*60);
    var timeLater=timeNow+60;
    if ((totCurrentime >=timeNow) && (totCurrentime<timeLater))
    {
      return ii;
    }
  }
  return 0;
}
function update_calendar (){
  var theCurrent=compare_time();
  

  if (theCurrent === 0){
          // Create a row with past blocks 
          for(ii=9;ii<=17;ii++){
          var projectRowEl = $('<div>').addClass('row').attr("id","row_"+ii);
          var naMe=ii+"AM";
          if (ii>=12) {var naMe=ii+"PM";}  
            //Display Row 
         var namearea="No schedule";
         var Colt1 = $('<div>').addClass('col-2 col-md-2 hour').text(naMe);
         var Colt2 = $('<div>').addClass('col-8 col-md-8 past').attr("id","text-"+ii).attr("readOnly","readOnly").text(namearea);
         var Colt3 = $('<div>').addClass('col-2 col-md-2 saveBtn');
         var theSpan=$('<span>').addClass('glyphicon-floppy-disk');
             Colt3.append(theSpan);
         projectRowEl.append(
            Colt1,Colt2,Colt3
         );
         //Display the row
            sheduleDisplayEl.append(projectRowEl);
         }  
    } else
    { //Store index for future in ColIndex
      var Colindex=[];
     //Display rows that are past the current time
     for(ii=9;ii< theCurrent;ii++){
      var projectRowEl = $('<div>').addClass('row').attr("id","row_"+ii);
      var naMe=ii+"AM";
      if (ii>=12) {var naMe=ii+"PM";}  
      var namearea="No schedule";
      var Colt1 = $('<div>').addClass('col-2 col-md-2 hour').text(naMe);
      var Colt2 = $('<div>').addClass('col-8 col-md-8 past').attr("id","text-"+ii).attr("readonly","readonly").text(namearea);
      var Colt3 = $('<div>').addClass('col-2 col-md-2 saveBtn');
      var theSpan=$('<span>').addClass('glyphicon-floppy-disk');
      Colt3.append(theSpan);
      projectRowEl.append(
         Colt1,Colt2,Colt3
      );
                //Display the rows content of the section      
                sheduleDisplayEl.append(projectRowEl);
     }
     //Display present Schedule
     var projectRowEl = $('<div>').addClass('row').attr("id","row_"+ii);
      var naMe=theCurrent+"AM";
      if (theCurrent >= 12) {var naMe=theCurrent+"PM";}  
     var namearea="No schedule";
     var Colt1 = $('<div>').addClass('col-2 col-md-2 hour').text(naMe);
     var Colt2 = $('<div>').addClass('col-8 col-md-8 present').attr("id","text-"+ii).attr("readonly","readonly").text(namearea);
     var Colt3 = $('<div>').addClass('col-2 col-md-2 saveBtn');
     var theSpan=$('<span>').addClass('glyphicon-floppy-disk');
     Colt3.append(theSpan);
     projectRowEl.append(
        Colt1,Colt2,Colt3
     );
               //Display the rows content of the section      
               sheduleDisplayEl.append(projectRowEl);
     //Display futures for future time.  Allow update to schedule
     for(ii=(theCurrent+1); ii<18 ;ii++){
       //Add index to list of indexes
          Colindex.push(ii) ;
      var projectRowEl = $('<div>').addClass('row').attr("id","row_"+ii);
      var naMe=ii+"AM";
      if (ii>=12) {var naMe=ii+"PM";}  
      var namearea="No schedule";
      var Colt1 = $('<div>').addClass('col-2 col-md-2 hour').text(naMe);
      var Colt2 = $('<div>').addClass('col-8 col-md-8 future').attr('type','button').attr("id","text-"+ii).text(namearea);
      var Colt3 = $('<div>').addClass('col-2 col-md-2 saveBtn').attr('type','button').attr("id","btn-"+ii);
      var theSpan=$('<span>').addClass('glyphicon glyphicon-floppy-save');
      Colt3.append(theSpan);
      projectRowEl.append(
         Colt1,Colt2,Colt3
      );
          //Display the rows content of the section      
          sheduleDisplayEl.append(projectRowEl);
         
    }
   // console.log(Colindex + " text ");  
   localStorage.setItem("Colindex",JSON.stringify(Colindex));
  }   
}
//Create function to store indexes of futures changes
// Indexes of items to  Display 

function future_call(){
  var Colvalues=JSON.parse(localStorage.getItem("Colindex"));
  //console.log(Colindex + "text ");
  for (xx=0; xx<Colvalues.length ; xx++){
    var colId ="#text-"+Colvalues[xx];
    var colEl =document.querySelector(colId);;
    colEl.addEventListener('click',editFunction);
  }
}
//Create function to take input from the form on clik of button
function editFunction(event) {
 
  //console.log(event.target.textContent);
  var element=event.target; 
  var timeIndex=element.id;
  var dayC =timeIndex.split("-")[1];
  var textAreacontent = element.textContent;
// console.log("Three is" + textAreacontent);
   var cIndex="#btn-" +dayC;
   var btnEl = document.querySelector(cIndex);
   btnEl.addEventListener('click',saveFunction); 
}
//Create function to take input from the form on clik of button and save it in Storage
function saveFunction(event) {

  console.log(event.target);
  
 // console.log("Three is" + textAreacontent);
 /* var element=event.target; 
  var saveClick=element.id;
  var countSave =saveClick.split("-")[1];
  //var counT=countC;
  var timeIndex="#text-" + countSave;
  console.log( timeIndex);
  //Check if id not in Calendar content and put the latest
   var textAreacontent = element.textContent;;
 //console.log( timeIndex);
 var storedC ={   
   timeIndex:timeIndex,
   dayTex: textAreacontent
    };
    console.log(storedC);
 //Store content in local Variable
  calendarContent.push(storedC);
  localStorage.setItem("fixedcalendarContent",JSON.stringify(calendarContent));
 // var StoredCalendar=JSON.parse(localStorage.getItem("calendarContent")); 
 console.log( calendarContent);
 */
   }
   function recordEdit(){
    var timeIndex=JSON.parse(localStorage.getItem("timeIndex")); 
    console.log('indes is '. timeIndex);
    var saveId="text-" +timeIndex;
    var textAreacontent = document.getElementById(saveId).value;
    console.log(" TES is " +textAreacontent);
   }
// Display the time;
displayTime();
update_calendar ();
future_call();

