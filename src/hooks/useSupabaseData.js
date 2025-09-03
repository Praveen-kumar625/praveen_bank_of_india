import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';

// Custom hook for fetching bank accounts
export const useBankAccounts = () => {
  const [accounts, setAccounts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const { user } = useAuth()

  useEffect(() => {
    fetchBankAccounts()
  }, [user])

  const fetchBankAccounts = async () => {
    try {
      if (!user?.id) return

      setLoading(true)
      const { data, error } = await supabase?.from('bank_accounts')?.select('*')?.eq('user_id', user?.id)?.order('is_primary', { ascending: false })

      if (error) throw error

      // Transform data to match existing component expectations
      const transformedAccounts = data?.map(account => ({
        id: account?.id,
        name: account?.account_name,
        number: `****${account?.account_number?.slice(-4)}`,
        type: account?.account_type,
        balance: account?.balance,
        availableBalance: account?.available_balance,
        lastUpdated: new Date(account.updated_at)?.toLocaleString(),
        status: account?.status
      })) || []

      setAccounts(transformedAccounts)
    } catch (err) {
      setError(err?.message)
    } finally {
      setLoading(false)
    }
  }

  return { accounts, loading, error, refetch: fetchBankAccounts }
}

// Custom hook for fetching transactions
export const useTransactions = (limit = 10) => {
  const [transactions, setTransactions] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const { user } = useAuth()

  useEffect(() => {
    fetchTransactions()
  }, [user, limit])

  const fetchTransactions = async () => {
    try {
      if (!user?.id) return

      setLoading(true)
      const { data, error } = await supabase?.from('transactions')?.select(`
          *,
          bank_accounts!inner(account_name, account_number)
        `)?.eq('user_id', user?.id)?.order('transaction_date', { ascending: false })?.limit(limit)

      if (error) throw error

      // Transform data to match existing component expectations
      const transformedTransactions = data?.map(transaction => ({
        id: transaction?.id,
        date: transaction?.transaction_date,
        description: transaction?.description,
        amount: transaction?.transaction_type === 'credit' ? transaction?.amount : -transaction?.amount,
        balance: transaction?.balance_after,
        type: transaction?.transaction_type,
        reference: transaction?.reference_number,
        category: transaction?.category
      })) || []

      setTransactions(transformedTransactions)
    } catch (err) {
      setError(err?.message)
    } finally {
      setLoading(false)
    }
  }

  return { transactions, loading, error, refetch: fetchTransactions }
}

// Custom hook for fetching investments
export const useInvestments = () => {
  const [investments, setInvestments] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const { user } = useAuth()

  useEffect(() => {
    fetchInvestments()
  }, [user])

  const fetchInvestments = async () => {
    try {
      if (!user?.id) return

      setLoading(true)
      const { data, error } = await supabase?.from('investments')?.select('*')?.eq('user_id', user?.id)?.eq('is_active', true)?.order('created_at', { ascending: false })

      if (error) throw error

      setInvestments(data || [])
    } catch (err) {
      setError(err?.message)
    } finally {
      setLoading(false)
    }
  }

  return { investments, loading, error, refetch: fetchInvestments }
}

// Custom hook for fetching notifications
export const useNotifications = () => {
  const [notifications, setNotifications] = useState([])
  const [unreadCount, setUnreadCount] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const { user } = useAuth()

  useEffect(() => {
    fetchNotifications()
  }, [user])

  const fetchNotifications = async () => {
    try {
      if (!user?.id) return

      setLoading(true)
      const { data, error } = await supabase?.from('notifications')?.select('*')?.eq('user_id', user?.id)?.order('created_at', { ascending: false })?.limit(20)

      if (error) throw error

      setNotifications(data || [])
      setUnreadCount(data?.filter(n => !n?.is_read)?.length || 0)
    } catch (err) {
      setError(err?.message)
    } finally {
      setLoading(false)
    }
  }

  const markAsRead = async (notificationId) => {
    try {
      const { error } = await supabase?.from('notifications')?.update({ is_read: true })?.eq('id', notificationId)

      if (error) throw error

      setNotifications(prev => 
        prev?.map(n => n?.id === notificationId ? { ...n, is_read: true } : n)
      )
      setUnreadCount(prev => Math.max(0, prev - 1))
    } catch (err) {
      console.error('Error marking notification as read:', err)
    }
  }

  return { notifications, unreadCount, loading, error, refetch: fetchNotifications, markAsRead }
}

// Custom hook for fetching beneficiaries
export const useBeneficiaries = () => {
  const [beneficiaries, setBeneficiaries] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const { user } = useAuth()

  useEffect(() => {
    fetchBeneficiaries()
  }, [user])

  const fetchBeneficiaries = async () => {
    try {
      if (!user?.id) return

      setLoading(true)
      const { data, error } = await supabase?.from('beneficiaries')?.select('*')?.eq('user_id', user?.id)?.order('created_at', { ascending: false })

      if (error) throw error

      setBeneficiaries(data || [])
    } catch (err) {
      setError(err?.message)
    } finally {
      setLoading(false)
    }
  }

  const addBeneficiary = async (beneficiaryData) => {
    try {
      if (!user?.id) throw new Error('User not authenticated')

      const { data, error } = await supabase?.from('beneficiaries')?.insert([{ ...beneficiaryData, user_id: user?.id }])?.select()?.single()

      if (error) throw error

      setBeneficiaries(prev => [data, ...prev])
      return { data, error: null }
    } catch (err) {
      return { data: null, error: err }
    }
  }

  return { beneficiaries, loading, error, refetch: fetchBeneficiaries, addBeneficiary }
}