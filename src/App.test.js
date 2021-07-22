import App from './App';
import { render, screen } from '@testing-library/react';
import React from 'react';

describe('App', () => {
    beforeEach(() => {
        fetch.resetMocks();
    });

    it('should should a logo image', async () => {
        fetch.mockResponseOnce(JSON.stringify({name: 'sunshine', counter: 0}));
        render(<App />);
        expect(await screen.findByRole('img')).toBeInTheDocument();
    });
    it('should render result of backend request', async () => {
        fetch.mockResponseOnce(JSON.stringify({name: 'sunshine', counter: 2}));

        render(<App/>);
        expect(await screen.findByText(
            'Hello sunshine, you called the backend 2 times.'
        )).toBeInTheDocument();
    });
});
