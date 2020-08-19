# Movie Database Test

Find your next movie or create your watchlist with this App. It includes reviews, rating and anything you need to know about the movie.

- This application will help users find their next movie to watch by showing helpful stats
- Resource needed for the project is a movie api, examples include Imdb, MovieDB etc. (choose the one that you feel more comfortable with)

## Running the app

On the project folder...

```bash
$ npm install
$ npm run android OR npm run ios
```

## Information

Regarding the creation of accounts, the data is kept in the internal storage of the cell phone. In a real application, obviously this would not happen, such data would be kept in a secure database and hosted on an external server.

### Libs

In addition to standard react-native libraries, note the following:

- For the transition between screens, [react-navigation](https://reactnavigation.org) was used
- For the communication with the MovieDB API, [axios](https://github.com/axios/axios) was used
- For specif icons, [react-native-vector-icons](https://github.com/oblador/react-native-vector-icons) was used

### MovieDB API

The resources of the project [The Movie DB](https://www.themoviedb.org) were used, which provides an [API](https://developers.themoviedb.org/3/getting-started/introduction) with updated data about the movies

## Screens
![Home](https://i.ibb.co/ZHzYJFC/Whats-App-Image-2020-08-19-at-15-44-55-3.jpg)
![Search](https://i.ibb.co/NVtJ4tT/Whats-App-Image-2020-08-19-at-15-44-55.jpg) 
![Detail](https://i.ibb.co/mBNR2PR/Whats-App-Image-2020-08-19-at-15-44-55-2.jpg)
![Account](https://i.ibb.co/QfpL3Nw/Whats-App-Image-2020-08-19-at-15-44-54.jpg)
![Logged](https://i.ibb.co/17wMB71/Whats-App-Image-2020-08-19-at-15-44-55-4.jpg)

## License
[MIT](https://choosealicense.com/licenses/mit/)