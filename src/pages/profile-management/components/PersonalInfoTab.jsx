import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const PersonalInfoTab = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [personalInfo, setPersonalInfo] = useState({
    firstName: "Rajesh",
    lastName: "Kumar",
    dateOfBirth: "1985-03-15",
    gender: "male",
    maritalStatus: "married",
    fatherName: "Suresh Kumar",
    motherName: "Sunita Devi",
    occupation: "software-engineer",
    annualIncome: "800000",
    panNumber: "ABCDE1234F",
    aadharNumber: "1234-5678-9012"
  });

  const [tempInfo, setTempInfo] = useState({ ...personalInfo });

  const genderOptions = [
    { value: 'male', label: 'Male' },
    { value: 'female', label: 'Female' },
    { value: 'other', label: 'Other' }
  ];

  const maritalStatusOptions = [
    { value: 'single', label: 'Single' },
    { value: 'married', label: 'Married' },
    { value: 'divorced', label: 'Divorced' },
    { value: 'widowed', label: 'Widowed' }
  ];

  const occupationOptions = [
    { value: 'software-engineer', label: 'Software Engineer' },
    { value: 'doctor', label: 'Doctor' },
    { value: 'teacher', label: 'Teacher' },
    { value: 'business-owner', label: 'Business Owner' },
    { value: 'government-employee', label: 'Government Employee' },
    { value: 'private-employee', label: 'Private Employee' },
    { value: 'retired', label: 'Retired' },
    { value: 'student', label: 'Student' },
    { value: 'other', label: 'Other' }
  ];

  const handleEdit = () => {
    setIsEditing(true);
    setTempInfo({ ...personalInfo });
  };

  const handleCancel = () => {
    setIsEditing(false);
    setTempInfo({ ...personalInfo });
  };

  const handleSave = () => {
    setPersonalInfo({ ...tempInfo });
    setIsEditing(false);
  };

  const handleInputChange = (field, value) => {
    setTempInfo(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Personal Information</h3>
          <p className="text-sm text-muted-foreground">Manage your basic personal details</p>
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
      {/* Personal Details Form */}
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* First Name */}
          <Input
            label="First Name"
            type="text"
            value={isEditing ? tempInfo?.firstName : personalInfo?.firstName}
            onChange={(e) => handleInputChange('firstName', e?.target?.value)}
            disabled={!isEditing}
            required
          />

          {/* Last Name */}
          <Input
            label="Last Name"
            type="text"
            value={isEditing ? tempInfo?.lastName : personalInfo?.lastName}
            onChange={(e) => handleInputChange('lastName', e?.target?.value)}
            disabled={!isEditing}
            required
          />

          {/* Date of Birth */}
          <Input
            label="Date of Birth"
            type="date"
            value={isEditing ? tempInfo?.dateOfBirth : personalInfo?.dateOfBirth}
            onChange={(e) => handleInputChange('dateOfBirth', e?.target?.value)}
            disabled={!isEditing}
            required
          />

          {/* Gender */}
          <Select
            label="Gender"
            options={genderOptions}
            value={isEditing ? tempInfo?.gender : personalInfo?.gender}
            onChange={(value) => handleInputChange('gender', value)}
            disabled={!isEditing}
            required
          />

          {/* Marital Status */}
          <Select
            label="Marital Status"
            options={maritalStatusOptions}
            value={isEditing ? tempInfo?.maritalStatus : personalInfo?.maritalStatus}
            onChange={(value) => handleInputChange('maritalStatus', value)}
            disabled={!isEditing}
            required
          />

          {/* Father's Name */}
          <Input
            label="Father's Name"
            type="text"
            value={isEditing ? tempInfo?.fatherName : personalInfo?.fatherName}
            onChange={(e) => handleInputChange('fatherName', e?.target?.value)}
            disabled={!isEditing}
            required
          />

          {/* Mother's Name */}
          <Input
            label="Mother's Name"
            type="text"
            value={isEditing ? tempInfo?.motherName : personalInfo?.motherName}
            onChange={(e) => handleInputChange('motherName', e?.target?.value)}
            disabled={!isEditing}
            required
          />

          {/* Occupation */}
          <Select
            label="Occupation"
            options={occupationOptions}
            value={isEditing ? tempInfo?.occupation : personalInfo?.occupation}
            onChange={(value) => handleInputChange('occupation', value)}
            disabled={!isEditing}
            required
          />

          {/* Annual Income */}
          <Input
            label="Annual Income (₹)"
            type="number"
            value={isEditing ? tempInfo?.annualIncome : personalInfo?.annualIncome}
            onChange={(e) => handleInputChange('annualIncome', e?.target?.value)}
            disabled={!isEditing}
            required
          />

          {/* PAN Number */}
          <Input
            label="PAN Number"
            type="text"
            value={isEditing ? tempInfo?.panNumber : personalInfo?.panNumber}
            onChange={(e) => handleInputChange('panNumber', e?.target?.value)}
            disabled={!isEditing}
            required
            description="Permanent Account Number"
          />

          {/* Aadhar Number */}
          <Input
            label="Aadhar Number"
            type="text"
            value={isEditing ? tempInfo?.aadharNumber : personalInfo?.aadharNumber}
            onChange={(e) => handleInputChange('aadharNumber', e?.target?.value)}
            disabled={!isEditing}
            required
            description="Unique Identification Number"
          />
        </div>

        {/* Action Buttons */}
        {isEditing && (
          <div className="flex items-center justify-end space-x-3 mt-6 pt-6 border-t border-border">
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
      </div>
      {/* Verification Status */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h4 className="text-md font-medium text-foreground mb-4">Verification Status</h4>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-success/10 rounded-lg">
            <div className="flex items-center space-x-3">
              <Icon name="CheckCircle" size={20} color="var(--color-success)" />
              <div>
                <p className="text-sm font-medium text-foreground">PAN Verification</p>
                <p className="text-xs text-muted-foreground">Verified on 15 Mar 2024</p>
              </div>
            </div>
            <div className="px-2 py-1 bg-success text-success-foreground text-xs rounded-full">
              Verified
            </div>
          </div>

          <div className="flex items-center justify-between p-3 bg-success/10 rounded-lg">
            <div className="flex items-center space-x-3">
              <Icon name="CheckCircle" size={20} color="var(--color-success)" />
              <div>
                <p className="text-sm font-medium text-foreground">Aadhar Verification</p>
                <p className="text-xs text-muted-foreground">Verified on 15 Mar 2024</p>
              </div>
            </div>
            <div className="px-2 py-1 bg-success text-success-foreground text-xs rounded-full">
              Verified
            </div>
          </div>

          <div className="flex items-center justify-between p-3 bg-warning/10 rounded-lg">
            <div className="flex items-center space-x-3">
              <Icon name="AlertCircle" size={20} color="var(--color-warning)" />
              <div>
                <p className="text-sm font-medium text-foreground">Income Verification</p>
                <p className="text-xs text-muted-foreground">Pending document upload</p>
              </div>
            </div>
            <div className="px-2 py-1 bg-warning text-warning-foreground text-xs rounded-full">
              Pending
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalInfoTab;