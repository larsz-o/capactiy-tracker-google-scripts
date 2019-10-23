var projects = [];
var categories = [];
var index = 0; 
var allProjectHours = 0; 
var totalCount = {}; 

function calculateCategoryHours(){
  totalCount = {};
  for(var i = 0; i < projects.length; i++) {
    for(var j = 0; j < categories.length; j++){
      if(projects[i].category === categories[j]){
        if(totalCount[categories[j]]){
           totalCount[categories[j]] += projects[i].hours; 
           } else {
            totalCount[categories[j]] = projects[i].hours;
           }
        Logger.log(totalCount)
        SpreadsheetApp.getActiveSheet().getRange('Overview!B' +(j+2)).setValue(totalCount[categories[j]]);
        var percent = totalCount[categories[j]]/allProjectHours; 
         SpreadsheetApp.getActiveSheet().getRange('Overview!C' +(j+2)).setValue(percent);
      } 
    }
    
  }
}
function calculateDifference(){
   var actual = SpreadsheetApp.getActiveSheet().getRange('Projects!C2:C200').getValues();
   var estimated =  SpreadsheetApp.getActiveSheet().getRange('Projects!D2:D200').getValues();
  for (var i = 0; i < actual.length; i++){
    if(typeof actual[i][0] === 'number'){
      var difference = estimated[i] - actual[i];
         SpreadsheetApp.getActiveSheet().getRange('Projects!E' + (i+2) ).setValue(difference);
    } else {
    return false; 
    }
  }
}
function calculateProjectHours(){
    for(var i = 0; i < projects.length; i++){
      allProjectHours = allProjectHours + projects[i].hours; 
    }
  
}
function getCategoryNames(){
  var categoryTotals = SpreadsheetApp.getActiveSheet().getRange('Projects!B2:B200').getValues();
  for (var i = 0; i < categoryTotals.length; i++) {
    index = categories.indexOf(categoryTotals[i][0]); 
      if(categoryTotals[i][0] !== '' && index < 0){
        categories.push(categoryTotals[i][0]); 
        for (var j = 0; j < categories.length; j++) {
          SpreadsheetApp.getActiveSheet().getRange('Overview!A' + (j+2)).setValue(categories[j]); 
        }
        
      }
  }

}
function getProjectNames() {
  var sheet = SpreadsheetApp.getActiveSheet().getRange('Projects!A2:B200').getValues();
  for(var i=0; i < sheet.length; i++){
  if(sheet[i][0] !== ''){
    projects.push({project: sheet[i][0], hours: 0, category: sheet[i][1]});
  }
}
}

function sumProjectHours() {
  var sheet = SpreadsheetApp.getActiveSheet().getRange('Project_Log!A2:C200').getValues()
  for (var i = 0; i < sheet.length; i++) {
       
    if(sheet[i][0] !== '' && sheet[i][2] !== ''){
      var project = sheet[i][0];
      var hours = sheet[i][2];
      for (var j = 0; j < projects.length; j++){
        if(project === projects[j].project){
          projects[j].hours = projects[j].hours + hours;
        }
      }
    } 
  }
}
function writeTotals(){
  for(var i = 0; i < projects.length; i++){
    SpreadsheetApp.getActiveSheet().getRange('Projects!C' + (i+2) ).setValue(projects[i].hours);
  }
}

function onEdit(){
  getProjectNames();
  getCategoryNames();
  sumProjectHours();
  calculateProjectHours(); 
  writeTotals();
  calculateDifference(); 
  calculateCategoryHours(); 
}