var projects = [];
var categories = [];
var index = 0; 
var allProjectHours = 0; 

function calculateCategoryHours(){
  for(var i = 0; i < categories.length; i++) {
       var totalCount = 0; 
    for(var j = 0; j < projects.length; j++){
      Logger.log(projects[j].category)
      if(projects[j].category === categories[i]){
        totalCount += projects[j].hours; 
        Logger.log(totalCount); 
        SpreadsheetApp.getActiveSheet().getRange('Projects!H' +(i+2)).setValue(totalCount);
        var percent = totalCount/allProjectHours; 
        Logger.log(percent); 
         SpreadsheetApp.getActiveSheet().getRange('Projects!I' +(i+2)).setValue(percent);
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
      Logger.log('project hours:' + allProjectHours); 
    }
  
}
function getCategoryNames(){
  var categoryTotals = SpreadsheetApp.getActiveSheet().getRange('Projects!B2:B200').getValues();
  for (var i = 0; i < categoryTotals.length; i++) {
    index = categories.indexOf(categoryTotals[i][0]); 
      if(categoryTotals[i][0] !== '' && index < 0){
        categories.push(categoryTotals[i][0]);
        for (var i = 0; i < categories.length; i++) {
          SpreadsheetApp.getActiveSheet().getRange('Projects!G' + (i+2)).setValue(categories[i]); 
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