import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import Breadcrumb from '../../components/ui/Breadcrumb';
import ServiceCategoryTabs from './components/ServiceCategoryTabs';
import ServiceProviderGrid from './components/ServiceProviderGrid';
import BillPaymentForm from './components/BillPaymentForm';
import MobileRechargeForm from './components/MobileRechargeForm';
import RecentPayments from './components/RecentPayments';
import UpcomingBills from './components/UpcomingBills';
import AutoPaySetup from './components/AutoPaySetup';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const BillPaymentServices = () => {
  const [activeCategory, setActiveCategory] = useState('electricity');
  const [selectedProvider, setSelectedProvider] = useState(null);
  const [activeTab, setActiveTab] = useState('pay-bills');
  const [showAutoPaySetup, setShowAutoPaySetup] = useState(false);

  const serviceCategories = [
    {
      id: 'electricity',
      name: 'Electricity',
      icon: 'Zap',
      description: 'Pay electricity bills',
      count: 12
    },
    {
      id: 'gas',
      name: 'Gas',
      icon: 'Flame',
      description: 'Pay gas bills',
      count: 8
    },
    {
      id: 'water',
      name: 'Water',
      icon: 'Droplets',
      description: 'Pay water bills',
      count: 6
    },
    {
      id: 'telecom',
      name: 'Telecom',
      icon: 'Phone',
      description: 'Pay phone bills',
      count: 15
    },
    {
      id: 'dth',
      name: 'DTH/Cable',
      icon: 'Tv',
      description: 'Pay DTH & cable bills',
      count: 10
    },
    {
      id: 'mobile',
      name: 'Mobile',
      icon: 'Smartphone',
      description: 'Mobile recharge',
      count: 8
    },
    {
      id: 'insurance',
      name: 'Insurance',
      icon: 'Shield',
      description: 'Pay insurance premiums',
      count: 20
    },
    {
      id: 'loan',
      name: 'Loan EMI',
      icon: 'CreditCard',
      description: 'Pay loan EMIs',
      count: 25
    }
  ];

  const serviceProviders = {
    electricity: [
      {
        id: 'bescom',
        name: 'BESCOM',
        category: 'Electricity Board',
        logo: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=100&h=100&fit=crop&crop=center',
        coverage: 'Karnataka',
        processingTime: 'Instant',
        features: ['Bill Fetch', 'Auto-Pay', 'Instant Receipt'],
        isPopular: true
      },
      {
        id: 'kseb',
        name: 'KSEB',
        category: 'Kerala State Electricity Board',
        logo: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=100&h=100&fit=crop&crop=center',
        coverage: 'Kerala',
        processingTime: 'Instant',
        features: ['Bill Fetch', 'Auto-Pay']
      },
      {
        id: 'tneb',
        name: 'TNEB',
        category: 'Tamil Nadu Electricity Board',
        logo: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=100&h=100&fit=crop&crop=center',
        coverage: 'Tamil Nadu',
        processingTime: 'Instant',
        features: ['Bill Fetch', 'Auto-Pay', 'Instant Receipt']
      },
      {
        id: 'mseb',
        name: 'MSEB',
        category: 'Maharashtra State Electricity Board',
        logo: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=100&h=100&fit=crop&crop=center',
        coverage: 'Maharashtra',
        processingTime: 'Instant',
        features: ['Bill Fetch', 'Auto-Pay']
      }
    ],
    mobile: [
      {
        id: 'airtel',
        name: 'Airtel',
        category: 'Mobile Operator',
        logo: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=100&h=100&fit=crop&crop=center',
        coverage: 'Pan India',
        processingTime: 'Instant',
        features: ['Prepaid', 'Postpaid', 'Data Plans'],
        isPopular: true
      },
      {
        id: 'jio',
        name: 'Jio',
        category: 'Mobile Operator',
        logo: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=100&h=100&fit=crop&crop=center',
        coverage: 'Pan India',
        processingTime: 'Instant',
        features: ['Prepaid', 'Postpaid', 'Data Plans'],
        isPopular: true
      },
      {
        id: 'vi',
        name: 'Vi (Vodafone Idea)',
        category: 'Mobile Operator',
        logo: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=100&h=100&fit=crop&crop=center',
        coverage: 'Pan India',
        processingTime: 'Instant',
        features: ['Prepaid', 'Postpaid', 'Data Plans']
      },
      {
        id: 'bsnl',
        name: 'BSNL',
        category: 'Mobile Operator',
        logo: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=100&h=100&fit=crop&crop=center',
        coverage: 'Pan India',
        processingTime: 'Instant',
        features: ['Prepaid', 'Postpaid']
      }
    ],
    gas: [
      {
        id: 'indane',
        name: 'Indane Gas',
        category: 'LPG Provider',
        logo: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=100&h=100&fit=crop&crop=center',
        coverage: 'Pan India',
        processingTime: 'Instant',
        features: ['Cylinder Booking', 'Subsidy Transfer'],
        isPopular: true
      },
      {
        id: 'hp',
        name: 'HP Gas',
        category: 'LPG Provider',
        logo: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=100&h=100&fit=crop&crop=center',
        coverage: 'Pan India',
        processingTime: 'Instant',
        features: ['Cylinder Booking', 'Subsidy Transfer']
      }
    ]
  };

  const savedBillers = [
    {
      id: 1,
      nickname: 'Home Electricity',
      customerNumber: 'KA12345678',
      providerName: 'BESCOM'
    },
    {
      id: 2,
      nickname: 'Office Gas',
      customerNumber: 'IN87654321',
      providerName: 'Indane Gas'
    }
  ];

  const recentPayments = [
    {
      id: 1,
      providerName: 'BESCOM',
      providerLogo: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=100&h=100&fit=crop&crop=center',
      description: 'Electricity Bill - Home',
      amount: '2,450',
      date: '2025-01-02',
      status: 'completed',
      transactionId: 'TXN123456789'
    },
    {
      id: 2,
      providerName: 'Airtel',
      providerLogo: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=100&h=100&fit=crop&crop=center',
      description: 'Mobile Recharge - 9876543210',
      amount: '399',
      date: '2025-01-01',
      status: 'completed',
      transactionId: 'TXN123456788'
    },
    {
      id: 3,
      providerName: 'Indane Gas',
      providerLogo: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=100&h=100&fit=crop&crop=center',
      description: 'LPG Cylinder Booking',
      amount: '850',
      date: '2024-12-30',
      status: 'pending',
      transactionId: 'TXN123456787'
    }
  ];

  const upcomingBills = [
    {
      id: 1,
      providerName: 'KSEB',
      providerLogo: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=100&h=100&fit=crop&crop=center',
      description: 'Electricity Bill - Home',
      amount: '1,850',
      dueDate: '2025-01-05',
      customerNumber: 'KL98765432'
    },
    {
      id: 2,
      providerName: 'Jio',
      providerLogo: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=100&h=100&fit=crop&crop=center',
      description: 'Postpaid Bill - 9876543210',
      amount: '599',
      dueDate: '2025-01-08',
      customerNumber: '9876543210'
    },
    {
      id: 3,
      providerName: 'HDFC Life',
      providerLogo: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=100&h=100&fit=crop&crop=center',
      description: 'Life Insurance Premium',
      amount: '12,500',
      dueDate: '2025-01-15',
      customerNumber: 'POL123456789'
    }
  ];

  const handleCategoryChange = (categoryId) => {
    setActiveCategory(categoryId);
    setSelectedProvider(null);
  };

  const handleProviderSelect = (provider) => {
    setSelectedProvider(provider);
  };

  const handlePaymentSubmit = (paymentData) => {
    console.log('Payment submitted:', paymentData);
    // Handle payment processing
    alert('Payment processed successfully!');
  };

  const handleRechargeSubmit = (rechargeData) => {
    console.log('Recharge submitted:', rechargeData);
    // Handle recharge processing
    alert('Recharge processed successfully!');
  };

  const handleRepeatPayment = (payment) => {
    console.log('Repeat payment:', payment);
    // Handle repeat payment
  };

  const handleViewAllPayments = () => {
    console.log('View all payments');
    // Navigate to transaction history
  };

  const handleSetReminder = (bill) => {
    console.log('Set reminder for:', bill);
    // Handle reminder setup
    alert('Reminder set successfully!');
  };

  const handlePayNow = (bill) => {
    console.log('Pay now:', bill);
    // Handle immediate payment
  };

  const handleAutoPaySetup = (setupData) => {
    console.log('Auto-pay setup:', setupData);
    setShowAutoPaySetup(false);
    alert('Auto-pay setup completed successfully!');
  };

  const getCurrentProviders = () => {
    return serviceProviders?.[activeCategory] || [];
  };

  const renderMainContent = () => {
    if (showAutoPaySetup) {
      return (
        <AutoPaySetup
          selectedBiller={selectedProvider}
          onSetupComplete={handleAutoPaySetup}
        />
      );
    }

    switch (activeTab) {
      case 'pay-bills':
        return (
          <div className="space-y-6">
            <ServiceCategoryTabs
              activeCategory={activeCategory}
              onCategoryChange={handleCategoryChange}
              categories={serviceCategories}
            />
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-4">
                    Select Service Provider
                  </h3>
                  <ServiceProviderGrid
                    providers={getCurrentProviders()}
                    onProviderSelect={handleProviderSelect}
                    selectedProvider={selectedProvider}
                  />
                </div>
                
                {activeCategory === 'mobile' ? (
                  <MobileRechargeForm
                    selectedProvider={selectedProvider}
                    onRechargeSubmit={handleRechargeSubmit}
                  />
                ) : (
                  <BillPaymentForm
                    selectedProvider={selectedProvider}
                    onPaymentSubmit={handlePaymentSubmit}
                    savedBillers={savedBillers}
                  />
                )}
              </div>
              
              <div className="space-y-6">
                <RecentPayments
                  payments={recentPayments}
                  onViewAll={handleViewAllPayments}
                  onRepeatPayment={handleRepeatPayment}
                />
              </div>
            </div>
          </div>
        );
      
      case 'upcoming-bills':
        return (
          <UpcomingBills
            bills={upcomingBills}
            onSetReminder={handleSetReminder}
            onPayNow={handlePayNow}
          />
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-6 py-8">
        <Breadcrumb />
        
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Bill Payment Services</h1>
              <p className="text-muted-foreground mt-2">
                Pay utility bills, recharge mobile, and manage your payments effortlessly
              </p>
            </div>
            
            <div className="flex items-center space-x-3">
              <Button
                variant="outline"
                onClick={() => setShowAutoPaySetup(!showAutoPaySetup)}
                iconName="Repeat"
                iconPosition="left"
              >
                Auto-Pay Setup
              </Button>
              <Button
                variant="default"
                iconName="Plus"
                iconPosition="left"
              >
                Add Biller
              </Button>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-card rounded-lg border border-border p-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-lg bg-success/10 flex items-center justify-center">
                <Icon name="CheckCircle" size={20} color="var(--color-success)" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">This Month</p>
                <p className="text-2xl font-bold text-foreground">₹8,450</p>
              </div>
            </div>
          </div>
          
          <div className="bg-card rounded-lg border border-border p-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-lg bg-warning/10 flex items-center justify-center">
                <Icon name="Clock" size={20} color="var(--color-warning)" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Pending Bills</p>
                <p className="text-2xl font-bold text-foreground">3</p>
              </div>
            </div>
          </div>
          
          <div className="bg-card rounded-lg border border-border p-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Icon name="Repeat" size={20} color="var(--color-primary)" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Auto-Pay Active</p>
                <p className="text-2xl font-bold text-foreground">5</p>
              </div>
            </div>
          </div>
          
          <div className="bg-card rounded-lg border border-border p-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                <Icon name="TrendingUp" size={20} color="var(--color-accent)" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Saved This Year</p>
                <p className="text-2xl font-bold text-foreground">₹2,340</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="bg-card rounded-lg border border-border mb-6">
          <div className="flex border-b border-border">
            <button
              onClick={() => setActiveTab('pay-bills')}
              className={`flex items-center space-x-2 px-6 py-4 text-sm font-medium transition-colors duration-200 border-b-2 ${
                activeTab === 'pay-bills' ?'border-primary text-primary bg-primary/5' :'border-transparent text-muted-foreground hover:text-foreground hover:bg-muted/50'
              }`}
            >
              <Icon name="CreditCard" size={18} />
              <span>Pay Bills</span>
            </button>
            <button
              onClick={() => setActiveTab('upcoming-bills')}
              className={`flex items-center space-x-2 px-6 py-4 text-sm font-medium transition-colors duration-200 border-b-2 ${
                activeTab === 'upcoming-bills' ?'border-primary text-primary bg-primary/5' :'border-transparent text-muted-foreground hover:text-foreground hover:bg-muted/50'
              }`}
            >
              <Icon name="Calendar" size={18} />
              <span>Upcoming Bills</span>
            </button>
          </div>
        </div>

        {/* Main Content */}
        {renderMainContent()}
      </main>
    </div>
  );
};

export default BillPaymentServices;