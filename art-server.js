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
        .select();
    res.send(data);
});

// returns all galleries
app.get('/api/galleries', async (req, res) => {
    const { data, error } = await supabase
        .from('galleries')
        .select();
    res.send(data);   
});








app.listen(8080, () => {
    console.log('listening on port 8080');
    console.log('http://localhost:8080')
});