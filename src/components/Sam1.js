import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Chart from 'chart.js/auto';
import AdminHeader from './adminheader';
import ChargeCustomersSection from './customerscharge';
import CustomSongRequest from './customamount';
import RegularAmountInputs from './RegularPrices';
import GraphSection from './graph';
import SaveButton from './save';
const AdminPage = () => {
  const [adminDetails, setAdminDetails] = useState({
    id: 0,
    name: '',
    location: '',
    chargeCustomers: false,
    customAmount: 0,
    regularAmounts: ['', '', '', ''],
  });

  const [isSaveButtonEnabled, setSaveButtonEnabled] = useState(false);
  const [chartInstance, setChartInstance] = useState(null);
  const [showChart, setShowChart] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const fetchAdminDetails = async () => {
      try {
        const response = await axios.get('https://stg.dhunjam.in/account/admin/4');
        const data = response.data.data;

        setAdminDetails({
          id: data.id,
          name: data.name,
          location: data.location,
          chargeCustomers: false,
          customAmount: 0,
          regularAmounts: ['', '', '', ''],
        });
        console.log(setAdminDetails)

        updateSaveButtonState(false);
        console.log(updateChart)
      } catch (error) {
        console.error('Error fetching admin details:', error);
      }
    };    

    fetchAdminDetails();
    console.log(fetchAdminDetails)
  }, []);

  const updateChart = (customAmount, regularAmounts) => {
    const ctx = document.getElementById('myChart');
    console.log(ctx)
    if (ctx) {
      if (chartInstance) {
        chartInstance.destroy();
      }
  
      const isValid = validateAmounts(customAmount, regularAmounts);
      console.log(isValid)
  
      if (isValid) {
        const newChartInstance = new Chart(ctx, {
          type: 'bar',
          data: {
            labels: ['Custom Amount', 'Category 1', 'Category 2', 'Category 4', 'Category 5'],
            datasets: [
              {
                label: '₹', // Set the label to Rupee symbol
                data: [customAmount, ...regularAmounts],
                backgroundColor: '#F0C3F1',
                borderColor: '#FFFFFF',
                borderWidth: 1,
              },
            ]
          },
          options: {
            scales: {
              y: {
                beginAtZero: true,
                scaleLabel: {
                  display: true,
                  labelString: '₹', // Set the y-axis label to Rupee symbol
                },
                ticks: {
                  display: false, // Hide y-axis scale values
                },
              },
            },
          },
        });
  
        setChartInstance(newChartInstance);
        setShowChart(true);
      } else {
        setShowChart(false);
      }
    }
  };

  const validateAmounts = (customAmount, regularAmounts) => {
    console.log('Custom Amount:', customAmount);
    console.log('Regular Amounts:', regularAmounts);

    if (customAmount < 0) {
      setErrorMessage('Custom amount must be a non-negative value.');
      return false;
    }

    for (let i = 1; i < regularAmounts.length; i++) {
      if (regularAmounts[i] >= regularAmounts[i - 1]) {
        console.log(`Invalid: ${regularAmounts[i]} is not less than ${regularAmounts[i - 1]}`);
        setErrorMessage('Amounts must be entered in decreasing order.');
        return false;
      }
    }

    setErrorMessage('');
    return true;
  };

  useEffect(() => {
    if (adminDetails.chargeCustomers) {
      setShowChart(true);
      updateChart(adminDetails.customAmount, adminDetails.regularAmounts);
      updateSaveButtonState(validateAmounts(adminDetails.customAmount, adminDetails.regularAmounts));
    } else {
      setShowChart(false);
      if (chartInstance) {
        chartInstance.destroy();
      }
      updateSaveButtonState(true); // Assuming the button should be enabled when charging is disabled
    }
  }, [adminDetails.chargeCustomers, adminDetails.customAmount, adminDetails.regularAmounts]);

  const handleSave = async () => {
    try {
      if (!validateAmounts(adminDetails.customAmount, adminDetails.regularAmounts)) {
        return;
      }

      const response = await axios.put(`https://stg.dhunjam.in/account/admin/${adminDetails.id}`, {
        amount: {
          category_6: adminDetails.customAmount,
          category_7: adminDetails.regularAmounts[3],
          category_8: adminDetails.regularAmounts[2],
          category_9: adminDetails.regularAmounts[1],
          category_10: adminDetails.regularAmounts[0],
        },
      });

      const updatedAmount = response.data.data.amount.category_6;
      const updatedRegularAmounts = [
        response.data.data.amount.category_10,
        response.data.data.amount.category_9,
        response.data.data.amount.category_8,
        response.data.data.amount.category_7,
      ];

      setAdminDetails((prevDetails) => ({
        ...prevDetails,
        customAmount: updatedAmount,
        regularAmounts: updatedRegularAmounts,
      }));

      updateSaveButtonState(validateAmounts(updatedAmount, updatedRegularAmounts));
      updateChart(updatedAmount, updatedRegularAmounts);
    } catch (error) {
      console.error('Error updating price:', error);
    }
  };

  const handleChargeCustomersChange = (value) => {
    const chargeCustomers = value === 'Yes';
    setAdminDetails((prevDetails) => ({
      ...prevDetails,
      chargeCustomers: chargeCustomers,
    }));

    if (chargeCustomers) {
      updateChart(adminDetails.customAmount, adminDetails.regularAmounts);
      updateSaveButtonState(validateAmounts(adminDetails.customAmount, adminDetails.regularAmounts));
    } else {
      if (chartInstance) {
        chartInstance.destroy();
      }
      updateSaveButtonState(true); // Assuming the button should be enabled when charging is disabled
    }
  };

  const handleCustomAmountChange = (value) => {
    const parsedValue = value === '' ? '0' : parseFloat(value);

    setAdminDetails((prevDetails) => ({
      ...prevDetails,
      customAmount: parsedValue,
    }));

    updateSaveButtonState(validateAmounts(parsedValue, adminDetails.regularAmounts));
    updateChart(parsedValue, adminDetails.regularAmounts);
  };

  const handleRegularAmountChange = (index, value) => {
    const parsedValue = value === '' ? 0 : parseFloat(value);

    setAdminDetails((prevDetails) => ({
      ...prevDetails,
      regularAmounts: [
        ...prevDetails.regularAmounts.slice(0, index),
        parsedValue,
        ...prevDetails.regularAmounts.slice(index + 1),
      ],
    }));

    updateSaveButtonState(validateAmounts(adminDetails.customAmount, adminDetails.regularAmounts));
    updateChart(adminDetails.customAmount, adminDetails.regularAmounts);
  };

  const updateSaveButtonState = (isValid) => {
    setSaveButtonEnabled(isValid);
  };
  return (
  
      <div style={{ fontFamily: 'Poppins', background: '#030303', color: '#FFFFFF', minHeight: '1000vh', padding: '200px' }}>
         <AdminHeader adminDetails={adminDetails} />
         <ChargeCustomersSection
          adminDetails={adminDetails}
          handleChargeCustomersChange={handleChargeCustomersChange}
        />
        <CustomSongRequest
        adminDetails={adminDetails}
        handleCustomAmountChange={handleCustomAmountChange}
      />
      <RegularAmountInputs adminDetails={adminDetails} handleRegularAmountChange={handleRegularAmountChange}/>
      < GraphSection showChart={showChart}/>
      <SaveButton handleSave={handleSave} isSaveButtonEnabled={isSaveButtonEnabled}/>

     

     
      {/* Error Message */}
    </div>
  );
};
   
export default AdminPage;
