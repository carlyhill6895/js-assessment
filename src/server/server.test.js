const request = require('supertest');
const {app} = require('./server');

describe('server', () => {
    it('should return data with counter', async () => {
        const res = await request(app).get('/api/data');

        expect(res.statusCode).toEqual(200);
        expect(res.body).toEqual({name: 'sunshine', counter: 1});
    });

    describe('uploading a care request', () => {
        it('should upload a care request', async () => {
            const body = {typeOfCare: 'household', startTimestamp: '2021-07-24T10:00:00Z', endTimestamp: '2021-07-24T12:00:00Z', clientName: 'Buurtzorg', information:'Verband wisselen'}
            const res = await request(app).post('/api/care-requests').send(body).catch(err => console.log(err));

            expect(res.statusCode).toEqual(201);
        });

        it('should return validation error', async () => {
            const body = {typeOfCare: 'household', startTimestamp: '2021-07-24T10:00:00Z', endTimestamp: '2021-07-24T12:00:00Z', information:'Verband wisselen'}
            const res = await request(app).post('/api/care-requests').send(body).catch(err => console.log(err));

            expect(res.statusCode).toEqual(400);
        });
    });
});
