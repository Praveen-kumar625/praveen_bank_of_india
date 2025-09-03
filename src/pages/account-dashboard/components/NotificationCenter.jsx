import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { useNotifications } from '../../../hooks/useSupabaseData';

const NotificationCenter = () => {
  const { notifications, unreadCount, loading, markAsRead } = useNotifications();

  const handleMarkAsRead = (notificationId) => {
    markAsRead(notificationId);
  };

  const handleViewAll = () => {
    console.log('View all notifications');
    // Navigate to notifications page or open modal
  };

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'success': return 'CheckCircle';
      case 'warning': return 'AlertTriangle';
      case 'error': return 'XCircle';
      default: return 'Bell';
    }
  };

  const getNotificationColor = (type) => {
    switch (type) {
      case 'success': return 'var(--color-success)';
      case 'warning': return 'var(--color-warning)';
      case 'error': return 'var(--color-destructive)';
      default: return 'var(--color-primary)';
    }
  };

  if (loading) {
    return (
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-center justify-center h-32">
          <Icon name="Loader" size={24} className="animate-spin" />
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Icon name="Bell" size={20} />
          <h3 className="font-semibold text-foreground">Notifications</h3>
          {unreadCount > 0 && (
            <span className="inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white bg-destructive rounded-full">
              {unreadCount}
            </span>
          )}
        </div>
        <Button variant="ghost" size="sm" onClick={handleViewAll}>
          View All
        </Button>
      </div>

      <div className="space-y-3 max-h-80 overflow-y-auto">
        {notifications?.length > 0 ? (
          notifications?.slice(0, 5)?.map((notification) => (
            <div
              key={notification?.id}
              className={`p-3 rounded-lg border transition-colors cursor-pointer ${
                notification?.is_read 
                  ? 'bg-muted/30 border-border' :'bg-primary/5 border-primary/20 hover:bg-primary/10'
              }`}
              onClick={() => !notification?.is_read && handleMarkAsRead(notification?.id)}
            >
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 mt-0.5">
                  <Icon 
                    name={getNotificationIcon(notification?.notification_type)} 
                    size={16} 
                    color={getNotificationColor(notification?.notification_type)}
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className={`text-sm font-medium ${notification?.is_read ? 'text-muted-foreground' : 'text-foreground'}`}>
                      {notification?.title}
                    </p>
                    <span className="text-xs text-muted-foreground">
                      {new Date(notification?.created_at)?.toLocaleDateString('en-IN', {
                        month: 'short',
                        day: 'numeric'
                      })}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                    {notification?.message}
                  </p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-8">
            <Icon name="BellOff" size={24} className="mx-auto mb-2 text-muted-foreground" />
            <p className="text-sm text-muted-foreground">No notifications</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default NotificationCenter;