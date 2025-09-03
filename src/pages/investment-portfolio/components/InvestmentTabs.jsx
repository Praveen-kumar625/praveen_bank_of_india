import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const InvestmentTabs = ({ investments, onNewInvestment }) => {
  const [activeTab, setActiveTab] = useState('mutual-funds');

  const tabs = [
    { id: 'mutual-funds', label: 'Mutual Funds', icon: 'PieChart', count: investments?.mutualFunds?.length },
    { id: 'sips', label: 'SIPs', icon: 'Repeat', count: investments?.sips?.length },
    { id: 'fixed-deposits', label: 'Fixed Deposits', icon: 'Landmark', count: investments?.fixedDeposits?.length },
    { id: 'recurring-deposits', label: 'Recurring Deposits', icon: 'Calendar', count: investments?.recurringDeposits?.length },
    { id: 'demat', label: 'Demat Account', icon: 'LineChart', count: investments?.dematHoldings?.length }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'mutual-funds':
        return renderMutualFunds();
      case 'sips':
        return renderSIPs();
      case 'fixed-deposits':
        return renderFixedDeposits();
      case 'recurring-deposits':
        return renderRecurringDeposits();
      case 'demat':
        return renderDematHoldings();
      default:
        return null;
    }
  };

  const renderMutualFunds = () => (
    <div className="space-y-4">
      {investments?.mutualFunds?.map((fund) => (
        <div key={fund?.id} className="bg-muted/30 rounded-lg p-4 border border-border">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h4 className="font-semibold text-foreground">{fund?.name}</h4>
              <p className="text-sm text-muted-foreground">{fund?.category} • {fund?.riskLevel}</p>
            </div>
            <div className="text-right">
              <div className="text-lg font-semibold text-foreground">₹{fund?.currentValue?.toLocaleString('en-IN')}</div>
              <div className={`text-sm ${fund?.returns >= 0 ? 'text-success' : 'text-error'}`}>
                {fund?.returns >= 0 ? '+' : ''}₹{Math.abs(fund?.returns)?.toLocaleString('en-IN')} ({fund?.returnPercentage >= 0 ? '+' : ''}{fund?.returnPercentage?.toFixed(2)}%)
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div>
              <span className="text-muted-foreground">Units:</span>
              <div className="font-medium">{fund?.units?.toFixed(3)}</div>
            </div>
            <div>
              <span className="text-muted-foreground">NAV:</span>
              <div className="font-medium">₹{fund?.nav?.toFixed(2)}</div>
            </div>
            <div>
              <span className="text-muted-foreground">Invested:</span>
              <div className="font-medium">₹{fund?.investedAmount?.toLocaleString('en-IN')}</div>
            </div>
            <div>
              <span className="text-muted-foreground">Purchase Date:</span>
              <div className="font-medium">{fund?.purchaseDate}</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  const renderSIPs = () => (
    <div className="space-y-4">
      {investments?.sips?.map((sip) => (
        <div key={sip?.id} className="bg-muted/30 rounded-lg p-4 border border-border">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h4 className="font-semibold text-foreground">{sip?.fundName}</h4>
              <p className="text-sm text-muted-foreground">SIP Amount: ₹{sip?.sipAmount?.toLocaleString('en-IN')} • {sip?.frequency}</p>
            </div>
            <div className="flex items-center space-x-2">
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                sip?.status === 'Active' ? 'bg-success/10 text-success' : 'bg-warning/10 text-warning'
              }`}>
                {sip?.status}
              </span>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div>
              <span className="text-muted-foreground">Current Value:</span>
              <div className="font-medium">₹{sip?.currentValue?.toLocaleString('en-IN')}</div>
            </div>
            <div>
              <span className="text-muted-foreground">Total Invested:</span>
              <div className="font-medium">₹{sip?.totalInvested?.toLocaleString('en-IN')}</div>
            </div>
            <div>
              <span className="text-muted-foreground">Next SIP Date:</span>
              <div className="font-medium">{sip?.nextSipDate}</div>
            </div>
            <div>
              <span className="text-muted-foreground">Started:</span>
              <div className="font-medium">{sip?.startDate}</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  const renderFixedDeposits = () => (
    <div className="space-y-4">
      {investments?.fixedDeposits?.map((fd) => (
        <div key={fd?.id} className="bg-muted/30 rounded-lg p-4 border border-border">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h4 className="font-semibold text-foreground">Fixed Deposit #{fd?.fdNumber}</h4>
              <p className="text-sm text-muted-foreground">{fd?.tenure} • {fd?.interestRate}% p.a.</p>
            </div>
            <div className="text-right">
              <div className="text-lg font-semibold text-foreground">₹{fd?.maturityAmount?.toLocaleString('en-IN')}</div>
              <div className="text-sm text-muted-foreground">Maturity Amount</div>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div>
              <span className="text-muted-foreground">Principal:</span>
              <div className="font-medium">₹{fd?.principalAmount?.toLocaleString('en-IN')}</div>
            </div>
            <div>
              <span className="text-muted-foreground">Interest Earned:</span>
              <div className="font-medium text-success">₹{fd?.interestEarned?.toLocaleString('en-IN')}</div>
            </div>
            <div>
              <span className="text-muted-foreground">Maturity Date:</span>
              <div className="font-medium">{fd?.maturityDate}</div>
            </div>
            <div>
              <span className="text-muted-foreground">Days Remaining:</span>
              <div className="font-medium">{fd?.daysRemaining} days</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  const renderRecurringDeposits = () => (
    <div className="space-y-4">
      {investments?.recurringDeposits?.map((rd) => (
        <div key={rd?.id} className="bg-muted/30 rounded-lg p-4 border border-border">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h4 className="font-semibold text-foreground">Recurring Deposit #{rd?.rdNumber}</h4>
              <p className="text-sm text-muted-foreground">₹{rd?.monthlyAmount?.toLocaleString('en-IN')}/month • {rd?.tenure}</p>
            </div>
            <div className="text-right">
              <div className="text-lg font-semibold text-foreground">₹{rd?.currentValue?.toLocaleString('en-IN')}</div>
              <div className="text-sm text-muted-foreground">Current Value</div>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div>
              <span className="text-muted-foreground">Total Deposited:</span>
              <div className="font-medium">₹{rd?.totalDeposited?.toLocaleString('en-IN')}</div>
            </div>
            <div>
              <span className="text-muted-foreground">Interest Rate:</span>
              <div className="font-medium">{rd?.interestRate}% p.a.</div>
            </div>
            <div>
              <span className="text-muted-foreground">Maturity Date:</span>
              <div className="font-medium">{rd?.maturityDate}</div>
            </div>
            <div>
              <span className="text-muted-foreground">Next Installment:</span>
              <div className="font-medium">{rd?.nextInstallment}</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  const renderDematHoldings = () => (
    <div className="space-y-4">
      {investments?.dematHoldings?.map((holding) => (
        <div key={holding?.id} className="bg-muted/30 rounded-lg p-4 border border-border">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h4 className="font-semibold text-foreground">{holding?.companyName}</h4>
              <p className="text-sm text-muted-foreground">{holding?.symbol} • {holding?.exchange}</p>
            </div>
            <div className="text-right">
              <div className="text-lg font-semibold text-foreground">₹{holding?.currentValue?.toLocaleString('en-IN')}</div>
              <div className={`text-sm ${holding?.pnl >= 0 ? 'text-success' : 'text-error'}`}>
                {holding?.pnl >= 0 ? '+' : ''}₹{Math.abs(holding?.pnl)?.toLocaleString('en-IN')} ({holding?.pnlPercentage >= 0 ? '+' : ''}{holding?.pnlPercentage?.toFixed(2)}%)
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div>
              <span className="text-muted-foreground">Quantity:</span>
              <div className="font-medium">{holding?.quantity}</div>
            </div>
            <div>
              <span className="text-muted-foreground">Avg. Price:</span>
              <div className="font-medium">₹{holding?.avgPrice?.toFixed(2)}</div>
            </div>
            <div>
              <span className="text-muted-foreground">LTP:</span>
              <div className="font-medium">₹{holding?.ltp?.toFixed(2)}</div>
            </div>
            <div>
              <span className="text-muted-foreground">Invested:</span>
              <div className="font-medium">₹{holding?.investedAmount?.toLocaleString('en-IN')}</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-foreground">Investment Holdings</h2>
        <Button
          variant="default"
          iconName="Plus"
          iconPosition="left"
          onClick={() => onNewInvestment(activeTab)}
        >
          New Investment
        </Button>
      </div>
      {/* Tab Navigation */}
      <div className="flex flex-wrap gap-2 mb-6 border-b border-border">
        {tabs?.map((tab) => (
          <button
            key={tab?.id}
            onClick={() => setActiveTab(tab?.id)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-t-lg text-sm font-medium transition-colors duration-200 ${
              activeTab === tab?.id
                ? 'bg-primary text-primary-foreground border-b-2 border-primary'
                : 'text-muted-foreground hover:text-foreground hover:bg-muted'
            }`}
          >
            <Icon name={tab?.icon} size={16} />
            <span>{tab?.label}</span>
            <span className="bg-muted text-muted-foreground px-2 py-0.5 rounded-full text-xs">
              {tab?.count}
            </span>
          </button>
        ))}
      </div>
      {/* Tab Content */}
      <div className="min-h-[400px]">
        {renderTabContent()}
      </div>
    </div>
  );
};

export default InvestmentTabs;