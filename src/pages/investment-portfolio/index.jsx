import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import Breadcrumb from '../../components/ui/Breadcrumb';
import PortfolioSummary from './components/PortfolioSummary';
import InvestmentTabs from './components/InvestmentTabs';
import InvestmentCalculators from './components/InvestmentCalculators';
import PerformanceChart from './components/PerformanceChart';
import QuickActions from './components/QuickActions';
import MarketInsights from './components/MarketInsights';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const InvestmentPortfolio = () => {
  const [portfolioData, setPortfolioData] = useState({
    totalValue: 1150000,
    totalInvestment: 980000,
    totalGains: 170000,
    gainPercentage: 17.35,
    dayChange: 8500,
    dayChangePercentage: 0.74
  });

  const [investments, setInvestments] = useState({
    mutualFunds: [
      {
        id: 1,
        name: "HDFC Top 100 Fund",
        category: "Large Cap",
        riskLevel: "Moderate",
        currentValue: 285000,
        investedAmount: 250000,
        returns: 35000,
        returnPercentage: 14.0,
        units: 1156.789,
        nav: 246.50,
        purchaseDate: "15/03/2023"
      },
      {
        id: 2,
        name: "ICICI Prudential Bluechip Fund",
        category: "Large Cap",
        riskLevel: "Moderate",
        currentValue: 195000,
        investedAmount: 180000,
        returns: 15000,
        returnPercentage: 8.33,
        units: 789.456,
        nav: 247.00,
        purchaseDate: "22/06/2023"
      },
      {
        id: 3,
        name: "SBI Small Cap Fund",
        category: "Small Cap",
        riskLevel: "High",
        currentValue: 125000,
        investedAmount: 100000,
        returns: 25000,
        returnPercentage: 25.0,
        units: 456.123,
        nav: 274.15,
        purchaseDate: "10/08/2023"
      }
    ],
    sips: [
      {
        id: 1,
        fundName: "Axis Long Term Equity Fund",
        sipAmount: 10000,
        frequency: "Monthly",
        currentValue: 145000,
        totalInvested: 120000,
        status: "Active",
        nextSipDate: "05/01/2025",
        startDate: "05/01/2023"
      },
      {
        id: 2,
        fundName: "Mirae Asset Large Cap Fund",
        sipAmount: 5000,
        frequency: "Monthly",
        currentValue: 68000,
        totalInvested: 60000,
        status: "Active",
        nextSipDate: "10/01/2025",
        startDate: "10/01/2023"
      }
    ],
    fixedDeposits: [
      {
        id: 1,
        fdNumber: "FD001234567",
        principalAmount: 200000,
        interestRate: 6.75,
        tenure: "3 Years",
        maturityAmount: 243500,
        interestEarned: 43500,
        maturityDate: "15/04/2026",
        daysRemaining: 497
      },
      {
        id: 2,
        fdNumber: "FD001234568",
        principalAmount: 150000,
        interestRate: 7.0,
        tenure: "5 Years",
        maturityAmount: 210375,
        interestEarned: 60375,
        maturityDate: "20/08/2028",
        daysRemaining: 1325
      }
    ],
    recurringDeposits: [
      {
        id: 1,
        rdNumber: "RD001234567",
        monthlyAmount: 5000,
        tenure: "3 Years",
        currentValue: 95000,
        totalDeposited: 90000,
        interestRate: 6.5,
        maturityDate: "10/02/2026",
        nextInstallment: "10/01/2025"
      }
    ],
    dematHoldings: [
      {
        id: 1,
        companyName: "Reliance Industries Ltd",
        symbol: "RELIANCE",
        exchange: "NSE",
        quantity: 50,
        avgPrice: 2450.00,
        ltp: 2680.50,
        currentValue: 134025,
        investedAmount: 122500,
        pnl: 11525,
        pnlPercentage: 9.41
      },
      {
        id: 2,
        companyName: "HDFC Bank Ltd",
        symbol: "HDFCBANK",
        exchange: "NSE",
        quantity: 100,
        avgPrice: 1580.00,
        ltp: 1645.75,
        currentValue: 164575,
        investedAmount: 158000,
        pnl: 6575,
        pnlPercentage: 4.16
      },
      {
        id: 3,
        companyName: "Infosys Ltd",
        symbol: "INFY",
        exchange: "NSE",
        quantity: 75,
        avgPrice: 1420.00,
        ltp: 1385.25,
        currentValue: 103894,
        investedAmount: 106500,
        pnl: -2606,
        pnlPercentage: -2.45
      }
    ]
  });

  const [showNewInvestmentModal, setShowNewInvestmentModal] = useState(false);
  const [selectedInvestmentType, setSelectedInvestmentType] = useState(null);

  useEffect(() => {
    // Simulate real-time portfolio updates
    const interval = setInterval(() => {
      setPortfolioData(prev => ({
        ...prev,
        dayChange: prev?.dayChange + (Math.random() - 0.5) * 1000,
        dayChangePercentage: prev?.dayChangePercentage + (Math.random() - 0.5) * 0.1
      }));
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const handleNewInvestment = (investmentType) => {
    setSelectedInvestmentType(investmentType);
    setShowNewInvestmentModal(true);
  };

  const handleActionComplete = (action, data) => {
    console.log('Investment action completed:', action, data);
    // Here you would typically update the investments state or make an API call
    // For demo purposes, we'll just log the action
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumb />
        
        {/* Page Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Investment Portfolio</h1>
            <p className="text-muted-foreground mt-2">
              Manage your investments, track performance, and explore new opportunities
            </p>
          </div>
          <div className="flex items-center space-x-3">
            <Button
              variant="outline"
              iconName="Download"
              iconPosition="left"
              onClick={() => console.log('Download portfolio report')}
            >
              Download Report
            </Button>
            <Button
              variant="default"
              iconName="Plus"
              iconPosition="left"
              onClick={() => handleNewInvestment('general')}
            >
              New Investment
            </Button>
          </div>
        </div>

        {/* Portfolio Summary */}
        <PortfolioSummary portfolioData={portfolioData} />

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Investment Holdings */}
          <div className="lg:col-span-2 space-y-8">
            <InvestmentTabs 
              investments={investments} 
              onNewInvestment={handleNewInvestment}
            />
            
            <PerformanceChart portfolioData={portfolioData} />
          </div>

          {/* Right Column - Tools and Insights */}
          <div className="space-y-8">
            <QuickActions onActionComplete={handleActionComplete} />
            
            <InvestmentCalculators />
          </div>
        </div>

        {/* Market Insights - Full Width */}
        <div className="mt-8">
          <MarketInsights />
        </div>

        {/* Additional Information Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          <div className="bg-card rounded-lg border border-border p-6">
            <div className="flex items-center space-x-3 mb-4">
              <div className="flex items-center justify-center w-10 h-10 bg-success/10 rounded-lg">
                <Icon name="Shield" size={20} className="text-success" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">Investment Protection</h3>
                <p className="text-sm text-muted-foreground">SEBI regulated investments</p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">
              All your investments are protected under SEBI regulations and investor protection fund guidelines.
            </p>
          </div>

          <div className="bg-card rounded-lg border border-border p-6">
            <div className="flex items-center space-x-3 mb-4">
              <div className="flex items-center justify-center w-10 h-10 bg-primary/10 rounded-lg">
                <Icon name="HeadphonesIcon" size={20} className="text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">Investment Advisory</h3>
                <p className="text-sm text-muted-foreground">Expert guidance available</p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">
              Get personalized investment advice from our certified financial advisors.
            </p>
          </div>

          <div className="bg-card rounded-lg border border-border p-6">
            <div className="flex items-center space-x-3 mb-4">
              <div className="flex items-center justify-center w-10 h-10 bg-accent/10 rounded-lg">
                <Icon name="Smartphone" size={20} className="text-accent" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">Mobile Trading</h3>
                <p className="text-sm text-muted-foreground">Trade on the go</p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">
              Access your portfolio and make investments anytime with our mobile app.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default InvestmentPortfolio;