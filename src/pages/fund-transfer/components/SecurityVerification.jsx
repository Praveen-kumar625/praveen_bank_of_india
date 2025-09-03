import React, { useState } from 'react';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const SecurityVerification = ({ onVerificationComplete, transferDetails }) => {
  const [transactionPassword, setTransactionPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [errors, setErrors] = useState({});

  const handleSendOtp = async () => {
    if (!transactionPassword) {
      setErrors({ password: 'Transaction password is required' });
      return;
    }
    
    setIsVerifying(true);
    // Simulate OTP sending
    setTimeout(() => {
      setOtpSent(true);
      setIsVerifying(false);
      setErrors({});
    }, 1500);
  };

  const handleVerifyAndProceed = async () => {
    if (!otp || otp?.length !== 6) {
      setErrors({ otp: 'Please enter valid 6-digit OTP' });
      return;
    }

    setIsVerifying(true);
    // Simulate verification
    setTimeout(() => {
      setIsVerifying(false);
      onVerificationComplete(true);
    }, 2000);
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center space-x-3 mb-6">
        <div className="flex items-center justify-center w-12 h-12 bg-primary/10 rounded-lg">
          <Icon name="Shield" size={24} className="text-primary" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-foreground">Security Verification</h3>
          <p className="text-sm text-muted-foreground">Verify your identity to complete the transfer</p>
        </div>
      </div>
      {/* Transaction Summary */}
      <div className="p-4 bg-muted rounded-lg mb-6">
        <h4 className="font-medium text-foreground mb-3">Transaction Summary</h4>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Transfer Amount:</span>
            <span className="font-medium text-foreground">₹{transferDetails?.amount}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Transfer Charges:</span>
            <span className="font-medium text-foreground">₹{transferDetails?.charges}</span>
          </div>
          <div className="flex justify-between border-t border-border pt-2">
            <span className="text-muted-foreground font-medium">Total Debit:</span>
            <span className="font-semibold text-primary">₹{transferDetails?.total}</span>
          </div>
        </div>
      </div>
      <div className="space-y-4">
        {/* Transaction Password */}
        <Input
          label="Transaction Password"
          type="password"
          placeholder="Enter your transaction password"
          value={transactionPassword}
          onChange={(e) => setTransactionPassword(e?.target?.value)}
          error={errors?.password}
          required
        />

        {!otpSent ? (
          <Button
            onClick={handleSendOtp}
            loading={isVerifying}
            iconName="Send"
            iconPosition="left"
            disabled={!transactionPassword}
            fullWidth
          >
            Send OTP
          </Button>
        ) : (
          <>
            <div className="p-3 bg-success/10 rounded-lg border border-success/20">
              <div className="flex items-center space-x-2">
                <Icon name="CheckCircle" size={16} className="text-success" />
                <span className="text-sm font-medium text-success">OTP Sent Successfully</span>
              </div>
              <p className="text-sm text-success mt-1">
                OTP has been sent to your registered mobile number ending with ****7890
              </p>
            </div>

            <Input
              label="Enter OTP"
              type="text"
              placeholder="Enter 6-digit OTP"
              value={otp}
              onChange={(e) => setOtp(e?.target?.value?.replace(/\D/g, '')?.slice(0, 6))}
              error={errors?.otp}
              maxLength={6}
              required
            />

            <div className="flex space-x-3">
              <Button
                variant="outline"
                onClick={handleSendOtp}
                iconName="RotateCcw"
                iconPosition="left"
                className="flex-1"
              >
                Resend OTP
              </Button>
              <Button
                onClick={handleVerifyAndProceed}
                loading={isVerifying}
                iconName="Lock"
                iconPosition="left"
                disabled={!otp || otp?.length !== 6}
                className="flex-1"
              >
                Verify & Proceed
              </Button>
            </div>
          </>
        )}
      </div>
      {/* Security Features */}
      <div className="mt-6 pt-6 border-t border-border">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
          <div className="flex flex-col items-center space-y-2">
            <div className="flex items-center justify-center w-10 h-10 bg-green-50 rounded-lg">
              <Icon name="Shield" size={20} className="text-green-600" />
            </div>
            <div>
              <p className="text-xs font-medium text-foreground">256-bit SSL</p>
              <p className="text-xs text-muted-foreground">Encryption</p>
            </div>
          </div>
          <div className="flex flex-col items-center space-y-2">
            <div className="flex items-center justify-center w-10 h-10 bg-blue-50 rounded-lg">
              <Icon name="Smartphone" size={20} className="text-blue-600" />
            </div>
            <div>
              <p className="text-xs font-medium text-foreground">SMS OTP</p>
              <p className="text-xs text-muted-foreground">Verification</p>
            </div>
          </div>
          <div className="flex flex-col items-center space-y-2">
            <div className="flex items-center justify-center w-10 h-10 bg-purple-50 rounded-lg">
              <Icon name="Clock" size={20} className="text-purple-600" />
            </div>
            <div>
              <p className="text-xs font-medium text-foreground">Session</p>
              <p className="text-xs text-muted-foreground">Timeout</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecurityVerification;