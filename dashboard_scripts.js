var people = [];
var datesToAdd = [];
var index = 0; 

function getDates(){
  for(var i = 0; i < people.length; i++){
    var sheet = SpreadsheetApp.openByUrl(people[i].URL)
    var dates = sheet.getActiveSheet().getRange('Project_Log!B2:B100').getValues();
    for(var j = 0; j < dates.length; j++){
      if(typeof dates[j][0] === 'object'){
        index = datesToAdd.indexOf(dates[j][0]);
        if(index > 0){
            datesToAdd.push(dates[j][0]);
        }
      
      }
    }
    }
  }

function getPeople() {
  var sheet = SpreadsheetApp.getActiveSheet().getRange('Reference!A2:B10').getValues();
  Logger.log(sheet); 
  for (var i = 0; i < sheet.length; i++){
    if(sheet[i][0].length > 0){
      people.push({person: sheet[i][0], URL: sheet[i][1]});
    }
  }
}



function onEdit(){
  getPeople();
  getDates();
  Logger.log(datesToAdd)
}