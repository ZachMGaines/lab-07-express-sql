import app from '../lib/app.js';
import supertest from 'supertest';
import client from '../lib/client.js';
//import { execSync } from 'child_process';
const exec = require('child_process').exec;

const request = supertest(app);

describe('API Routes', () => {

  afterAll(async () => {
    return client.end();
  });

  // beforeAll(() => {
  //   execSync('npm run setup-db');
  // });
  describe('API mortal kombat CRUD', () => {

    beforeAll(() => {
      exec('npm run recreate-tables');
    });


    let cyrax = {
      name: 'Cyrax',
      species: 'Cyborg',
      url: 'https://upload.wikimedia.org/wikipedia/en/8/82/Cyrax_mk11.png',
      introduced: 3,
      isNinja: true,
      fightingStyle: 'Ninjutsu'
    };

    let subZero = {
      name: 'Sub-Zero',
      species: 'Human',
      url: 'https://en.wikipedia.org/wiki/Sub-Zero_(Mortal_Kombat)#/media/File:SubZeroMKXrender.png',
      introduced: 1,
      isNinja: true,
      fightingStyle: 'Shotokan'
    };

    let goro = {
      name: 'Goro',
      species: 'Shokan',
      url: 'https://en.wikipedia.org/wiki/Goro_(Mortal_Kombat)#/media/File:Goro_(Mortal_Kombat).png',
      introduced: 1,
      isNinja: false,
      fightingStyle: 'Shokan'
    };
    // first test
    it('Post cyrax to /api/mortalkombat', async () => {
      const response = await request
        .post('/api/mortalkombat')
        .send(cyrax);

      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        id: expect.any(Number),
        name: 'Cyrax',
        species: 'Cyborg',
        url: 'https://upload.wikimedia.org/wikipedia/en/8/82/Cyrax_mk11.png',
        introduced: 3,
        isNinja: true,
        fightingStyle: 'Ninjutsu',
      });

      cyrax = response.body;
    });



    const characters = [
      {
        id: expect.any(Number),
        name: 'Cyrax',
        species: 'Cyborg',
        url: 'https://upload.wikimedia.org/wikipedia/en/8/82/Cyrax_mk11.png',
        introduced: 3,
        isNinja: true,
        fightingStyle: 'Ninjutsu',
      },

      {
        id: expect.any(Number),
        name: 'Sub-Zero',
        species: 'Human',
        url: 'https://en.wikipedia.org/wiki/Sub-Zero_(Mortal_Kombat)#/media/File:SubZeroMKXrender.png',
        introduced: 1,
        isNinja: true,
        fightingStyle: 'Shotokan',
      },

      {
        id: expect.any(Number),
        name: 'Goro',
        species: 'Shokan',
        url: 'https://en.wikipedia.org/wiki/Goro_(Mortal_Kombat)#/media/File:Goro_(Mortal_Kombat).png',
        introduced: 1,
        isNinja: false,
        fightingStyle: 'Shokan',
      },
    ];
    // If a GET request is made to /api/cats, does:
    // 1) the server respond with status of 200
    // 2) the body match the expected API data?
    //Third TEST
    it('GET /api/mortalkombat', async () => {
      // act - make the request
      const response1 = await request.post('/api/mortalkombat').send(subZero);
      subZero = response1.body;
      const response2 = await request.post('/api/mortalkombat').send(goro);
      goro = response2.body;

      const response = await request.get('/api/mortalkombat');

      // was response OK (200)?
      expect(response.status).toBe(200);

      // did it return the data we expected?
      expect(response.body).toEqual(characters);

    });

    // If a GET request is made to /api/cats/:id, does:
    // 1) the server respond with status of 200
    // 2) the body match the expected API data for the cat with that id?
    //FOURTH TEST
    test('GET /api/mortalkombat/:id', async () => {
      const response = await request.get('/api/mortalkombat/2');
      expect(response.status).toBe(200);
      expect(response.body).toEqual(characters[1]);
    });



    //SECOND TEST
    it('PUT updated felix to /api/mortalkombat/:id', async () => {
      let expectedCyrax = {
        id: 1,
        name: 'Cyrax',
        species: 'Human',
        url: 'https://upload.wikimedia.org/wikipedia/en/8/82/Cyrax_mk11.png',
        introduced: 2,
        isNinja: true,
        fightingStyle: 'Ninjutsu',
      };
      const newCyrax = {
        id: 1,
        name: 'Cyrax',
        species: 'Human',
        url: 'https://upload.wikimedia.org/wikipedia/en/8/82/Cyrax_mk11.png',
        introduced: 2,
        isNinja: true,
        fightingStyle: 'Ninjutsu',
      };

      const response = await request
        .put(`/api/mortalkombat/${expectedCyrax.id}`)
        .send(newCyrax);

      expect(response.status).toBe(200);
      expect(response.body).toEqual(expectedCyrax);
      expectedCyrax = response.body;
    });

  });


});