import React from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';

const ServiceProviderGrid = ({ providers, onProviderSelect, selectedProvider }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {providers?.map((provider) => (
        <div
          key={provider?.id}
          onClick={() => onProviderSelect(provider)}
          className={`p-4 rounded-lg border cursor-pointer transition-all duration-200 hover:shadow-md ${
            selectedProvider?.id === provider?.id
              ? 'border-primary bg-primary/5 shadow-sm'
              : 'border-border bg-card hover:border-primary/50'
          }`}
        >
          <div className="flex items-center space-x-3 mb-3">
            <div className="w-12 h-12 rounded-lg overflow-hidden bg-muted flex items-center justify-center">
              <Image
                src={provider?.logo}
                alt={provider?.name}
                className="w-full h-full object-contain"
              />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-medium text-foreground truncate">{provider?.name}</h3>
              <p className="text-sm text-muted-foreground truncate">{provider?.category}</p>
            </div>
            {selectedProvider?.id === provider?.id && (
              <Icon name="CheckCircle" size={20} color="var(--color-primary)" />
            )}
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Coverage:</span>
              <span className="text-foreground font-medium">{provider?.coverage}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Processing:</span>
              <span className="text-foreground font-medium">{provider?.processingTime}</span>
            </div>
            {provider?.features && provider?.features?.length > 0 && (
              <div className="flex flex-wrap gap-1 mt-2">
                {provider?.features?.slice(0, 2)?.map((feature, index) => (
                  <span
                    key={index}
                    className="text-xs bg-accent/10 text-accent px-2 py-1 rounded-full"
                  >
                    {feature}
                  </span>
                ))}
                {provider?.features?.length > 2 && (
                  <span className="text-xs text-muted-foreground">
                    +{provider?.features?.length - 2} more
                  </span>
                )}
              </div>
            )}
          </div>

          {provider?.isPopular && (
            <div className="absolute top-2 right-2">
              <span className="bg-warning text-warning-foreground text-xs px-2 py-1 rounded-full">
                Popular
              </span>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default ServiceProviderGrid;