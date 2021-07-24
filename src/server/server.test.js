const request = require('supertest');
const {app} = require('./server');

describe('server', () => {
    it('should return data with counter', async () => {
        const res = await request(app).get('/api/data');

        expect(res.statusCode).toEqual(200);
        expect(res.body).toEqual({name: 'sunshine', counter: 1});
    })
});
