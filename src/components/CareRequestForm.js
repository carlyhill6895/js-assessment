import React, {useState} from 'react';
import './care-request-form.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export function CareRequestForm(props) {
    // TODO: fix weird error with setting select value for the second time
    const [typeOfCare, setTypeOfCare] = useState('');
    const [startTimestamp, setStartTimestamp] = useState(new Date());
    const [endTimestamp, setEndTimestamp] = useState(new Date());
    const [clientName, setClientName] = useState('');
    const [information, setInformation] = useState('');

    function handleEvent(e, setter) {
        const value = e.target?.value || '';
        setter(() => value);
    }

    async function sendRequest() {
        const body = {
            typeOfCare: typeOfCare,
            startTimestamp: startTimestamp.toUTCString(),
            endTimestamp: endTimestamp.toUTCString(),
            clientName: clientName,
            information: information
        };

        await fetch('/api/care-requests', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(body)
        });

        props.onFinished();
    }

    return (<div>
            Voer hier de gegevens van uw zorgvraag in.
            <div className="form">
                <div className="form-item">
                    <label>Type zorg</label>
                    <br />
                    <select id="typeOfCare" value={typeOfCare} onChange={e => handleEvent(e, setTypeOfCare)}>
                        <option value="">Selecteer een optie</option>
                        <option value="household">Huishoudelijke zorg</option>
                        <option value="medical">Medische zorg</option>
                    </select>
                </div>


                <div className="form-item">
                    <label>Start datum/tijd</label>
                    <br />
                    <DatePicker showTimeSelect dateFormat="Pp" selected={startTimestamp}
                                onChange={(date) => setStartTimestamp(date)}/>
                </div>

                <div className="form-item">
                    <label>Eind datum/tijd</label>
                    <br />
                    <DatePicker showTimeSelect dateFormat="Pp" selected={endTimestamp}
                                onChange={(date) => setEndTimestamp(date)}/>
                </div>

                <div className="form-item">
                    <label>Naam klant</label>
                    <br />
                    <input type="text" value={clientName} onChange={e => handleEvent(e, setClientName)}/>
                </div>

                <div className="form-item">
                    <label>Informatie over aanvraag</label>
                    <br />
                    <textarea value={information} onChange={e => handleEvent(e, setInformation)}/>
                </div>

                <button className="form-item" onClick={sendRequest}>Aanvraag verzenden</button>
            </div>
        </div>
    );
}
