import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import Breadcrumb from '../../components/ui/Breadcrumb';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import TransactionFilters from './components/TransactionFilters';
import TransactionTable from './components/TransactionTable';
import TransactionSummary from './components/TransactionSummary';
import ExportOptions from './components/ExportOptions';
import TransactionDetails from './components/TransactionDetails';

const TransactionHistory = () => {
  const [activeTab, setActiveTab] = useState('transactions');
  const [filters, setFilters] = useState({
    fromDate: '',
    toDate: '',
    type: 'all',
    account: 'all',
    minAmount: '',
    maxAmount: '',
    search: ''
  });
  const [sortConfig, setSortConfig] = useState({ key: 'date', direction: 'desc' });
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [showTransactionDetails, setShowTransactionDetails] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(25);

  // Mock transaction data
  const mockTransactions = [
    {
      id: 'TXN001',
      date: '03/09/2025',
      time: '14:30:25',
      description: 'Salary Credit - Praveen Bank Ltd',
      type: 'credit',
      amount: 85000,
      balance: 125000,
      reference: 'REF2025090301',
      utr: 'UTR2025090301',
      status: 'completed',
      mode: 'NEFT',
      fromAccount: 'Company Payroll',
      toAccount: '****7890',
      charges: 0,
      remarks: 'Monthly salary for August 2025'
    },
    {
      id: 'TXN002',
      date: '02/09/2025',
      time: '10:15:42',
      description: 'UPI Payment to Amazon',
      type: 'debit',
      amount: 2499,
      balance: 40000,
      reference: 'REF2025090201',
      beneficiary: 'Amazon Pay India',
      status: 'completed',
      mode: 'UPI',
      fromAccount: '****7890',
      toAccount: 'amazon@paytm',
      charges: 0,
      remarks: 'Online shopping payment'
    },
    {
      id: 'TXN003',
      date: '01/09/2025',
      time: '16:45:18',
      description: 'Fund Transfer to Rajesh Kumar',
      type: 'transfer',
      amount: 15000,
      balance: 42499,
      reference: 'REF2025090101',
      utr: 'UTR2025090101',
      beneficiary: 'Rajesh Kumar',
      status: 'completed',
      mode: 'IMPS',
      fromAccount: '****7890',
      toAccount: '****1234',
      charges: 5,
      remarks: 'Personal loan repayment'
    },
    {
      id: 'TXN004',
      date: '31/08/2025',
      time: '09:22:33',
      description: 'Electricity Bill Payment',
      type: 'payment',
      amount: 3250,
      balance: 57499,
      reference: 'REF2025083101',
      beneficiary: 'MSEB Maharashtra',
      status: 'completed',
      mode: 'Online',
      fromAccount: '****7890',
      charges: 0,
      remarks: 'August 2025 electricity bill'
    },
    {
      id: 'TXN005',
      date: '30/08/2025',
      time: '11:30:15',
      description: 'Mutual Fund SIP - HDFC Equity',
      type: 'investment',
      amount: 5000,
      balance: 60749,
      reference: 'REF2025083001',
      beneficiary: 'HDFC Mutual Fund',
      status: 'completed',
      mode: 'Auto Debit',
      fromAccount: '****7890',
      charges: 0,
      remarks: 'Monthly SIP investment'
    },
    {
      id: 'TXN006',
      date: '29/08/2025',
      time: '13:45:22',
      description: 'ATM Cash Withdrawal',
      type: 'debit',
      amount: 10000,
      balance: 65749,
      reference: 'REF2025082901',
      status: 'completed',
      mode: 'ATM',
      fromAccount: '****7890',
      charges: 0,
      remarks: 'Cash withdrawal from ATM'
    },
    {
      id: 'TXN007',
      date: '28/08/2025',
      time: '15:20:45',
      description: 'Interest Credit - Savings Account',
      type: 'interest',
      amount: 1250,
      balance: 75749,
      reference: 'REF2025082801',
      status: 'completed',
      mode: 'Auto Credit',
      fromAccount: 'Bank Interest',
      toAccount: '****7890',
      charges: 0,
      remarks: 'Quarterly interest credit'
    },
    {
      id: 'TXN008',
      date: '27/08/2025',
      time: '12:10:30',
      description: 'Credit Card Payment',
      type: 'payment',
      amount: 25000,
      balance: 74499,
      reference: 'REF2025082701',
      beneficiary: 'Praveen Bank Credit Card',
      status: 'completed',
      mode: 'Online',
      fromAccount: '****7890',
      charges: 0,
      remarks: 'Credit card bill payment'
    },
    {
      id: 'TXN009',
      date: '26/08/2025',
      time: '08:35:12',
      description: 'Mobile Recharge - Airtel',
      type: 'payment',
      amount: 599,
      balance: 99499,
      reference: 'REF2025082601',
      beneficiary: 'Airtel India',
      status: 'completed',
      mode: 'Online',
      fromAccount: '****7890',
      charges: 0,
      remarks: 'Monthly mobile recharge'
    },
    {
      id: 'TXN010',
      date: '25/08/2025',
      time: '17:25:55',
      description: 'Online Shopping - Flipkart',
      type: 'debit',
      amount: 4999,
      balance: 100098,
      reference: 'REF2025082501',
      beneficiary: 'Flipkart India',
      status: 'completed',
      mode: 'Debit Card',
      fromAccount: '****7890',
      charges: 0,
      remarks: 'Electronics purchase'
    }
  ];

  const [transactions, setTransactions] = useState(mockTransactions);
  const [filteredTransactions, setFilteredTransactions] = useState(mockTransactions);

  // Filter transactions based on current filters
  useEffect(() => {
    let filtered = [...transactions];

    // Date range filter
    if (filters?.fromDate) {
      filtered = filtered?.filter(t => new Date(t.date.split('/').reverse().join('-')) >= new Date(filters.fromDate));
    }
    if (filters?.toDate) {
      filtered = filtered?.filter(t => new Date(t.date.split('/').reverse().join('-')) <= new Date(filters.toDate));
    }

    // Type filter
    if (filters?.type !== 'all') {
      filtered = filtered?.filter(t => t?.type === filters?.type);
    }

    // Amount range filter
    if (filters?.minAmount) {
      filtered = filtered?.filter(t => Math.abs(t?.amount) >= parseFloat(filters?.minAmount));
    }
    if (filters?.maxAmount) {
      filtered = filtered?.filter(t => Math.abs(t?.amount) <= parseFloat(filters?.maxAmount));
    }

    // Search filter
    if (filters?.search) {
      const searchTerm = filters?.search?.toLowerCase();
      filtered = filtered?.filter(t => 
        t?.description?.toLowerCase()?.includes(searchTerm) ||
        t?.reference?.toLowerCase()?.includes(searchTerm) ||
        (t?.beneficiary && t?.beneficiary?.toLowerCase()?.includes(searchTerm))
      );
    }

    // Sort transactions
    filtered?.sort((a, b) => {
      let aValue = a?.[sortConfig?.key];
      let bValue = b?.[sortConfig?.key];

      if (sortConfig?.key === 'date') {
        aValue = new Date(a.date.split('/').reverse().join('-'));
        bValue = new Date(b.date.split('/').reverse().join('-'));
      } else if (sortConfig?.key === 'amount') {
        aValue = Math.abs(a?.amount);
        bValue = Math.abs(b?.amount);
      }

      if (aValue < bValue) return sortConfig?.direction === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortConfig?.direction === 'asc' ? 1 : -1;
      return 0;
    });

    setFilteredTransactions(filtered);
    setCurrentPage(1);
  }, [filters, sortConfig, transactions]);

  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters);
  };

  const handleFiltersReset = () => {
    setFilters({
      fromDate: '',
      toDate: '',
      type: 'all',
      account: 'all',
      minAmount: '',
      maxAmount: '',
      search: ''
    });
  };

  const handleSort = (newSortConfig) => {
    setSortConfig(newSortConfig);
  };

  const handleTransactionClick = (transaction) => {
    setSelectedTransaction(transaction);
    setShowTransactionDetails(true);
  };

  const handleExport = (exportConfig) => {
    console.log('Exporting transactions with config:', exportConfig);
    // Implementation for export functionality
  };

  // Pagination
  const totalPages = Math.ceil(filteredTransactions?.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const paginatedTransactions = filteredTransactions?.slice(startIndex, startIndex + pageSize);

  const pageSizeOptions = [
    { value: 10, label: '10 per page' },
    { value: 25, label: '25 per page' },
    { value: 50, label: '50 per page' },
    { value: 100, label: '100 per page' }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="max-w-7xl mx-auto px-6 py-8">
        <Breadcrumb />
        
        {/* Page Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Transaction History</h1>
            <p className="text-muted-foreground">
              View and manage all your banking transactions with advanced filtering and export options
            </p>
          </div>
          <div className="flex items-center space-x-4 mt-4 lg:mt-0">
            <ExportOptions 
              onExport={handleExport}
              selectedTransactions={[]}
            />
            <Button
              variant="outline"
              iconName="RefreshCw"
              iconPosition="left"
              onClick={() => window.location?.reload()}
            >
              Refresh
            </Button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center space-x-1 mb-6 border-b border-border">
          <button
            onClick={() => setActiveTab('transactions')}
            className={`px-4 py-2 text-sm font-medium rounded-t-lg transition-colors ${
              activeTab === 'transactions' ?'bg-primary text-primary-foreground border-b-2 border-primary' :'text-muted-foreground hover:text-foreground hover:bg-muted/50'
            }`}
          >
            <Icon name="Receipt" size={16} className="mr-2 inline" />
            Transactions
          </button>
          <button
            onClick={() => setActiveTab('summary')}
            className={`px-4 py-2 text-sm font-medium rounded-t-lg transition-colors ${
              activeTab === 'summary' ?'bg-primary text-primary-foreground border-b-2 border-primary' :'text-muted-foreground hover:text-foreground hover:bg-muted/50'
            }`}
          >
            <Icon name="BarChart3" size={16} className="mr-2 inline" />
            Summary & Analytics
          </button>
        </div>

        {activeTab === 'transactions' ? (
          <>
            {/* Filters */}
            <TransactionFilters
              filters={filters}
              onFiltersChange={handleFiltersChange}
              onReset={handleFiltersReset}
            />

            {/* Results Info */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
              <div className="flex items-center space-x-4 mb-4 sm:mb-0">
                <p className="text-sm text-muted-foreground">
                  Showing {startIndex + 1}-{Math.min(startIndex + pageSize, filteredTransactions?.length)} of {filteredTransactions?.length} transactions
                </p>
                <select
                  value={pageSize}
                  onChange={(e) => {
                    setPageSize(Number(e?.target?.value));
                    setCurrentPage(1);
                  }}
                  className="text-sm border border-border rounded px-2 py-1 bg-card text-foreground"
                >
                  {pageSizeOptions?.map(option => (
                    <option key={option?.value} value={option?.value}>
                      {option?.label}
                    </option>
                  ))}
                </select>
              </div>
              
              {/* Quick Stats */}
              <div className="flex items-center space-x-6 text-sm">
                <div className="flex items-center space-x-1">
                  <div className="w-3 h-3 bg-success rounded-full"></div>
                  <span className="text-muted-foreground">Credits: {filteredTransactions?.filter(t => t?.type === 'credit')?.length}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <div className="w-3 h-3 bg-error rounded-full"></div>
                  <span className="text-muted-foreground">Debits: {filteredTransactions?.filter(t => t?.type === 'debit')?.length}</span>
                </div>
              </div>
            </div>

            {/* Transaction Table */}
            <TransactionTable
              transactions={paginatedTransactions}
              onSort={handleSort}
              sortConfig={sortConfig}
              onTransactionClick={handleTransactionClick}
            />

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-between mt-6">
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage(currentPage - 1)}
                    iconName="ChevronLeft"
                    iconPosition="left"
                  >
                    Previous
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage(currentPage + 1)}
                    iconName="ChevronRight"
                    iconPosition="right"
                  >
                    Next
                  </Button>
                </div>
                
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-muted-foreground">Page</span>
                  <select
                    value={currentPage}
                    onChange={(e) => setCurrentPage(Number(e?.target?.value))}
                    className="text-sm border border-border rounded px-2 py-1 bg-card text-foreground"
                  >
                    {Array.from({ length: totalPages }, (_, i) => (
                      <option key={i + 1} value={i + 1}>
                        {i + 1}
                      </option>
                    ))}
                  </select>
                  <span className="text-sm text-muted-foreground">of {totalPages}</span>
                </div>
              </div>
            )}
          </>
        ) : (
          <TransactionSummary summaryData={{}} />
        )}

        {/* Transaction Details Modal */}
        <TransactionDetails
          transaction={selectedTransaction}
          isOpen={showTransactionDetails}
          onClose={() => {
            setShowTransactionDetails(false);
            setSelectedTransaction(null);
          }}
        />
      </div>
    </div>
  );
};

export default TransactionHistory;