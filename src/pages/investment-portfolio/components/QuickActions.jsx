import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const QuickActions = ({ onActionComplete }) => {
  const [activeAction, setActiveAction] = useState(null);
  const [formData, setFormData] = useState({});

  const quickActions = [
    {
      id: 'start-sip',
      title: 'Start New SIP',
      description: 'Begin systematic investment plan',
      icon: 'Repeat',
      color: 'bg-primary',
      textColor: 'text-primary-foreground'
    },
    {
      id: 'create-fd',
      title: 'Create Fixed Deposit',
      description: 'Open new fixed deposit account',
      icon: 'Landmark',
      color: 'bg-success',
      textColor: 'text-success-foreground'
    },
    {
      id: 'buy-mutual-fund',
      title: 'Buy Mutual Fund',
      description: 'Invest in mutual fund schemes',
      icon: 'PieChart',
      color: 'bg-accent',
      textColor: 'text-accent-foreground'
    },
    {
      id: 'rebalance',
      title: 'Rebalance Portfolio',
      description: 'Optimize asset allocation',
      icon: 'Scale',
      color: 'bg-warning',
      textColor: 'text-warning-foreground'
    }
  ];

  const mutualFundOptions = [
    { value: 'equity-large-cap', label: 'Large Cap Equity Fund' },
    { value: 'equity-mid-cap', label: 'Mid Cap Equity Fund' },
    { value: 'equity-small-cap', label: 'Small Cap Equity Fund' },
    { value: 'hybrid-balanced', label: 'Balanced Hybrid Fund' },
    { value: 'debt-liquid', label: 'Liquid Debt Fund' },
    { value: 'debt-gilt', label: 'Gilt Fund' }
  ];

  const sipFrequencyOptions = [
    { value: 'monthly', label: 'Monthly' },
    { value: 'quarterly', label: 'Quarterly' },
    { value: 'half-yearly', label: 'Half Yearly' }
  ];

  const fdTenureOptions = [
    { value: '1', label: '1 Year' },
    { value: '2', label: '2 Years' },
    { value: '3', label: '3 Years' },
    { value: '5', label: '5 Years' },
    { value: '10', label: '10 Years' }
  ];

  const handleActionClick = (actionId) => {
    setActiveAction(actionId);
    setFormData({});
  };

  const handleFormSubmit = (e) => {
    e?.preventDefault();
    // Process the form submission
    console.log('Form submitted:', { action: activeAction, data: formData });
    onActionComplete?.(activeAction, formData);
    setActiveAction(null);
    setFormData({});
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const renderActionForm = () => {
    switch (activeAction) {
      case 'start-sip':
        return (
          <form onSubmit={handleFormSubmit} className="space-y-4">
            <Select
              label="Select Mutual Fund"
              options={mutualFundOptions}
              value={formData?.fundType || ''}
              onChange={(value) => handleInputChange('fundType', value)}
              required
            />
            <Input
              label="Monthly SIP Amount (₹)"
              type="number"
              placeholder="Enter SIP amount"
              value={formData?.sipAmount || ''}
              onChange={(e) => handleInputChange('sipAmount', e?.target?.value)}
              required
            />
            <Select
              label="SIP Frequency"
              options={sipFrequencyOptions}
              value={formData?.frequency || 'monthly'}
              onChange={(value) => handleInputChange('frequency', value)}
            />
            <Input
              label="Start Date"
              type="date"
              value={formData?.startDate || ''}
              onChange={(e) => handleInputChange('startDate', e?.target?.value)}
              required
            />
            <div className="flex space-x-3 pt-4">
              <Button type="submit" variant="default" fullWidth>
                Start SIP
              </Button>
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => setActiveAction(null)}
                fullWidth
              >
                Cancel
              </Button>
            </div>
          </form>
        );

      case 'create-fd':
        return (
          <form onSubmit={handleFormSubmit} className="space-y-4">
            <Input
              label="Principal Amount (₹)"
              type="number"
              placeholder="Enter deposit amount"
              value={formData?.principalAmount || ''}
              onChange={(e) => handleInputChange('principalAmount', e?.target?.value)}
              required
            />
            <Select
              label="Tenure"
              options={fdTenureOptions}
              value={formData?.tenure || ''}
              onChange={(value) => handleInputChange('tenure', value)}
              required
            />
            <Input
              label="Interest Rate (% p.a.)"
              type="number"
              step="0.01"
              placeholder="Current rate: 6.75%"
              value={formData?.interestRate || '6.75'}
              onChange={(e) => handleInputChange('interestRate', e?.target?.value)}
              required
            />
            <div className="bg-muted/30 rounded-lg p-3">
              <div className="text-sm text-muted-foreground">Estimated Maturity Amount</div>
              <div className="text-lg font-semibold text-foreground">
                ₹{formData?.principalAmount && formData?.tenure ? 
                  Math.round(parseFloat(formData?.principalAmount) * Math.pow(1 + (parseFloat(formData?.interestRate || 6.75) / 100), parseFloat(formData?.tenure)))?.toLocaleString('en-IN') 
                  : '0'}
              </div>
            </div>
            <div className="flex space-x-3 pt-4">
              <Button type="submit" variant="default" fullWidth>
                Create FD
              </Button>
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => setActiveAction(null)}
                fullWidth
              >
                Cancel
              </Button>
            </div>
          </form>
        );

      case 'buy-mutual-fund':
        return (
          <form onSubmit={handleFormSubmit} className="space-y-4">
            <Select
              label="Select Mutual Fund"
              options={mutualFundOptions}
              value={formData?.fundType || ''}
              onChange={(value) => handleInputChange('fundType', value)}
              required
            />
            <Input
              label="Investment Amount (₹)"
              type="number"
              placeholder="Enter investment amount"
              value={formData?.investmentAmount || ''}
              onChange={(e) => handleInputChange('investmentAmount', e?.target?.value)}
              required
            />
            <div className="bg-muted/30 rounded-lg p-3">
              <div className="text-sm text-muted-foreground">Current NAV</div>
              <div className="text-lg font-semibold text-foreground">₹245.67</div>
              <div className="text-xs text-success">+1.2% today</div>
            </div>
            <div className="flex space-x-3 pt-4">
              <Button type="submit" variant="default" fullWidth>
                Buy Now
              </Button>
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => setActiveAction(null)}
                fullWidth
              >
                Cancel
              </Button>
            </div>
          </form>
        );

      case 'rebalance':
        return (
          <div className="space-y-4">
            <div className="bg-warning/10 rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-2">
                <Icon name="AlertTriangle" size={16} className="text-warning" />
                <span className="font-medium text-warning">Portfolio Rebalancing</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Your current allocation deviates from your target. Consider rebalancing to optimize returns.
              </p>
            </div>
            
            <div className="space-y-3">
              <div className="flex justify-between items-center p-3 bg-muted/30 rounded-lg">
                <span className="text-sm">Equity Funds</span>
                <div className="text-right">
                  <div className="text-sm font-medium">Current: 65%</div>
                  <div className="text-xs text-muted-foreground">Target: 60%</div>
                </div>
              </div>
              <div className="flex justify-between items-center p-3 bg-muted/30 rounded-lg">
                <span className="text-sm">Debt Funds</span>
                <div className="text-right">
                  <div className="text-sm font-medium">Current: 25%</div>
                  <div className="text-xs text-muted-foreground">Target: 30%</div>
                </div>
              </div>
              <div className="flex justify-between items-center p-3 bg-muted/30 rounded-lg">
                <span className="text-sm">Others</span>
                <div className="text-right">
                  <div className="text-sm font-medium">Current: 10%</div>
                  <div className="text-xs text-muted-foreground">Target: 10%</div>
                </div>
              </div>
            </div>

            <div className="flex space-x-3 pt-4">
              <Button 
                onClick={() => {
                  handleFormSubmit({ preventDefault: () => {} });
                }} 
                variant="default" 
                fullWidth
              >
                Auto Rebalance
              </Button>
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => setActiveAction(null)}
                fullWidth
              >
                Cancel
              </Button>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-foreground">Quick Actions</h2>
        <Icon name="Zap" size={20} className="text-primary" />
      </div>
      {!activeAction ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {quickActions?.map((action) => (
            <button
              key={action?.id}
              onClick={() => handleActionClick(action?.id)}
              className="flex items-center space-x-4 p-4 bg-muted/30 rounded-lg border border-border hover:bg-muted/50 transition-colors duration-200 text-left"
            >
              <div className={`flex items-center justify-center w-12 h-12 rounded-lg ${action?.color}`}>
                <Icon name={action?.icon} size={20} className={action?.textColor} />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">{action?.title}</h3>
                <p className="text-sm text-muted-foreground">{action?.description}</p>
              </div>
            </button>
          ))}
        </div>
      ) : (
        <div>
          <div className="flex items-center space-x-2 mb-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setActiveAction(null)}
              iconName="ArrowLeft"
              iconSize={16}
            />
            <h3 className="font-semibold text-foreground">
              {quickActions?.find(a => a?.id === activeAction)?.title}
            </h3>
          </div>
          {renderActionForm()}
        </div>
      )}
    </div>
  );
};

export default QuickActions;