import React, { useState } from 'react';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';
import Icon from '../../../components/AppIcon';

const BillPaymentForm = ({ selectedProvider, onPaymentSubmit, savedBillers }) => {
  const [formData, setFormData] = useState({
    customerNumber: '',
    amount: '',
    nickname: '',
    saveForFuture: false
  });
  const [billDetails, setBillDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isFetchingBill, setIsFetchingBill] = useState(false);

  const paymentMethods = [
    { value: 'savings_1234', label: 'Savings Account (****1234)' },
    { value: 'current_5678', label: 'Current Account (****5678)' },
    { value: 'credit_9012', label: 'Credit Card (****9012)' }
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleFetchBill = async () => {
    if (!formData?.customerNumber) return;
    
    setIsFetchingBill(true);
    // Simulate API call
    setTimeout(() => {
      setBillDetails({
        customerName: "Rajesh Kumar",
        billAmount: "₹2,450.00",
        dueDate: "2025-01-15",
        billNumber: "BL2025010001",
        lastPayment: "₹2,200.00 on Dec 15, 2024",
        outstandingAmount: "₹2,450.00"
      });
      setFormData(prev => ({ ...prev, amount: '2450' }));
      setIsFetchingBill(false);
    }, 2000);
  };

  const handleSubmit = (e) => {
    e?.preventDefault();
    setIsLoading(true);
    
    setTimeout(() => {
      onPaymentSubmit({
        ...formData,
        provider: selectedProvider,
        billDetails
      });
      setIsLoading(false);
    }, 2000);
  };

  const handleSavedBillerSelect = (biller) => {
    setFormData(prev => ({
      ...prev,
      customerNumber: biller?.customerNumber,
      nickname: biller?.nickname
    }));
  };

  if (!selectedProvider) {
    return (
      <div className="bg-card rounded-lg border border-border p-8 text-center">
        <Icon name="CreditCard" size={48} className="text-muted-foreground mx-auto mb-4" />
        <h3 className="text-lg font-medium text-foreground mb-2">Select a Service Provider</h3>
        <p className="text-muted-foreground">Choose a service provider from the list above to start making payments.</p>
      </div>
    );
  }

  return (
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
            <p className="text-sm text-muted-foreground">{selectedProvider?.category}</p>
          </div>
        </div>
      </div>
      <form onSubmit={handleSubmit} className="p-6 space-y-6">
        {/* Saved Billers */}
        {savedBillers && savedBillers?.length > 0 && (
          <div>
            <label className="text-sm font-medium text-foreground mb-2 block">
              Quick Select (Saved Billers)
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {savedBillers?.map((biller) => (
                <button
                  key={biller?.id}
                  type="button"
                  onClick={() => handleSavedBillerSelect(biller)}
                  className="p-3 text-left border border-border rounded-lg hover:border-primary/50 hover:bg-primary/5 transition-colors duration-200"
                >
                  <div className="font-medium text-foreground">{biller?.nickname}</div>
                  <div className="text-sm text-muted-foreground font-data">{biller?.customerNumber}</div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Customer Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Customer Number / Account ID"
            type="text"
            placeholder="Enter customer number"
            value={formData?.customerNumber}
            onChange={(e) => handleInputChange('customerNumber', e?.target?.value)}
            required
            description="Enter your registered customer number or account ID"
          />
          <div className="flex items-end">
            <Button
              type="button"
              variant="outline"
              onClick={handleFetchBill}
              loading={isFetchingBill}
              disabled={!formData?.customerNumber}
              iconName="Search"
              iconPosition="left"
              className="w-full md:w-auto"
            >
              Fetch Bill
            </Button>
          </div>
        </div>

        {/* Bill Details */}
        {billDetails && (
          <div className="bg-muted/50 rounded-lg p-4 space-y-3">
            <div className="flex items-center space-x-2 mb-3">
              <Icon name="FileText" size={18} color="var(--color-success)" />
              <span className="font-medium text-foreground">Bill Details</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-muted-foreground">Customer Name:</span>
                <span className="ml-2 font-medium text-foreground">{billDetails?.customerName}</span>
              </div>
              <div>
                <span className="text-muted-foreground">Bill Number:</span>
                <span className="ml-2 font-medium text-foreground font-data">{billDetails?.billNumber}</span>
              </div>
              <div>
                <span className="text-muted-foreground">Due Date:</span>
                <span className="ml-2 font-medium text-foreground">{billDetails?.dueDate}</span>
              </div>
              <div>
                <span className="text-muted-foreground">Outstanding:</span>
                <span className="ml-2 font-medium text-success">{billDetails?.outstandingAmount}</span>
              </div>
            </div>
          </div>
        )}

        {/* Payment Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Amount"
            type="number"
            placeholder="0.00"
            value={formData?.amount}
            onChange={(e) => handleInputChange('amount', e?.target?.value)}
            required
            description="Enter the amount to pay"
          />
          <Select
            label="Payment Method"
            options={paymentMethods}
            value={formData?.paymentMethod}
            onChange={(value) => handleInputChange('paymentMethod', value)}
            placeholder="Select payment method"
            required
          />
        </div>

        {/* Save for Future */}
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="saveForFuture"
              checked={formData?.saveForFuture}
              onChange={(e) => handleInputChange('saveForFuture', e?.target?.checked)}
              className="w-4 h-4 text-primary border-border rounded focus:ring-primary"
            />
            <label htmlFor="saveForFuture" className="text-sm text-foreground">
              Save this biller for future payments
            </label>
          </div>
          
          {formData?.saveForFuture && (
            <Input
              label="Nickname (Optional)"
              type="text"
              placeholder="e.g., Home Electricity"
              value={formData?.nickname}
              onChange={(e) => handleInputChange('nickname', e?.target?.value)}
              description="Give this biller a memorable name"
            />
          )}
        </div>

        {/* Submit Button */}
        <div className="flex flex-col sm:flex-row gap-3 pt-4">
          <Button
            type="submit"
            loading={isLoading}
            disabled={!formData?.customerNumber || !formData?.amount}
            iconName="CreditCard"
            iconPosition="left"
            className="flex-1"
          >
            Pay Now
          </Button>
          <Button
            type="button"
            variant="outline"
            iconName="Calendar"
            iconPosition="left"
            className="flex-1"
          >
            Schedule Payment
          </Button>
        </div>
      </form>
    </div>
  );
};

export default BillPaymentForm;