import App from './App';
import { render, fireEvent, screen } from '@testing-library/react';
import React from 'react';

describe('App', () => {
    beforeEach(() => {
        fetch.resetMocks();
    });

    it('should should a logo image', async () => {
        fetch.mockResponseOnce(JSON.stringify([]));
        render(<App />);
        expect(await screen.findByRole('img')).toBeInTheDocument();
    });
    it('should render result of backend request', async () => {
        fetch.mockResponseOnce(JSON.stringify([{typeOfCare: 'household', startTimestamp: '2021-07-24T10:00:00Z', endTimestamp: '2021-07-24T12:00:00Z', clientName: 'Buurtzorg', information:'Verband wisselen'}]));

        render(<App/>);
        expect(await screen.findByText(
            'Buurtzorg'
        )).toBeInTheDocument();
    });

    it('should show new request form after clicking on the button to open request', async () => {
        fetch.mockResponse(JSON.stringify([]));
        render(<App/>);

        fireEvent.click(await screen.findByText('Nieuwe aanvraag'));

        expect(await screen.findByText('Type zorg')).toBeInTheDocument();
    });
});
