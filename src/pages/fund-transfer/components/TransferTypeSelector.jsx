import React from 'react';
import Icon from '../../../components/AppIcon';

const TransferTypeSelector = ({ selectedType, onTypeChange }) => {
  const transferTypes = [
    {
      id: 'own-account',
      title: 'Own Account Transfer',
      description: 'Transfer between your own accounts',
      icon: 'ArrowLeftRight',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      id: 'saved-beneficiary',
      title: 'Saved Beneficiary',
      description: 'Transfer to saved payees',
      icon: 'Users',
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      id: 'new-beneficiary',
      title: 'New Beneficiary',
      description: 'Add and transfer to new payee',
      icon: 'UserPlus',
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    },
    {
      id: 'upi-payment',
      title: 'UPI Payment',
      description: 'Quick UPI transfers',
      icon: 'Smartphone',
      color: 'text-orange-600',
      bgColor: 'bg-orange-50'
    }
  ];

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <h3 className="text-lg font-semibold text-foreground mb-4">Select Transfer Type</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {transferTypes?.map((type) => (
          <label
            key={type?.id}
            className={`relative flex items-center p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
              selectedType === type?.id
                ? 'border-primary bg-primary/5' :'border-border hover:border-primary/50 hover:bg-muted/50'
            }`}
          >
            <input
              type="radio"
              name="transferType"
              value={type?.id}
              checked={selectedType === type?.id}
              onChange={(e) => onTypeChange(e?.target?.value)}
              className="sr-only"
            />
            <div className={`flex items-center justify-center w-12 h-12 rounded-lg ${type?.bgColor} mr-4`}>
              <Icon name={type?.icon} size={24} className={type?.color} />
            </div>
            <div className="flex-1">
              <h4 className="font-medium text-foreground">{type?.title}</h4>
              <p className="text-sm text-muted-foreground">{type?.description}</p>
            </div>
            {selectedType === type?.id && (
              <div className="absolute top-2 right-2">
                <Icon name="CheckCircle" size={20} className="text-primary" />
              </div>
            )}
          </label>
        ))}
      </div>
    </div>
  );
};

export default TransferTypeSelector;