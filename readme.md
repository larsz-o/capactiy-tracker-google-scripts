# Capacity Tracker
These are some scripts to work with Google Sheets on a team capacity tracker. 

## Functionality 
[x] Each employee has a spreadsheet where they log the work they do each week. They can select a project they're working on, mark down how many hours they spent on it, and leave any notes about what they're doing.
![screenshot of capacity tracker - project log](https://github.com/larsz-o/capactiy-tracker-google-scripts/blob/master/screenshot.png?raw=true)

[x] Employees create a list of projects they are working on in the Projects sheet. Each project has a category that is associated with and an estimated maximum number of hours for that project. In the projects view, employees can see how much time they have remaining for each project. Employees can adjust the estimated time if they need to, but it is recommended to keep any negative hours visible so that they can report any discrepancies in estimation to their supervisors. Any negative hours remaining will turn red in color.
![screenshot of capacity tracker - project view](https://github.com/larsz-o/capactiy-tracker-google-scripts/blob/master/screenshot2.png?raw=true)

[x] Employees can also see an overview of their time allocations in the Overview sheet. 
![screenshot of capacity tracker - project view](https://github.com/larsz-o/capactiy-tracker-google-scripts/blob/master/screenshot3.png?raw=true)

[x]Their supervisor has a list of all employees and the URLs to their spreadsheets. 

[x]The supervisor can see what the total capacity is for their team - how many hours were worked versus how many total hours were available (the number of employees at work * 40, minus any days off for holiday, sick, or personal time). 

## How it works
The supervisor sheet runs a scrip that collects all of data from their employees' sheets, counts how many hours were worked and how many hours were available per time period. From there, it's simple division to figure out what percentage of time is being utilized. 

The app is built using Google Sheets and the Google Scripts API. The language is nearly JavaScript, with some minor differences. 