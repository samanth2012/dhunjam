 import React from 'react';
 const CustomSongRequest=({adminDetails,handleCustomAmountChange}) =>(
 <label style={{ marginBottom: '200px', width: '600px', margin: '0 auto' }}>
           
            Custom Song Request Amount:
 <input
   type="number"
   value={adminDetails.customAmount}
   onChange={(e) => handleCustomAmountChange(e.target.value)}
   disabled={!adminDetails.chargeCustomers}
   min={0}
   style={{
     fontSize: '16px',
     border: '1px solid #FFFFFF',
     borderRadius: '1px',
     backgroundColor: '#150022',
     color: '#FFFFFF',
     margin: '8px 0',
     padding: '8px',
     width: '20%',
   }}
 />
</label>
);
export default CustomSongRequest;