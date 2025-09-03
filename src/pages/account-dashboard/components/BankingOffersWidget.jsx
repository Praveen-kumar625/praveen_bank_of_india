import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const BankingOffersWidget = () => {
  const offers = [
    {
      id: 1,
      title: 'Fixed Deposit Special',
      description: 'Earn up to 7.5% p.a. on Fixed Deposits for senior citizens. Limited time offer.',
      type: 'investment',
      icon: 'TrendingUp',
      color: 'text-success',
      bgColor: 'bg-success/10',
      validUntil: '2025-09-30',
      cta: 'Apply Now'
    },
    {
      id: 2,
      title: 'Personal Loan at 9.99%',
      description: 'Get instant personal loan approval with minimal documentation. Pre-approved for you.',
      type: 'loan',
      icon: 'Banknote',
      color: 'text-primary',
      bgColor: 'bg-primary/10',
      validUntil: '2025-09-25',
      cta: 'Check Eligibility'
    },
    {
      id: 3,
      title: 'Credit Card Cashback',
      description: 'Get 5% cashback on online shopping and 2% on all other transactions.',
      type: 'card',
      icon: 'CreditCard',
      color: 'text-accent',
      bgColor: 'bg-accent/10',
      validUntil: '2025-10-15',
      cta: 'Apply Card'
    },
    {
      id: 4,
      title: 'Zero Balance Savings',
      description: 'Open a zero balance savings account with free debit card and mobile banking.',
      type: 'account',
      icon: 'Wallet',
      color: 'text-warning',
      bgColor: 'bg-warning/10',
      validUntil: '2025-12-31',
      cta: 'Open Account'
    }
  ];

  const formatDate = (dateString) => {
    return new Date(dateString)?.toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };

  const getDaysRemaining = (dateString) => {
    const today = new Date();
    const validDate = new Date(dateString);
    const diffTime = validDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <div className="bg-card border border-border rounded-lg shadow-sm">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-foreground">Personalized Offers</h2>
            <p className="text-sm text-muted-foreground mt-1">
              Exclusive deals curated for you
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <Icon name="Gift" size={16} color="var(--color-primary)" />
            <span className="text-sm text-primary font-medium">{offers?.length} Active</span>
          </div>
        </div>
      </div>
      <div className="p-6">
        <div className="space-y-4">
          {offers?.map((offer) => {
            const daysRemaining = getDaysRemaining(offer?.validUntil);
            return (
              <div
                key={offer?.id}
                className="border border-border rounded-lg p-4 hover:border-primary/50 hover:shadow-md transition-all duration-200"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-start space-x-3">
                    <div className={`p-2 rounded-lg ${offer?.bgColor} ${offer?.color}`}>
                      <Icon name={offer?.icon} size={20} />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-foreground mb-1">{offer?.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {offer?.description}
                      </p>
                    </div>
                  </div>
                  {daysRemaining <= 7 && (
                    <span className="text-xs bg-error/10 text-error px-2 py-1 rounded-full font-medium">
                      {daysRemaining}d left
                    </span>
                  )}
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                      <Icon name="Calendar" size={12} />
                      <span>Valid until {formatDate(offer?.validUntil)}</span>
                    </div>
                    <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                      <Icon name="Tag" size={12} />
                      <span className="capitalize">{offer?.type}</span>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-primary border-primary hover:bg-primary hover:text-primary-foreground"
                  >
                    {offer?.cta}
                  </Button>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-6 pt-6 border-t border-border">
          <div className="bg-muted/50 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Icon name="Star" size={16} color="var(--color-primary)" />
                </div>
                <div>
                  <h4 className="text-sm font-medium text-foreground">Premium Banking</h4>
                  <p className="text-xs text-muted-foreground">
                    Upgrade to get exclusive offers and priority service
                  </p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                iconName="ArrowRight"
                iconPosition="right"
                iconSize={14}
                className="text-primary hover:text-primary"
              >
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BankingOffersWidget;