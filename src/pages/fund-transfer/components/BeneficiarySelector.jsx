import React, { useState } from 'react';
import Select from '../../../components/ui/Select';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const BeneficiarySelector = ({ transferType, selectedBeneficiary, onBeneficiaryChange, beneficiaries }) => {
  const [newBeneficiary, setNewBeneficiary] = useState({
    name: '',
    accountNumber: '',
    ifscCode: '',
    bankName: '',
    verified: false
  });
  const [isVerifying, setIsVerifying] = useState(false);
  const [upiId, setUpiId] = useState('');

  const beneficiaryOptions = beneficiaries?.map(ben => ({
    value: ben?.id,
    label: ben?.name,
    description: `${ben?.bankName} - ${ben?.accountNumber}`
  }));

  const handleVerifyAccount = async () => {
    setIsVerifying(true);
    // Simulate API call
    setTimeout(() => {
      setNewBeneficiary(prev => ({ ...prev, verified: true, bankName: 'State Bank of India' }));
      setIsVerifying(false);
    }, 2000);
  };

  const handleUpiVerify = async () => {
    setIsVerifying(true);
    // Simulate UPI verification
    setTimeout(() => {
      setIsVerifying(false);
    }, 1500);
  };

  if (transferType === 'own-account') {
    return null;
  }

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <h3 className="text-lg font-semibold text-foreground mb-4">
        {transferType === 'saved-beneficiary' && 'Select Beneficiary'}
        {transferType === 'new-beneficiary' && 'Add New Beneficiary'}
        {transferType === 'upi-payment' && 'UPI Payment Details'}
      </h3>
      {transferType === 'saved-beneficiary' && (
        <>
          <Select
            label="Choose Beneficiary"
            options={beneficiaryOptions}
            value={selectedBeneficiary}
            onChange={onBeneficiaryChange}
            placeholder="Select saved beneficiary"
            searchable
            required
          />
          
          {selectedBeneficiary && (
            <div className="mt-4 p-4 bg-success/10 rounded-lg border border-success/20">
              <div className="flex items-center space-x-2 mb-2">
                <Icon name="CheckCircle" size={16} className="text-success" />
                <span className="text-sm font-medium text-success">Verified Beneficiary</span>
              </div>
              {(() => {
                const selected = beneficiaries?.find(b => b?.id === selectedBeneficiary);
                return selected ? (
                  <div className="text-sm text-muted-foreground">
                    <p>{selected?.bankName}</p>
                    <p className="font-data">{selected?.accountNumber}</p>
                  </div>
                ) : null;
              })()}
            </div>
          )}
        </>
      )}
      {transferType === 'new-beneficiary' && (
        <div className="space-y-4">
          <Input
            label="Beneficiary Name"
            type="text"
            placeholder="Enter full name"
            value={newBeneficiary?.name}
            onChange={(e) => setNewBeneficiary(prev => ({ ...prev, name: e?.target?.value }))}
            required
          />
          
          <Input
            label="Account Number"
            type="text"
            placeholder="Enter account number"
            value={newBeneficiary?.accountNumber}
            onChange={(e) => setNewBeneficiary(prev => ({ ...prev, accountNumber: e?.target?.value }))}
            required
          />
          
          <div className="flex space-x-4">
            <div className="flex-1">
              <Input
                label="IFSC Code"
                type="text"
                placeholder="Enter IFSC code"
                value={newBeneficiary?.ifscCode}
                onChange={(e) => setNewBeneficiary(prev => ({ ...prev, ifscCode: e?.target?.value }))}
                required
              />
            </div>
            <div className="flex items-end">
              <Button
                variant="outline"
                onClick={handleVerifyAccount}
                loading={isVerifying}
                iconName="Search"
                disabled={!newBeneficiary?.ifscCode || newBeneficiary?.ifscCode?.length < 11}
              >
                Verify
              </Button>
            </div>
          </div>

          {newBeneficiary?.verified && (
            <div className="p-4 bg-success/10 rounded-lg border border-success/20">
              <div className="flex items-center space-x-2 mb-2">
                <Icon name="CheckCircle" size={16} className="text-success" />
                <span className="text-sm font-medium text-success">Account Verified</span>
              </div>
              <p className="text-sm text-muted-foreground">Bank: {newBeneficiary?.bankName}</p>
            </div>
          )}
        </div>
      )}
      {transferType === 'upi-payment' && (
        <div className="space-y-4">
          <Input
            label="UPI ID"
            type="text"
            placeholder="Enter UPI ID (e.g., user@paytm)"
            value={upiId}
            onChange={(e) => setUpiId(e?.target?.value)}
            required
          />
          
          <div className="flex space-x-4">
            <Button
              variant="outline"
              onClick={handleUpiVerify}
              loading={isVerifying}
              iconName="Smartphone"
              disabled={!upiId}
              className="flex-1"
            >
              Verify UPI ID
            </Button>
            <Button
              variant="outline"
              iconName="QrCode"
              className="flex-1"
            >
              Scan QR Code
            </Button>
          </div>

          <div className="p-4 bg-blue-50 rounded-lg">
            <div className="flex items-center space-x-2 mb-2">
              <Icon name="Info" size={16} className="text-blue-600" />
              <span className="text-sm font-medium text-blue-600">UPI Transfer Limits</span>
            </div>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Per transaction: ₹1,00,000</li>
              <li>• Daily limit: ₹1,00,000</li>
              <li>• Instant transfer (24x7)</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default BeneficiarySelector;