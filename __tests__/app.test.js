import app from '../lib/app.js';
import supertest from 'supertest';
import client from '../lib/client.js';
import { execSync } from 'child_process';

const request = supertest(app);

describe('API Routes', () => {

  afterAll(async () => {
    return client.end();
  });

  // beforeAll(() => {
  //   execSync('npm run setup-db');
  // });

  beforeAll(() => {
    execSync('npm run recreate-tables');
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
    species: 'human',
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

  it('Post cyrax to /api/mortalkombat', async () => {
    const response = await request
      .post('/api/mortalkombat')
      .send(cyrax);

    expect(response.status).toBe(200);
    expect(response.body).toEqual(cyrax);

    cyrax = response.body;
  });



  const characters = [
    {
      id: expect.any(Number),
      name: 'Cyrax',
      species: 'Cyborg',
      url: 'https://upload.wikimedia.org/wikipedia/en/8/82/Cyrax_mk11.png',
      introduced: 3,
      is_ninja: true,
      fighting_style: 'Ninjutsu',
    },

    {
      id: expect.any(Number),
      name: 'Sonya Blade',
      species: 'Human',
      url: 'https://en.wikipedia.org/wiki/Sonya_Blade#/media/File:Sonya_MK_11.png',
      introduced: 1,
      is_ninja: false,
      fighting_style: 'Kenpo',
    },

    {
      id: expect.any(Number),
      name: 'Sub-Zero',
      species: 'Human',
      url: 'https://en.wikipedia.org/wiki/Sub-Zero_(Mortal_Kombat)#/media/File:SubZeroMKXrender.png',
      introduced: 1,
      is_ninja: true,
      fighting_style: 'Shotokan',
    },

    {
      id: expect.any(Number),
      name: 'Goro',
      species: 'Shokan',
      url: 'https://en.wikipedia.org/wiki/Goro_(Mortal_Kombat)#/media/File:Goro_(Mortal_Kombat).png',
      introduced: 1,
      is_ninja: false,
      fighting_style: 'Shokan',
    },

    {
      id: expect.any(Number),
      name: 'Shang Tsung',
      species: 'Human',
      url: 'https://en.wikipedia.org/wiki/Shang_Tsung#/media/File:MK11YoungShangTsung.png',
      introduced: 1,
      is_ninja: false,
      fighting_style: 'Snake',
    },

    {
      id: expect.any(Number),
      name: 'Reptile',
      species: 'Saurian',
      url: 'https://en.wikipedia.org/wiki/Reptile_(Mortal_Kombat)#/media/File:ReptileMKXrender.png',
      introduced: 1,
      is_ninja: true,
      fighting_style: 'Hung Gar',
    },

    {
      id: expect.any(Number),
      name: 'Sheeva',
      species: 'Shokan',
      url: 'https://en.wikipedia.org/wiki/Sheeva#/media/File:Sheeva-removebg-preview.png',
      introduced: 3,
      is_ninja: false,
      fighting_style: 'Kuatan',
    },

    {
      id: expect.any(Number),
      name: 'Kabal',
      species: 'Human',
      url: 'https://en.wikipedia.org/wiki/Kabal_(Mortal_Kombat)#/media/File:Kabal_MK11.png',
      introduced: 3,
      is_ninja: false,
      fighting_style: 'Goju Ryu',
    },

    {
      id: expect.any(Number),
      name: 'Mileena',
      species: 'Edenian',
      url: 'https://upload.wikimedia.org/wikipedia/en/a/ac/Mileena_MK11_Design.webp',
      introduced: 2,
      is_ninja: true,
      fighting_style: 'Ying Yeung',
    },

    {
      id: expect.any(Number),
      name: 'Johnny Cage',
      species: 'Human',
      url: 'https://upload.wikimedia.org/wikipedia/en/7/7b/Johnny_Render_mk_11.png',
      introduced: 1,
      is_ninja: false,
      fighting_style: 'Jeet Kun Do',
    },

    {
      id: expect.any(Number),
      name: 'Kano',
      species: 'Human',
      url: 'https://upload.wikimedia.org/wikipedia/en/8/81/KanoMKXrender.png',
      introduced: 1,
      is_ninja: false,
      fighting_style: 'Xing Yi',
    },

    {
      id: expect.any(Number),
      name: 'Lui Kane',
      species: 'Human',
      url: 'https://upload.wikimedia.org/wikipedia/en/9/92/LiuKangMKXRender.png',
      introduced: 1,
      is_ninja: false,
      fighting_style: 'Pao Chui',
    },

    {
      id: expect.any(Number),
      name: 'Raiden',
      species: 'God',
      url: 'https://upload.wikimedia.org/wikipedia/en/thumb/0/06/Raidenmk11.png/220px-Raidenmk11.png',
      introduced: 1,
      is_ninja: false,
      fighting_style: 'Nan Quan',
    },

    {
      id: expect.any(Number),
      name: 'Scorpion',
      species: 'Spectre',
      url: 'https://upload.wikimedia.org/wikipedia/en/6/6c/ScorpionMKXRender.png',
      introduced: 1,
      is_ninja: true,
      fighting_style: 'Hapkido',
    },

    {
      id: expect.any(Number),
      name: 'Kitana',
      species: 'Edenian',
      url: 'https://upload.wikimedia.org/wikipedia/en/thumb/2/20/KitanaMK11.png/250px-KitanaMK11.png',
      introduced: 2,
      is_ninja: false,
      fighting_style: 'Eagle Claw',
    },

    {
      id: expect.any(Number),
      name: 'Smoke',
      species: 'Cyborg',
      url: 'https://upload.wikimedia.org/wikipedia/en/6/63/Smoke_Mortal_Kombat.png',
      introduced: 3,
      is_ninja: true,
      fighting_style: 'Mi Tzu',
    },

    {
      id: expect.any(Number),
      name: 'Sektor',
      species: 'Cyborg',
      url: 'https://upload.wikimedia.org/wikipedia/en/thumb/3/37/Sektor_mk11.png/220px-Sektor_mk11.png',
      introduced: 3,
      is_ninja: true,
      fighting_style: 'Ninjutsu',
    },

  ];
  // If a GET request is made to /api/cats, does:
  // 1) the server respond with status of 200
  // 2) the body match the expected API data?
  it.skip('GET /api/mortalkombat', async () => {
    // act - make the request
    const response = await request.get('/api/mortalkombat');

    // was response OK (200)?
    expect(response.status).toBe(200);

    // did it return the data we expected?
    expect(response.body).toEqual(characters);

  });

  // If a GET request is made to /api/cats/:id, does:
  // 1) the server respond with status of 200
  // 2) the body match the expected API data for the cat with that id?
  test.skip('GET /api/mortalkombat/:id', async () => {
    const response = await request.get('/api/mortalkombat/2');
    expect(response.status).toBe(200);
    expect(response.body).toEqual(characters[1]);
  });
});