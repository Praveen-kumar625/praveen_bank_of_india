import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const QuickActionsPanel = () => {
  const navigate = useNavigate();

  const quickActions = [
    {
      id: 'fund-transfer',
      title: 'Fund Transfer',
      description: 'Transfer money to any account',
      icon: 'ArrowLeftRight',
      color: 'text-primary',
      bgColor: 'bg-primary/10',
      route: '/fund-transfer'
    },
    {
      id: 'bill-payment',
      title: 'Bill Payment',
      description: 'Pay utility bills & services',
      icon: 'Receipt',
      color: 'text-accent',
      bgColor: 'bg-accent/10',
      route: '/bill-payment-services'
    },
    {
      id: 'mobile-recharge',
      title: 'Mobile Recharge',
      description: 'Recharge mobile & DTH',
      icon: 'Smartphone',
      color: 'text-success',
      bgColor: 'bg-success/10',
      route: '/bill-payment-services'
    },
    {
      id: 'statement',
      title: 'Download Statement',
      description: 'Get account statements',
      icon: 'Download',
      color: 'text-warning',
      bgColor: 'bg-warning/10',
      route: '/transaction-history'
    },
    {
      id: 'investments',
      title: 'Investments',
      description: 'Manage your portfolio',
      icon: 'TrendingUp',
      color: 'text-secondary',
      bgColor: 'bg-secondary/10',
      route: '/investment-portfolio'
    },
    {
      id: 'profile',
      title: 'Profile Settings',
      description: 'Update your information',
      icon: 'Settings',
      color: 'text-muted-foreground',
      bgColor: 'bg-muted',
      route: '/profile-management'
    }
  ];

  const handleActionClick = (route) => {
    navigate(route);
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 shadow-sm">
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-foreground mb-2">Quick Actions</h2>
        <p className="text-sm text-muted-foreground">Access your most used banking services</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {quickActions?.map((action) => (
          <div
            key={action?.id}
            onClick={() => handleActionClick(action?.route)}
            className="group p-4 border border-border rounded-lg hover:border-primary/50 hover:shadow-md transition-all duration-200 cursor-pointer"
          >
            <div className="flex items-start space-x-3">
              <div className={`p-2 rounded-lg ${action?.bgColor} ${action?.color} group-hover:scale-110 transition-transform duration-200`}>
                <Icon name={action?.icon} size={20} />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-medium text-foreground group-hover:text-primary transition-colors duration-200">
                  {action?.title}
                </h3>
                <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                  {action?.description}
                </p>
              </div>
              <Icon 
                name="ChevronRight" 
                size={16} 
                className="text-muted-foreground group-hover:text-primary transition-colors duration-200" 
              />
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6 pt-6 border-t border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Icon name="Shield" size={16} color="var(--color-success)" />
            <span className="text-sm text-success font-medium">All transactions are secured with 256-bit encryption</span>
          </div>
          <Button
            variant="ghost"
            size="sm"
            iconName="HelpCircle"
            iconSize={16}
            className="text-muted-foreground hover:text-foreground"
          >
            Help
          </Button>
        </div>
      </div>
    </div>
  );
};

export default QuickActionsPanel;