import React from "react";
const RegularAmountInputs = ({ adminDetails, handleRegularAmountChange }) =>(
        <div style={{ marginBottom: '20px', width: '600px', margin: '0 auto', textAlign: 'center' }}>
      
     
      <div style={{ display: 'flex', justifyContent: 'center' }}>
      <p>Regular Prices:</p>  {adminDetails.regularAmounts.map((amount, index) => (
            <input
              key={index}
              type="number"
              value={amount}
              onChange={(e) => handleRegularAmountChange(index, e.target.value)}
              min={0}
              style={{
                fontSize: '16px',
                border: '1px solid #FFFFFF',
                borderRadius: '4px',
                backgroundColor: '#150022',
                color: '#FFFFFF',
                margin: '8px 4px',
                flex: 1,
                padding: '8px',
                width: '10%', // Adjusted width
              }}
            />
          ))}
        </div>
      </div>
        // Content to be rendered when adminDetails.chargeCustomers is true
      
);
export default RegularAmountInputs;