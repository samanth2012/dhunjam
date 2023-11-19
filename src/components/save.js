// SaveButton.jsx
import React from 'react';

const SaveButton = ({ handleSave, isSaveButtonEnabled }) => (
     <div style={{ textAlign: 'center', marginBottom: '20px', width: '600px', margin: '0 auto' }}>
     <button
       onClick={handleSave}
       disabled={!isSaveButtonEnabled}
       style={{
         backgroundColor: '#6741D9',
         width: '150px',
         border: '1px solid #F0C3F1',
         borderRadius: '4px',
         cursor: 'pointer',
         fontSize: '16px',
         padding: '8px',
         marginBottom: '20px',
         transition: 'border 0.3s',
       }}
     >
       Save
     </button>
   </div>

);

export default SaveButton;
