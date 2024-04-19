import React,{ useState } from 'react'
import '../styles/Overlay.css'
export default function Overlay(props) {
    const [client, setClient] = useState('');
  const [commencementDate, setCommencementDate] = useState('');
  const [completionDate, setCompletionDate] = useState('');
  const [rfqCode, setRfqCode] = useState('');
    const handleSubmit = () => {
       
        if (client && commencementDate && completionDate && rfqCode) {
            console.log(client,commencementDate,completionDate,rfqCode)
            props.props.setOverlay(false);
       
        } else {
          alert("Please fill in all fields correctly.");
        }
      };
    return (
        <div>
            {/* Overlay */}
            <div className="overlay">
                <div className="overlay-content">
                    <h2>Enter Details</h2>
                    <label htmlFor="client">Client:</label>
                    <select id="client" value={client} onChange={(e) => setClient(e.target.value)} required>
                        <option value="">Select Client</option>
                        <option value="A">Client A</option>
                        <option value="B">Client B</option>
                        <option value="C">Client C</option>
                    </select>
                    <label htmlFor="commencementDate">Date of Commencement:</label>
                    <input type="date" id="commencementDate" value={commencementDate} onChange={(e) => setCommencementDate(e.target.value)} placeholder="YYYY-MM-DD" required />
                    <label htmlFor="completionDate">Date of Completion:</label>
                    <input type="date" id="completionDate" value={completionDate} onChange={(e) => setCompletionDate(e.target.value)} placeholder="YYYY-MM-DD" required />
                    <label htmlFor="rfqCode">RFQ Code:</label>
                    <input type="text" id="rfqCode" value={rfqCode} onChange={(e) => setRfqCode(e.target.value)} required />
                    <div className="btn-container">
                        <button onClick={()=>{props.setOverlay(false)}}>Cancel</button>
                        <button onClick={handleSubmit}>Submit</button>
                    </div>
                </div>
            </div>


        </div>
    )
}
