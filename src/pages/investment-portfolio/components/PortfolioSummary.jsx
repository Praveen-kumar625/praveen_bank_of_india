import React from 'react';
import Icon from '../../../components/AppIcon';

const PortfolioSummary = ({ portfolioData }) => {
  const { totalValue, totalInvestment, totalGains, gainPercentage, dayChange, dayChangePercentage } = portfolioData;

  return (
    <div className="bg-card rounded-lg border border-border p-6 mb-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-foreground">Portfolio Overview</h2>
        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          <Icon name="Clock" size={16} />
          <span>Last updated: {new Date()?.toLocaleString('en-IN')}</span>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-muted/30 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-muted-foreground">Total Portfolio Value</span>
            <Icon name="TrendingUp" size={16} className="text-primary" />
          </div>
          <div className="text-2xl font-bold text-foreground">₹{totalValue?.toLocaleString('en-IN')}</div>
        </div>

        <div className="bg-muted/30 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-muted-foreground">Total Investment</span>
            <Icon name="Wallet" size={16} className="text-secondary" />
          </div>
          <div className="text-2xl font-bold text-foreground">₹{totalInvestment?.toLocaleString('en-IN')}</div>
        </div>

        <div className="bg-muted/30 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-muted-foreground">Total Gains/Loss</span>
            <Icon name={totalGains >= 0 ? "ArrowUp" : "ArrowDown"} size={16} className={totalGains >= 0 ? "text-success" : "text-error"} />
          </div>
          <div className={`text-2xl font-bold ${totalGains >= 0 ? "text-success" : "text-error"}`}>
            {totalGains >= 0 ? "+" : ""}₹{Math.abs(totalGains)?.toLocaleString('en-IN')}
          </div>
          <div className={`text-sm ${totalGains >= 0 ? "text-success" : "text-error"}`}>
            ({gainPercentage >= 0 ? "+" : ""}{gainPercentage?.toFixed(2)}%)
          </div>
        </div>

        <div className="bg-muted/30 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-muted-foreground">Today's Change</span>
            <Icon name={dayChange >= 0 ? "TrendingUp" : "TrendingDown"} size={16} className={dayChange >= 0 ? "text-success" : "text-error"} />
          </div>
          <div className={`text-2xl font-bold ${dayChange >= 0 ? "text-success" : "text-error"}`}>
            {dayChange >= 0 ? "+" : ""}₹{Math.abs(dayChange)?.toLocaleString('en-IN')}
          </div>
          <div className={`text-sm ${dayChange >= 0 ? "text-success" : "text-error"}`}>
            ({dayChangePercentage >= 0 ? "+" : ""}{dayChangePercentage?.toFixed(2)}%)
          </div>
        </div>
      </div>
    </div>
  );
};

export default PortfolioSummary;