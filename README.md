# COMP4513 (Winter 2025)
### Assignment 1: Node API | Alyssa Landeta | February 24, 2025
## Overview
This repository contains code for an API that provides access to information about artists, galleries, and paintings from a database. The API is built using **Node.js** (JS runtime) and **Express** (routing), with data stored in a **Supabase** database. The web app is hosted via **Render**. It allows users to query various endpoints to retrieve details such as:
* **Artists:** Information about artists, including names, countries, and more.
* **Galleries:** Data about art galleries and exhibitions.
* **Paintings:** Information about individual paintings, including titles, years, and associated artists.

The data is returned in JSON format. The API includes multiple routes that allow filtering and sorting of data based on specific criteria such as country, year of creation, artist, and more.It also provides error handling for cases such as missing data or invalid parameters. The application uses a RESTful architecture and provides error messages for incorrectly formatted requests or missing data.

### API Endpoints
| **Endpoint**                                     | **Description**                                                                                               |
|--------------------------------------------------|---------------------------------------------------------------------------------------------------------------|
| `/api/eras`                                      | Returns all the eras                                                                                          |
| `/api/galleries`                                 | Returns all the galleries (return all fields in the galleries table)                                           |
| `/api/galleries/ref`                             | Returns the specified gallery (use the `galleryId` field), e.g., `/api/galleries/30`                           |
| `/api/galleries/country/substring`               | Returns galleries whose `galleryCountry` begins with the provided substring, e.g., `/api/galleries/country/fra`|
| `/api/artists`                                   | Returns all the artists (return all fields in the artists table)                                               |
| `/api/artists/ref`                               | Returns the specified artist (use the `artistId` field), e.g., `/api/artists/12`                               |
| `/api/artists/search/substring`                  | Returns artists whose last name begins with the provided substring, e.g., `/api/artist/search/ma`              |
| `/api/artists/country/substring`                 | Returns artists whose nationality begins with the provided substring, e.g., `/api/artists/country/fra`         |
| `/api/paintings`                                 | Returns all paintings (return all fields except foreign keys; include full artist and gallery data)            |
| `/api/paintings/sort/titleORyear`                 | Returns all paintings, sorted by either `title` or `yearOfWork`                                                |
| `/api/paintings/ref`                             | Returns the specified painting, e.g., `/api/paintings/63`                                                      |
| `/api/paintings/search/substring`                | Returns paintings whose `title` contains the provided substring, e.g., `/api/paintings/search/port`            |
| `/api/paintings/years/start/end`                 | Returns paintings between two years, ordered by `yearOfWork`, e.g., `/api/paintings/years/1800/1850`           |
| `/api/paintings/galleries/ref`                   | Returns all paintings in a given gallery (use the `galleryId` field), e.g., `/api/paintings/galleries/5`       |
| `/api/paintings/artist/ref`                      | Returns all paintings by a given artist (use the `artistId` field), e.g., `/api/paintings/artist/16`           |
| `/api/paintings/artists/country/ref`             | Returns all paintings by artists whose nationality begins with the provided substring, e.g., `/api/paintings/artists/country/ital` |
| `/api/genres`                                    | Returns all the genres (include full era data)                                                                 |
| `/api/genres/ref`                                | Returns the specified genre (use the `genreId` field), e.g., `/api/genres/76`                                  |
| `/api/genres/painting/ref`                       | Returns genres used in a given painting, ordered by `genreName`, e.g., `/api/genres/painting/408`              |
| `/api/paintings/genre/ref`                       | Returns all paintings for a given genre, e.g., `/api/paintings/genre/78` (only `paintingId`, `title`, and `yearOfWork`) |
| `/api/paintings/era/ref`                         | Returns all paintings for a given era, e.g., `/api/paintings/era/2` (only `paintingId`, `title`, and `yearOfWork`) |
| `/api/counts/genres`                             | Returns genre names and the number of paintings for each genre, sorted by the number of paintings (fewest to most) |
| `/api/counts/artists`                            | Returns artist names (first and last) and the number of paintings for each artist, sorted by most to fewest paintings |
| `/api/counts/topgenres/ref`                      | Returns genre names and the number of paintings for genres with more than a set number of paintings, e.g., `/api/counts/topgenres/20` |


### Example: 
**Request:** https://w25-comp4513-a1.onrender.com/api/artists/12

**Response:**
```json
[
  {
    "artistId": 12,
    "firstName": "Edouard",
    "lastName": "Manet",
    "nationality": "France",
    "gender": "M",
    "yearOfBirth": 1832,
    "yearOfDeath": 1883,
    "details": "Edouard Manet was a French painter. One of the first 19th-century artists to approach modern-life subjects, he was a pivotal figure in the transition from Realism to Impressionism.",
    "artistLink": "http://en.wikipedia.org/wiki/Manet"
  }
]
```

### Testing Links
### Test Links  

- Eras: [https://w25-comp4513-a1.onrender.com/api/eras](https://w25-comp4513-a1.onrender.com/api/eras)  

- Galleries: [https://w25-comp4513-a1.onrender.com/api/galleries](https://w25-comp4513-a1.onrender.com/api/galleries)  
- Gallery by ID (30): [https://w25-comp4513-a1.onrender.com/api/galleries/30](https://w25-comp4513-a1.onrender.com/api/galleries/30)  
- Gallery by Name (Calgary): [https://w25-comp4513-a1.onrender.com/api/galleries/Calgary](https://w25-comp4513-a1.onrender.com/api/galleries/Calgary)  
- Galleries by Country (fra): [https://w25-comp4513-a1.onrender.com/api/galleries/country/fra](https://w25-comp4513-a1.onrender.com/api/galleries/country/fra)  

- Artists: [https://w25-comp4513-a1.onrender.com/api/artists](https://w25-comp4513-a1.onrender.com/api/artists)  
- Artist by ID (12): [https://w25-comp4513-a1.onrender.com/api/artists/12](https://w25-comp4513-a1.onrender.com/api/artists/12)  
- Artist by Invalid ID (1223423): [https://w25-comp4513-a1.onrender.com/api/artists/1223423](https://w25-comp4513-a1.onrender.com/api/artists/1223423)  
- Artist Search (ma): [https://w25-comp4513-a1.onrender.com/api/artists/search/ma](https://w25-comp4513-a1.onrender.com/api/artists/search/ma)  
- Artist Search (mA): [https://w25-comp4513-a1.onrender.com/api/artists/search/mA](https://w25-comp4513-a1.onrender.com/api/artists/search/mA)  
- Artists by Country (fra): [https://w25-comp4513-a1.onrender.com/api/artists/country/fra](https://w25-comp4513-a1.onrender.com/api/artists/country/fra)  

- Paintings: [https://w25-comp4513-a1.onrender.com/api/paintings](https://w25-comp4513-a1.onrender.com/api/paintings)  
- Paintings Sorted by Year: [https://w25-comp4513-a1.onrender.com/api/paintings/sort/year](https://w25-comp4513-a1.onrender.com/api/paintings/sort/year)  
- Painting by ID (63): [https://w25-comp4513-a1.onrender.com/api/paintings/63](https://w25-comp4513-a1.onrender.com/api/paintings/63)  
- Painting Search (port): [https://w25-comp4513-a1.onrender.com/api/paintings/search/port](https://w25-comp4513-a1.onrender.com/api/paintings/search/port)  
- Painting Search (pORt): [https://w25-comp4513-a1.onrender.com/api/paintings/search/pORt](https://w25-comp4513-a1.onrender.com/api/paintings/search/pORt)  
- Painting Search (connolly): [https://w25-comp4513-a1.onrender.com/api/paintings/search/connolly](https://w25-comp4513-a1.onrender.com/api/paintings/search/connolly)  
- Paintings Between Years (1800-1850): [https://w25-comp4513-a1.onrender.com/api/paintings/years/1800/1850](https://w25-comp4513-a1.onrender.com/api/paintings/years/1800/1850)  
- Paintings by Gallery (5): [https://w25-comp4513-a1.onrender.com/api/paintings/galleries/5](https://w25-comp4513-a1.onrender.com/api/paintings/galleries/5)  
- Paintings by Artist (16): [https://w25-comp4513-a1.onrender.com/api/paintings/artist/16](https://w25-comp4513-a1.onrender.com/api/paintings/artist/16)  
- Paintings by Invalid Artist (666): [https://w25-comp4513-a1.onrender.com/api/paintings/artist/666](https://w25-comp4513-a1.onrender.com/api/paintings/artist/666)  
- Paintings by Artist Country (ital): [https://w25-comp4513-a1.onrender.com/api/paintings/artist/country/ital](https://w25-comp4513-a1.onrender.com/api/paintings/artist/country/ital)  

- Genres: [https://w25-comp4513-a1.onrender.com/api/genres](https://w25-comp4513-a1.onrender.com/api/genres)  
- Genre by ID (76): [https://w25-comp4513-a1.onrender.com/api/genres/76](https://w25-comp4513-a1.onrender.com/api/genres/76)  
- Genres for Painting (408): [https://w25-comp4513-a1.onrender.com/api/genres/painting/408](https://w25-comp4513-a1.onrender.com/api/genres/painting/408)  
- Genres for Invalid Painting (jsdfhg): [https://w25-comp4513-a1.onrender.com/api/genres/painting/jsdfhg](https://w25-comp4513-a1.onrender.com/api/genres/painting/jsdfhg)  
- Paintings by Genre (78): [https://w25-comp4513-a1.onrender.com/api/paintings/genre/78](https://w25-comp4513-a1.onrender.com/api/paintings/genre/78)  
- Paintings by Era (2): [https://w25-comp4513-a1.onrender.com/api/paintings/era/2](https://w25-comp4513-a1.onrender.com/api/paintings/era/2)  

- Genre Counts: [https://w25-comp4513-a1.onrender.com/api/counts/genres](https://w25-comp4513-a1.onrender.com/api/counts/genres)  
- Artist Counts: [https://w25-comp4513-a1.onrender.com/api/counts/artists](https://w25-comp4513-a1.onrender.com/api/counts/artists)  
- Top Genres (20+ paintings): [https://w25-comp4513-a1.onrender.com/api/counts/topgenres/20](https://w25-comp4513-a1.onrender.com/api/counts/topgenres/20)  
- Top Genres (Invalid Number): [https://w25-comp4513-a1.onrender.com/api/counts/topgenres/2034958](https://w25-comp4513-a1.onrender.com/api/counts/topgenres/2034958)  

