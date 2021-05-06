/* eslint-disable no-console */
// import dependencies
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import client from './client.js';


// make an express app
const app = express();

// allow our server to be called from any website
app.use(cors());
// read JSON from body of request when indicated by Content-Type
app.use(express.json());
// enhanced logging
app.use(morgan('dev'));

// heartbeat route
app.get('/', (req, res) => {
  res.send('Mortal Kombat API');
});

// API routes,
app.get('/api/mortalkombat', async (req, res) => {
  // use SQL query to get data...
  try {
    const data = await client.query(`
      SELECT  id,
              name,
              species,
              url,
              introduced,
              is_ninja as "isNinja",
              fighting_style as "fightingStyle"
      FROM    mortal_kombat;
    `);

    // send back the data
    res.json(data.rows);
  }
  catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/mortalkombat/', async (req, res) => {
  try {
    const cyrax = req.body;
    const data = await client.query(
      `INSERT INTO mortal_kombat (name, species, url, introduced, is_ninja, fighting_style)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING id, name, species, url, introduced, is_ninja as "isNinja", fighting_style as "fightingStyle";`, [cyrax.name, cyrax.species, cyrax.url, cyrax.introduced, cyrax.isNinja, cyrax.fightingStyle]);

    res.json(data.rows[0]);
  }
  catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/mortalkombat/:id', async (req, res) => {
  // use SQL query to get data...
  try {
    const data = await client.query(`
      SELECT  id,
              name,
              species,
              url,
              introduced,
              is_ninja as "isNinja",
              fighting_style as "fightingStyle"
      FROM    mortal_kombat
      WHERE   id = $1;
    `, [req.params.id]);

    // send back the data
    res.json(data.rows[0] || null);
  }
  catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
});

app.put('/api/mortalkombat/:id', async (req, res) => {
  try {
    const character = req.body;

    const data = await client.query(`
      UPDATE  mortal_kombat 
        SET   name = $1, species = $2, url = $3, 
              introduced = $4, is_ninja = $5, fighting_style = $6
      WHERE   id = $7
      RETURNING id, name, species, url, introduced, is_ninja as "isNinja", fighting_style as "fightingStyle"
    `, [character.name, character.species, character.url, character.introduced, character.isNinja, character.fightingStyle, req.params.id]);

    res.json(data.rows[0]);
  }
  catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }

});
export default app;