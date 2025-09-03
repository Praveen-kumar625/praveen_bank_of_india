import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import { Checkbox } from '../../../components/ui/Checkbox';

const SecurityTab = () => {
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showPinModal, setShowPinModal] = useState(false);
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [pinData, setPinData] = useState({
    currentPin: '',
    newPin: '',
    confirmPin: ''
  });

  const [securitySettings, setSecuritySettings] = useState({
    twoFactorAuth: true,
    smsAlerts: true,
    emailAlerts: true,
    loginNotifications: true,
    transactionAlerts: true,
    biometricLogin: false
  });

  const registeredDevices = [
    {
      id: 1,
      deviceName: "iPhone 13 Pro",
      deviceType: "Mobile",
      lastUsed: "2025-01-03 14:30",
      location: "Mumbai, India",
      status: "active",
      isCurrent: true
    },
    {
      id: 2,
      deviceName: "MacBook Pro",
      deviceType: "Desktop",
      lastUsed: "2025-01-02 09:15",
      location: "Mumbai, India",
      status: "active",
      isCurrent: false
    },
    {
      id: 3,
      deviceName: "Samsung Galaxy S21",
      deviceType: "Mobile",
      lastUsed: "2024-12-28 16:45",
      location: "Delhi, India",
      status: "inactive",
      isCurrent: false
    }
  ];

  const loginHistory = [
    {
      id: 1,
      timestamp: "2025-01-03 14:30:25",
      device: "iPhone 13 Pro",
      location: "Mumbai, India",
      ipAddress: "192.168.1.100",
      status: "success"
    },
    {
      id: 2,
      timestamp: "2025-01-02 09:15:42",
      device: "MacBook Pro",
      location: "Mumbai, India",
      ipAddress: "192.168.1.101",
      status: "success"
    },
    {
      id: 3,
      timestamp: "2025-01-01 18:22:15",
      device: "iPhone 13 Pro",
      location: "Mumbai, India",
      ipAddress: "192.168.1.100",
      status: "success"
    },
    {
      id: 4,
      timestamp: "2024-12-30 11:45:33",
      device: "Unknown Device",
      location: "Pune, India",
      ipAddress: "203.192.45.67",
      status: "failed"
    }
  ];

  const handlePasswordChange = () => {
    if (passwordData?.currentPassword === 'current123' && 
        passwordData?.newPassword === passwordData?.confirmPassword &&
        passwordData?.newPassword?.length >= 8) {
      alert('Password changed successfully!');
      setShowPasswordModal(false);
      setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
    } else {
      alert('Please check your password details. Use "current123" as current password.');
    }
  };

  const handlePinChange = () => {
    if (pinData?.currentPin === '1234' && 
        pinData?.newPin === pinData?.confirmPin &&
        pinData?.newPin?.length === 4) {
      alert('Transaction PIN changed successfully!');
      setShowPinModal(false);
      setPinData({ currentPin: '', newPin: '', confirmPin: '' });
    } else {
      alert('Please check your PIN details. Use "1234" as current PIN.');
    }
  };

  const handleSecuritySettingChange = (setting, value) => {
    setSecuritySettings(prev => ({
      ...prev,
      [setting]: value
    }));
  };

  const handleDeviceAction = (deviceId, action) => {
    if (action === 'remove') {
      alert(`Device removed successfully!`);
    } else if (action === 'block') {
      alert(`Device blocked successfully!`);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h3 className="text-lg font-semibold text-foreground">Security Settings</h3>
        <p className="text-sm text-muted-foreground">Manage your account security and authentication</p>
      </div>
      {/* Password & PIN Management */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h4 className="text-md font-medium text-foreground mb-4">Authentication</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 border border-border rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-3">
                <Icon name="Lock" size={20} color="var(--color-primary)" />
                <div>
                  <p className="text-sm font-medium text-foreground">Login Password</p>
                  <p className="text-xs text-muted-foreground">Last changed 30 days ago</p>
                </div>
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowPasswordModal(true)}
              iconName="Edit"
              iconPosition="left"
              fullWidth
            >
              Change Password
            </Button>
          </div>

          <div className="p-4 border border-border rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-3">
                <Icon name="Hash" size={20} color="var(--color-primary)" />
                <div>
                  <p className="text-sm font-medium text-foreground">Transaction PIN</p>
                  <p className="text-xs text-muted-foreground">Last changed 15 days ago</p>
                </div>
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowPinModal(true)}
              iconName="Edit"
              iconPosition="left"
              fullWidth
            >
              Change PIN
            </Button>
          </div>
        </div>
      </div>
      {/* Security Preferences */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h4 className="text-md font-medium text-foreground mb-4">Security Preferences</h4>
        <div className="space-y-4">
          <Checkbox
            label="Two-Factor Authentication"
            description="Add an extra layer of security to your account"
            checked={securitySettings?.twoFactorAuth}
            onChange={(e) => handleSecuritySettingChange('twoFactorAuth', e?.target?.checked)}
          />

          <Checkbox
            label="SMS Alerts"
            description="Receive SMS notifications for account activities"
            checked={securitySettings?.smsAlerts}
            onChange={(e) => handleSecuritySettingChange('smsAlerts', e?.target?.checked)}
          />

          <Checkbox
            label="Email Alerts"
            description="Receive email notifications for security events"
            checked={securitySettings?.emailAlerts}
            onChange={(e) => handleSecuritySettingChange('emailAlerts', e?.target?.checked)}
          />

          <Checkbox
            label="Login Notifications"
            description="Get notified when someone logs into your account"
            checked={securitySettings?.loginNotifications}
            onChange={(e) => handleSecuritySettingChange('loginNotifications', e?.target?.checked)}
          />

          <Checkbox
            label="Transaction Alerts"
            description="Receive alerts for all transaction activities"
            checked={securitySettings?.transactionAlerts}
            onChange={(e) => handleSecuritySettingChange('transactionAlerts', e?.target?.checked)}
          />

          <Checkbox
            label="Biometric Login"
            description="Use fingerprint or face recognition for login"
            checked={securitySettings?.biometricLogin}
            onChange={(e) => handleSecuritySettingChange('biometricLogin', e?.target?.checked)}
          />
        </div>
      </div>
      {/* Registered Devices */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h4 className="text-md font-medium text-foreground mb-4">Registered Devices</h4>
        <div className="space-y-3">
          {registeredDevices?.map((device) => (
            <div key={device?.id} className="flex items-center justify-between p-4 border border-border rounded-lg">
              <div className="flex items-center space-x-3">
                <Icon 
                  name={device?.deviceType === 'Mobile' ? 'Smartphone' : 'Monitor'} 
                  size={20} 
                  color="var(--color-primary)" 
                />
                <div>
                  <div className="flex items-center space-x-2">
                    <p className="text-sm font-medium text-foreground">{device?.deviceName}</p>
                    {device?.isCurrent && (
                      <span className="px-2 py-1 bg-success text-success-foreground text-xs rounded-full">
                        Current
                      </span>
                    )}
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      device?.status === 'active' ?'bg-success/10 text-success' :'bg-muted text-muted-foreground'
                    }`}>
                      {device?.status}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Last used: {device?.lastUsed} • {device?.location}
                  </p>
                </div>
              </div>
              {!device?.isCurrent && (
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDeviceAction(device?.id, 'block')}
                  >
                    Block
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDeviceAction(device?.id, 'remove')}
                  >
                    Remove
                  </Button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      {/* Recent Login Activity */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h4 className="text-md font-medium text-foreground mb-4">Recent Login Activity</h4>
        <div className="space-y-3">
          {loginHistory?.map((login) => (
            <div key={login?.id} className="flex items-center justify-between p-3 border border-border rounded-lg">
              <div className="flex items-center space-x-3">
                <Icon 
                  name={login?.status === 'success' ? 'CheckCircle' : 'XCircle'} 
                  size={16} 
                  color={login?.status === 'success' ? 'var(--color-success)' : 'var(--color-error)'} 
                />
                <div>
                  <p className="text-sm font-medium text-foreground">{login?.device}</p>
                  <p className="text-xs text-muted-foreground">
                    {login?.timestamp} • {login?.location} • {login?.ipAddress}
                  </p>
                </div>
              </div>
              <span className={`px-2 py-1 text-xs rounded-full ${
                login?.status === 'success' ?'bg-success/10 text-success' :'bg-error/10 text-error'
              }`}>
                {login?.status}
              </span>
            </div>
          ))}
        </div>
      </div>
      {/* Password Change Modal */}
      {showPasswordModal && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-card border border-border rounded-lg p-6 w-full max-w-md">
            <div className="flex items-center space-x-3 mb-4">
              <Icon name="Lock" size={24} color="var(--color-primary)" />
              <h3 className="text-lg font-semibold text-foreground">Change Password</h3>
            </div>
            
            <div className="space-y-4">
              <Input
                label="Current Password"
                type="password"
                value={passwordData?.currentPassword}
                onChange={(e) => setPasswordData(prev => ({ ...prev, currentPassword: e?.target?.value }))}
                placeholder="current123"
                description="Use 'current123' for demo"
              />

              <Input
                label="New Password"
                type="password"
                value={passwordData?.newPassword}
                onChange={(e) => setPasswordData(prev => ({ ...prev, newPassword: e?.target?.value }))}
                description="Minimum 8 characters"
              />

              <Input
                label="Confirm New Password"
                type="password"
                value={passwordData?.confirmPassword}
                onChange={(e) => setPasswordData(prev => ({ ...prev, confirmPassword: e?.target?.value }))}
              />
            </div>

            <div className="flex items-center justify-end space-x-3 mt-6">
              <Button
                variant="outline"
                onClick={() => {
                  setShowPasswordModal(false);
                  setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
                }}
              >
                Cancel
              </Button>
              <Button
                variant="default"
                onClick={handlePasswordChange}
                iconName="Save"
                iconPosition="left"
              >
                Change Password
              </Button>
            </div>
          </div>
        </div>
      )}
      {/* PIN Change Modal */}
      {showPinModal && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-card border border-border rounded-lg p-6 w-full max-w-md">
            <div className="flex items-center space-x-3 mb-4">
              <Icon name="Hash" size={24} color="var(--color-primary)" />
              <h3 className="text-lg font-semibold text-foreground">Change Transaction PIN</h3>
            </div>
            
            <div className="space-y-4">
              <Input
                label="Current PIN"
                type="password"
                value={pinData?.currentPin}
                onChange={(e) => setPinData(prev => ({ ...prev, currentPin: e?.target?.value }))}
                placeholder="1234"
                description="Use '1234' for demo"
                maxLength={4}
              />

              <Input
                label="New PIN"
                type="password"
                value={pinData?.newPin}
                onChange={(e) => setPinData(prev => ({ ...prev, newPin: e?.target?.value }))}
                description="4 digit PIN"
                maxLength={4}
              />

              <Input
                label="Confirm New PIN"
                type="password"
                value={pinData?.confirmPin}
                onChange={(e) => setPinData(prev => ({ ...prev, confirmPin: e?.target?.value }))}
                maxLength={4}
              />
            </div>

            <div className="flex items-center justify-end space-x-3 mt-6">
              <Button
                variant="outline"
                onClick={() => {
                  setShowPinModal(false);
                  setPinData({ currentPin: '', newPin: '', confirmPin: '' });
                }}
              >
                Cancel
              </Button>
              <Button
                variant="default"
                onClick={handlePinChange}
                iconName="Save"
                iconPosition="left"
              >
                Change PIN
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SecurityTab;