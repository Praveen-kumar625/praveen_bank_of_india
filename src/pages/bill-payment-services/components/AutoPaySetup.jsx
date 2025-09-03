import React, { useState } from 'react';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';
import Icon from '../../../components/AppIcon';

const AutoPaySetup = ({ selectedBiller, onSetupComplete }) => {
  const [formData, setFormData] = useState({
    frequency: 'monthly',
    amount: '',
    maxAmount: '',
    paymentMethod: '',
    startDate: '',
    endDate: '',
    enableNotifications: true,
    enableLimitAlerts: true
  });
  const [isLoading, setIsLoading] = useState(false);

  const frequencyOptions = [
    { value: 'monthly', label: 'Monthly' },
    { value: 'quarterly', label: 'Quarterly' },
    { value: 'half-yearly', label: 'Half Yearly' },
    { value: 'yearly', label: 'Yearly' }
  ];

  const paymentMethods = [
    { value: 'savings_1234', label: 'Savings Account (****1234)' },
    { value: 'current_5678', label: 'Current Account (****5678)' }
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e) => {
    e?.preventDefault();
    setIsLoading(true);
    
    setTimeout(() => {
      onSetupComplete({
        ...formData,
        biller: selectedBiller
      });
      setIsLoading(false);
    }, 2000);
  };

  if (!selectedBiller) {
    return (
      <div className="bg-card rounded-lg border border-border p-8 text-center">
        <Icon name="Repeat" size={48} className="text-muted-foreground mx-auto mb-4" />
        <h3 className="text-lg font-medium text-foreground mb-2">Select a Biller</h3>
        <p className="text-muted-foreground">Choose a biller to set up automatic payments.</p>
      </div>
    );
  }

  return (
    <div className="bg-card rounded-lg border border-border">
      <div className="p-6 border-b border-border">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
            <Icon name="Repeat" size={20} color="var(--color-primary)" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground">Auto-Pay Setup</h3>
            <p className="text-sm text-muted-foreground">Set up automatic payments for {selectedBiller?.name}</p>
          </div>
        </div>
      </div>
      <form onSubmit={handleSubmit} className="p-6 space-y-6">
        {/* Biller Information */}
        <div className="bg-muted/50 rounded-lg p-4">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-lg overflow-hidden bg-card flex items-center justify-center">
              <img
                src={selectedBiller?.logo}
                alt={selectedBiller?.name}
                className="w-full h-full object-contain"
              />
            </div>
            <div>
              <h4 className="font-medium text-foreground">{selectedBiller?.name}</h4>
              <p className="text-sm text-muted-foreground">{selectedBiller?.customerNumber}</p>
            </div>
          </div>
        </div>

        {/* Payment Schedule */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Select
            label="Payment Frequency"
            options={frequencyOptions}
            value={formData?.frequency}
            onChange={(value) => handleInputChange('frequency', value)}
            required
          />
          <Input
            label="Start Date"
            type="date"
            value={formData?.startDate}
            onChange={(e) => handleInputChange('startDate', e?.target?.value)}
            required
            min={new Date()?.toISOString()?.split('T')?.[0]}
          />
        </div>

        {/* Payment Amount */}
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Fixed Amount (Optional)"
              type="number"
              placeholder="Leave blank for bill amount"
              value={formData?.amount}
              onChange={(e) => handleInputChange('amount', e?.target?.value)}
              description="If specified, this amount will be paid regardless of bill amount"
            />
            <Input
              label="Maximum Amount Limit"
              type="number"
              placeholder="Enter maximum limit"
              value={formData?.maxAmount}
              onChange={(e) => handleInputChange('maxAmount', e?.target?.value)}
              required
              description="Auto-pay will be skipped if bill exceeds this amount"
            />
          </div>
        </div>

        {/* Payment Method */}
        <Select
          label="Payment Method"
          options={paymentMethods}
          value={formData?.paymentMethod}
          onChange={(value) => handleInputChange('paymentMethod', value)}
          placeholder="Select payment method"
          required
        />

        {/* End Date (Optional) */}
        <Input
          label="End Date (Optional)"
          type="date"
          value={formData?.endDate}
          onChange={(e) => handleInputChange('endDate', e?.target?.value)}
          description="Leave blank for indefinite auto-pay"
          min={formData?.startDate}
        />

        {/* Notification Settings */}
        <div className="space-y-4">
          <h4 className="font-medium text-foreground">Notification Settings</h4>
          
          <Checkbox
            label="Send payment notifications"
            description="Get notified when auto-payments are processed"
            checked={formData?.enableNotifications}
            onChange={(e) => handleInputChange('enableNotifications', e?.target?.checked)}
          />
          
          <Checkbox
            label="Alert when payment exceeds limit"
            description="Get notified when bill amount exceeds maximum limit"
            checked={formData?.enableLimitAlerts}
            onChange={(e) => handleInputChange('enableLimitAlerts', e?.target?.checked)}
          />
        </div>

        {/* Important Notice */}
        <div className="bg-warning/10 border border-warning/20 rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <Icon name="AlertTriangle" size={20} color="var(--color-warning)" className="flex-shrink-0 mt-0.5" />
            <div className="text-sm">
              <h5 className="font-medium text-foreground mb-1">Important Notice</h5>
              <ul className="text-muted-foreground space-y-1">
                <li>• Auto-pay will be processed 2 days before the due date</li>
                <li>• Ensure sufficient balance in your selected account</li>
                <li>• You can modify or cancel auto-pay anytime</li>
                <li>• Failed payments will be notified immediately</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Submit Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 pt-4">
          <Button
            type="submit"
            loading={isLoading}
            disabled={!formData?.paymentMethod || !formData?.maxAmount || !formData?.startDate}
            iconName="CheckCircle"
            iconPosition="left"
            className="flex-1"
          >
            Setup Auto-Pay
          </Button>
          <Button
            type="button"
            variant="outline"
            iconName="X"
            iconPosition="left"
            className="flex-1"
          >
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AutoPaySetup;