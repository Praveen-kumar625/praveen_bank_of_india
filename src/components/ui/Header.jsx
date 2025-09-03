import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState({
    name: 'Rajesh Kumar',
    accountNumber: '****1234',
    isAuthenticated: true
  });
  const location = useLocation();

  const navigationItems = [
    { label: 'Dashboard', path: '/account-dashboard', icon: 'LayoutDashboard' },
    { label: 'Transfers', path: '/fund-transfer', icon: 'ArrowLeftRight' },
    { label: 'Payments', path: '/bill-payment-services', icon: 'CreditCard' },
    { label: 'Investments', path: '/investment-portfolio', icon: 'TrendingUp' },
    { label: 'History', path: '/transaction-history', icon: 'History' }
  ];

  const secondaryItems = [
    { label: 'Profile', path: '/profile-management', icon: 'User' }
  ];

  const isActivePath = (path) => {
    return location?.pathname === path;
  };

  const handleLogout = () => {
    // Logout logic here
    console.log('Logging out...');
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-card border-b border-border shadow-sm">
        <div className="flex items-center justify-between h-16 px-6">
          {/* Logo Section */}
          <div className="flex items-center">
            <Link to="/account-dashboard" className="flex items-center space-x-3">
              <div className="flex items-center justify-center w-10 h-10 bg-primary rounded-lg">
                <Icon name="Building2" size={24} color="white" />
              </div>
              <div className="hidden sm:block">
                <h1 className="text-xl font-semibold text-foreground">Praveen Bank</h1>
                <p className="text-xs text-muted-foreground">of India</p>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navigationItems?.map((item) => (
              <Link
                key={item?.path}
                to={item?.path}
                className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                  isActivePath(item?.path)
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                }`}
              >
                <Icon name={item?.icon} size={16} />
                <span>{item?.label}</span>
              </Link>
            ))}
          </nav>

          {/* User Account & Actions */}
          <div className="flex items-center space-x-4">
            {/* Security Indicator */}
            <div className="hidden sm:flex items-center space-x-2 px-3 py-1 bg-success/10 rounded-full">
              <Icon name="Shield" size={14} color="var(--color-success)" />
              <span className="text-xs text-success font-medium">Secure</span>
            </div>

            {/* User Account Dropdown */}
            <div className="hidden md:flex items-center space-x-3 px-3 py-2 bg-muted rounded-lg">
              <div className="flex items-center justify-center w-8 h-8 bg-primary rounded-full">
                <span className="text-sm font-medium text-primary-foreground">
                  {currentUser?.name?.split(' ')?.map(n => n?.[0])?.join('')}
                </span>
              </div>
              <div className="text-sm">
                <p className="font-medium text-foreground">{currentUser?.name}</p>
                <p className="text-xs text-muted-foreground font-data">{currentUser?.accountNumber}</p>
              </div>
            </div>

            {/* Profile & Logout */}
            <div className="hidden md:flex items-center space-x-2">
              <Link
                to="/profile-management"
                className={`p-2 rounded-md transition-colors duration-200 ${
                  isActivePath('/profile-management')
                    ? 'bg-primary text-primary-foreground' :'text-muted-foreground hover:text-foreground hover:bg-muted'
                }`}
              >
                <Icon name="User" size={18} />
              </Link>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleLogout}
                iconName="LogOut"
                iconSize={16}
                className="text-muted-foreground hover:text-foreground"
              >
                Logout
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleMobileMenu}
              className="md:hidden"
              iconName={isMobileMenuOpen ? "X" : "Menu"}
              iconSize={20}
            />
          </div>
        </div>

        {/* Mobile Navigation Overlay */}
        {isMobileMenuOpen && (
          <div className="fixed inset-0 top-16 z-40 md:hidden">
            <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" onClick={toggleMobileMenu} />
            <div className="relative bg-card border-r border-border w-80 h-full shadow-lg animate-slide-in">
              <div className="p-6">
                {/* Mobile User Info */}
                <div className="flex items-center space-x-3 p-4 bg-muted rounded-lg mb-6">
                  <div className="flex items-center justify-center w-10 h-10 bg-primary rounded-full">
                    <span className="text-sm font-medium text-primary-foreground">
                      {currentUser?.name?.split(' ')?.map(n => n?.[0])?.join('')}
                    </span>
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{currentUser?.name}</p>
                    <p className="text-sm text-muted-foreground font-data">{currentUser?.accountNumber}</p>
                  </div>
                </div>

                {/* Mobile Navigation Items */}
                <nav className="space-y-2">
                  {navigationItems?.map((item) => (
                    <Link
                      key={item?.path}
                      to={item?.path}
                      onClick={toggleMobileMenu}
                      className={`flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors duration-200 ${
                        isActivePath(item?.path)
                          ? 'bg-primary text-primary-foreground'
                          : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                      }`}
                    >
                      <Icon name={item?.icon} size={18} />
                      <span>{item?.label}</span>
                    </Link>
                  ))}
                  
                  {secondaryItems?.map((item) => (
                    <Link
                      key={item?.path}
                      to={item?.path}
                      onClick={toggleMobileMenu}
                      className={`flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors duration-200 ${
                        isActivePath(item?.path)
                          ? 'bg-primary text-primary-foreground'
                          : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                      }`}
                    >
                      <Icon name={item?.icon} size={18} />
                      <span>{item?.label}</span>
                    </Link>
                  ))}
                </nav>

                {/* Mobile Security Status */}
                <div className="mt-6 p-4 bg-success/10 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <Icon name="Shield" size={16} color="var(--color-success)" />
                    <span className="text-sm text-success font-medium">Secure Connection</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">Your session is encrypted and protected</p>
                </div>

                {/* Mobile Logout */}
                <div className="mt-6 pt-6 border-t border-border">
                  <Button
                    variant="outline"
                    onClick={handleLogout}
                    iconName="LogOut"
                    iconPosition="left"
                    fullWidth
                  >
                    Logout
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </header>
      {/* Spacer for fixed header */}
      <div className="h-16" />
    </>
  );
};

export default Header;