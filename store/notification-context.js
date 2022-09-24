import { createContext, useState, useEffect } from 'react';

const NotificationContext = createContext({
  // { title, message, status }
  notification: null, 
  showNotification: function (notificationData) { },
  hideNotification: function() {}
});

export function NotificationContextProvider(props) {
  const [activeNotification, setActiveNotification] = useState();

  // removing notification indicator after some period of time
  useEffect(() => { 
    if (
      activeNotification && 
      (
        activeNotification.status === 'success' ||
        activeNotification.status === 'error'
      )
    ) {
      const timer = setTimeout(() => {
        setActiveNotification(null);
      }, 3000);

      return () => {
        clearTimeout(timer);
      };
    }
   }, [activeNotification]);

  // showing notification
  function showNotificationHandler(notificationData) {
    setActiveNotification(notificationData);
  }
  
  // hiding notification
  function hideNotificationHandler() {
    setActiveNotification(null);
  }

  const context = {
    notification: activeNotification,
    showNotification: showNotificationHandler,
    hideNotification: hideNotificationHandler
  };

  return (
    <NotificationContext.Provider value={context}>
      {props.children}
    </NotificationContext.Provider>
  );
}

export default NotificationContext;