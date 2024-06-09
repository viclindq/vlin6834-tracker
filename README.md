# vlin6834-tracker

## Overview
Music Tracker A3 for DECO2017!

### Version control
This project uses git and github for tracking changes and managing development. 
Please see the github repository here: https://github.com/viclindq/vlin6834-tracker.git

## Features
- Search and add your favorite songs by their name into the tracker  
- Get information about your songs including: (insert here what information the tracker provides)
- Shows the top 5 recent songs you added, as well as a list where you can see all of your favorite songs
- Get a summary of your 

## Setup
1. Get the github repository up, download it and open with VS Code.
2. Install express, npm install express into terminal
3. In order resolve the CORS proxy, please use chrome to https://cors-anywhere.herokuapp.com/ and request temporary access for CORS server This is needed because Deezer doesn't allow any-origin requests.

## Usage
1. Open  http://localhost:8888/  in your chrome browser to start using the application.
2. Once the page is open, you wont see any analysis yet because you have not added any songs to analyse. 
3. Click the "Add New Song" button in your navigation and add 10 songs or more.
4. You Can then see your genre summary in the "Genre Summary" page and see the songs you have added in the "My Favorite Anthems" page.


## Limitations
This application uses "localStorage for data persistence, which is limited to the specific browser and device. If you open the application in a different browser or on a different device, you won't see the same pie count.

## Development
Original High fidelity concept for the UI

## Acknowledgments

### Sources
- API Used: Deezer APi URL=https://developers.deezer.com/api
- 

### AI usage Acknowledgments
This project was initially generated with the help of ChatGPT4 with the following prompts.

- Hi, can you please give me a simple javascript Single page application for tracking how many pies I eat each week.
- Can you please write a readme file for the application.
- Can you please add local storage to the application.
- Can you please update the readme to reflect this change,