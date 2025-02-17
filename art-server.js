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











app.listen(8080, () => {
    console.log('listening on port 8080');
    console.log('http://localhost:8080/api/')
});