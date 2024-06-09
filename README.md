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


## Development

### Background

During the development of the Music Tracker A3 project for DECO2017, I encountered various challenges and made several iterations to achieve the desired functionality. One of the key aspects of the project was integrating external APIs to fetch song data and provide users with comprehensive information about their favorite songs.

### Choice of API: Deezer

I opted to use the Deezer API for retrieving song data due to its extensive database of music tracks and user-friendly documentation. Deezer provides a wide range of endpoints for searching songs, albums, artists, and more, making it a suitable choice for this project.

### Consideration of Spotify API

Initially, I considered using the Spotify API for fetching song data. However, I encountered challenges with the Spotify API's authentication process, which requires users to provide their client ID and secret for access. Due to security concerns and the potential risk of exposing sensitive information, I decided against using the Spotify API for public use.

### Implementation Process

#### Integration of Deezer API

To implement the Music Tracker's search functionality, I utilized the Deezer search API. This API allows users to search for songs by their title, artist, or other parameters. Upon receiving the search results, I extracted the song's unique identifier (ID) and used it to fetch additional details from the Deezer albums API.

#### Retrieval of Song Details

Once the user selects a song from the search results, I fetched detailed information about the song from the Deezer albums API. This included data such as the song's genre, release date, album cover, and more. By leveraging these endpoints, I was able to provide users with comprehensive insights into their favorite songs.

### Code Snippets

#### Search Functionality

```javascript
async searchSong(query) {
    const url = `https://cors-anywhere.herokuapp.com/https://api.deezer.com/search?q=track:"${encodeURIComponent(query)}"`;
    try {
        const response = await fetch(url)
        const data = await response.json();
        if (data && Array.isArray(data.data) && data.data.length > 0) {
            // Process search results
        } else {
            alert("No songs found.");
        }
    } catch (error) {
        console.error('Error fetching song data:', error);
    }
}
```

#### Delete Function

I tried very hard to implement a delete function for removing songs from the user's favorites list, technical constraints prevented its successful implementation. The code snippet below illustrates the attempted implementation of the delete function:

```javascript
async deleteSong(songId) {
    const confirmation = confirm("Are you sure you want to remove this song from your favorite songs?");
    if (confirmation) {
        console.log(`Deleting song with ID: ${songId}`);
        let listOfSongs = JSON.parse(localStorage.getItem('savedSongs'));
        console.log('Original list of songs:', listOfSongs);
        const updatedList = listOfSongs.filter(songJSON => {
            const parsedSong = JSON.parse(songJSON);
            return songId !== parsedSong.id;
        });
        console.log('Updated list of songs:', updatedList);
        localStorage.setItem('savedSongs', JSON.stringify(updatedList));
        await this.loadFavSongs(); // Reload the list to reflect the changes
    }
}
```

Despite rigorous debugging and troubleshooting efforts, the delete function could not be successfully implemented due to unspecified technical constraints. Further investigation and experimentation may be required to resolve this issue and enable the desired functionality.


## Recommendations for Further Improvements or Extensions

### User Authentication and Authorization
- If I could implement changes to the Music Tracker in the future, the code would benefit from the addition of user authentication and authorization functionality. This would allow users to create accounts, log in securely, and access personalized features such as saving favorite songs or playlists.

### Social Sharing and Integration
- In the future, the Music Tracker could benefit from the integration of social sharing features. This would enable users to share their favorite songs, playlists, or genre summaries with friends and followers on social media platforms such as Facebook, Twitter, and Instagram.

### Advanced Analytics and Insights
- To provide users with deeper insights into their music preferences and listening habits, I would enhance the analytics and insights capabilities of the Music Tracker. This could involve implementing data visualization tools, algorithms, and personalized recommendations to generate curated playlists and personalized music suggestions.

### Mobile Responsiveness and Progressive Web App 
- To ensure seamless performance and usability across a variety of devices, I would optimize the Music Tracker for mobile devices and create a progressive web app. This would involve implementing responsive design principles, offline capabilities, and push notifications to enhance the mobile user experience.

### Integration with Music Streaming APIs
- To expand the range of available songs and provide users with access to a wider selection of music content, I would explore integration with other music streaming APIs such as Spotify, Apple Music, or YouTube Music. This would enhance the Music Tracker's catalog and improve the overall user experience.

### Community Features and Collaboration
- To foster interaction and collaboration among users, I would introduce community features such as user profiles, comments, ratings, and collaborative playlists. This would enable users to discover new music, connect with like-minded individuals, and share their musical experiences within the Music Tracker platform.

### Machine Learning and Personalization
- In the future, the Music Tracker could benefit from the implementation of machine learning algorithms and techniques to create personalized music recommendations. This would tailor the user experience based on individual preferences and behavior patterns, enhancing user engagement and satisfaction.

### Gamification and Engagement
- To enhance user engagement and encourage active participation within the Music Tracker platform, I would incorporate gamification elements such as achievements, badges, leaderboards, and challenges. This would incentivize exploration, discovery, and interaction among users, making the Music Tracker more engaging and enjoyable to use.


## Limitations
- **Local Storage:** This application uses local storage for data persistence, limited to the specific browser and device.
- **Song Selection:** Users can't select the song they're looking for; the application only displays the top recommendation.
- **Delete Function:** Despite attempts to implement the delete function, it didn't work due to technical constraints. The code snippet for the delete function is provided below.



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