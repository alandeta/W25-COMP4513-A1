const express = require('express');
const { createClient } = require('@supabase/supabase-js'); 
const app = express();

const supaUrl = 'https://jmeghjijdcfvqndelngv.supabase.co';
const supaAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImptZWdoamlqZGNmdnFuZGVsbmd2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzk0OTIzNTgsImV4cCI6MjA1NTA2ODM1OH0.AapvpwW9MtzZ_WdAmpPWztIVW0PsLEFgcBn7wPueF9Y';

const supabase = createClient(supaUrl, supaAnonKey); 

// returns all eras
app.get('/api/eras', async (req, res) => {
    const { data, error } = await supabase
        .from('eras')
        .select()
    res.send(data);
});

// returns all galleries
app.get('/api/galleries', async (req, res) => {
    const { data, error } = await supabase
        .from('galleries')
        .select();
    res.send(data);   
});

// returns specified gallery based on id
app.get('/api/galleries/:ref', async (req, res) => {
    if (isNaN(req.params.ref)) {
        return res.send({ error: `Invalid gallery ID "${req.params.ref}". ID must be a number.` });
    }
    const { data, error } = await supabase
        .from('galleries')
        .select()
        .eq('galleryId', req.params.ref);
    if (data.length === 0) {
        return res.send({ error: `Gallery #${req.params.ref} not found.` });
    }
    res.send(data);
});

// galleries who's gallery country begins w substring
app.get('/api/galleries/country/:substring', async (req, res) => {
    const { data, error } = await supabase 
        .from('galleries')
        .select()
        .ilike('galleryCountry', `${req.params.substring}%`);
    if (data.length === 0) {
        return res.send({ error: `Gallery country starting with ${req.params.substring} not found.` });
    }
    res.send(data);
});

// all artists
app.get('/api/artists', async (req, res) => {
    const { data, error } = await supabase
        .from('artists')
        .select();
    res.send(data);
});

// return specific artist based on id
app.get('/api/artists/:ref', async (req, res) => {
    const { data, error } = await supabase
        .from('artists')
        .select()
        .eq('artistId', req.params.ref);
    if (data.length === 0) {
        return res.send({ error: `Artist with ID #${req.params.ref} not found.` });
    }
    res.send(data);
});

// artists whose last name begins with substring
app.get('/api/artists/search/:substring', async (req, res) => {
    const { data, error } = await supabase
        .from('artists')
        .select()
        .ilike('lastName', `${req.params.substring}%`);
    if (data.length === 0){
        return res.send({error: `No artists with last name starting with ${req.params.substring} exists. `})
    }
    res.send(data);
});

// artists whose nationality begins with substring
app.get('/api/artists/country/:substring', async (req, res) => {
    const { data, error } = await supabase
        .from('artists')
        .select()
        .ilike('nationality', `${req.params.substring}%`);
    if (data.length === 0){
        return res.send({error: `No artists has nationality starting with ${req.params.substring} exists. `})
    }
    res.send(data);
});

// all paintings
app.get('/api/paintings', async (req, res) =>{
    const { data, error } = await supabase
        .from('paintings')
        .select(`paintingId, imageFileName, title, museumLink, accessionNumber,
            copyrightText, description, excerpt, yearOfWork, width, height, 
            medium, cost, MSRP, googleLink, googleDescription, wikiLink, jsonAnnotations,
             artists:artistId (artistId, firstName, lastName, nationality, gender, yearOfBirth, yearOfDeath, details, artistLink),
             galleries:galleryId (galleryId, galleryName, galleryNativeName, galleryCity, galleryAddress, galleryCountry, latitude, longitude, galleryWebSite, flickrPlaceId, yahooWoeId, googlePlaceId)`)
        .order('title', {ascending:true});
    res.send(data);
});

// all paintings sorted by title or yearOfWork
app.get('/api/paintings/sort/:method', async (req, res) => {
    const { method } = req.params; 

    if (method !== 'title' && method !== 'year') {
        return res.send({ error: "Invalid sorting method. Must be 'year' or 'title'." });
    }

    const sortField = method === 'year' ? 'yearOfWork' : 'title';

    const { data, error } = await supabase
        .from('paintings')
        .select(`paintingId, imageFileName, title, museumLink, accessionNumber,
            copyrightText, description, excerpt, yearOfWork, width, height, 
            medium, cost, MSRP, googleLink, googleDescription, wikiLink, jsonAnnotations,
            artists:artistId (artistId, firstName, lastName, nationality, gender, yearOfBirth, yearOfDeath, details, artistLink),
            galleries:galleryId (galleryId, galleryName, galleryNativeName, galleryCity, galleryAddress, galleryCountry, latitude, longitude, galleryWebSite, flickrPlaceId, yahooWoeId, googlePlaceId)`)
        .order(sortField, { ascending: true });
    res.send(data);
});

// returns specified painting by id
app.get('/api/paintings/:ref', async (req, res) =>{
    const { data, error } = await supabase
        .from('paintings')
        .select(`paintingId, imageFileName, title, museumLink, accessionNumber,
            copyrightText, description, excerpt, yearOfWork, width, height, 
            medium, cost, MSRP, googleLink, googleDescription, wikiLink, jsonAnnotations,
             artists:artistId (artistId, firstName, lastName, nationality, gender, yearOfBirth, yearOfDeath, details, artistLink),
             galleries:galleryId (galleryId, galleryName, galleryNativeName, galleryCity, galleryAddress, galleryCountry, latitude, longitude, galleryWebSite, flickrPlaceId, yahooWoeId, googlePlaceId)`)
        .eq('paintingId', req.params.ref)
        .order('title', {ascending:true});
    if (data.length === 0) {
        return res.send({error: `No paintings with painting ID ${req.params.ref} found. `})
    }
    res.send(data);
});

// return paintings with title beginning with substring
app.get('/api/paintings/search/:substring', async (req, res) => {
    const { data, error } = await supabase
        .from('paintings')
        .select(`paintingId, imageFileName, title, museumLink, accessionNumber,
            copyrightText, description, excerpt, yearOfWork, width, height, 
            medium, cost, MSRP, googleLink, googleDescription, wikiLink, jsonAnnotations,
             artists:artistId (artistId, firstName, lastName, nationality, gender, yearOfBirth, yearOfDeath, details, artistLink),
             galleries:galleryId (galleryId, galleryName, galleryNativeName, galleryCity, galleryAddress, galleryCountry, latitude, longitude, galleryWebSite, flickrPlaceId, yahooWoeId, googlePlaceId)`)
        .ilike('title', `${req.params.substring}%`)
        .order('title', {ascending:true});
    if (data.length === 0){
        return res.send({error: `No painting has a title starting with ${req.params.substring}. `})
    }
    res.send(data);
});

// return paintings between two years
app.get('/api/paintings/years/:startYear/:endYear', async (req, res) => {
    if (req.params.endYear < req.params.startYear) {
        return res.status(400).json({ error: "End year cannot be earlier than the start year." });
    }
    const { data, error } = await supabase
        .from('paintings')
        .select(`paintingId, imageFileName, title, museumLink, accessionNumber,
            copyrightText, description, excerpt, yearOfWork, width, height, 
            medium, cost, MSRP, googleLink, googleDescription, wikiLink, jsonAnnotations,
             artists:artistId (artistId, firstName, lastName, nationality, gender, yearOfBirth, yearOfDeath, details, artistLink),
             galleries:galleryId (galleryId, galleryName, galleryNativeName, galleryCity, galleryAddress, galleryCountry, latitude, longitude, galleryWebSite, flickrPlaceId, yahooWoeId, googlePlaceId)`)
        .gte('yearOfWork', req.params.startYear) 
        .lte('yearOfWork', req.params.endYear)
        .order('yearOfWork', {ascending:true});
    if (data.length === 0){
        return res.send({error: `No paintings found in given year range.`})
    }
    res.send(data);
});

// return all paintings in given gallery
app.get('/api/paintings/galleries/:ref', async (req, res) =>{
    const { data, error } = await supabase
        .from('paintings')
        .select(`paintingId, imageFileName, title, museumLink, accessionNumber,
            copyrightText, description, excerpt, yearOfWork, width, height, 
            medium, cost, MSRP, googleLink, googleDescription, wikiLink, jsonAnnotations,
             artists:artistId (artistId, firstName, lastName, nationality, gender, yearOfBirth, yearOfDeath, details, artistLink),
             galleries:galleryId (galleryId, galleryName, galleryNativeName, galleryCity, galleryAddress, galleryCountry, latitude, longitude, galleryWebSite, flickrPlaceId, yahooWoeId, googlePlaceId)`)
        .eq('galleryId', req.params.ref)
        .order('title', {ascending:true});
    if (data.length === 0) {
        return res.send({error: `No paintings in gallery with gallery ID ${req.params.ref} found. `})
    }
    res.send(data);
});

// returns all paintings by artist
app.get('/api/paintings/artist/:ref', async (req, res) =>{
    const { data, error } = await supabase
        .from('paintings')
        .select(`paintingId, imageFileName, title, museumLink, accessionNumber,
            copyrightText, description, excerpt, yearOfWork, width, height, 
            medium, cost, MSRP, googleLink, googleDescription, wikiLink, jsonAnnotations,
             artists:artistId (artistId, firstName, lastName, nationality, gender, yearOfBirth, yearOfDeath, details, artistLink),
             galleries:galleryId (galleryId, galleryName, galleryNativeName, galleryCity, galleryAddress, galleryCountry, latitude, longitude, galleryWebSite, flickrPlaceId, yahooWoeId, googlePlaceId)`)
        .eq('artistId', req.params.ref)
        .order('title', {ascending:true});
    if (data.length === 0) {
        return res.send({error: `No paintings by artist with artist ID ${req.params.ref} found. `})
    }
    res.send(data);
});

// return all paintings by artists whose nationality begins with substring
app.get('/api/paintings/artists/country/:ref', async (req, res) =>{
    const { data, error } = await supabase
        .from('paintings')
        .select(`paintingId, imageFileName, title, museumLink, accessionNumber,
            copyrightText, description, excerpt, yearOfWork, width, height, 
            medium, cost, MSRP, googleLink, googleDescription, wikiLink, jsonAnnotations,
             artists!inner (artistId, firstName, lastName, nationality, gender, yearOfBirth, yearOfDeath, details, artistLink),
             galleries:galleryId (galleryId, galleryName, galleryNativeName, galleryCity, galleryAddress, galleryCountry, latitude, longitude, galleryWebSite, flickrPlaceId, yahooWoeId, googlePlaceId)`)
        .filter('artists.nationality', 'ilike', `${req.params.ref}%`)
        .order('title', {ascending:true});

    if (!data || data.length === 0) {
        return res.send({error: `No paintings by an artist with nationality starting with ${req.params.ref} found. `})
    }
    res.send(data);
});

// all genres
app.get('/api/genres', async (req, res) => {
    const { data, error } = await supabase
        .from('genres')
        .select(`genreId, genreName, description, wikiLink,
            eras:eraId (eraName, eraYears)`)
    res.send(data);
});

// genres by genre id
app.get('/api/genres/:ref', async (req, res) => {
    const { data, error } = await supabase
        .from('genres')
        .select(`genreId, genreName, description, wikiLink,
            eras:eraId (eraName, eraYears)`)
        .eq('genreId', req.params.ref);
    if (data.length === 0) {
        return res.send({error: `No genres with genre ID ${req.params.ref} found. `})
    }
    res.send(data);
});

// genres used in given painting -- NOT WORKing
app.get('/api/genres/painting/:ref', async (req, res) => {
    const { data: genreLinks, error: linkError } = await supabase
        .from('paintinggenres')
        .select('genreId')
        .eq('paintingId', req.params.ref);
    if (!genreLinks || genreLinks.length === 0) {
        return res.send({ error: `No genres found for painting with ID ${req.params.ref}` });
    }
    const genreIds = genreLinks.map(g => g.genreId);
    const { data: genres, error: genreError } = await supabase
        .from('genres')
        .select(`genreId, genreName, description, wikiLink, 
                 eras:eraId (eraName, eraYears)`)
        .in('genreId', genreIds)
        .order('genreName', { ascending: true });
    res.send(genres);
});

// return all paintings for a given genre id
app.get('/api/paintings/genre/:ref', async (req, res) => {
    const { data: paintingLinks, error: linkError } = await supabase
        .from('paintinggenres')
        .select('paintingId')
        .eq('genreId', req.params.ref);
    if (!paintingLinks || paintingLinks.length === 0) {
        return res.send({ error: `No paintings found for genre with ID ${req.params.ref}` });
    }
    const paintingIds = paintingLinks.map(p => p.paintingId);
    const { data: paintings, error: paintingError } = await supabase
        .from('paintings')
        .select('paintingId, title, yearOfWork')
        .in('paintingId', paintingIds)
        .order('yearOfWork', { ascending: true });
    res.send(paintings);
});

// return all paintings for a given era
app.get('/api/paintings/era/:ref', async (req, res) => {
    const { data: genres, error: genreError } = await supabase
        .from('genres')
        .select('genreId')
        .eq('eraId', req.params.ref);
    if (!genres || genres.length === 0) {
        return res.send({ error: `No genres found for era with ID ${req.params.ref}` });
    }
    const genreIds = genres.map(g => g.genreId);
    const { data: paintingLinks, error: linkError } = await supabase
        .from('paintinggenres')
        .select('paintingId')
        .in('genreId', genreIds);
    if (!paintingLinks || paintingLinks.length === 0) {
        return res.send({ error: `No paintings found for era with ID ${req.params.ref}` });
    }
    const paintingIds = paintingLinks.map(p => p.paintingId);
    const { data: paintings, error: paintingError } = await supabase
        .from('paintings')
        .select('paintingId, title, yearOfWork')
        .in('paintingId', paintingIds)
        .order('yearOfWork', { ascending: true });
    res.send(paintings);
});

// return genre name and number of paintings for each genre sorted by number of paintings (fewest to most)
app.get('/api/counts/genres', async (req, res) => {
    const { data: paintingGenres, error: linkError } = await supabase
        .from('paintinggenres')
        .select('genreId');
    if (!paintingGenres || paintingGenres.length === 0) {
        return res.status(404).send({ error: 'No painting genres found.' });
    }
    const genreCounts = paintingGenres.reduce((acc, pg) => { //reduce function: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce
        acc[pg.genreId] = (acc[pg.genreId] || 0) + 1;
        return acc;
    }, {});
    const { data: genres, error: genreError } = await supabase
        .from('genres')
        .select('genreId, genreName');
    // map genre names with counts and sort
    const result = Object.entries(genreCounts)
        .map(([genreId, count]) => {
            const genre = genres.find(g => g.genreId == genreId);
            return {
                genreName: genre ? genre.genreName : 'Unknown Genre',
                paintingCount: count
            };
        })
        .sort((a, b) => b.paintingCount - a.paintingCount); 
    res.send(result);
});

// returns the artist name (firstName space lastName) and the number of paintings for each artist, sorted by num of paintings (most to fewest)
app.get('/api/counts/artists', async (req, res) => {
    const { data: paintings, error: paintingsError } = await supabase
        .from('paintings')
        .select('artistId');
    if (!paintings || paintings.length === 0) {
        return res.send({ error: 'No paintings found.' });
    }
    // counts of each artistId
    const artistCounts = paintings.reduce((acc, p) => {
        acc[p.artistId] = (acc[p.artistId] || 0) + 1;
        return acc;
    }, {});
    const { data: artists, error: artistError } = await supabase
        .from('artists')
        .select('artistId, firstName, lastName');
    // map artist names with counts
    const result = Object.entries(artistCounts)
        .map(([artistId, count]) => {
            const artist = artists.find(a => a.artistId == artistId);
            return {
                artistName: artist ? `${artist.firstName} ${artist.lastName}` : 'Unknown Artist',
                paintingCount: count
            };
        })
        .sort((a, b) => b.paintingCount - a.paintingCount); 
    res.send(result);
});

// return genre name and num of paintings for each genre
app.get('/api/counts/topgenres/:ref', async (req, res) => {
    const minPaintings = parseInt(req.params.ref, 10);
    if (isNaN(minPaintings)) {
        return res.status(400).send({ error: 'Invalid number of paintings threshold' });
    }
    const { data: paintingGenres, error: linkError } = await supabase
        .from('paintinggenres')
        .select('genreId');
    if (!paintingGenres || paintingGenres.length === 0) {
        return res.send({ error: 'No painting genres found.' });
    }
    const genreCounts = paintingGenres.reduce((acc, pg) => {
        acc[pg.genreId] = (acc[pg.genreId] || 0) + 1;
        return acc;
    }, {});
    const { data: genres, error: genreError } = await supabase
        .from('genres')
        .select('genreId, genreName');
    const result = Object.entries(genreCounts)
        .map(([genreId, count]) => {
            const genre = genres.find(g => g.genreId == genreId);
            return {
                genreName: genre ? genre.genreName : 'Unknown Genre',
                paintingCount: count
            };
        })
        .filter(g => g.paintingCount > minPaintings) 
        .sort((a, b) => b.paintingCount - a.paintingCount); 
    if (result.length === 0) {
        return res.status(404).send({ error: `No genres with at least ${minPaintings} paintings.` });
    }
    res.send(result);
});

// address invalid API routes
app.use('/api/*', (req, res) => {
    res.status(404).send({ error: `Invalid API endpoint: ${req.originalUrl}` });
});

app.listen(3000, () => {
    console.log('listening on port 3000');
    console.log('http://localhost:3000/api/')
});