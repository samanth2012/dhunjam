import React from 'react';


const ChargeCustomersSection = ({ adminDetails, handleChargeCustomersChange }) => (
<div style={{ marginBottom: '10px', width: '1000px', margin: '2 auto', textAlign: 'center' }}>
Do you want to charge your customers
  <label style={{ marginRight: '100px' }}>
    <input
      type="radio"
      value="Yes"
      checked={adminDetails.chargeCustomers}
      onChange={() => handleChargeCustomersChange('Yes')}
      style={{
        marginRight: '5px',
        backgroundColor: '#FFFFFF',
        border: `1px solid ${adminDetails.chargeCustomers ? '#6741D9' : '#FFFFFF'}`,
        borderRadius: '4px',
      }}
    />
    Yes
  </label>
  <label>
    <input
      type="radio"
      value="No"
      checked={!adminDetails.chargeCustomers}
      onChange={() => handleChargeCustomersChange('No')}
      style={{
        marginRight: '5px',
        backgroundColor: '#FFFFFF',
        border: `1px solid ${!adminDetails.chargeCustomers ? '#6741D9' : '#FFFFFF'}`,
        borderRadius: '4px',
      }}
    />
    No
  </label>
  </div>
);
export default ChargeCustomersSection;