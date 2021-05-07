/* eslint-disable no-console */
import client from '../lib/client.js';
// import our seed data:
import characters from './mortal-kombat.js';
import users from './users.js';

run();

async function run() {

  try {

    const data = await Promise.all(
      users.map(user => {
        return client.query(`
          INSERT INTO users (name, email, password)
          VALUES ($1, $2, $3)
          RETURNING *;
        `, [user.name, user.email, user.password]);
      })
    );


    const user = data[0].rows[0];

    await Promise.all(
      characters.map(character => {
        return client.query(`
          INSERT INTO mortal_kombat (name, species, url, introduced, is_ninja, fighting_style, user_id)
          VALUES ($1, $2, $3, $4, $5, $6, $7);
        `, [character.name, character.species, character.url, character.introduced, character.isNinja, character.fightingStyle, user.id]);
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