-- Location: supabase/migrations/20250903031558_bank_of_india_schema.sql
-- Banking Application Schema - Bank of India Digital Platform
-- Integration Type: Complete banking system with authentication
-- Dependencies: auth.users (Supabase built-in)

-- 1. Types and Enums
CREATE TYPE public.account_type AS ENUM ('savings', 'current', 'loan', 'fd', 'rd');
CREATE TYPE public.account_status AS ENUM ('active', 'inactive', 'frozen', 'closed');
CREATE TYPE public.transaction_type AS ENUM ('debit', 'credit');
CREATE TYPE public.transaction_category AS ENUM ('transfer', 'payment', 'deposit', 'withdrawal', 'interest', 'fee', 'refund');
CREATE TYPE public.user_role AS ENUM ('customer', 'admin', 'manager');
CREATE TYPE public.bill_status AS ENUM ('pending', 'paid', 'failed', 'cancelled');
CREATE TYPE public.transfer_status AS ENUM ('pending', 'processing', 'completed', 'failed', 'cancelled');

-- 2. Core User Profiles (Required for PostgREST compatibility)
CREATE TABLE public.user_profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT NOT NULL UNIQUE,
    full_name TEXT NOT NULL,
    phone TEXT,
    role public.user_role DEFAULT 'customer'::public.user_role,
    date_of_birth DATE,
    address TEXT,
    city TEXT,
    state TEXT,
    postal_code TEXT,
    pan_number TEXT,
    aadhar_number TEXT,
    is_active BOOLEAN DEFAULT true,
    kyc_verified BOOLEAN DEFAULT false,
    profile_image_url TEXT,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- 3. Bank Accounts
CREATE TABLE public.bank_accounts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES public.user_profiles(id) ON DELETE CASCADE,
    account_number TEXT NOT NULL UNIQUE,
    account_type public.account_type NOT NULL,
    account_name TEXT NOT NULL,
    balance DECIMAL(15,2) DEFAULT 0.00,
    available_balance DECIMAL(15,2) DEFAULT 0.00,
    status public.account_status DEFAULT 'active'::public.account_status,
    branch_code TEXT,
    ifsc_code TEXT DEFAULT 'BKID0000001',
    opening_date DATE DEFAULT CURRENT_DATE,
    minimum_balance DECIMAL(15,2) DEFAULT 1000.00,
    interest_rate DECIMAL(5,2) DEFAULT 3.5,
    is_primary BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- 4. Transactions
CREATE TABLE public.transactions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    account_id UUID REFERENCES public.bank_accounts(id) ON DELETE CASCADE,
    user_id UUID REFERENCES public.user_profiles(id) ON DELETE CASCADE,
    transaction_type public.transaction_type NOT NULL,
    amount DECIMAL(15,2) NOT NULL,
    balance_after DECIMAL(15,2) NOT NULL,
    description TEXT NOT NULL,
    category public.transaction_category NOT NULL,
    reference_number TEXT NOT NULL UNIQUE,
    beneficiary_name TEXT,
    beneficiary_account TEXT,
    channel TEXT DEFAULT 'online',
    location TEXT,
    transaction_date TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- 5. Beneficiaries for Fund Transfers
CREATE TABLE public.beneficiaries (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES public.user_profiles(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    account_number TEXT NOT NULL,
    ifsc_code TEXT NOT NULL,
    bank_name TEXT NOT NULL,
    nickname TEXT,
    account_type TEXT DEFAULT 'savings',
    is_favorite BOOLEAN DEFAULT false,
    verification_status TEXT DEFAULT 'verified',
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- 6. Fund Transfers
CREATE TABLE public.fund_transfers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES public.user_profiles(id) ON DELETE CASCADE,
    from_account_id UUID REFERENCES public.bank_accounts(id) ON DELETE CASCADE,
    beneficiary_id UUID REFERENCES public.beneficiaries(id) ON DELETE SET NULL,
    beneficiary_account_number TEXT NOT NULL,
    beneficiary_name TEXT NOT NULL,
    beneficiary_ifsc TEXT NOT NULL,
    amount DECIMAL(15,2) NOT NULL,
    purpose TEXT,
    transfer_type TEXT DEFAULT 'NEFT',
    status public.transfer_status DEFAULT 'pending'::public.transfer_status,
    reference_number TEXT NOT NULL UNIQUE,
    transaction_charges DECIMAL(10,2) DEFAULT 0.00,
    scheduled_date TIMESTAMPTZ,
    completed_at TIMESTAMPTZ,
    failure_reason TEXT,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- 7. Bill Payments
CREATE TABLE public.bill_payments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES public.user_profiles(id) ON DELETE CASCADE,
    account_id UUID REFERENCES public.bank_accounts(id) ON DELETE CASCADE,
    biller_name TEXT NOT NULL,
    biller_category TEXT NOT NULL,
    consumer_number TEXT NOT NULL,
    amount DECIMAL(15,2) NOT NULL,
    due_date DATE,
    bill_date DATE,
    status public.bill_status DEFAULT 'pending'::public.bill_status,
    reference_number TEXT NOT NULL UNIQUE,
    convenience_fee DECIMAL(10,2) DEFAULT 0.00,
    paid_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- 8. Investment Portfolios
CREATE TABLE public.investments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES public.user_profiles(id) ON DELETE CASCADE,
    investment_type TEXT NOT NULL, -- 'mutual_fund', 'stocks', 'bonds', 'fd'
    scheme_name TEXT NOT NULL,
    scheme_code TEXT,
    units DECIMAL(15,4),
    nav DECIMAL(10,4),
    current_value DECIMAL(15,2) NOT NULL,
    invested_amount DECIMAL(15,2) NOT NULL,
    purchase_date DATE DEFAULT CURRENT_DATE,
    maturity_date DATE,
    sip_amount DECIMAL(15,2),
    sip_date INTEGER, -- Day of month for SIP
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- 9. Banking Notifications
CREATE TABLE public.notifications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES public.user_profiles(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    message TEXT NOT NULL,
    notification_type TEXT DEFAULT 'info', -- 'info', 'warning', 'success', 'error'
    is_read BOOLEAN DEFAULT false,
    priority TEXT DEFAULT 'medium', -- 'low', 'medium', 'high'
    action_url TEXT,
    expires_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- 10. Essential Indexes
CREATE INDEX idx_user_profiles_email ON public.user_profiles(email);
CREATE INDEX idx_bank_accounts_user_id ON public.bank_accounts(user_id);
CREATE INDEX idx_bank_accounts_account_number ON public.bank_accounts(account_number);
CREATE INDEX idx_transactions_account_id ON public.transactions(account_id);
CREATE INDEX idx_transactions_user_id ON public.transactions(user_id);
CREATE INDEX idx_transactions_date ON public.transactions(transaction_date DESC);
CREATE INDEX idx_beneficiaries_user_id ON public.beneficiaries(user_id);
CREATE INDEX idx_fund_transfers_user_id ON public.fund_transfers(user_id);
CREATE INDEX idx_bill_payments_user_id ON public.bill_payments(user_id);
CREATE INDEX idx_investments_user_id ON public.investments(user_id);
CREATE INDEX idx_notifications_user_id ON public.notifications(user_id);
CREATE INDEX idx_notifications_unread ON public.notifications(user_id, is_read) WHERE is_read = false;

-- 11. Functions (Must be before RLS policies)
CREATE OR REPLACE FUNCTION public.is_admin_from_auth()
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
AS $$
SELECT EXISTS (
    SELECT 1 FROM auth.users au
    WHERE au.id = auth.uid() 
    AND (au.raw_user_meta_data->>'role' = 'admin' 
         OR au.raw_app_meta_data->>'role' = 'admin')
)
$$;

-- Function for automatic profile creation
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
SECURITY DEFINER
LANGUAGE plpgsql
AS $$
BEGIN
  INSERT INTO public.user_profiles (id, email, full_name, role)
  VALUES (
    NEW.id, 
    NEW.email, 
    COALESCE(NEW.raw_user_meta_data->>'full_name', split_part(NEW.email, '@', 1)),
    COALESCE(NEW.raw_user_meta_data->>'role', 'customer')::public.user_role
  );  
  RETURN NEW;
END;
$$;

-- 12. Enable RLS
ALTER TABLE public.user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bank_accounts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.beneficiaries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.fund_transfers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bill_payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.investments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;

-- 13. RLS Policies (Pattern 1: Core User Tables)
CREATE POLICY "users_manage_own_user_profiles"
ON public.user_profiles
FOR ALL
TO authenticated
USING (id = auth.uid())
WITH CHECK (id = auth.uid());

-- Pattern 2: Simple User Ownership
CREATE POLICY "users_manage_own_bank_accounts"
ON public.bank_accounts
FOR ALL
TO authenticated
USING (user_id = auth.uid())
WITH CHECK (user_id = auth.uid());

CREATE POLICY "users_manage_own_transactions"
ON public.transactions
FOR ALL
TO authenticated
USING (user_id = auth.uid())
WITH CHECK (user_id = auth.uid());

CREATE POLICY "users_manage_own_beneficiaries"
ON public.beneficiaries
FOR ALL
TO authenticated
USING (user_id = auth.uid())
WITH CHECK (user_id = auth.uid());

CREATE POLICY "users_manage_own_fund_transfers"
ON public.fund_transfers
FOR ALL
TO authenticated
USING (user_id = auth.uid())
WITH CHECK (user_id = auth.uid());

CREATE POLICY "users_manage_own_bill_payments"
ON public.bill_payments
FOR ALL
TO authenticated
USING (user_id = auth.uid())
WITH CHECK (user_id = auth.uid());

CREATE POLICY "users_manage_own_investments"
ON public.investments
FOR ALL
TO authenticated
USING (user_id = auth.uid())
WITH CHECK (user_id = auth.uid());

CREATE POLICY "users_manage_own_notifications"
ON public.notifications
FOR ALL
TO authenticated
USING (user_id = auth.uid())
WITH CHECK (user_id = auth.uid());

-- Admin access policies using Pattern 6A (auth.users metadata)
CREATE POLICY "admin_full_access_user_profiles"
ON public.user_profiles
FOR ALL
TO authenticated
USING (public.is_admin_from_auth());

CREATE POLICY "admin_full_access_bank_accounts"
ON public.bank_accounts
FOR ALL
TO authenticated
USING (public.is_admin_from_auth());

-- 14. Triggers
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- 15. Complete Mock Data
DO $$
DECLARE
    user1_auth_id UUID := gen_random_uuid();
    user2_auth_id UUID := gen_random_uuid();
    admin_auth_id UUID := gen_random_uuid();
    account1_id UUID := gen_random_uuid();
    account2_id UUID := gen_random_uuid();
    account3_id UUID := gen_random_uuid();
    benef1_id UUID := gen_random_uuid();
BEGIN
    -- Create auth users with required fields
    INSERT INTO auth.users (
        id, instance_id, aud, role, email, encrypted_password, email_confirmed_at,
        created_at, updated_at, raw_user_meta_data, raw_app_meta_data,
        is_sso_user, is_anonymous, confirmation_token, confirmation_sent_at,
        recovery_token, recovery_sent_at, email_change_token_new, email_change,
        email_change_sent_at, email_change_token_current, email_change_confirm_status,
        reauthentication_token, reauthentication_sent_at, phone, phone_change,
        phone_change_token, phone_change_sent_at
    ) VALUES
        (user1_auth_id, '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated',
         'rajesh.kumar@example.com', crypt('Password123!', gen_salt('bf', 10)), now(), now(), now(),
         '{"full_name": "Rajesh Kumar"}'::jsonb, '{"provider": "email", "providers": ["email"]}'::jsonb,
         false, false, '', null, '', null, '', '', null, '', 0, '', null, null, '', '', null),
        (user2_auth_id, '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated',
         'priya.sharma@example.com', crypt('Password123!', gen_salt('bf', 10)), now(), now(), now(),
         '{"full_name": "Priya Sharma"}'::jsonb, '{"provider": "email", "providers": ["email"]}'::jsonb,
         false, false, '', null, '', null, '', '', null, '', 0, '', null, null, '', '', null),
        (admin_auth_id, '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated',
         'admin@bankofndia.co.in', crypt('AdminPass123!', gen_salt('bf', 10)), now(), now(), now(),
         '{"full_name": "Bank Admin", "role": "admin"}'::jsonb, '{"provider": "email", "providers": ["email"]}'::jsonb,
         false, false, '', null, '', null, '', '', null, '', 0, '', null, null, '', '', null);

    -- Create bank accounts
    INSERT INTO public.bank_accounts (id, user_id, account_number, account_type, account_name, balance, available_balance, is_primary) VALUES
        (account1_id, user1_auth_id, '123456781234', 'savings'::public.account_type, 'Primary Savings Account', 125000.00, 125000.00, true),
        (account2_id, user1_auth_id, '123456785678', 'current'::public.account_type, 'Current Account', 450000.00, 400000.00, false),
        (account3_id, user1_auth_id, '123456789012', 'loan'::public.account_type, 'Home Loan', 2850000.00, 2850000.00, false);

    -- Create sample beneficiary
    INSERT INTO public.beneficiaries (id, user_id, name, account_number, ifsc_code, bank_name, nickname) VALUES
        (benef1_id, user1_auth_id, 'Priya Sharma', '987654321098', 'ICIC0000123', 'ICICI Bank', 'Priya');

    -- Create sample transactions
    INSERT INTO public.transactions (account_id, user_id, transaction_type, amount, balance_after, description, category, reference_number, beneficiary_name) VALUES
        (account1_id, user1_auth_id, 'debit'::public.transaction_type, 2500.00, 125000.00, 'UPI Payment to Rajesh Merchant', 'payment'::public.transaction_category, 'UPI/250903/10:30', 'Rajesh Merchant'),
        (account1_id, user1_auth_id, 'debit'::public.transaction_type, 2850.00, 127500.00, 'MSEB Bill Payment', 'payment'::public.transaction_category, 'BILL/250902/18:45', 'MSEB'),
        (account1_id, user1_auth_id, 'credit'::public.transaction_type, 75000.00, 130350.00, 'Salary Credit - ABC Corp', 'deposit'::public.transaction_category, 'SAL/250902/14:20', 'ABC Corp'),
        (account1_id, user1_auth_id, 'debit'::public.transaction_type, 5000.00, 55350.00, 'ATM Withdrawal', 'withdrawal'::public.transaction_category, 'ATM/250901/16:15', null),
        (account1_id, user1_auth_id, 'credit'::public.transaction_type, 15000.00, 60350.00, 'NEFT Transfer from Priya Sharma', 'transfer'::public.transaction_category, 'NEFT/250901/11:30', 'Priya Sharma'),
        (account1_id, user1_auth_id, 'debit'::public.transaction_type, 599.00, 45350.00, 'Mobile Recharge - Airtel', 'payment'::public.transaction_category, 'RECH/250831/09:45', 'Airtel'),
        (account1_id, user1_auth_id, 'debit'::public.transaction_type, 8500.00, 45949.00, 'Online Shopping - Amazon', 'payment'::public.transaction_category, 'SHOP/250830/13:20', 'Amazon'),
        (account1_id, user1_auth_id, 'credit'::public.transaction_type, 1250.00, 54449.00, 'Interest Credit', 'interest'::public.transaction_category, 'INT/250829/10:10', null);

    -- Create sample investments
    INSERT INTO public.investments (user_id, investment_type, scheme_name, current_value, invested_amount, purchase_date) VALUES
        (user1_auth_id, 'mutual_fund', 'SBI Bluechip Fund', 125000.00, 100000.00, '2024-01-15'),
        (user1_auth_id, 'stocks', 'Reliance Industries', 75000.00, 65000.00, '2024-03-20'),
        (user1_auth_id, 'fd', 'Fixed Deposit 5.5%', 550000.00, 500000.00, '2024-02-01');

    -- Create sample notifications
    INSERT INTO public.notifications (user_id, title, message, notification_type) VALUES
        (user1_auth_id, 'Transaction Alert', 'UPI payment of ₹2,500 successful to Rajesh Merchant', 'info'),
        (user1_auth_id, 'Bill Payment', 'Your MSEB bill payment of ₹2,850 has been processed', 'success'),
        (user1_auth_id, 'Salary Credit', 'Salary of ₹75,000 credited to your account', 'success'),
        (user1_auth_id, 'Security Alert', 'Login detected from new device. If this was not you, please contact us immediately', 'warning');

EXCEPTION
    WHEN foreign_key_violation THEN
        RAISE NOTICE 'Foreign key error: %', SQLERRM;
    WHEN unique_violation THEN
        RAISE NOTICE 'Unique constraint error: %', SQLERRM;
    WHEN OTHERS THEN
        RAISE NOTICE 'Unexpected error: %', SQLERRM;
END $$;