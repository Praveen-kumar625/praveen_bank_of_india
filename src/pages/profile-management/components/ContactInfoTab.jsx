import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const ContactInfoTab = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [otpField, setOtpField] = useState('');
  const [contactInfo, setContactInfo] = useState({
    primaryPhone: "+91 9876543210",
    secondaryPhone: "+91 9876543211",
    primaryEmail: "rajesh.kumar@email.com",
    secondaryEmail: "rajesh.work@email.com",
    residentialAddress: "123, MG Road, Sector 15",
    city: "Gurgaon",
    state: "haryana",
    pincode: "122001",
    permanentAddress: "456, Civil Lines, Model Town",
    permanentCity: "Delhi",
    permanentState: "delhi",
    permanentPincode: "110009",
    sameAsResidential: false
  });

  const [tempInfo, setTempInfo] = useState({ ...contactInfo });
  const [pendingField, setPendingField] = useState('');

  const stateOptions = [
    { value: 'andhra-pradesh', label: 'Andhra Pradesh' },
    { value: 'delhi', label: 'Delhi' },
    { value: 'gujarat', label: 'Gujarat' },
    { value: 'haryana', label: 'Haryana' },
    { value: 'karnataka', label: 'Karnataka' },
    { value: 'maharashtra', label: 'Maharashtra' },
    { value: 'punjab', label: 'Punjab' },
    { value: 'rajasthan', label: 'Rajasthan' },
    { value: 'tamil-nadu', label: 'Tamil Nadu' },
    { value: 'uttar-pradesh', label: 'Uttar Pradesh' }
  ];

  const handleEdit = () => {
    setIsEditing(true);
    setTempInfo({ ...contactInfo });
  };

  const handleCancel = () => {
    setIsEditing(false);
    setTempInfo({ ...contactInfo });
  };

  const handleSave = () => {
    // Check if sensitive fields (phone/email) were changed
    const sensitiveFields = ['primaryPhone', 'primaryEmail'];
    const changedSensitiveField = sensitiveFields?.find(field => 
      tempInfo?.[field] !== contactInfo?.[field]
    );

    if (changedSensitiveField) {
      setPendingField(changedSensitiveField);
      setShowOtpModal(true);
    } else {
      setContactInfo({ ...tempInfo });
      setIsEditing(false);
    }
  };

  const handleOtpVerification = () => {
    if (otpField === '123456') {
      setContactInfo({ ...tempInfo });
      setIsEditing(false);
      setShowOtpModal(false);
      setOtpField('');
      setPendingField('');
    } else {
      alert('Invalid OTP. Please enter 123456');
    }
  };

  const handleInputChange = (field, value) => {
    setTempInfo(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSameAsResidential = (checked) => {
    if (checked) {
      setTempInfo(prev => ({
        ...prev,
        sameAsResidential: true,
        permanentAddress: prev?.residentialAddress,
        permanentCity: prev?.city,
        permanentState: prev?.state,
        permanentPincode: prev?.pincode
      }));
    } else {
      setTempInfo(prev => ({
        ...prev,
        sameAsResidential: false
      }));
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Contact Information</h3>
          <p className="text-sm text-muted-foreground">Manage your contact details and addresses</p>
        </div>
        {!isEditing && (
          <Button
            variant="outline"
            onClick={handleEdit}
            iconName="Edit"
            iconPosition="left"
          >
            Edit Details
          </Button>
        )}
      </div>
      {/* Phone Numbers */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h4 className="text-md font-medium text-foreground mb-4">Phone Numbers</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input
            label="Primary Phone"
            type="tel"
            value={isEditing ? tempInfo?.primaryPhone : contactInfo?.primaryPhone}
            onChange={(e) => handleInputChange('primaryPhone', e?.target?.value)}
            disabled={!isEditing}
            required
            description="Used for OTP and alerts"
          />

          <Input
            label="Secondary Phone"
            type="tel"
            value={isEditing ? tempInfo?.secondaryPhone : contactInfo?.secondaryPhone}
            onChange={(e) => handleInputChange('secondaryPhone', e?.target?.value)}
            disabled={!isEditing}
            description="Backup contact number"
          />
        </div>
      </div>
      {/* Email Addresses */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h4 className="text-md font-medium text-foreground mb-4">Email Addresses</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input
            label="Primary Email"
            type="email"
            value={isEditing ? tempInfo?.primaryEmail : contactInfo?.primaryEmail}
            onChange={(e) => handleInputChange('primaryEmail', e?.target?.value)}
            disabled={!isEditing}
            required
            description="Used for statements and notifications"
          />

          <Input
            label="Secondary Email"
            type="email"
            value={isEditing ? tempInfo?.secondaryEmail : contactInfo?.secondaryEmail}
            onChange={(e) => handleInputChange('secondaryEmail', e?.target?.value)}
            disabled={!isEditing}
            description="Backup email address"
          />
        </div>
      </div>
      {/* Residential Address */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h4 className="text-md font-medium text-foreground mb-4">Residential Address</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="md:col-span-2">
            <Input
              label="Address Line"
              type="text"
              value={isEditing ? tempInfo?.residentialAddress : contactInfo?.residentialAddress}
              onChange={(e) => handleInputChange('residentialAddress', e?.target?.value)}
              disabled={!isEditing}
              required
            />
          </div>

          <Input
            label="City"
            type="text"
            value={isEditing ? tempInfo?.city : contactInfo?.city}
            onChange={(e) => handleInputChange('city', e?.target?.value)}
            disabled={!isEditing}
            required
          />

          <Select
            label="State"
            options={stateOptions}
            value={isEditing ? tempInfo?.state : contactInfo?.state}
            onChange={(value) => handleInputChange('state', value)}
            disabled={!isEditing}
            required
          />

          <Input
            label="PIN Code"
            type="text"
            value={isEditing ? tempInfo?.pincode : contactInfo?.pincode}
            onChange={(e) => handleInputChange('pincode', e?.target?.value)}
            disabled={!isEditing}
            required
          />
        </div>
      </div>
      {/* Permanent Address */}
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h4 className="text-md font-medium text-foreground">Permanent Address</h4>
          {isEditing && (
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={tempInfo?.sameAsResidential}
                onChange={(e) => handleSameAsResidential(e?.target?.checked)}
                className="rounded border-border"
              />
              <span className="text-sm text-muted-foreground">Same as residential</span>
            </label>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="md:col-span-2">
            <Input
              label="Address Line"
              type="text"
              value={isEditing ? tempInfo?.permanentAddress : contactInfo?.permanentAddress}
              onChange={(e) => handleInputChange('permanentAddress', e?.target?.value)}
              disabled={!isEditing || tempInfo?.sameAsResidential}
              required
            />
          </div>

          <Input
            label="City"
            type="text"
            value={isEditing ? tempInfo?.permanentCity : contactInfo?.permanentCity}
            onChange={(e) => handleInputChange('permanentCity', e?.target?.value)}
            disabled={!isEditing || tempInfo?.sameAsResidential}
            required
          />

          <Select
            label="State"
            options={stateOptions}
            value={isEditing ? tempInfo?.permanentState : contactInfo?.permanentState}
            onChange={(value) => handleInputChange('permanentState', value)}
            disabled={!isEditing || tempInfo?.sameAsResidential}
            required
          />

          <Input
            label="PIN Code"
            type="text"
            value={isEditing ? tempInfo?.permanentPincode : contactInfo?.permanentPincode}
            onChange={(e) => handleInputChange('permanentPincode', e?.target?.value)}
            disabled={!isEditing || tempInfo?.sameAsResidential}
            required
          />
        </div>
      </div>
      {/* Action Buttons */}
      {isEditing && (
        <div className="flex items-center justify-end space-x-3">
          <Button
            variant="outline"
            onClick={handleCancel}
          >
            Cancel
          </Button>
          <Button
            variant="default"
            onClick={handleSave}
            iconName="Save"
            iconPosition="left"
          >
            Save Changes
          </Button>
        </div>
      )}
      {/* OTP Verification Modal */}
      {showOtpModal && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-card border border-border rounded-lg p-6 w-full max-w-md">
            <div className="flex items-center space-x-3 mb-4">
              <Icon name="Shield" size={24} color="var(--color-primary)" />
              <h3 className="text-lg font-semibold text-foreground">Verify Changes</h3>
            </div>
            
            <p className="text-sm text-muted-foreground mb-4">
              Please enter the OTP sent to your registered mobile number to verify the changes.
            </p>

            <Input
              label="Enter OTP"
              type="text"
              value={otpField}
              onChange={(e) => setOtpField(e?.target?.value)}
              placeholder="123456"
              description="Use 123456 for demo"
              className="mb-4"
            />

            <div className="flex items-center justify-end space-x-3">
              <Button
                variant="outline"
                onClick={() => {
                  setShowOtpModal(false);
                  setOtpField('');
                  setPendingField('');
                }}
              >
                Cancel
              </Button>
              <Button
                variant="default"
                onClick={handleOtpVerification}
                iconName="CheckCircle"
                iconPosition="left"
              >
                Verify
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContactInfoTab;