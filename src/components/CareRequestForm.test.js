import {CareRequestForm} from './CareRequestForm';
import { render, screen } from '@testing-library/react';
import React from 'react';

describe('CareRequestForm', () => {

    it('should show an input for a client name', async () => {
        render(<CareRequestForm />);
        expect(await screen.findByText('Naam klant:')).toBeInTheDocument();
    });
});
