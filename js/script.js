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
    //Determine the columns that one can edit to add schedule
    var theCurrent=compare_time();
  // Put content in the calendar schedule
     create_calendarContent();
    //Parse content from local stored variable
    var calendarContent=JSON.parse(localStorage.getItem("calendarContent"));
   //console.log("time is " + calendarContent[0].timed);
   //calendarContent[0].textarea=" teh canched";
  // console.log("time is " + calendarContent[0].textarea);
  if (theCurrent === 0){
          // Create a row with past blocks 
          for(ii=9;ii<=17;ii++){
          var projectRowEl = $('<div>').addClass('row').attr("id","row_"+ii);
          var naMe=ii+"AM";
          if (ii>=12) {var naMe=ii+"PM";}  
            //Display Row 
         var namearea=calendarContent[(ii-9)].textarea;
             if (namearea === "No"){
               namearea = "";
              }
         var Colt1 = $('<div>').addClass('col-2 col-md-2 hour').text(naMe);
             Colt2.append(inpuType);
         var Colt2 = $('<div>').addClass('col-8 col-md-8 past').text(namearea);
         //var inpuType=$('<textarea>').addClass('textarea').text(namearea).attr("readonly","readonly");   
          //   Colt2.append(inpuType);
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
     //"Please click on highlighted green block below to add your hourly schedule";
     for(ii=9;ii< theCurrent;ii++){
      var projectRowEl = $('<div>').addClass('row').attr("id","row_"+ii);
      var naMe=ii+"AM";
      if (ii>=12) {var naMe=ii+"PM";}  
      //Check text content
      var namearea=calendarContent[(ii-9)].textarea;
         if (namearea === "No"){
          namearea = "";
         }
      var Colt1 = $('<div>').addClass('col-2 col-md-2 hour').text(naMe);
      var Colt2 = $('<div>').addClass('col-8 col-md-8 past').text(namearea);
     // var inpuType=$('<textarea>').addClass('textarea').text(namearea).attr("readonly","readonly");   
     // Colt2.append(inpuType);  
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
      var namearea=calendarContent[theCurrent-9].textarea;
      if (namearea === "No"){
        namearea = "";
       }
     var Colt1 = $('<div>').addClass('col-2 col-md-2 hour').text(naMe);
     var Colt2 = $('<div>').addClass('col-8 col-md-8 present').text(namearea);
     //var inpuType=$('<textarea>').addClass('textarea').text(namearea).attr("readonly","readonly");   
      //       Colt2.append(inpuType);
     var Colt3 = $('<div>').addClass('col-2 col-md-2 saveBtn');
     var theSpan=$('<span>').addClass('glyphicon-floppy-disk');
     Colt3.append(theSpan);
     projectRowEl.append(
        Colt1,Colt2,Colt3
     );
               //Display the rows content of the section      
               sheduleDisplayEl.append(projectRowEl);
     //Display futures for future time.  Allow update to schedule
     for(ii=(theCurrent+1); ii<=17 ;ii++){
       //Add index to list of indexes
          Colindex.push(ii) ;
      var projectRowEl = $('<div>').addClass('row').attr("id","row_"+ii);
      var naMe=ii+"AM";
      if (ii>=12) {var naMe=ii+"PM";}  
      var namearea=calendarContent[(ii-9)].textarea;
      if (namearea === "No"){
       namearea = "Please click on highlighted  current block to make changes to your hourly schedule";
      }
      var Colt1 = $('<div>').addClass('col-2 col-md-2 hour').text(naMe);
      var Colt2 = $('<div>').addClass('col-8 col-md-8 future');
      var inpuType=$('<textarea>').addClass('textarea').text(namearea).attr("id","text-"+ii).attr('change','editFunction');   
      Colt2.append(inpuType);
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
    colEl.addEventListener('change',editFunction);
  }
}
//Create function to take input from the form on clik of button
function editFunction(event) {
  var toBesaved =[];
  //console.log(event.target);
  var element=event.target; 
  var timeIndex=element.id;
  var dayC =timeIndex.split("-")[1];
   var cIndex="#btn-" +dayC;
   //console.log(dayC);
   //store the changed variable in the input variables
   var inpuText = $(this).val();
   var btnEl = document.querySelector(cIndex);
   //console.log(inpuText);
  // var textE1=document.querySelector(timeIndex);
// Store variables in the Local storage when changed
  var storedC ={   
    timeIndex:dayC,
    dayTex: inpuText
   };
  // console.log(storedC);
//Store content in local Variable
 toBesaved.push(storedC);
 localStorage.setItem("toBesaved",JSON.stringify(toBesaved));
// Add listener to save variables when clicked button
   btnEl.addEventListener('click',saveFunction); 
}

//Create function to take input from the form on clik of button and save it in Storage
function saveFunction(event) {

  // console.log(event.target);
 var toBesaved=JSON.parse(localStorage.getItem("toBesaved"));
  // console.log(toBesaved[0].timeIndex);
  var element=event.target; 
 // var saveClick=element.id;
 // var toBesaved=JSON.parse(localStorage.getItem("toBesaved"));
  //var counT=countC;
 // console.log( toBesaved);
  //Check if id not in Calendar content and put the latest
   //var textAreacontent = element.textContent;;
  //console.log( "Value is "+ textAreacontent);
 /*var storedC ={   
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
   function create_calendarContent(){

    var calendarContent=JSON.parse(localStorage.getItem("calendarContent"));
     if (calendarContent === null){
     calendarContent=[];
  // Assign a holder value to initiliaze content
  var textarea="No"  ;
  for(ii=9;ii<=17;ii++){
           var timeC={
              timed:ii,
              textarea:textarea
           }
          calendarContent.push(timeC);
    } 
    //Store Content in local variable
    localStorage.setItem("calendarContent",JSON.stringify(calendarContent));
   }}
// Display the time;
displayTime();
//Create content to populate Calendar with shedule information
update_calendar ();
future_call();

