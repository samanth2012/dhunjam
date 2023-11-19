 import React from "react"
  {/* Graph */}
const GraphSection = ({ showChart }) => (
    <div style={{ textAlign: 'center', marginBottom: '20px', width: '600px', margin: '0 auto' }}>
      <div style={{ height: '400px' }}>
        <canvas id="myChart" width="600" height="400"></canvas>
      </div>
    </div>
)
export default GraphSection;
