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

### Development Process

The process of building the tracker included a range of steps in order to have a comprehensive set up to input in the APIs and javascript libraries. Here are the rough steps I took to create the music tracker:

#### 1. Single Page Architecture
- I firstly set up the single page architecture with the help of URL = https://www.youtube.com/watch?v=6BozpmSjk-Y&t=672s which allowed me to have multiple pages while still having the set up as a single page. This included me making the navigation bar outside of every individual file. 

```javascript
<body>
    <nav class="nav">
        <div class="profile">
            <div class="profile__image-wrapper">
                <img src="https://imgv3.fotor.com/images/blog-cover-image/10-profile-picture-ideas-to-make-you-stand-out.jpg" alt="Profile Picture" class="profile__image">
            </div>
            <h1 class="profile__name">Victoria Lindqvist</h1>
        </div>
        <a href="/" class="nav__link" data-link>Genre Summary</a>
        <a href="/posts" class="nav__link" data-link>My Favorite Anthems</a>
        <a href="/settings" class="nav__link" data-link>Add New Song</a>
    </nav>
    <div id="app" class="container mt-4"></div>
    <script type="module" src="/static/js/index.js"></script>
</body>
</html>
```

#### 2. Placeholders & Interface Building
- In order to get the interface loaded, I used place holder text and images to load the bootstrap containers in place and see the general aesthetics of the page. 

```javascript
 async getHtml() {
        // Sample data for demonstration
        const songs = [
            {
                albumCover: "https://www.udiscovermusic.com/wp-content/uploads/2017/08/Pink-Floyd-Dark-Side-Of-The-Moon.jpg",
                songName: "Song Name 1",
                artistName: "Artist Name 1",
                genre: "Rock",
                dateAdded: "2024-06-07",
                duration: "3:45"
            },
            // Add more sample data for additional songs
        ];
```

#### 3. 

#### Music Taste Report
- I had to change the music taste report from a toggle format about the genres to averages and more interesting information as there were already two containers that included insights into the genres, which would make the website very repetitive. 

- Below is the original toggle format that I made to follow the prototype exactly from A2, althgouh I realised for things like the number of genres variety, a toggle would not be able to represent the data as there is no maximum or minimum value. 

```javascript
  <div class="bg-grey rounded p-3 text-white h-100 d-flex flex-column min-height">
                            <h2>Music Taste Report</h2>
                            <div class="genre-percentage">
                                <label>Pop</label>
                                <p>Average Song Length: <span id="avg-song-length"></span></p>
                                <div class="progress">
                                    <div class="progress-bar" id="pop-progress" role="progressbar" style="width: 0%;" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"></div>
                                    <div class="progress-bar" id="rap-progress" role="progressbar" style="width: 0%;" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"></div>
                                </div>
                            </div>
                            <div class="genre-percentage">
                                <label>Rap</label>
                            <p>Number of Genres: <span id="genres-number"></span></p>
                                <div class="progress">
                                    <div class="progress-bar" id="rap-progress" role="progressbar" style="width: 0%;" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"></div>
                                    <div class="progress-bar" id="classical-progress" role="progressbar" style="width: 0%;" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"></div>
                                </div>
                            </div>
```


- I then changed this code to be in a less visually stimulating form because I noticed that the dashboard was becoming overpopulated and I had to reduce the amount of varieties of analysis down to three, from the origional of 5.   

```javascript
  <div class="row gy-4">
                    <div class="col-md-4">
                        <div class="bg-grey rounded p-3 text-white h-100 d-flex flex-column min-height">
                            <h2>Music Taste Report</h2>

                            <div class="genre-percentage">
                                <p>Average Song Length:</p>
                                <h1><span id="avg-song-length"></span></h1>
                            </div>

                            <div class="genre-percentage">
                                <p>Number of Genres:</p>
                                <h1><span id="genres-number"></span></h1>
                            </div>

                            <div class="genre-percentage">
                                <p>Average Year of Release:</p>
                                <h1><span id="avg-year-release"></span></h1>
                            </div>
                        </div>
                    </div>
```



### Deezer & Consideration of Spotify API

- I opted to use the Deezer API for retrieving song data due to its extensive database of music tracks and user-friendly documentation. Deezer provides a wide range of endpoints for searching songs, albums, artists, and more, making it a suitable choice for this project.
- Initially, I considered using the Spotify API for fetching song data. However, I encountered challenges with the Spotify API's authentication process, which requires users to provide their client ID and secret for access. Due to security concerns and the potential risk of exposing sensitive information, I decided against using the Spotify API for public use.

### Implementation Process

#### Integration of Deezer API

- To implement the Music Tracker's search functionality, I utilized the Deezer search API. This API allows users to search for songs by their title, artist, or other parameters. Upon receiving the search results, I extracted the song's unique identifier (ID) and used it to fetch additional details from the Deezer albums API.

```javascript
 async searchSong(query) {
        const url = `https://cors-anywhere.herokuapp.com/https://api.deezer.com/search?q=track:"${encodeURIComponent(query)}"`;
        try {
            const response = await fetch(url)
            const data = await response.json();
            if (data && Array.isArray(data.data) && data.data.length > 0) {
                var song = data.data[0];
                const albumId = song.album.id;
                const { genre, releaseDate } = await this.getMainGenre(albumId);
                song.genre = genre;
                song.release_date = releaseDate;
                this.displaySongDetails(song);
            } else {
                alert("No songs found.");
            }
        } catch (error) {
            console.error('Error fetching song data:', error);
        }
    }

async getMainGenre(albumId) {
        const url = `https://cors-anywhere.herokuapp.com/https://api.deezer.com/album/${albumId}`;
        try {
            const response = await fetch(url);
            const album = await response.json();
            if (album) {
                const genre = album.genres.data[0].name;
                const releaseDate = album.release_date;
                return { genre, releaseDate };
            } else {
                throw new Error("Couldn't find such album");
            }
        } catch (error) {
            console.error('Error fetching album data:', error);
        }
    }

```

#### Retrieval of Song Details

- Once the user selects a song from the search results, I fetched detailed information about the song from the Deezer albums API. This included data such as the song's genre, release date, album cover, and more. By leveraging these endpoints, I was able to provide users with comprehensive insights into their favorite songs.

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

### Delete Function

Compltess attempts to implement a delete function for removing songs from the user's favorites list, technical constraints prevented its successful implementation. The code snippet below illustrates the attempted implementation of the delete function:

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