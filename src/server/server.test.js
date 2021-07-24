const request = require('supertest');
const {app} = require('./server');

describe('server', () => {
    it('should return all care requests', async () => {
        const body = {typeOfCare: 'household', startTimestamp: '2021-07-24T10:00:00Z', endTimestamp: '2021-07-24T12:00:00Z', clientName: 'Buurtzorg', information:'Verband wisselen'}
        await request(app).post('/api/care-requests').send(body).catch(err => console.log(err));

        const res = await request(app).get('/api/care-requests');

        expect(res.statusCode).toEqual(200);
        expect(res.body).toEqual([body]);
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
