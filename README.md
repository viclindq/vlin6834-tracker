# Music Tracker A3 for DECO2017

## Overview
**Music Tracker A3** is a web application designed to help you track and manage your favorite songs. With features like song search, detailed song information, genre summary, and more, it provides a comprehensive solution for music enthusiasts.

### Version control
This project uses git and GitHub for tracking changes and managing development. 
Please see the GitHub repository [https://github.com/viclindq/vlin6834-tracker.git].

## Features
- **Search and Add Songs:** Easily search for your favorite songs by their name and add them to your tracker.
- **Song Information:** Get detailed information about each song, including artist, genre, release date, duration, and more.
- **Recent Songs:** View the top 5 recent songs you added and access a full list of your favorite anthems.
- **Genre Summary:** Get a summary of your genre information based on the songs you've added.
- **Statistics:** Track average song length, number of genres, and average year of releases of your songs.
- **Top Genres:** See the top three genres you listen to the most.
- **Delete Songs:** Remove existing songs from the visual list and browser storage.

## Setup
1. Clone the GitHub repository and open it with VS Code.
2. Install Express by running `npm install express` in the terminal.
3. Resolve the CORS proxy by visiting [https://cors-anywhere.herokuapp.com/](https://cors-anywhere.herokuapp.com/) in Chrome and request temporary access for CORS server. This is required because Deezer doesn't allow any-origin requests.

## Usage
1. Open [http://localhost:8888/](http://localhost:8888/) in your Chrome browser to start using the application.
2. Upon opening the page, you won't see any analysis until you've added songs.
3. Click the **"Add New Song"** button in the navigation and add at least 10 songs.
4. Visit the **"Genre Summary"** page to see your genre summary and the **"My Favorite Anthems"** page to view the songs you've added.

## Limitations
- **Local Storage:** This application uses local storage for data persistence, limited to the specific browser and device.
- **Song Selection:** Users can't select the song they're looking for; the application only displays the top recommendation.
- **Delete Function:** Despite attempts to implement the delete function, it didn't work due to technical constraints. The code snippet for the delete function is provided below.


## Development
Insert development here - talk about the different iterations I had and the entire process of coding the tracker

- Explain what deezer is and why I used it. Explain how I tried to use the spotify API but it required the users ID and secret and login authentication, so it would be unsafe for me to share my secret to make the API run for public use. 
- Then xplain how I had to use two API libraries, first utilising the Deezer search API and using the id from the search api, I used the albums Deezer API so get the information about the genre, and the album release date to get my averages. Show my code snipets and development here. 
- 


## Recommendations for Further Improvements or Extensions

### User Authentication and Authorization
If I could implement changes to the Music Tracker in the future, the code would benefit from the addition of user authentication and authorization functionality. This would allow users to create accounts, log in securely, and access personalized features such as saving favorite songs or playlists.

### Social Sharing and Integration
In the future, the Music Tracker could benefit from the integration of social sharing features. This would enable users to share their favorite songs, playlists, or genre summaries with friends and followers on social media platforms such as Facebook, Twitter, and Instagram.

### Advanced Analytics and Insights
To provide users with deeper insights into their music preferences and listening habits, I would enhance the analytics and insights capabilities of the Music Tracker. This could involve implementing data visualization tools, algorithms, and personalized recommendations to generate curated playlists and personalized music suggestions.

### Mobile Responsiveness and Progressive Web App 
To ensure seamless performance and usability across a variety of devices, I would optimize the Music Tracker for mobile devices and create a progressive web app. This would involve implementing responsive design principles, offline capabilities, and push notifications to enhance the mobile user experience.

### Integration with Music Streaming APIs
To expand the range of available songs and provide users with access to a wider selection of music content, I would explore integration with other music streaming APIs such as Spotify, Apple Music, or YouTube Music. This would enhance the Music Tracker's catalog and improve the overall user experience.

### Community Features and Collaboration
To foster interaction and collaboration among users, I would introduce community features such as user profiles, comments, ratings, and collaborative playlists. This would enable users to discover new music, connect with like-minded individuals, and share their musical experiences within the Music Tracker platform.

### Machine Learning and Personalization
In the future, the Music Tracker could benefit from the implementation of machine learning algorithms and techniques to create personalized music recommendations. This would tailor the user experience based on individual preferences and behavior patterns, enhancing user engagement and satisfaction.

### Gamification and Engagement
To enhance user engagement and encourage active participation within the Music Tracker platform, I would incorporate gamification elements such as achievements, badges, leaderboards, and challenges. This would incentivize exploration, discovery, and interaction among users, making the Music Tracker more engaging and enjoyable to use.




## Acknowledgments
- Used Bootstrap, Node.js, express, tried using sass but ended up deleting it after. 


### Sources
- API Used: Deezer API URL=https://developers.deezer.com/api 
- Single Page Architecure video that I followed URL: https://www.youtube.com/watch?v=6BozpmSjk-Y&t=672s
- API Application Video URL: https://www.youtube.com/watch?v=1PWDxgqLmDA&t=1782s


### AI usage Acknowledgments
This project was initially generated with the help of ChatGPT4 with the following prompts.

- (replace the ones below)
- Hi, can you please give me a simple javascript Single page application for tracking how many pies I eat each week.
- Can you please write a readme file for the application.
- Can you please add local storage to the application.
- Can you please update the readme to reflect this change,