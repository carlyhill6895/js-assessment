import {CareRequestForm} from './CareRequestForm';
import { render, screen } from '@testing-library/react';
import React from 'react';

describe('CareRequestForm', () => {

    it('should show an input for the type of care', async () => {
        render(<CareRequestForm />);
        expect(await screen.findByText('Type zorg')).toBeInTheDocument();
    });

    it('should show an input for startTimestamp', async () => {
        render(<CareRequestForm />);
        expect(await screen.findByText('Start datum/tijd')).toBeInTheDocument();
    });

    it('should show an input for endTimestamp', async () => {
        render(<CareRequestForm />);
        expect(await screen.findByText('Eind datum/tijd')).toBeInTheDocument();
    });

    it('should show an input for a client name', async () => {
        render(<CareRequestForm />);
        expect(await screen.findByText('Naam klant')).toBeInTheDocument();
    });

    it('should show an input for information', async () => {
        render(<CareRequestForm />);
        expect(await screen.findByText('Informatie over aanvraag')).toBeInTheDocument();
    });

    it('should show a button to send', async () => {
        render(<CareRequestForm />);
        expect(await screen.findByText('Aanvraag verzenden')).toBeInTheDocument();
    });

    // TODO: add test to fill form and check if data gets sent to backend
});
