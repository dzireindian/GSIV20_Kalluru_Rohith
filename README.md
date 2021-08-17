#Instructions to run the project#

1. create .env file in the project root directory
2. Include the following variables in the .env file.
	* REACT_APP_API_KEY= [TMDB registered api key]
    * REACT_APP_API_POINT= "https://api.themoviedb.org/3" [TMDB api end point]
	* REACT_APP_ENC_KEY= "@KR@" [Desired Encryption key of your choice]
3. After setting up .env file, cd to the project directory in your terminal and enter "npm start"
4. Voila the project is up and running

#My coding style explanation#

1. I used persisted redux state to fetch from the api once and use it through out the user session, that way we minimise the need for calling api for static data, ther by reducing the buffer time.
2. I reused "MovieList" component for showing search results and upcoming movies list, there by increasing reusability of the component and reducing large amount of code to be rewritten.
3. If I have 4 more hours, I improvise the frontend for more pleasing appearance and would use docker to containerize the app and terraform to manage the api's, there by increasing the feasibility of the program with any os and npm package versions and for increasing automation.
