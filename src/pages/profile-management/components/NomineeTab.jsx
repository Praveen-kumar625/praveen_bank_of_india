import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const NomineeTab = () => {
  const [nominees, setNominees] = useState([
    {
      id: 1,
      name: "Sunita Kumar",
      relationship: "spouse",
      dateOfBirth: "1988-07-20",
      address: "123, MG Road, Sector 15, Gurgaon, Haryana - 122001",
      phone: "+91 9876543211",
      email: "sunita.kumar@email.com",
      sharePercentage: 60,
      status: "active",
      registrationDate: "2024-03-15"
    },
    {
      id: 2,
      name: "Arjun Kumar",
      relationship: "son",
      dateOfBirth: "2010-12-05",
      address: "123, MG Road, Sector 15, Gurgaon, Haryana - 122001",
      phone: "",
      email: "",
      sharePercentage: 40,
      status: "active",
      registrationDate: "2024-03-15",
      guardian: "Sunita Kumar"
    }
  ]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingNominee, setEditingNominee] = useState(null);
  const [newNominee, setNewNominee] = useState({
    name: '',
    relationship: '',
    dateOfBirth: '',
    address: '',
    phone: '',
    email: '',
    sharePercentage: '',
    guardian: ''
  });

  const relationshipOptions = [
    { value: 'spouse', label: 'Spouse' },
    { value: 'son', label: 'Son' },
    { value: 'daughter', label: 'Daughter' },
    { value: 'father', label: 'Father' },
    { value: 'mother', label: 'Mother' },
    { value: 'brother', label: 'Brother' },
    { value: 'sister', label: 'Sister' },
    { value: 'other', label: 'Other' }
  ];

  const calculateAge = (dateOfBirth) => {
    const today = new Date();
    const birthDate = new Date(dateOfBirth);
    let age = today?.getFullYear() - birthDate?.getFullYear();
    const monthDiff = today?.getMonth() - birthDate?.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today?.getDate() < birthDate?.getDate())) {
      age--;
    }
    
    return age;
  };

  const isMinor = (dateOfBirth) => {
    return calculateAge(dateOfBirth) < 18;
  };

  const getTotalSharePercentage = () => {
    return nominees?.reduce((total, nominee) => total + nominee?.sharePercentage, 0);
  };

  const handleAddNominee = () => {
    const totalShare = getTotalSharePercentage() + parseInt(newNominee?.sharePercentage);
    
    if (totalShare > 100) {
      alert('Total share percentage cannot exceed 100%');
      return;
    }

    const nominee = {
      id: Date.now(),
      ...newNominee,
      sharePercentage: parseInt(newNominee?.sharePercentage),
      status: 'active',
      registrationDate: new Date()?.toISOString()?.split('T')?.[0]
    };

    setNominees([...nominees, nominee]);
    setShowAddModal(false);
    setNewNominee({
      name: '',
      relationship: '',
      dateOfBirth: '',
      address: '',
      phone: '',
      email: '',
      sharePercentage: '',
      guardian: ''
    });
  };

  const handleEditNominee = (nominee) => {
    setEditingNominee({ ...nominee });
    setShowEditModal(true);
  };

  const handleUpdateNominee = () => {
    const otherNomineesTotal = nominees?.filter(n => n?.id !== editingNominee?.id)?.reduce((total, nominee) => total + nominee?.sharePercentage, 0);
    
    const totalShare = otherNomineesTotal + parseInt(editingNominee?.sharePercentage);
    
    if (totalShare > 100) {
      alert('Total share percentage cannot exceed 100%');
      return;
    }

    setNominees(nominees?.map(n => 
      n?.id === editingNominee?.id 
        ? { ...editingNominee, sharePercentage: parseInt(editingNominee?.sharePercentage) }
        : n
    ));
    setShowEditModal(false);
    setEditingNominee(null);
  };

  const handleDeleteNominee = (nomineeId) => {
    if (window.confirm('Are you sure you want to remove this nominee?')) {
      setNominees(nominees?.filter(n => n?.id !== nomineeId));
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Nominee Management</h3>
          <p className="text-sm text-muted-foreground">Manage your account nominees and beneficiaries</p>
        </div>
        <Button
          variant="default"
          onClick={() => setShowAddModal(true)}
          iconName="UserPlus"
          iconPosition="left"
          disabled={getTotalSharePercentage() >= 100}
        >
          Add Nominee
        </Button>
      </div>
      {/* Share Distribution Summary */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h4 className="text-md font-medium text-foreground mb-4">Share Distribution</h4>
        <div className="flex items-center space-x-4">
          <div className="flex-1 bg-muted rounded-full h-3">
            <div 
              className="bg-primary h-3 rounded-full transition-all duration-300"
              style={{ width: `${getTotalSharePercentage()}%` }}
            />
          </div>
          <div className="text-sm font-medium text-foreground">
            {getTotalSharePercentage()}% / 100%
          </div>
        </div>
        <p className="text-xs text-muted-foreground mt-2">
          {100 - getTotalSharePercentage()}% remaining to allocate
        </p>
      </div>
      {/* Nominees List */}
      <div className="space-y-4">
        {nominees?.map((nominee) => (
          <div key={nominee?.id} className="bg-card border border-border rounded-lg p-6">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-3">
                  <Icon name="User" size={24} color="var(--color-primary)" />
                  <div>
                    <h5 className="text-lg font-medium text-foreground">{nominee?.name}</h5>
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                      <span className="capitalize">{nominee?.relationship}</span>
                      <span>Age: {calculateAge(nominee?.dateOfBirth)} years</span>
                      {isMinor(nominee?.dateOfBirth) && (
                        <span className="px-2 py-1 bg-warning/10 text-warning text-xs rounded-full">
                          Minor
                        </span>
                      )}
                      <span className="px-2 py-1 bg-success/10 text-success text-xs rounded-full">
                        {nominee?.sharePercentage}% Share
                      </span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground mb-1">Date of Birth</p>
                    <p className="text-foreground">{nominee?.dateOfBirth}</p>
                  </div>
                  
                  <div>
                    <p className="text-muted-foreground mb-1">Registration Date</p>
                    <p className="text-foreground">{nominee?.registrationDate}</p>
                  </div>

                  <div className="md:col-span-2">
                    <p className="text-muted-foreground mb-1">Address</p>
                    <p className="text-foreground">{nominee?.address}</p>
                  </div>

                  {nominee?.phone && (
                    <div>
                      <p className="text-muted-foreground mb-1">Phone</p>
                      <p className="text-foreground">{nominee?.phone}</p>
                    </div>
                  )}

                  {nominee?.email && (
                    <div>
                      <p className="text-muted-foreground mb-1">Email</p>
                      <p className="text-foreground">{nominee?.email}</p>
                    </div>
                  )}

                  {nominee?.guardian && (
                    <div className="md:col-span-2">
                      <p className="text-muted-foreground mb-1">Guardian (Minor)</p>
                      <p className="text-foreground">{nominee?.guardian}</p>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex items-center space-x-2 ml-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleEditNominee(nominee)}
                  iconName="Edit"
                />
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => handleDeleteNominee(nominee?.id)}
                  iconName="Trash2"
                />
              </div>
            </div>
          </div>
        ))}

        {nominees?.length === 0 && (
          <div className="bg-card border border-border rounded-lg p-12 text-center">
            <Icon name="Users" size={48} color="var(--color-muted-foreground)" className="mx-auto mb-4" />
            <h4 className="text-lg font-medium text-foreground mb-2">No Nominees Added</h4>
            <p className="text-muted-foreground mb-4">
              Add nominees to ensure your account benefits are transferred according to your wishes.
            </p>
            <Button
              variant="default"
              onClick={() => setShowAddModal(true)}
              iconName="UserPlus"
              iconPosition="left"
            >
              Add First Nominee
            </Button>
          </div>
        )}
      </div>
      {/* Important Information */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h4 className="text-md font-medium text-foreground mb-4">Important Information</h4>
        <div className="space-y-3 text-sm text-muted-foreground">
          <div className="flex items-start space-x-3">
            <Icon name="Info" size={16} color="var(--color-primary)" className="mt-0.5" />
            <p>Nominees are entitled to receive the account balance and benefits in case of the account holder's demise.</p>
          </div>
          <div className="flex items-start space-x-3">
            <Icon name="Info" size={16} color="var(--color-primary)" className="mt-0.5" />
            <p>For nominees below 18 years of age, a guardian must be appointed.</p>
          </div>
          <div className="flex items-start space-x-3">
            <Icon name="Info" size={16} color="var(--color-primary)" className="mt-0.5" />
            <p>Total share percentage of all nominees must equal 100%.</p>
          </div>
          <div className="flex items-start space-x-3">
            <Icon name="Info" size={16} color="var(--color-primary)" className="mt-0.5" />
            <p>Nominee details can be updated at any time through this interface.</p>
          </div>
        </div>
      </div>
      {/* Add Nominee Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-card border border-border rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center space-x-3 mb-6">
              <Icon name="UserPlus" size={24} color="var(--color-primary)" />
              <h3 className="text-lg font-semibold text-foreground">Add New Nominee</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Full Name"
                type="text"
                value={newNominee?.name}
                onChange={(e) => setNewNominee(prev => ({ ...prev, name: e?.target?.value }))}
                required
              />

              <Select
                label="Relationship"
                options={relationshipOptions}
                value={newNominee?.relationship}
                onChange={(value) => setNewNominee(prev => ({ ...prev, relationship: value }))}
                required
              />

              <Input
                label="Date of Birth"
                type="date"
                value={newNominee?.dateOfBirth}
                onChange={(e) => setNewNominee(prev => ({ ...prev, dateOfBirth: e?.target?.value }))}
                required
              />

              <Input
                label="Share Percentage"
                type="number"
                value={newNominee?.sharePercentage}
                onChange={(e) => setNewNominee(prev => ({ ...prev, sharePercentage: e?.target?.value }))}
                min="1"
                max={100 - getTotalSharePercentage()}
                description={`Max: ${100 - getTotalSharePercentage()}%`}
                required
              />

              <div className="md:col-span-2">
                <Input
                  label="Address"
                  type="text"
                  value={newNominee?.address}
                  onChange={(e) => setNewNominee(prev => ({ ...prev, address: e?.target?.value }))}
                  required
                />
              </div>

              <Input
                label="Phone Number"
                type="tel"
                value={newNominee?.phone}
                onChange={(e) => setNewNominee(prev => ({ ...prev, phone: e?.target?.value }))}
                description="Optional for minors"
              />

              <Input
                label="Email Address"
                type="email"
                value={newNominee?.email}
                onChange={(e) => setNewNominee(prev => ({ ...prev, email: e?.target?.value }))}
                description="Optional for minors"
              />

              {newNominee?.dateOfBirth && isMinor(newNominee?.dateOfBirth) && (
                <div className="md:col-span-2">
                  <Input
                    label="Guardian Name"
                    type="text"
                    value={newNominee?.guardian}
                    onChange={(e) => setNewNominee(prev => ({ ...prev, guardian: e?.target?.value }))}
                    description="Required for nominees below 18 years"
                    required
                  />
                </div>
              )}
            </div>

            <div className="flex items-center justify-end space-x-3 mt-6">
              <Button
                variant="outline"
                onClick={() => {
                  setShowAddModal(false);
                  setNewNominee({
                    name: '',
                    relationship: '',
                    dateOfBirth: '',
                    address: '',
                    phone: '',
                    email: '',
                    sharePercentage: '',
                    guardian: ''
                  });
                }}
              >
                Cancel
              </Button>
              <Button
                variant="default"
                onClick={handleAddNominee}
                iconName="Save"
                iconPosition="left"
              >
                Add Nominee
              </Button>
            </div>
          </div>
        </div>
      )}
      {/* Edit Nominee Modal */}
      {showEditModal && editingNominee && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-card border border-border rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center space-x-3 mb-6">
              <Icon name="Edit" size={24} color="var(--color-primary)" />
              <h3 className="text-lg font-semibold text-foreground">Edit Nominee</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Full Name"
                type="text"
                value={editingNominee?.name}
                onChange={(e) => setEditingNominee(prev => ({ ...prev, name: e?.target?.value }))}
                required
              />

              <Select
                label="Relationship"
                options={relationshipOptions}
                value={editingNominee?.relationship}
                onChange={(value) => setEditingNominee(prev => ({ ...prev, relationship: value }))}
                required
              />

              <Input
                label="Date of Birth"
                type="date"
                value={editingNominee?.dateOfBirth}
                onChange={(e) => setEditingNominee(prev => ({ ...prev, dateOfBirth: e?.target?.value }))}
                required
              />

              <Input
                label="Share Percentage"
                type="number"
                value={editingNominee?.sharePercentage}
                onChange={(e) => setEditingNominee(prev => ({ ...prev, sharePercentage: e?.target?.value }))}
                min="1"
                max="100"
                required
              />

              <div className="md:col-span-2">
                <Input
                  label="Address"
                  type="text"
                  value={editingNominee?.address}
                  onChange={(e) => setEditingNominee(prev => ({ ...prev, address: e?.target?.value }))}
                  required
                />
              </div>

              <Input
                label="Phone Number"
                type="tel"
                value={editingNominee?.phone}
                onChange={(e) => setEditingNominee(prev => ({ ...prev, phone: e?.target?.value }))}
              />

              <Input
                label="Email Address"
                type="email"
                value={editingNominee?.email}
                onChange={(e) => setEditingNominee(prev => ({ ...prev, email: e?.target?.value }))}
              />

              {editingNominee?.guardian && (
                <div className="md:col-span-2">
                  <Input
                    label="Guardian Name"
                    type="text"
                    value={editingNominee?.guardian}
                    onChange={(e) => setEditingNominee(prev => ({ ...prev, guardian: e?.target?.value }))}
                  />
                </div>
              )}
            </div>

            <div className="flex items-center justify-end space-x-3 mt-6">
              <Button
                variant="outline"
                onClick={() => {
                  setShowEditModal(false);
                  setEditingNominee(null);
                }}
              >
                Cancel
              </Button>
              <Button
                variant="default"
                onClick={handleUpdateNominee}
                iconName="Save"
                iconPosition="left"
              >
                Update Nominee
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NomineeTab;