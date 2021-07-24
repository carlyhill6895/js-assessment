import React, {useState} from 'react';
import './care-request-form.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export function CareRequestForm() {
    // TODO: fix weird error with setting select value for the second time
    const [typeOfCare, setTypeOfCare] = useState('');
    const [startTimestamp, setStartTimestamp] = useState(new Date());
    const [endTimestamp, setEndTimestamp] = useState(new Date());
    const [clientName, setClientName] = useState('');
    const [information, setInformation] = useState('');

    function handleEvent(e, setter) {
        const value = e.target?.value;
        if (value) {
            setter(() => value);
        }
    }

    async function sendRequest() {
        const body = {
            typeOfCare: typeOfCare,
            startTimestamp: startTimestamp.toUTCString(),
            endTimestamp: endTimestamp.toUTCString(),
            clientName: clientName,
            information: information
        };

        const response = await fetch('/api/care-requests', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(body)
        });

        console.log(response.status);
    }

    return (<div>
            Voer hier de gegevens van uw zorgvraag in.
            <div className="form">
                <div className="form-item">
                    <label>Type Zorg</label>
                    <select id="typeOfCare" value={typeOfCare} onChange={e => handleEvent(e, setTypeOfCare)}>
                        <option value="">Selecteer een optie</option>
                        <option value="household">Huishoudelijke zorg</option>
                        <option value="medical">Medische zorg</option>
                    </select>
                    Ingevuld: {typeOfCare}
                </div>


                <div className="form-item">
                    <label>Start datum/tijd:</label>
                    <DatePicker showTimeSelect dateFormat="Pp" selected={startTimestamp}
                                onChange={(date) => setStartTimestamp(date)}/>
                    Ingevuld: {startTimestamp.toUTCString()}
                </div>

                <div className="form-item">
                    <label>Eind datum/tijd:</label>
                    <DatePicker showTimeSelect dateFormat="Pp" selected={endTimestamp}
                                onChange={(date) => setEndTimestamp(date)}/>
                    Ingevuld: {endTimestamp.toUTCString()}
                </div>

                <div className="form-item">
                    <label>Naam klant:</label>
                    <input  type="text" value={clientName} onChange={e => handleEvent(e, setClientName)}/>
                    Ingevuld: {clientName}
                </div>

                <div className="form-item">
                    <label>Informatie over aanvraag:</label>
                    <textarea value={information} onChange={e => handleEvent(e, setInformation)}/>
                    Ingevuld: {information}
                </div>

                <button className="form-item" onClick={sendRequest}>Aanvraag verzenden</button>
            </div>
        </div>
    );
}
