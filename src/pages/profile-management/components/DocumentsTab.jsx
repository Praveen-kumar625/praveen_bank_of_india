import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const DocumentsTab = () => {
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [selectedDocType, setSelectedDocType] = useState('');
  const [uploadFile, setUploadFile] = useState(null);

  const documents = [
    {
      id: 1,
      type: 'Identity Proof',
      name: 'Aadhar Card',
      status: 'verified',
      uploadDate: '2024-03-15',
      expiryDate: null,
      fileSize: '2.3 MB',
      actions: ['view', 'download']
    },
    {
      id: 2,
      type: 'Identity Proof',
      name: 'PAN Card',
      status: 'verified',
      uploadDate: '2024-03-15',
      expiryDate: null,
      fileSize: '1.8 MB',
      actions: ['view', 'download']
    },
    {
      id: 3,
      type: 'Address Proof',
      name: 'Electricity Bill',
      status: 'verified',
      uploadDate: '2024-03-15',
      expiryDate: '2024-06-15',
      fileSize: '3.1 MB',
      actions: ['view', 'download', 'renew']
    },
    {
      id: 4,
      type: 'Income Proof',
      name: 'Salary Certificate',
      status: 'pending',
      uploadDate: '2024-03-20',
      expiryDate: '2025-03-20',
      fileSize: '1.5 MB',
      actions: ['view', 'download']
    },
    {
      id: 5,
      type: 'Bank Statement',
      name: 'Previous Bank Statement',
      status: 'expired',
      uploadDate: '2023-12-15',
      expiryDate: '2024-01-15',
      fileSize: '4.2 MB',
      actions: ['view', 'download', 'replace']
    },
    {
      id: 6,
      type: 'Signature Proof',
      name: 'Signature Specimen',
      status: 'verified',
      uploadDate: '2024-03-15',
      expiryDate: null,
      fileSize: '0.8 MB',
      actions: ['view', 'download']
    }
  ];

  const documentTypes = [
    { value: 'identity', label: 'Identity Proof' },
    { value: 'address', label: 'Address Proof' },
    { value: 'income', label: 'Income Proof' },
    { value: 'bank-statement', label: 'Bank Statement' },
    { value: 'signature', label: 'Signature Proof' },
    { value: 'photo', label: 'Photograph' },
    { value: 'other', label: 'Other Document' }
  ];

  const kycStatus = {
    overall: 'verified',
    identity: 'verified',
    address: 'verified',
    income: 'pending',
    financial: 'verified'
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'verified':
        return 'text-success bg-success/10';
      case 'pending':
        return 'text-warning bg-warning/10';
      case 'expired':
        return 'text-error bg-error/10';
      case 'rejected':
        return 'text-error bg-error/10';
      default:
        return 'text-muted-foreground bg-muted';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'verified':
        return 'CheckCircle';
      case 'pending':
        return 'Clock';
      case 'expired':
        return 'AlertTriangle';
      case 'rejected':
        return 'XCircle';
      default:
        return 'FileText';
    }
  };

  const handleUpload = () => {
    if (selectedDocType && uploadFile) {
      alert(`Document uploaded successfully! Type: ${selectedDocType}`);
      setShowUploadModal(false);
      setSelectedDocType('');
      setUploadFile(null);
    } else {
      alert('Please select document type and file');
    }
  };

  const handleDocumentAction = (docId, action) => {
    switch (action) {
      case 'view':
        alert(`Viewing document ${docId}`);
        break;
      case 'download':
        alert(`Downloading document ${docId}`);
        break;
      case 'renew':
        alert(`Renewing document ${docId}`);
        break;
      case 'replace':
        alert(`Replacing document ${docId}`);
        break;
      default:
        break;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Document Management</h3>
          <p className="text-sm text-muted-foreground">Manage your KYC documents and verification status</p>
        </div>
        <Button
          variant="default"
          onClick={() => setShowUploadModal(true)}
          iconName="Upload"
          iconPosition="left"
        >
          Upload Document
        </Button>
      </div>
      {/* KYC Status Overview */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h4 className="text-md font-medium text-foreground mb-4">KYC Verification Status</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 border border-border rounded-lg">
            <div className="flex items-center space-x-3">
              <Icon 
                name={getStatusIcon(kycStatus?.overall)} 
                size={20} 
                color={kycStatus?.overall === 'verified' ? 'var(--color-success)' : 'var(--color-warning)'} 
              />
              <div>
                <p className="text-sm font-medium text-foreground">Overall KYC</p>
                <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(kycStatus?.overall)}`}>
                  {kycStatus?.overall}
                </span>
              </div>
            </div>
          </div>

          <div className="p-4 border border-border rounded-lg">
            <div className="flex items-center space-x-3">
              <Icon 
                name={getStatusIcon(kycStatus?.identity)} 
                size={20} 
                color={kycStatus?.identity === 'verified' ? 'var(--color-success)' : 'var(--color-warning)'} 
              />
              <div>
                <p className="text-sm font-medium text-foreground">Identity</p>
                <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(kycStatus?.identity)}`}>
                  {kycStatus?.identity}
                </span>
              </div>
            </div>
          </div>

          <div className="p-4 border border-border rounded-lg">
            <div className="flex items-center space-x-3">
              <Icon 
                name={getStatusIcon(kycStatus?.address)} 
                size={20} 
                color={kycStatus?.address === 'verified' ? 'var(--color-success)' : 'var(--color-warning)'} 
              />
              <div>
                <p className="text-sm font-medium text-foreground">Address</p>
                <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(kycStatus?.address)}`}>
                  {kycStatus?.address}
                </span>
              </div>
            </div>
          </div>

          <div className="p-4 border border-border rounded-lg">
            <div className="flex items-center space-x-3">
              <Icon 
                name={getStatusIcon(kycStatus?.income)} 
                size={20} 
                color={kycStatus?.income === 'verified' ? 'var(--color-success)' : 'var(--color-warning)'} 
              />
              <div>
                <p className="text-sm font-medium text-foreground">Income</p>
                <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(kycStatus?.income)}`}>
                  {kycStatus?.income}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Document List */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h4 className="text-md font-medium text-foreground mb-4">Uploaded Documents</h4>
        <div className="space-y-4">
          {documents?.map((doc) => (
            <div key={doc?.id} className="flex items-center justify-between p-4 border border-border rounded-lg">
              <div className="flex items-center space-x-4">
                <Icon name="FileText" size={24} color="var(--color-primary)" />
                <div>
                  <div className="flex items-center space-x-3">
                    <p className="text-sm font-medium text-foreground">{doc?.name}</p>
                    <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(doc?.status)}`}>
                      {doc?.status}
                    </span>
                  </div>
                  <div className="flex items-center space-x-4 mt-1">
                    <p className="text-xs text-muted-foreground">Type: {doc?.type}</p>
                    <p className="text-xs text-muted-foreground">Size: {doc?.fileSize}</p>
                    <p className="text-xs text-muted-foreground">Uploaded: {doc?.uploadDate}</p>
                    {doc?.expiryDate && (
                      <p className="text-xs text-muted-foreground">Expires: {doc?.expiryDate}</p>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                {doc?.actions?.includes('view') && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDocumentAction(doc?.id, 'view')}
                    iconName="Eye"
                  />
                )}
                {doc?.actions?.includes('download') && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDocumentAction(doc?.id, 'download')}
                    iconName="Download"
                  />
                )}
                {doc?.actions?.includes('renew') && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDocumentAction(doc?.id, 'renew')}
                  >
                    Renew
                  </Button>
                )}
                {doc?.actions?.includes('replace') && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDocumentAction(doc?.id, 'replace')}
                  >
                    Replace
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Document Requirements */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h4 className="text-md font-medium text-foreground mb-4">Document Requirements</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h5 className="text-sm font-medium text-foreground mb-3">Accepted Identity Proofs</h5>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-center space-x-2">
                <Icon name="Check" size={14} color="var(--color-success)" />
                <span>Aadhar Card</span>
              </li>
              <li className="flex items-center space-x-2">
                <Icon name="Check" size={14} color="var(--color-success)" />
                <span>PAN Card</span>
              </li>
              <li className="flex items-center space-x-2">
                <Icon name="Check" size={14} color="var(--color-success)" />
                <span>Passport</span>
              </li>
              <li className="flex items-center space-x-2">
                <Icon name="Check" size={14} color="var(--color-success)" />
                <span>Driving License</span>
              </li>
              <li className="flex items-center space-x-2">
                <Icon name="Check" size={14} color="var(--color-success)" />
                <span>Voter ID</span>
              </li>
            </ul>
          </div>

          <div>
            <h5 className="text-sm font-medium text-foreground mb-3">Accepted Address Proofs</h5>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-center space-x-2">
                <Icon name="Check" size={14} color="var(--color-success)" />
                <span>Utility Bills (Electricity, Gas, Water)</span>
              </li>
              <li className="flex items-center space-x-2">
                <Icon name="Check" size={14} color="var(--color-success)" />
                <span>Bank Statement</span>
              </li>
              <li className="flex items-center space-x-2">
                <Icon name="Check" size={14} color="var(--color-success)" />
                <span>Rent Agreement</span>
              </li>
              <li className="flex items-center space-x-2">
                <Icon name="Check" size={14} color="var(--color-success)" />
                <span>Property Tax Receipt</span>
              </li>
              <li className="flex items-center space-x-2">
                <Icon name="Check" size={14} color="var(--color-success)" />
                <span>Telephone Bill</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-6 p-4 bg-warning/10 rounded-lg">
          <div className="flex items-start space-x-3">
            <Icon name="AlertTriangle" size={20} color="var(--color-warning)" />
            <div>
              <p className="text-sm font-medium text-foreground">Document Guidelines</p>
              <ul className="text-xs text-muted-foreground mt-2 space-y-1">
                <li>• Documents should be clear and readable</li>
                <li>• File size should not exceed 5MB</li>
                <li>• Accepted formats: PDF, JPG, PNG</li>
                <li>• Documents should not be older than 3 months (except identity proofs)</li>
                <li>• All documents should be original or certified copies</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      {/* Upload Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-card border border-border rounded-lg p-6 w-full max-w-md">
            <div className="flex items-center space-x-3 mb-4">
              <Icon name="Upload" size={24} color="var(--color-primary)" />
              <h3 className="text-lg font-semibold text-foreground">Upload Document</h3>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Document Type</label>
                <select
                  value={selectedDocType}
                  onChange={(e) => setSelectedDocType(e?.target?.value)}
                  className="w-full px-3 py-2 border border-border rounded-md bg-input text-foreground"
                >
                  <option value="">Select document type</option>
                  {documentTypes?.map((type) => (
                    <option key={type?.value} value={type?.value}>
                      {type?.label}
                    </option>
                  ))}
                </select>
              </div>

              <Input
                label="Select File"
                type="file"
                onChange={(e) => setUploadFile(e?.target?.files?.[0])}
                description="Max size: 5MB. Formats: PDF, JPG, PNG"
                accept=".pdf,.jpg,.jpeg,.png"
              />

              {uploadFile && (
                <div className="p-3 bg-muted rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Icon name="FileText" size={20} color="var(--color-primary)" />
                    <div>
                      <p className="text-sm font-medium text-foreground">{uploadFile?.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {(uploadFile?.size / 1024 / 1024)?.toFixed(2)} MB
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="flex items-center justify-end space-x-3 mt-6">
              <Button
                variant="outline"
                onClick={() => {
                  setShowUploadModal(false);
                  setSelectedDocType('');
                  setUploadFile(null);
                }}
              >
                Cancel
              </Button>
              <Button
                variant="default"
                onClick={handleUpload}
                iconName="Upload"
                iconPosition="left"
              >
                Upload
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DocumentsTab;