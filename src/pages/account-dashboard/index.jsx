import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Breadcrumb from '../../components/ui/Breadcrumb';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import { useAuth } from '../../contexts/AuthContext';
import { useBankAccounts, useTransactions } from '../../hooks/useSupabaseData';

// Import all dashboard components
import AccountSummaryCard from './components/AccountSummaryCard';
import TransactionHistoryPanel from './components/TransactionHistoryPanel';
import QuickActionsPanel from './components/QuickActionsPanel';
import FinancialInsightsWidget from './components/FinancialInsightsWidget';
import UpcomingPaymentsWidget from './components/UpcomingPaymentsWidget';
import BankingOffersWidget from './components/BankingOffersWidget';
import NotificationCenter from './components/NotificationCenter';

const AccountDashboard = () => {
  const navigate = useNavigate();
  const { user, userProfile } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [lastRefresh, setLastRefresh] = useState(new Date());
  
  // Use Supabase data instead of mock data
  const { accounts, loading: accountsLoading, refetch: refetchAccounts } = useBankAccounts();
  const { transactions: recentTransactions, loading: transactionsLoading, refetch: refetchTransactions } = useTransactions(8);

  const handleRefreshAccount = async (accountId) => {
    try {
      await Promise.all([refetchAccounts(), refetchTransactions()]);
      setLastRefresh(new Date());
    } catch (error) {
      console.error('Error refreshing data:', error);
    }
  };

  const handleViewAccountDetails = (account) => {
    console.log('Viewing details for account:', account?.name);
    // Navigate to account details or show modal
  };

  const handleViewAllTransactions = () => {
    navigate('/transactions');
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0
    })?.format(amount);
  };

  const totalBalance = accounts?.filter(account => account?.type !== 'loan')?.reduce((sum, account) => sum + account?.balance, 0);

  const totalLoanOutstanding = accounts?.filter(account => account?.type === 'loan')?.reduce((sum, account) => sum + account?.balance, 0);

  // Show loading state while data is being fetched
  if (accountsLoading || transactionsLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-6 py-8">
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <Icon name="Loader" size={32} className="animate-spin mx-auto mb-4" />
              <p className="text-muted-foreground">Loading your banking dashboard...</p>
            </div>
          </div>
        </main>
      </div>
    );
  }

  // Show login prompt if user is not authenticated
  if (!user) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-6 py-8">
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <Icon name="Lock" size={32} className="mx-auto mb-4" />
              <h2 className="text-xl font-semibold mb-2">Authentication Required</h2>
              <p className="text-muted-foreground mb-4">Please log in to access your banking dashboard.</p>
              <Button onClick={() => navigate('/login')}>Sign In</Button>
            </div>
          </div>
        </main>
      </div>
    );
  }

  useEffect(() => {
    // Set page title
    document.title = 'Account Dashboard - Bank of India';
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-6 py-8">
        <Breadcrumb />
        
        {/* Welcome Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">
                Welcome back, {userProfile?.full_name || user?.email?.split('@')?.[0] || 'Valued Customer'}
              </h1>
              <p className="text-muted-foreground">
                Here's your banking overview for today, {new Date()?.toLocaleDateString('en-IN', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm text-muted-foreground">Total Balance</p>
                <p className="text-2xl font-bold text-foreground">
                  {formatCurrency(totalBalance || 0)}
                </p>
              </div>
              <Button
                variant="outline"
                onClick={() => handleRefreshAccount('all')}
                loading={isLoading}
                iconName="RefreshCw"
                iconSize={16}
              >
                Refresh
              </Button>
            </div>
          </div>
        </div>

        {/* Main Dashboard Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
          {/* Left Column - Primary Content */}
          <div className="xl:col-span-8 space-y-8">
            {/* Account Summary Cards */}
            <section>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-foreground">Account Summary</h2>
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <Icon name="Clock" size={14} />
                  <span>Last updated: {lastRefresh?.toLocaleTimeString('en-IN', {
                    hour: '2-digit',
                    minute: '2-digit'
                  })}</span>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {accounts?.length > 0 ? (
                  accounts?.map((account) => (
                    <AccountSummaryCard
                      key={account?.id}
                      account={account}
                      onRefresh={handleRefreshAccount}
                      onViewDetails={handleViewAccountDetails}
                    />
                  ))
                ) : (
                  <div className="col-span-2 text-center py-8">
                    <Icon name="CreditCard" size={48} className="mx-auto mb-4 text-muted-foreground" />
                    <p className="text-muted-foreground">No accounts found. Contact your branch to set up accounts.</p>
                  </div>
                )}
              </div>
            </section>

            {/* Transaction History */}
            <section>
              <TransactionHistoryPanel
                transactions={recentTransactions || []}
                onViewAll={handleViewAllTransactions}
              />
            </section>

            {/* Financial Insights */}
            <section>
              <FinancialInsightsWidget />
            </section>
          </div>

          {/* Right Column - Secondary Content */}
          <div className="xl:col-span-4 space-y-8">
            {/* Quick Actions */}
            <section>
              <QuickActionsPanel />
            </section>

            {/* Upcoming Payments */}
            <section>
              <UpcomingPaymentsWidget />
            </section>

            {/* Banking Offers */}
            <section>
              <BankingOffersWidget />
            </section>

            {/* Notifications */}
            <section>
              <NotificationCenter />
            </section>
          </div>
        </div>

        {/* Bottom Summary Cards */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-card border border-border rounded-lg p-6 text-center">
            <div className="p-3 bg-success/10 rounded-full w-fit mx-auto mb-4">
              <Icon name="TrendingUp" size={24} color="var(--color-success)" />
            </div>
            <h3 className="font-semibold text-foreground mb-2">Investment Growth</h3>
            <p className="text-2xl font-bold text-success mb-1">+12.5%</p>
            <p className="text-sm text-muted-foreground">This month</p>
          </div>

          <div className="bg-card border border-border rounded-lg p-6 text-center">
            <div className="p-3 bg-primary/10 rounded-full w-fit mx-auto mb-4">
              <Icon name="Shield" size={24} color="var(--color-primary)" />
            </div>
            <h3 className="font-semibold text-foreground mb-2">Security Score</h3>
            <p className="text-2xl font-bold text-primary mb-1">98/100</p>
            <p className="text-sm text-muted-foreground">Excellent</p>
          </div>

          <div className="bg-card border border-border rounded-lg p-6 text-center">
            <div className="p-3 bg-warning/10 rounded-full w-fit mx-auto mb-4">
              <Icon name="Star" size={24} color="var(--color-warning)" />
            </div>
            <h3 className="font-semibold text-foreground mb-2">Reward Points</h3>
            <p className="text-2xl font-bold text-warning mb-1">2,450</p>
            <p className="text-sm text-muted-foreground">Available to redeem</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AccountDashboard;