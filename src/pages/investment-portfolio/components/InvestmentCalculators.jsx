import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const InvestmentCalculators = () => {
  const [activeCalculator, setActiveCalculator] = useState('sip');
  const [sipData, setSipData] = useState({
    monthlyAmount: '',
    expectedReturn: '',
    timePeriod: '',
    result: null
  });
  const [fdData, setFdData] = useState({
    principalAmount: '',
    interestRate: '',
    tenure: '',
    compoundingFrequency: 'quarterly',
    result: null
  });
  const [goalData, setGoalData] = useState({
    targetAmount: '',
    currentAge: '',
    retirementAge: '',
    expectedReturn: '',
    result: null
  });

  const calculatorTypes = [
    { value: 'sip', label: 'SIP Calculator', icon: 'Repeat' },
    { value: 'fd', label: 'FD Calculator', icon: 'Landmark' },
    { value: 'goal', label: 'Goal Planning', icon: 'Target' }
  ];

  const compoundingOptions = [
    { value: 'monthly', label: 'Monthly' },
    { value: 'quarterly', label: 'Quarterly' },
    { value: 'half-yearly', label: 'Half Yearly' },
    { value: 'yearly', label: 'Yearly' }
  ];

  const calculateSIP = () => {
    const P = parseFloat(sipData?.monthlyAmount);
    const r = parseFloat(sipData?.expectedReturn) / 100 / 12;
    let n = parseFloat(sipData?.timePeriod) * 12;

    if (P && r && n) {
      const futureValue = P * (((1 + r) ** n - 1) / r) * (1 + r);
      const totalInvestment = P * n;
      const totalReturns = futureValue - totalInvestment;

      setSipData(prev => ({
        ...prev,
        result: {
          futureValue: Math.round(futureValue),
          totalInvestment: Math.round(totalInvestment),
          totalReturns: Math.round(totalReturns)
        }
      }));
    }
  };

  const calculateFD = () => {
    const P = parseFloat(fdData?.principalAmount);
    const r = parseFloat(fdData?.interestRate) / 100;
    const t = parseFloat(fdData?.tenure);
    
    let n = 4; // Default quarterly
    if (fdData?.compoundingFrequency === 'monthly') n = 12;
    else if (fdData?.compoundingFrequency === 'half-yearly') n = 2;
    else if (fdData?.compoundingFrequency === 'yearly') n = 1;

    if (P && r && t) {
      const maturityAmount = P * (1 + r / n) ** (n * t);
      const interestEarned = maturityAmount - P;

      setFdData(prev => ({
        ...prev,
        result: {
          maturityAmount: Math.round(maturityAmount),
          interestEarned: Math.round(interestEarned),
          principalAmount: P
        }
      }));
    }
  };

  const calculateGoal = () => {
    const targetAmount = parseFloat(goalData?.targetAmount);
    const yearsToGoal = parseFloat(goalData?.retirementAge) - parseFloat(goalData?.currentAge);
    const expectedReturn = parseFloat(goalData?.expectedReturn) / 100 / 12;
    const months = yearsToGoal * 12;

    if (targetAmount && yearsToGoal && expectedReturn) {
      const monthlyInvestment = (targetAmount * expectedReturn) / (((1 + expectedReturn) ** months) - 1);
      const totalInvestment = monthlyInvestment * months;

      setGoalData(prev => ({
        ...prev,
        result: {
          monthlyInvestment: Math.round(monthlyInvestment),
          totalInvestment: Math.round(totalInvestment),
          targetAmount: targetAmount,
          yearsToGoal: yearsToGoal
        }
      }));
    }
  };

  const renderSIPCalculator = () => (
    <div className="space-y-4">
      <Input
        label="Monthly SIP Amount (₹)"
        type="number"
        placeholder="Enter monthly investment amount"
        value={sipData?.monthlyAmount}
        onChange={(e) => setSipData(prev => ({ ...prev, monthlyAmount: e?.target?.value }))}
      />
      <Input
        label="Expected Annual Return (%)"
        type="number"
        placeholder="Enter expected return percentage"
        value={sipData?.expectedReturn}
        onChange={(e) => setSipData(prev => ({ ...prev, expectedReturn: e?.target?.value }))}
      />
      <Input
        label="Investment Period (Years)"
        type="number"
        placeholder="Enter investment duration"
        value={sipData?.timePeriod}
        onChange={(e) => setSipData(prev => ({ ...prev, timePeriod: e?.target?.value }))}
      />
      <Button variant="default" onClick={calculateSIP} fullWidth>
        Calculate SIP Returns
      </Button>
      
      {sipData?.result && (
        <div className="bg-success/10 rounded-lg p-4 mt-4">
          <h4 className="font-semibold text-success mb-3">SIP Calculation Results</h4>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Future Value:</span>
              <span className="font-semibold">₹{sipData?.result?.futureValue?.toLocaleString('en-IN')}</span>
            </div>
            <div className="flex justify-between">
              <span>Total Investment:</span>
              <span className="font-semibold">₹{sipData?.result?.totalInvestment?.toLocaleString('en-IN')}</span>
            </div>
            <div className="flex justify-between">
              <span>Total Returns:</span>
              <span className="font-semibold text-success">₹{sipData?.result?.totalReturns?.toLocaleString('en-IN')}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  const renderFDCalculator = () => (
    <div className="space-y-4">
      <Input
        label="Principal Amount (₹)"
        type="number"
        placeholder="Enter principal amount"
        value={fdData?.principalAmount}
        onChange={(e) => setFdData(prev => ({ ...prev, principalAmount: e?.target?.value }))}
      />
      <Input
        label="Interest Rate (% p.a.)"
        type="number"
        placeholder="Enter annual interest rate"
        value={fdData?.interestRate}
        onChange={(e) => setFdData(prev => ({ ...prev, interestRate: e?.target?.value }))}
      />
      <Input
        label="Tenure (Years)"
        type="number"
        placeholder="Enter FD tenure"
        value={fdData?.tenure}
        onChange={(e) => setFdData(prev => ({ ...prev, tenure: e?.target?.value }))}
      />
      <Select
        label="Compounding Frequency"
        options={compoundingOptions}
        value={fdData?.compoundingFrequency}
        onChange={(value) => setFdData(prev => ({ ...prev, compoundingFrequency: value }))}
      />
      <Button variant="default" onClick={calculateFD} fullWidth>
        Calculate FD Maturity
      </Button>
      
      {fdData?.result && (
        <div className="bg-success/10 rounded-lg p-4 mt-4">
          <h4 className="font-semibold text-success mb-3">FD Calculation Results</h4>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Maturity Amount:</span>
              <span className="font-semibold">₹{fdData?.result?.maturityAmount?.toLocaleString('en-IN')}</span>
            </div>
            <div className="flex justify-between">
              <span>Principal Amount:</span>
              <span className="font-semibold">₹{fdData?.result?.principalAmount?.toLocaleString('en-IN')}</span>
            </div>
            <div className="flex justify-between">
              <span>Interest Earned:</span>
              <span className="font-semibold text-success">₹{fdData?.result?.interestEarned?.toLocaleString('en-IN')}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  const renderGoalCalculator = () => (
    <div className="space-y-4">
      <Input
        label="Target Amount (₹)"
        type="number"
        placeholder="Enter your financial goal amount"
        value={goalData?.targetAmount}
        onChange={(e) => setGoalData(prev => ({ ...prev, targetAmount: e?.target?.value }))}
      />
      <Input
        label="Current Age"
        type="number"
        placeholder="Enter your current age"
        value={goalData?.currentAge}
        onChange={(e) => setGoalData(prev => ({ ...prev, currentAge: e?.target?.value }))}
      />
      <Input
        label="Target Age"
        type="number"
        placeholder="Enter target achievement age"
        value={goalData?.retirementAge}
        onChange={(e) => setGoalData(prev => ({ ...prev, retirementAge: e?.target?.value }))}
      />
      <Input
        label="Expected Annual Return (%)"
        type="number"
        placeholder="Enter expected return percentage"
        value={goalData?.expectedReturn}
        onChange={(e) => setGoalData(prev => ({ ...prev, expectedReturn: e?.target?.value }))}
      />
      <Button variant="default" onClick={calculateGoal} fullWidth>
        Calculate Monthly Investment
      </Button>
      
      {goalData?.result && (
        <div className="bg-success/10 rounded-lg p-4 mt-4">
          <h4 className="font-semibold text-success mb-3">Goal Planning Results</h4>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Monthly Investment Required:</span>
              <span className="font-semibold">₹{goalData?.result?.monthlyInvestment?.toLocaleString('en-IN')}</span>
            </div>
            <div className="flex justify-between">
              <span>Total Investment:</span>
              <span className="font-semibold">₹{goalData?.result?.totalInvestment?.toLocaleString('en-IN')}</span>
            </div>
            <div className="flex justify-between">
              <span>Target Amount:</span>
              <span className="font-semibold text-success">₹{goalData?.result?.targetAmount?.toLocaleString('en-IN')}</span>
            </div>
            <div className="flex justify-between">
              <span>Time Period:</span>
              <span className="font-semibold">{goalData?.result?.yearsToGoal} years</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  const renderCalculatorContent = () => {
    switch (activeCalculator) {
      case 'sip':
        return renderSIPCalculator();
      case 'fd':
        return renderFDCalculator();
      case 'goal':
        return renderGoalCalculator();
      default:
        return null;
    }
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-foreground">Investment Calculators</h2>
        <Icon name="Calculator" size={20} className="text-primary" />
      </div>
      {/* Calculator Type Selection */}
      <div className="flex flex-wrap gap-2 mb-6">
        {calculatorTypes?.map((calc) => (
          <button
            key={calc?.value}
            onClick={() => setActiveCalculator(calc?.value)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
              activeCalculator === calc?.value
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted text-muted-foreground hover:text-foreground hover:bg-muted/80'
            }`}
          >
            <Icon name={calc?.icon} size={16} />
            <span>{calc?.label}</span>
          </button>
        ))}
      </div>
      {/* Calculator Content */}
      <div className="min-h-[400px]">
        {renderCalculatorContent()}
      </div>
    </div>
  );
};

export default InvestmentCalculators;