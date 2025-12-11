import React, { useState } from 'react';
import KPICards from '../components/dashboard/KPICards';
import PerformanceChart from '../components/dashboard/PerformanceChart';
import CampaignsTable from '../components/dashboard/CampaignsTable';
import DashboardSidebar from '../components/dashboard/DashboardSidebar';
import DashboardHeader from '../components/dashboard/DashboardHeader';

const Dashboard = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('7days');

  return (
    <div className="min-h-screen bg-[#0a0a0a] font-['Poppins',sans-serif]">
      <DashboardSidebar />
      
      <div className="lg:ml-64">
        <DashboardHeader 
          selectedPeriod={selectedPeriod}
          setSelectedPeriod={setSelectedPeriod}
        />
        
        <main className="p-6 lg:p-8">
          <div className="max-w-[1400px] mx-auto space-y-8">
            <KPICards />
            <PerformanceChart period={selectedPeriod} />
            <CampaignsTable />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
