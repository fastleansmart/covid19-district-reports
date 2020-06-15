const notificationWrapper = (apiAccess, renderNotification, notificationContent) => {
  return async () => {
    try {
      return await apiAccess();
    } catch (e) {
      renderNotification(notificationContent);
    }

    return Promise.resolve([]);
  };
};

export { notificationWrapper };
