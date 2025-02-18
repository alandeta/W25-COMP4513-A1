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















app.listen(8080, () => {
    console.log('listening on port 8080');
    console.log('http://localhost:8080/api/')
});