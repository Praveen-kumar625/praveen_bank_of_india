import React, { useState } from 'react';
import Header from '../../components/ui/Header';
import Breadcrumb from '../../components/ui/Breadcrumb';
import Icon from '../../components/AppIcon';
import PersonalInfoTab from './components/PersonalInfoTab';
import ContactInfoTab from './components/ContactInfoTab';
import SecurityTab from './components/SecurityTab';
import BankingPreferencesTab from './components/BankingPreferencesTab';
import DocumentsTab from './components/DocumentsTab';
import NomineeTab from './components/NomineeTab';

const ProfileManagement = () => {
  const [activeTab, setActiveTab] = useState('personal');

  const tabs = [
    {
      id: 'personal',
      label: 'Personal Info',
      icon: 'User',
      component: PersonalInfoTab
    },
    {
      id: 'contact',
      label: 'Contact Info',
      icon: 'Phone',
      component: ContactInfoTab
    },
    {
      id: 'security',
      label: 'Security',
      icon: 'Shield',
      component: SecurityTab
    },
    {
      id: 'preferences',
      label: 'Banking Preferences',
      icon: 'Settings',
      component: BankingPreferencesTab
    },
    {
      id: 'documents',
      label: 'Documents',
      icon: 'FileText',
      component: DocumentsTab
    },
    {
      id: 'nominees',
      label: 'Nominees',
      icon: 'Users',
      component: NomineeTab
    }
  ];

  const ActiveComponent = tabs?.find(tab => tab?.id === activeTab)?.component;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-6 py-8">
        <Breadcrumb />
        
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-2">
            <div className="flex items-center justify-center w-12 h-12 bg-primary/10 rounded-lg">
              <Icon name="UserCog" size={24} color="var(--color-primary)" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">Profile Management</h1>
              <p className="text-muted-foreground">Manage your account settings and personal information</p>
            </div>
          </div>
        </div>

        {/* Profile Overview Card */}
        <div className="bg-card border border-border rounded-lg p-6 mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center justify-center w-16 h-16 bg-primary rounded-full">
                <span className="text-xl font-semibold text-primary-foreground">RK</span>
              </div>
              <div>
                <h2 className="text-xl font-semibold text-foreground">Rajesh Kumar</h2>
                <p className="text-muted-foreground">Account Number: ****1234</p>
                <div className="flex items-center space-x-4 mt-2">
                  <div className="flex items-center space-x-2">
                    <Icon name="CheckCircle" size={16} color="var(--color-success)" />
                    <span className="text-sm text-success">KYC Verified</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Icon name="Shield" size={16} color="var(--color-success)" />
                    <span className="text-sm text-success">Account Secured</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-muted-foreground">Last Updated</p>
              <p className="text-sm font-medium text-foreground">15 Mar 2024</p>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="bg-card border border-border rounded-lg mb-8">
          <div className="border-b border-border">
            <nav className="flex space-x-0 overflow-x-auto">
              {tabs?.map((tab) => (
                <button
                  key={tab?.id}
                  onClick={() => setActiveTab(tab?.id)}
                  className={`flex items-center space-x-2 px-6 py-4 text-sm font-medium border-b-2 transition-colors duration-200 whitespace-nowrap ${
                    activeTab === tab?.id
                      ? 'border-primary text-primary bg-primary/5' :'border-transparent text-muted-foreground hover:text-foreground hover:border-border'
                  }`}
                >
                  <Icon name={tab?.icon} size={18} />
                  <span>{tab?.label}</span>
                </button>
              ))}
            </nav>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {ActiveComponent && <ActiveComponent />}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-card border border-border rounded-lg p-6">
            <div className="flex items-center space-x-3 mb-4">
              <Icon name="Download" size={24} color="var(--color-primary)" />
              <h3 className="text-lg font-medium text-foreground">Account Statement</h3>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              Download your latest account statement and transaction history.
            </p>
            <button className="w-full px-4 py-2 bg-primary text-primary-foreground rounded-md text-sm font-medium hover:bg-primary/90 transition-colors">
              Download Statement
            </button>
          </div>

          <div className="bg-card border border-border rounded-lg p-6">
            <div className="flex items-center space-x-3 mb-4">
              <Icon name="CreditCard" size={24} color="var(--color-primary)" />
              <h3 className="text-lg font-medium text-foreground">Card Management</h3>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              Manage your debit and credit cards, block/unblock, and request new cards.
            </p>
            <button className="w-full px-4 py-2 bg-primary text-primary-foreground rounded-md text-sm font-medium hover:bg-primary/90 transition-colors">
              Manage Cards
            </button>
          </div>

          <div className="bg-card border border-border rounded-lg p-6">
            <div className="flex items-center space-x-3 mb-4">
              <Icon name="HelpCircle" size={24} color="var(--color-primary)" />
              <h3 className="text-lg font-medium text-foreground">Customer Support</h3>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              Get help with your account, report issues, or contact customer service.
            </p>
            <button className="w-full px-4 py-2 bg-primary text-primary-foreground rounded-md text-sm font-medium hover:bg-primary/90 transition-colors">
              Contact Support
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProfileManagement;