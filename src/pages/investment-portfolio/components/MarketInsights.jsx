import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const MarketInsights = () => {
  const [activeInsight, setActiveInsight] = useState('market-news');

  const marketNews = [
    {
      id: 1,
      title: "RBI Maintains Repo Rate at 6.5%",
      summary: "Reserve Bank of India keeps key policy rates unchanged, citing inflation concerns and growth stability.",
      category: "Policy",
      time: "2 hours ago",
      impact: "neutral",
      source: "RBI Press Release"
    },
    {
      id: 2,
      title: "Mutual Fund Inflows Hit Record High",
      summary: "Equity mutual funds see highest monthly inflows of ₹25,000 crores in December 2024.",
      category: "Mutual Funds",
      time: "4 hours ago",
      impact: "positive",
      source: "AMFI Data"
    },
    {
      id: 3,
      title: "Banking Sector Shows Strong Q3 Results",
      summary: "Major banks report improved asset quality and higher net interest margins for Q3 FY25.",
      category: "Banking",
      time: "6 hours ago",
      impact: "positive",
      source: "Market Analysis"
    },
    {
      id: 4,
      title: "FD Rates Expected to Remain Stable",
      summary: "Banks likely to maintain current fixed deposit rates amid steady monetary policy stance.",
      category: "Fixed Deposits",
      time: "1 day ago",
      impact: "neutral",
      source: "Banking News"
    }
  ];

  const recommendations = [
    {
      id: 1,
      type: "Buy",
      title: "Large Cap Equity Funds",
      reason: "Strong fundamentals and reasonable valuations make large-cap funds attractive for long-term wealth creation.",
      riskLevel: "Moderate",
      timeHorizon: "3-5 years",
      expectedReturn: "12-15%",
      action: "Consider increasing allocation"
    },
    {
      id: 2,
      type: "Hold",
      title: "Fixed Deposits",
      reason: "Current FD rates offer decent real returns. Maintain allocation for stability and liquidity needs.",
      riskLevel: "Low",
      timeHorizon: "1-3 years",
      expectedReturn: "6.5-7%",
      action: "Maintain current position"
    },
    {
      id: 3,
      type: "Review",
      title: "Small Cap Funds",
      reason: "High valuations in small-cap segment warrant careful selection and regular monitoring.",
      riskLevel: "High",
      timeHorizon: "5+ years",
      expectedReturn: "15-20%",
      action: "Review and rebalance"
    },
    {
      id: 4,
      type: "Opportunity",
      title: "Debt Funds",
      reason: "Stable interest rate environment creates opportunities in medium-duration debt funds.",
      riskLevel: "Low-Moderate",
      timeHorizon: "2-4 years",
      expectedReturn: "7-9%",
      action: "Consider gradual entry"
    }
  ];

  const marketIndicators = [
    { name: "Nifty 50", value: "21,456.78", change: "+145.23", changePercent: "+0.68%", trend: "up" },
    { name: "Sensex", value: "71,234.56", change: "+456.78", changePercent: "+0.65%", trend: "up" },
    { name: "Bank Nifty", value: "45,678.90", change: "-123.45", changePercent: "-0.27%", trend: "down" },
    { name: "VIX", value: "14.25", change: "-0.85", changePercent: "-5.63%", trend: "down" },
    { name: "10Y G-Sec", value: "7.15%", change: "+0.02%", changePercent: "+0.28%", trend: "up" },
    { name: "USD/INR", value: "83.25", change: "+0.15", changePercent: "+0.18%", trend: "up" }
  ];

  const insightTabs = [
    { id: 'market-news', label: 'Market News', icon: 'Newspaper' },
    { id: 'recommendations', label: 'Recommendations', icon: 'Target' },
    { id: 'indicators', label: 'Market Data', icon: 'BarChart3' }
  ];

  const getImpactColor = (impact) => {
    switch (impact) {
      case 'positive': return 'text-success';
      case 'negative': return 'text-error';
      default: return 'text-muted-foreground';
    }
  };

  const getRecommendationColor = (type) => {
    switch (type) {
      case 'Buy': return 'bg-success/10 text-success border-success/20';
      case 'Hold': return 'bg-primary/10 text-primary border-primary/20';
      case 'Review': return 'bg-warning/10 text-warning border-warning/20';
      case 'Opportunity': return 'bg-accent/10 text-accent border-accent/20';
      default: return 'bg-muted/10 text-muted-foreground border-muted/20';
    }
  };

  const renderMarketNews = () => (
    <div className="space-y-4">
      {marketNews?.map((news) => (
        <div key={news?.id} className="bg-muted/30 rounded-lg p-4 border border-border">
          <div className="flex items-start justify-between mb-2">
            <div className="flex-1">
              <h4 className="font-semibold text-foreground mb-1">{news?.title}</h4>
              <p className="text-sm text-muted-foreground mb-2">{news?.summary}</p>
            </div>
            <div className={`ml-4 flex items-center space-x-1 ${getImpactColor(news?.impact)}`}>
              <Icon 
                name={news?.impact === 'positive' ? 'TrendingUp' : news?.impact === 'negative' ? 'TrendingDown' : 'Minus'} 
                size={16} 
              />
            </div>
          </div>
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <div className="flex items-center space-x-4">
              <span className="bg-muted px-2 py-1 rounded">{news?.category}</span>
              <span>{news?.source}</span>
            </div>
            <span>{news?.time}</span>
          </div>
        </div>
      ))}
    </div>
  );

  const renderRecommendations = () => (
    <div className="space-y-4">
      {recommendations?.map((rec) => (
        <div key={rec?.id} className="bg-muted/30 rounded-lg p-4 border border-border">
          <div className="flex items-start justify-between mb-3">
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-2">
                <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getRecommendationColor(rec?.type)}`}>
                  {rec?.type}
                </span>
                <h4 className="font-semibold text-foreground">{rec?.title}</h4>
              </div>
              <p className="text-sm text-muted-foreground mb-3">{rec?.reason}</p>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs">
            <div>
              <span className="text-muted-foreground">Risk Level:</span>
              <div className="font-medium">{rec?.riskLevel}</div>
            </div>
            <div>
              <span className="text-muted-foreground">Time Horizon:</span>
              <div className="font-medium">{rec?.timeHorizon}</div>
            </div>
            <div>
              <span className="text-muted-foreground">Expected Return:</span>
              <div className="font-medium text-success">{rec?.expectedReturn}</div>
            </div>
            <div>
              <span className="text-muted-foreground">Action:</span>
              <div className="font-medium">{rec?.action}</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  const renderMarketIndicators = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {marketIndicators?.map((indicator) => (
        <div key={indicator?.name} className="bg-muted/30 rounded-lg p-4 border border-border">
          <div className="flex items-center justify-between mb-2">
            <h4 className="font-semibold text-foreground">{indicator?.name}</h4>
            <Icon 
              name={indicator?.trend === 'up' ? 'TrendingUp' : 'TrendingDown'} 
              size={16} 
              className={indicator?.trend === 'up' ? 'text-success' : 'text-error'}
            />
          </div>
          <div className="text-xl font-bold text-foreground mb-1">{indicator?.value}</div>
          <div className={`text-sm ${indicator?.trend === 'up' ? 'text-success' : 'text-error'}`}>
            {indicator?.change} ({indicator?.changePercent})
          </div>
        </div>
      ))}
    </div>
  );

  const renderInsightContent = () => {
    switch (activeInsight) {
      case 'market-news':
        return renderMarketNews();
      case 'recommendations':
        return renderRecommendations();
      case 'indicators':
        return renderMarketIndicators();
      default:
        return null;
    }
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-foreground">Market Insights</h2>
        <div className="flex items-center space-x-2">
          <Icon name="TrendingUp" size={20} className="text-primary" />
          <span className="text-sm text-muted-foreground">Updated 5 min ago</span>
        </div>
      </div>
      {/* Insight Tabs */}
      <div className="flex space-x-2 mb-6 border-b border-border">
        {insightTabs?.map((tab) => (
          <button
            key={tab?.id}
            onClick={() => setActiveInsight(tab?.id)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-t-lg text-sm font-medium transition-colors duration-200 ${
              activeInsight === tab?.id
                ? 'bg-primary text-primary-foreground border-b-2 border-primary'
                : 'text-muted-foreground hover:text-foreground hover:bg-muted'
            }`}
          >
            <Icon name={tab?.icon} size={16} />
            <span>{tab?.label}</span>
          </button>
        ))}
      </div>
      {/* Insight Content */}
      <div className="min-h-[300px]">
        {renderInsightContent()}
      </div>
      {/* Action Button */}
      <div className="mt-6 pt-4 border-t border-border">
        <Button
          variant="outline"
          iconName="ExternalLink"
          iconPosition="right"
          onClick={() => window.open('/market-analysis', '_blank')}
        >
          View Detailed Market Analysis
        </Button>
      </div>
    </div>
  );
};

export default MarketInsights;