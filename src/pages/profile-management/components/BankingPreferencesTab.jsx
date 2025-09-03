import React, { useState } from 'react';

import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';

const BankingPreferencesTab = () => {
  const [preferences, setPreferences] = useState({
    statementDelivery: 'email',
    statementFrequency: 'monthly',
    language: 'english',
    currency: 'inr',
    transactionLimits: {
      dailyTransfer: '100000',
      monthlyTransfer: '1000000',
      dailyWithdrawal: '50000'
    },
    notifications: {
      transactionAlerts: true,
      balanceAlerts: true,
      billReminders: true,
      promotionalOffers: false,
      securityAlerts: true,
      maintenanceUpdates: true
    },
    services: {
      netBanking: true,
      mobileBanking: true,
      smsAlerts: true,
      emailStatements: true,
      chequeBook: true,
      debitCard: true,
      creditCard: false,
      internetBanking: true
    }
  });

  const [isEditing, setIsEditing] = useState(false);
  const [tempPreferences, setTempPreferences] = useState({ ...preferences });

  const statementDeliveryOptions = [
    { value: 'email', label: 'Email Only' },
    { value: 'postal', label: 'Postal Mail' },
    { value: 'both', label: 'Email & Postal' },
    { value: 'none', label: 'No Statements' }
  ];

  const statementFrequencyOptions = [
    { value: 'monthly', label: 'Monthly' },
    { value: 'quarterly', label: 'Quarterly' },
    { value: 'half-yearly', label: 'Half Yearly' },
    { value: 'yearly', label: 'Yearly' }
  ];

  const languageOptions = [
    { value: 'english', label: 'English' },
    { value: 'hindi', label: 'Hindi' },
    { value: 'bengali', label: 'Bengali' },
    { value: 'tamil', label: 'Tamil' },
    { value: 'telugu', label: 'Telugu' },
    { value: 'marathi', label: 'Marathi' },
    { value: 'gujarati', label: 'Gujarati' },
    { value: 'kannada', label: 'Kannada' }
  ];

  const currencyOptions = [
    { value: 'inr', label: 'Indian Rupee (₹)' },
    { value: 'usd', label: 'US Dollar ($)' },
    { value: 'eur', label: 'Euro (€)' },
    { value: 'gbp', label: 'British Pound (£)' }
  ];

  const transactionLimitOptions = [
    { value: '25000', label: '₹25,000' },
    { value: '50000', label: '₹50,000' },
    { value: '100000', label: '₹1,00,000' },
    { value: '200000', label: '₹2,00,000' },
    { value: '500000', label: '₹5,00,000' },
    { value: '1000000', label: '₹10,00,000' }
  ];

  const handleEdit = () => {
    setIsEditing(true);
    setTempPreferences({ ...preferences });
  };

  const handleCancel = () => {
    setIsEditing(false);
    setTempPreferences({ ...preferences });
  };

  const handleSave = () => {
    setPreferences({ ...tempPreferences });
    setIsEditing(false);
  };

  const handlePreferenceChange = (section, field, value) => {
    if (section) {
      setTempPreferences(prev => ({
        ...prev,
        [section]: {
          ...prev?.[section],
          [field]: value
        }
      }));
    } else {
      setTempPreferences(prev => ({
        ...prev,
        [field]: value
      }));
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Banking Preferences</h3>
          <p className="text-sm text-muted-foreground">Customize your banking experience and settings</p>
        </div>
        {!isEditing && (
          <Button
            variant="outline"
            onClick={handleEdit}
            iconName="Settings"
            iconPosition="left"
          >
            Edit Preferences
          </Button>
        )}
      </div>
      {/* Statement Preferences */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h4 className="text-md font-medium text-foreground mb-4">Statement Preferences</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Select
            label="Statement Delivery"
            options={statementDeliveryOptions}
            value={isEditing ? tempPreferences?.statementDelivery : preferences?.statementDelivery}
            onChange={(value) => handlePreferenceChange(null, 'statementDelivery', value)}
            disabled={!isEditing}
            description="How you want to receive account statements"
          />

          <Select
            label="Statement Frequency"
            options={statementFrequencyOptions}
            value={isEditing ? tempPreferences?.statementFrequency : preferences?.statementFrequency}
            onChange={(value) => handlePreferenceChange(null, 'statementFrequency', value)}
            disabled={!isEditing}
            description="How often you want to receive statements"
          />
        </div>
      </div>
      {/* Language & Currency */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h4 className="text-md font-medium text-foreground mb-4">Language & Currency</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Select
            label="Preferred Language"
            options={languageOptions}
            value={isEditing ? tempPreferences?.language : preferences?.language}
            onChange={(value) => handlePreferenceChange(null, 'language', value)}
            disabled={!isEditing}
            description="Language for banking interface"
          />

          <Select
            label="Display Currency"
            options={currencyOptions}
            value={isEditing ? tempPreferences?.currency : preferences?.currency}
            onChange={(value) => handlePreferenceChange(null, 'currency', value)}
            disabled={!isEditing}
            description="Primary currency for display"
          />
        </div>
      </div>
      {/* Transaction Limits */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h4 className="text-md font-medium text-foreground mb-4">Transaction Limits</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Select
            label="Daily Transfer Limit"
            options={transactionLimitOptions}
            value={isEditing ? tempPreferences?.transactionLimits?.dailyTransfer : preferences?.transactionLimits?.dailyTransfer}
            onChange={(value) => handlePreferenceChange('transactionLimits', 'dailyTransfer', value)}
            disabled={!isEditing}
          />

          <Select
            label="Monthly Transfer Limit"
            options={transactionLimitOptions?.filter(opt => parseInt(opt?.value) >= 100000)}
            value={isEditing ? tempPreferences?.transactionLimits?.monthlyTransfer : preferences?.transactionLimits?.monthlyTransfer}
            onChange={(value) => handlePreferenceChange('transactionLimits', 'monthlyTransfer', value)}
            disabled={!isEditing}
          />

          <Select
            label="Daily Withdrawal Limit"
            options={transactionLimitOptions?.filter(opt => parseInt(opt?.value) <= 200000)}
            value={isEditing ? tempPreferences?.transactionLimits?.dailyWithdrawal : preferences?.transactionLimits?.dailyWithdrawal}
            onChange={(value) => handlePreferenceChange('transactionLimits', 'dailyWithdrawal', value)}
            disabled={!isEditing}
          />
        </div>
      </div>
      {/* Notification Preferences */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h4 className="text-md font-medium text-foreground mb-4">Notification Preferences</h4>
        <div className="space-y-4">
          <Checkbox
            label="Transaction Alerts"
            description="Get notified for all transactions"
            checked={isEditing ? tempPreferences?.notifications?.transactionAlerts : preferences?.notifications?.transactionAlerts}
            onChange={(e) => handlePreferenceChange('notifications', 'transactionAlerts', e?.target?.checked)}
            disabled={!isEditing}
          />

          <Checkbox
            label="Balance Alerts"
            description="Receive low balance notifications"
            checked={isEditing ? tempPreferences?.notifications?.balanceAlerts : preferences?.notifications?.balanceAlerts}
            onChange={(e) => handlePreferenceChange('notifications', 'balanceAlerts', e?.target?.checked)}
            disabled={!isEditing}
          />

          <Checkbox
            label="Bill Reminders"
            description="Get reminders for upcoming bill payments"
            checked={isEditing ? tempPreferences?.notifications?.billReminders : preferences?.notifications?.billReminders}
            onChange={(e) => handlePreferenceChange('notifications', 'billReminders', e?.target?.checked)}
            disabled={!isEditing}
          />

          <Checkbox
            label="Promotional Offers"
            description="Receive offers and promotional content"
            checked={isEditing ? tempPreferences?.notifications?.promotionalOffers : preferences?.notifications?.promotionalOffers}
            onChange={(e) => handlePreferenceChange('notifications', 'promotionalOffers', e?.target?.checked)}
            disabled={!isEditing}
          />

          <Checkbox
            label="Security Alerts"
            description="Important security notifications"
            checked={isEditing ? tempPreferences?.notifications?.securityAlerts : preferences?.notifications?.securityAlerts}
            onChange={(e) => handlePreferenceChange('notifications', 'securityAlerts', e?.target?.checked)}
            disabled={!isEditing}
          />

          <Checkbox
            label="Maintenance Updates"
            description="System maintenance and update notifications"
            checked={isEditing ? tempPreferences?.notifications?.maintenanceUpdates : preferences?.notifications?.maintenanceUpdates}
            onChange={(e) => handlePreferenceChange('notifications', 'maintenanceUpdates', e?.target?.checked)}
            disabled={!isEditing}
          />
        </div>
      </div>
      {/* Service Activation */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h4 className="text-md font-medium text-foreground mb-4">Banking Services</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-4">
            <Checkbox
              label="Net Banking"
              description="Online banking access"
              checked={isEditing ? tempPreferences?.services?.netBanking : preferences?.services?.netBanking}
              onChange={(e) => handlePreferenceChange('services', 'netBanking', e?.target?.checked)}
              disabled={!isEditing}
            />

            <Checkbox
              label="Mobile Banking"
              description="Mobile app access"
              checked={isEditing ? tempPreferences?.services?.mobileBanking : preferences?.services?.mobileBanking}
              onChange={(e) => handlePreferenceChange('services', 'mobileBanking', e?.target?.checked)}
              disabled={!isEditing}
            />

            <Checkbox
              label="SMS Alerts"
              description="Transaction SMS notifications"
              checked={isEditing ? tempPreferences?.services?.smsAlerts : preferences?.services?.smsAlerts}
              onChange={(e) => handlePreferenceChange('services', 'smsAlerts', e?.target?.checked)}
              disabled={!isEditing}
            />

            <Checkbox
              label="Email Statements"
              description="Monthly email statements"
              checked={isEditing ? tempPreferences?.services?.emailStatements : preferences?.services?.emailStatements}
              onChange={(e) => handlePreferenceChange('services', 'emailStatements', e?.target?.checked)}
              disabled={!isEditing}
            />
          </div>

          <div className="space-y-4">
            <Checkbox
              label="Cheque Book"
              description="Physical cheque book facility"
              checked={isEditing ? tempPreferences?.services?.chequeBook : preferences?.services?.chequeBook}
              onChange={(e) => handlePreferenceChange('services', 'chequeBook', e?.target?.checked)}
              disabled={!isEditing}
            />

            <Checkbox
              label="Debit Card"
              description="ATM and POS debit card"
              checked={isEditing ? tempPreferences?.services?.debitCard : preferences?.services?.debitCard}
              onChange={(e) => handlePreferenceChange('services', 'debitCard', e?.target?.checked)}
              disabled={!isEditing}
            />

            <Checkbox
              label="Credit Card"
              description="Credit card facility"
              checked={isEditing ? tempPreferences?.services?.creditCard : preferences?.services?.creditCard}
              onChange={(e) => handlePreferenceChange('services', 'creditCard', e?.target?.checked)}
              disabled={!isEditing}
            />

            <Checkbox
              label="Internet Banking"
              description="Full internet banking access"
              checked={isEditing ? tempPreferences?.services?.internetBanking : preferences?.services?.internetBanking}
              onChange={(e) => handlePreferenceChange('services', 'internetBanking', e?.target?.checked)}
              disabled={!isEditing}
            />
          </div>
        </div>
      </div>
      {/* Action Buttons */}
      {isEditing && (
        <div className="flex items-center justify-end space-x-3">
          <Button
            variant="outline"
            onClick={handleCancel}
          >
            Cancel
          </Button>
          <Button
            variant="default"
            onClick={handleSave}
            iconName="Save"
            iconPosition="left"
          >
            Save Preferences
          </Button>
        </div>
      )}
    </div>
  );
};

export default BankingPreferencesTab;