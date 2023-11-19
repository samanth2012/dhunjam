// AdminHeader.jsx
import React from 'react';

const AdminHeader = ({ adminDetails }) => (
  <div style={{ marginBottom: '20px', textAlign: 'center' }}>
    <p>
      <h1>{adminDetails.name}</h1>
    </p>
    <p>
      <h1>{adminDetails.location}</h1>
    </p>
  </div>
);

export default AdminHeader;
