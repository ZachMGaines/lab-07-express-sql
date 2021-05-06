/* eslint-disable no-console */
import client from '../lib/client.js';
// import our seed data:
import characters from './mortal-kombat.js';

run();

async function run() {

  try {

    await Promise.all(
      characters.map(character => {
        return client.query(`
          INSERT INTO mortal_kombat (name, species, url, introduced, is_ninja, fighting_style)
          VALUES ($1, $2, $3, $4, $5, $6);
        `, [character.name, character.species, character.url, character.introduced, character.isNinja, character.fightingStyle]);
      })
    );


    console.log('seed data load complete');
  }
  catch (err) {
    console.log(err);
  }
  finally {
    client.end();
  }

}