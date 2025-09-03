import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const ExportOptions = ({ onExport, selectedTransactions }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [exportConfig, setExportConfig] = useState({
    format: 'pdf',
    dateRange: 'custom',
    fromDate: '',
    toDate: '',
    includeFields: ['date', 'description', 'amount', 'balance', 'reference']
  });

  const formatOptions = [
    { value: 'pdf', label: 'PDF Statement' },
    { value: 'excel', label: 'Excel Spreadsheet' },
    { value: 'csv', label: 'CSV File' }
  ];

  const dateRangeOptions = [
    { value: 'last7days', label: 'Last 7 Days' },
    { value: 'last30days', label: 'Last 30 Days' },
    { value: 'last3months', label: 'Last 3 Months' },
    { value: 'last6months', label: 'Last 6 Months' },
    { value: 'lastyear', label: 'Last Year' },
    { value: 'custom', label: 'Custom Range' }
  ];

  const fieldOptions = [
    { value: 'date', label: 'Date & Time' },
    { value: 'description', label: 'Description' },
    { value: 'type', label: 'Transaction Type' },
    { value: 'amount', label: 'Amount' },
    { value: 'balance', label: 'Balance' },
    { value: 'reference', label: 'Reference Number' },
    { value: 'beneficiary', label: 'Beneficiary' }
  ];

  const handleExport = () => {
    onExport(exportConfig);
    setIsOpen(false);
  };

  const handleFieldToggle = (field) => {
    const updatedFields = exportConfig?.includeFields?.includes(field)
      ? exportConfig?.includeFields?.filter(f => f !== field)
      : [...exportConfig?.includeFields, field];
    
    setExportConfig({ ...exportConfig, includeFields: updatedFields });
  };

  return (
    <div className="relative">
      <Button
        variant="outline"
        onClick={() => setIsOpen(!isOpen)}
        iconName="Download"
        iconPosition="left"
      >
        Export ({selectedTransactions?.length} selected)
      </Button>
      {isOpen && (
        <>
          <div 
            className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 top-full mt-2 w-96 bg-card border border-border rounded-lg shadow-lg z-50 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-foreground">Export Transactions</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsOpen(false)}
                iconName="X"
                iconSize={16}
              />
            </div>

            <div className="space-y-4">
              {/* Format Selection */}
              <Select
                label="Export Format"
                options={formatOptions}
                value={exportConfig?.format}
                onChange={(value) => setExportConfig({ ...exportConfig, format: value })}
              />

              {/* Date Range */}
              <Select
                label="Date Range"
                options={dateRangeOptions}
                value={exportConfig?.dateRange}
                onChange={(value) => setExportConfig({ ...exportConfig, dateRange: value })}
              />

              {exportConfig?.dateRange === 'custom' && (
                <div className="grid grid-cols-2 gap-4">
                  <Input
                    label="From Date"
                    type="date"
                    value={exportConfig?.fromDate}
                    onChange={(e) => setExportConfig({ ...exportConfig, fromDate: e?.target?.value })}
                  />
                  <Input
                    label="To Date"
                    type="date"
                    value={exportConfig?.toDate}
                    onChange={(e) => setExportConfig({ ...exportConfig, toDate: e?.target?.value })}
                  />
                </div>
              )}

              {/* Field Selection */}
              <div>
                <label className="text-sm font-medium text-foreground mb-3 block">
                  Include Fields
                </label>
                <div className="space-y-2 max-h-32 overflow-y-auto">
                  {fieldOptions?.map((field) => (
                    <label key={field?.value} className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={exportConfig?.includeFields?.includes(field?.value)}
                        onChange={() => handleFieldToggle(field?.value)}
                        className="rounded border-border"
                      />
                      <span className="text-sm text-foreground">{field?.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Export Info */}
              <div className="bg-muted/30 rounded-lg p-3">
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <Icon name="Info" size={16} />
                  <span>
                    {selectedTransactions?.length > 0 
                      ? `Exporting ${selectedTransactions?.length} selected transactions`
                      : 'Exporting all filtered transactions'
                    }
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-end space-x-3 pt-4 border-t border-border">
                <Button
                  variant="ghost"
                  onClick={() => setIsOpen(false)}
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleExport}
                  iconName="Download"
                  iconPosition="left"
                >
                  Export
                </Button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ExportOptions;