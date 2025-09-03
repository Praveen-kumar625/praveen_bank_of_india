import React from 'react';
import Icon from '../../../components/AppIcon';

const ServiceCategoryTabs = ({ activeCategory, onCategoryChange, categories }) => {
  return (
    <div className="bg-card rounded-lg border border-border shadow-sm">
      {/* Desktop Tabs */}
      <div className="hidden md:flex border-b border-border">
        {categories?.map((category) => (
          <button
            key={category?.id}
            onClick={() => onCategoryChange(category?.id)}
            className={`flex items-center space-x-2 px-6 py-4 text-sm font-medium transition-colors duration-200 border-b-2 ${
              activeCategory === category?.id
                ? 'border-primary text-primary bg-primary/5' :'border-transparent text-muted-foreground hover:text-foreground hover:bg-muted/50'
            }`}
          >
            <Icon name={category?.icon} size={18} />
            <span>{category?.name}</span>
            {category?.count && (
              <span className="bg-muted text-muted-foreground text-xs px-2 py-1 rounded-full">
                {category?.count}
              </span>
            )}
          </button>
        ))}
      </div>
      {/* Mobile Accordion */}
      <div className="md:hidden">
        {categories?.map((category) => (
          <div key={category?.id} className="border-b border-border last:border-b-0">
            <button
              onClick={() => onCategoryChange(category?.id)}
              className={`w-full flex items-center justify-between px-4 py-4 text-left transition-colors duration-200 ${
                activeCategory === category?.id
                  ? 'bg-primary/5 text-primary' :'text-foreground hover:bg-muted/50'
              }`}
            >
              <div className="flex items-center space-x-3">
                <Icon name={category?.icon} size={20} />
                <div>
                  <span className="font-medium">{category?.name}</span>
                  {category?.description && (
                    <p className="text-sm text-muted-foreground mt-1">{category?.description}</p>
                  )}
                </div>
              </div>
              <div className="flex items-center space-x-2">
                {category?.count && (
                  <span className="bg-muted text-muted-foreground text-xs px-2 py-1 rounded-full">
                    {category?.count}
                  </span>
                )}
                <Icon 
                  name={activeCategory === category?.id ? "ChevronUp" : "ChevronDown"} 
                  size={16} 
                  className="text-muted-foreground"
                />
              </div>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServiceCategoryTabs;