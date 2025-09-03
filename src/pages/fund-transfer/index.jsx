import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Breadcrumb from '../../components/ui/Breadcrumb';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';

// Import components
import TransferTypeSelector from './components/TransferTypeSelector';
import AccountSelector from './components/AccountSelector';
import BeneficiarySelector from './components/BeneficiarySelector';
import AmountInput from './components/AmountInput';
import TransferLimits from './components/TransferLimits';
import SecurityVerification from './components/SecurityVerification';
import TransferConfirmation from './components/TransferConfirmation';

const FundTransfer = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [transferData, setTransferData] = useState({
    transferType: 'own-account',
    selectedAccount: 'acc-001',
    selectedBeneficiary: '',
    amount: '',
    verified: false,
    completed: false
  });

  // Mock data
  const accounts = [
    {
      id: 'acc-001',
      type: 'Savings Account',
      number: '****1234',
      balance: 125000,
      dailyLimit: 500000,
      dailyUsed: 125000,
      monthlyLimit: 1000000,
      monthlyUsed: 450000
    },
    {
      id: 'acc-002',
      type: 'Current Account',
      number: '****5678',
      balance: 250000,
      dailyLimit: 1000000,
      dailyUsed: 75000,
      monthlyLimit: 2000000,
      monthlyUsed: 800000
    },
    {
      id: 'acc-003',
      type: 'Salary Account',
      number: '****9012',
      balance: 85000,
      dailyLimit: 300000,
      dailyUsed: 50000,
      monthlyLimit: 800000,
      monthlyUsed: 200000
    }
  ];

  const beneficiaries = [
    {
      id: 'ben-001',
      name: 'Priya Sharma',
      accountNumber: '****4567',
      bankName: 'HDFC Bank',
      ifscCode: 'HDFC0001234',
      verified: true
    },
    {
      id: 'ben-002',
      name: 'Amit Kumar',
      accountNumber: '****8901',
      bankName: 'ICICI Bank',
      ifscCode: 'ICIC0002345',
      verified: true
    },
    {
      id: 'ben-003',
      name: 'Sunita Patel',
      accountNumber: '****2345',
      bankName: 'Axis Bank',
      ifscCode: 'UTIB0003456',
      verified: true
    }
  ];

  const steps = [
    { id: 1, title: 'Transfer Details', icon: 'CreditCard' },
    { id: 2, title: 'Review & Verify', icon: 'Shield' },
    { id: 3, title: 'Confirmation', icon: 'CheckCircle' }
  ];

  const handleTypeChange = (type) => {
    setTransferData(prev => ({ ...prev, transferType: type }));
  };

  const handleAccountChange = (accountId) => {
    setTransferData(prev => ({ ...prev, selectedAccount: accountId }));
  };

  const handleBeneficiaryChange = (beneficiaryId) => {
    setTransferData(prev => ({ ...prev, selectedBeneficiary: beneficiaryId }));
  };

  const handleAmountChange = (amount) => {
    setTransferData(prev => ({ ...prev, amount }));
  };

  const handleNextStep = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePreviousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleVerificationComplete = (verified) => {
    setTransferData(prev => ({ ...prev, verified }));
    if (verified) {
      setCurrentStep(3);
      setTransferData(prev => ({ ...prev, completed: true }));
    }
  };

  const handleNewTransfer = () => {
    setCurrentStep(1);
    setTransferData({
      transferType: 'own-account',
      selectedAccount: 'acc-001',
      selectedBeneficiary: '',
      amount: '',
      verified: false,
      completed: false
    });
  };

  const handleViewHistory = () => {
    navigate('/transaction-history');
  };

  const canProceedToNext = () => {
    if (currentStep === 1) {
      const hasAmount = transferData?.amount && parseFloat(transferData?.amount) > 0;
      const hasValidBeneficiary = transferData?.transferType === 'own-account' || 
                                  transferData?.transferType === 'saved-beneficiary' && transferData?.selectedBeneficiary ||
                                  transferData?.transferType === 'new-beneficiary' ||
                                  transferData?.transferType === 'upi-payment';
      return hasAmount && hasValidBeneficiary;
    }
    return true;
  };

  const getTransferDetails = () => {
    const selectedAccount = accounts?.find(acc => acc?.id === transferData?.selectedAccount);
    const amount = parseFloat(transferData?.amount || 0);
    const charges = transferData?.transferType === 'upi-payment' || transferData?.transferType === 'own-account' 
      ? 0 
      : amount <= 10000 ? 2.5 : amount <= 100000 ? 5 : 15;
    
    return {
      amount: amount?.toLocaleString('en-IN'),
      charges: charges?.toFixed(2),
      total: (amount + charges)?.toLocaleString('en-IN', { minimumFractionDigits: 2 }),
      fromAccount: selectedAccount,
      toAccount: transferData?.transferType === 'saved-beneficiary' 
        ? beneficiaries?.find(b => b?.id === transferData?.selectedBeneficiary)
        : { name: 'New Beneficiary', number: '****0000', bank: 'Bank Name' },
      purpose: 'Family Maintenance',
      reference: 'Monthly Transfer'
    };
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumb />
        
        {/* Page Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Fund Transfer</h1>
            <p className="text-muted-foreground mt-2">
              Transfer money securely between accounts and beneficiaries
            </p>
          </div>
          <div className="hidden md:flex items-center space-x-2 px-4 py-2 bg-success/10 rounded-lg">
            <Icon name="Shield" size={16} className="text-success" />
            <span className="text-sm font-medium text-success">Secure Transfer</span>
          </div>
        </div>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-center space-x-4 md:space-x-8">
            {steps?.map((step, index) => (
              <div key={step?.id} className="flex items-center">
                <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all duration-200 ${
                  currentStep >= step?.id
                    ? 'bg-primary border-primary text-primary-foreground'
                    : 'border-border text-muted-foreground'
                }`}>
                  {currentStep > step?.id ? (
                    <Icon name="Check" size={20} />
                  ) : (
                    <Icon name={step?.icon} size={20} />
                  )}
                </div>
                <div className="ml-3 hidden sm:block">
                  <p className={`text-sm font-medium ${
                    currentStep >= step?.id ? 'text-foreground' : 'text-muted-foreground'
                  }`}>
                    {step?.title}
                  </p>
                </div>
                {index < steps?.length - 1 && (
                  <div className={`w-12 md:w-20 h-0.5 mx-4 ${
                    currentStep > step?.id ? 'bg-primary' : 'bg-border'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Main Form */}
          <div className="lg:col-span-2 space-y-6">
            {currentStep === 1 && (
              <>
                <TransferTypeSelector
                  selectedType={transferData?.transferType}
                  onTypeChange={handleTypeChange}
                />
                
                <AccountSelector
                  selectedAccount={transferData?.selectedAccount}
                  onAccountChange={handleAccountChange}
                  accounts={accounts}
                />
                
                <BeneficiarySelector
                  transferType={transferData?.transferType}
                  selectedBeneficiary={transferData?.selectedBeneficiary}
                  onBeneficiaryChange={handleBeneficiaryChange}
                  beneficiaries={beneficiaries}
                />
                
                <AmountInput
                  amount={transferData?.amount}
                  onAmountChange={handleAmountChange}
                  transferType={transferData?.transferType}
                  selectedAccount={transferData?.selectedAccount}
                  accounts={accounts}
                />
              </>
            )}

            {currentStep === 2 && (
              <SecurityVerification
                onVerificationComplete={handleVerificationComplete}
                transferDetails={getTransferDetails()}
              />
            )}

            {currentStep === 3 && (
              <TransferConfirmation
                transferDetails={getTransferDetails()}
                onNewTransfer={handleNewTransfer}
                onViewHistory={handleViewHistory}
              />
            )}
          </div>

          {/* Right Column - Limits & Info */}
          <div className="space-y-6">
            {currentStep === 1 && (
              <TransferLimits
                transferType={transferData?.transferType}
                selectedAccount={transferData?.selectedAccount}
                accounts={accounts}
              />
            )}

            {/* Quick Actions */}
            <div className="bg-card rounded-lg border border-border p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <Button
                  variant="outline"
                  onClick={() => navigate('/transaction-history')}
                  iconName="History"
                  iconPosition="left"
                  fullWidth
                >
                  Transaction History
                </Button>
                <Button
                  variant="outline"
                  onClick={() => navigate('/account-dashboard')}
                  iconName="LayoutDashboard"
                  iconPosition="left"
                  fullWidth
                >
                  Dashboard
                </Button>
                <Button
                  variant="outline"
                  onClick={() => navigate('/bill-payment-services')}
                  iconName="Receipt"
                  iconPosition="left"
                  fullWidth
                >
                  Bill Payments
                </Button>
              </div>
            </div>

            {/* Customer Support */}
            <div className="bg-card rounded-lg border border-border p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4">Need Help?</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Icon name="Phone" size={16} className="text-primary" />
                  <div>
                    <p className="text-sm font-medium text-foreground">Customer Care</p>
                    <p className="text-xs text-muted-foreground">1800-123-4567 (Toll Free)</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Icon name="MessageCircle" size={16} className="text-primary" />
                  <div>
                    <p className="text-sm font-medium text-foreground">Live Chat</p>
                    <p className="text-xs text-muted-foreground">Available 24x7</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Icon name="Mail" size={16} className="text-primary" />
                  <div>
                    <p className="text-sm font-medium text-foreground">Email Support</p>
                    <p className="text-xs text-muted-foreground">support@praveenbank.in</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Buttons */}
        {currentStep < 3 && (
          <div className="flex justify-between mt-8">
            <Button
              variant="outline"
              onClick={handlePreviousStep}
              disabled={currentStep === 1}
              iconName="ChevronLeft"
              iconPosition="left"
            >
              Previous
            </Button>
            <Button
              onClick={handleNextStep}
              disabled={!canProceedToNext()}
              iconName="ChevronRight"
              iconPosition="right"
            >
              {currentStep === 1 ? 'Review Transfer' : 'Verify & Transfer'}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default FundTransfer;