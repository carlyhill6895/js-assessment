import React, {useState, useEffect} from 'react';
import logo from './logo.png';
import './App.css';
import {CareRequestForm} from './components/CareRequestForm';

function App() {
    const [careRequests, setCareRequests] = useState([]);
    const [showCareRequestForm, setShowRequestForm] = useState(false);

    const fetchData = async () => {
        const response = await fetch('/api/care-requests');
        const result = await response.json();
        setCareRequests(result);
    };

    const handleCareRequestFinished = () => setShowRequestForm(false);
    const handleNewRequest = () => setShowRequestForm(true);

    useEffect(() => {
        fetchData();
    }, [showCareRequestForm]);

    return (
        <div className="main">
            <img src={logo} alt="" width="100"/><br/>
            <h2>Aanvragen</h2>
            <ul>
                {careRequests.map((careRequest, i) => <li key={`request-${i}`}>{`${careRequest.clientName}: ${careRequest.information}`}</li>)}
            </ul>

            <br />
            {showCareRequestForm ? <CareRequestForm onFinished={handleCareRequestFinished}/> :
                <button onClick={handleNewRequest}>Nieuwe aanvraag</button>}
        </div>
    );
}

export default App;
