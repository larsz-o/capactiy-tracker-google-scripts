var people = [];
var detailReports = [];
var datesToAdd = [];
var times = [];
var available = 0;
var subtractions = 0;
var totalHours = 0;
var positiveHours = [];
var negativeHours = [];

function addToSheet(i){
// need to test if all staff were working during that week. count how many unique 'people' had work that week and if any of that work was 'out of office'
    SpreadsheetApp.getActiveSheet().getRange('Dashboard!C' + (i+2)).setValue((available * 40) - subtractions);
    SpreadsheetApp.getActiveSheet().getRange('Dashboard!B' + (i+2)).setValue(totalHours);
    SpreadsheetApp.getActiveSheet().getRange('Dashboard!D' + (i+2)).setValue(totalHours/((available * 40) - subtractions));
}
function checkAvailableHours(datesToAdd){
    // count how many people have hours logged for that date
  available = 0;
    var check = detailReports.filter(function(record){
      if (record.dateTime === datesToAdd){ 
        return record;
      }
    });
  for(var i = 0; i < people.length; i++){
    var person = check.filter(function(record){
      return record.person == people[i].person;
    });
    if(person.length > 0){
      available++;
    }
  }
}
function checkSubtractions(dateToAdd){
  var total = 0;
  for (var i = 0; i < negativeHours.length; i++){
    if(negativeHours[i].dateTime === dateToAdd){
      total = total + negativeHours[i].hours;
    }
  }
  subtractions = total; 
}
function checkTotalHours(dateToAdd){
  totalHours = 0;
  for (var i = 0; i < positiveHours.length; i++){
    if(positiveHours[i].dateTime === dateToAdd){
      if (positiveHours[i].project === 'Out of Office' && positiveHours[i].projects === 'Holiday' && positiveHours[i].projects === 'Personal'){
      } else { 
        totalHours = totalHours + positiveHours[i].hours;
      }
    }
  }
}
function getDetails(){
  for(var i = 0; i < people.length; i++){
    var sheet = SpreadsheetApp.openByUrl(people[i].URL);
    var dates = sheet.getActiveSheet().getRange('Project_Log!B2:B1000').getValues();
    var projects = sheet.getActiveSheet().getRange('Project_Log!A2:A1000').getValues();
    var hours = sheet.getActiveSheet().getRange('Project_Log!C2:C1000').getValues();
    
    for(var j = 0; j < dates.length; j++){
      if(typeof dates[j][0] === 'object'){
        // converts dates to milliseconds so that they can be compared 
        var timeToAdd = dates[j][0].getTime();
        var index = times.indexOf(timeToAdd);
        var currentPerson = people[i].person; 
        if (index < 0){
          times.push(timeToAdd)
           var date = dates[j][0].toString();
          // cuts out extra characters I don't want in my strings
           var smallDate = date.slice(4,16);
          datesToAdd.push({date: smallDate, dateTime: timeToAdd});
        }
        if (projects[j][0] == 'Out of Office' || projects[j][0] == 'Holiday' || projects[j][0] == 'Personal'){
          //detailReports.push({person: currentPerson, dateTime: timeToAdd, date: smallDate, hours: 0, project: projects[j][0]});
          negativeHours.push({hours: hours[j][0], dateTime: timeToAdd,  project: projects[j][0]});
          positiveHours.push({hours: 0, dateTime: timeToAdd, project: projects[j][0]});
          Logger.log('project: ' + projects[j][0] + hours[j][0]);
        }
         else {
         detailReports.push({person: currentPerson, dateTime: timeToAdd, date: smallDate, hours: hours[j][0], project: projects[j][0]});
           positiveHours.push({hours: hours[j][0], dateTime: timeToAdd, project: projects[j][0]});
         }
      }
    }
    }
  }

function getPeople() {
  var sheet = SpreadsheetApp.getActiveSheet().getRange('Reference!A2:B10').getValues();
  for (var i = 0; i < sheet.length; i++){
    if(sheet[i][0].length > 0){
      people.push({person: sheet[i][0], URL: sheet[i][1]});
    }
  }
  Logger.log(people);
}
function populateData(){
  for (var i = 0; i < datesToAdd.length; i++){
    SpreadsheetApp.getActiveSheet().getRange('Dashboard!A' + (i+2)).setValue(datesToAdd[i].date);
    checkAvailableHours(datesToAdd[i].dateTime);
    checkSubtractions(datesToAdd[i].dateTime);
    checkTotalHours(datesToAdd[i].dateTime); 
    addToSheet(i);
  }  
}

function onEdit(){
  getPeople();
  getDetails();
  populateData();
}