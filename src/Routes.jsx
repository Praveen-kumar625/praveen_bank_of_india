import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import BillPaymentServices from './pages/bill-payment-services';
import InvestmentPortfolio from './pages/investment-portfolio';
import FundTransfer from './pages/fund-transfer';
import TransactionHistory from './pages/transaction-history';
import ProfileManagement from './pages/profile-management';
import AccountDashboard from './pages/account-dashboard';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your route here */}
        <Route path="/" element={<AccountDashboard />} />
        <Route path="/bill-payment-services" element={<BillPaymentServices />} />
        <Route path="/investment-portfolio" element={<InvestmentPortfolio />} />
        <Route path="/fund-transfer" element={<FundTransfer />} />
        <Route path="/transaction-history" element={<TransactionHistory />} />
        <Route path="/profile-management" element={<ProfileManagement />} />
        <Route path="/account-dashboard" element={<AccountDashboard />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
