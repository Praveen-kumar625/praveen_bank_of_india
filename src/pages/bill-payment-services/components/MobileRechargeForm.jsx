import React, { useState } from 'react';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';
import Icon from '../../../components/AppIcon';

const MobileRechargeForm = ({ selectedProvider, onRechargeSubmit }) => {
  const [formData, setFormData] = useState({
    mobileNumber: '',
    operator: '',
    circle: '',
    amount: '',
    planType: 'prepaid'
  });
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const operators = [
    { value: 'airtel', label: 'Airtel' },
    { value: 'jio', label: 'Jio' },
    { value: 'vi', label: 'Vi (Vodafone Idea)' },
    { value: 'bsnl', label: 'BSNL' }
  ];

  const circles = [
    { value: 'delhi', label: 'Delhi' },
    { value: 'mumbai', label: 'Mumbai' },
    { value: 'kolkata', label: 'Kolkata' },
    { value: 'chennai', label: 'Chennai' },
    { value: 'bangalore', label: 'Bangalore' },
    { value: 'hyderabad', label: 'Hyderabad' }
  ];

  const rechargePlans = [
    {
      id: 1,
      amount: 199,
      validity: "28 days",
      data: "2GB/day",
      calls: "Unlimited",
      sms: "100/day",
      type: "prepaid",
      popular: true
    },
    {
      id: 2,
      amount: 299,
      validity: "28 days",
      data: "2.5GB/day",
      calls: "Unlimited",
      sms: "100/day",
      type: "prepaid",
      popular: false
    },
    {
      id: 3,
      amount: 399,
      validity: "56 days",
      data: "2GB/day",
      calls: "Unlimited",
      sms: "100/day",
      type: "prepaid",
      popular: false
    },
    {
      id: 4,
      amount: 599,
      validity: "84 days",
      data: "2GB/day",
      calls: "Unlimited",
      sms: "100/day",
      type: "prepaid",
      popular: true
    }
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handlePlanSelect = (plan) => {
    setSelectedPlan(plan);
    setFormData(prev => ({ ...prev, amount: plan?.amount?.toString() }));
  };

  const handleSubmit = (e) => {
    e?.preventDefault();
    setIsLoading(true);
    
    setTimeout(() => {
      onRechargeSubmit({
        ...formData,
        selectedPlan,
        provider: selectedProvider
      });
      setIsLoading(false);
    }, 2000);
  };

  if (!selectedProvider) {
    return (
      <div className="bg-card rounded-lg border border-border p-8 text-center">
        <Icon name="Smartphone" size={48} className="text-muted-foreground mx-auto mb-4" />
        <h3 className="text-lg font-medium text-foreground mb-2">Select Mobile Operator</h3>
        <p className="text-muted-foreground">Choose your mobile operator to start recharging.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Recharge Form */}
      <div className="bg-card rounded-lg border border-border">
        <div className="p-6 border-b border-border">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-lg overflow-hidden bg-muted flex items-center justify-center">
              <img
                src={selectedProvider?.logo}
                alt={selectedProvider?.name}
                className="w-full h-full object-contain"
              />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">{selectedProvider?.name}</h3>
              <p className="text-sm text-muted-foreground">Mobile Recharge</p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Plan Type Toggle */}
          <div>
            <label className="text-sm font-medium text-foreground mb-3 block">Plan Type</label>
            <div className="flex bg-muted rounded-lg p-1">
              <button
                type="button"
                onClick={() => handleInputChange('planType', 'prepaid')}
                className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors duration-200 ${
                  formData?.planType === 'prepaid' ?'bg-card text-foreground shadow-sm' :'text-muted-foreground hover:text-foreground'
                }`}
              >
                Prepaid
              </button>
              <button
                type="button"
                onClick={() => handleInputChange('planType', 'postpaid')}
                className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors duration-200 ${
                  formData?.planType === 'postpaid' ?'bg-card text-foreground shadow-sm' :'text-muted-foreground hover:text-foreground'
                }`}
              >
                Postpaid
              </button>
            </div>
          </div>

          {/* Mobile Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Mobile Number"
              type="tel"
              placeholder="Enter 10-digit mobile number"
              value={formData?.mobileNumber}
              onChange={(e) => handleInputChange('mobileNumber', e?.target?.value)}
              required
              maxLength={10}
            />
            <Select
              label="Operator"
              options={operators}
              value={formData?.operator}
              onChange={(value) => handleInputChange('operator', value)}
              placeholder="Select operator"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Select
              label="Circle"
              options={circles}
              value={formData?.circle}
              onChange={(value) => handleInputChange('circle', value)}
              placeholder="Select circle"
              required
            />
            <Input
              label="Amount"
              type="number"
              placeholder="Enter amount"
              value={formData?.amount}
              onChange={(e) => handleInputChange('amount', e?.target?.value)}
              required
              min="10"
              max="10000"
            />
          </div>

          <Button
            type="submit"
            loading={isLoading}
            disabled={!formData?.mobileNumber || !formData?.operator || !formData?.amount}
            iconName="Smartphone"
            iconPosition="left"
            fullWidth
          >
            Recharge Now
          </Button>
        </form>
      </div>
      {/* Popular Plans */}
      {formData?.planType === 'prepaid' && (
        <div className="bg-card rounded-lg border border-border">
          <div className="p-6 border-b border-border">
            <h3 className="font-semibold text-foreground">Popular Recharge Plans</h3>
            <p className="text-sm text-muted-foreground mt-1">Choose from our most popular plans</p>
          </div>
          
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {rechargePlans?.map((plan) => (
                <div
                  key={plan?.id}
                  onClick={() => handlePlanSelect(plan)}
                  className={`p-4 rounded-lg border cursor-pointer transition-all duration-200 hover:shadow-md relative ${
                    selectedPlan?.id === plan?.id
                      ? 'border-primary bg-primary/5 shadow-sm'
                      : 'border-border bg-card hover:border-primary/50'
                  }`}
                >
                  {plan?.popular && (
                    <div className="absolute -top-2 left-4">
                      <span className="bg-warning text-warning-foreground text-xs px-2 py-1 rounded-full">
                        Popular
                      </span>
                    </div>
                  )}
                  
                  <div className="flex items-center justify-between mb-3">
                    <div className="text-2xl font-bold text-foreground">₹{plan?.amount}</div>
                    {selectedPlan?.id === plan?.id && (
                      <Icon name="CheckCircle" size={20} color="var(--color-primary)" />
                    )}
                  </div>
                  
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Validity:</span>
                      <span className="text-foreground font-medium">{plan?.validity}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Data:</span>
                      <span className="text-foreground font-medium">{plan?.data}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Calls:</span>
                      <span className="text-foreground font-medium">{plan?.calls}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">SMS:</span>
                      <span className="text-foreground font-medium">{plan?.sms}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MobileRechargeForm;