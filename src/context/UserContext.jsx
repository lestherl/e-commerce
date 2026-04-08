import React, { createContext, useContext, useState, useEffect } from 'react';

// Create User Context
const UserContext = createContext();

// Custom hook to use user context
export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

// User Provider Component
export const UserProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+63 912 345 6789',
    address: '123 Makati Avenue, Makati City, Philippines',
    memberSince: 'January 2024',
    avatar: 'https://picsum.photos/seed/user-avatar/200/200.jpg',
    isLoggedIn: false
  });

  const [orders, setOrders] = useState([
    {
      id: 'ORD-001',
      date: '2024-01-15',
      status: 'delivered',
      total: 1599.97,
      items: [
        { name: 'Business Presentation Template', quantity: 2, price: 29.99 },
        { name: 'Marketing Dashboard', quantity: 1, price: 39.99 }
      ]
    },
    {
      id: 'ORD-002',
      date: '2024-01-20',
      status: 'processing',
      total: 89.97,
      items: [
        { name: 'Educational Slides', quantity: 3, price: 29.99 }
      ]
    },
    {
      id: 'ORD-003',
      date: '2024-01-25',
      status: 'shipped',
      total: 119.96,
      items: [
        { name: 'Creative Portfolio', quantity: 2, price: 39.99 },
        { name: 'Sales Presentation', quantity: 1, price: 39.99 }
      ]
    }
  ]);

  // Load user data from localStorage on mount
  useEffect(() => {
    const savedUserInfo = localStorage.getItem('userInfo');
    const savedOrders = localStorage.getItem('userOrders');
    
    if (savedUserInfo) {
      setUserInfo(JSON.parse(savedUserInfo));
    }
    
    if (savedOrders) {
      setOrders(JSON.parse(savedOrders));
    }
  }, []);

  // Save user data to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('userInfo', JSON.stringify(userInfo));
  }, [userInfo]);

  useEffect(() => {
    localStorage.setItem('userOrders', JSON.stringify(orders));
  }, [orders]);

  // Update user information
  const updateUserInfo = (newUserInfo) => {
    setUserInfo(prev => ({ ...prev, ...newUserInfo }));
  };

  // Login user
  const login = (userData) => {
    setUserInfo(prev => ({
      ...prev,
      ...userData,
      isLoggedIn: true
    }));
  };

  // Logout user
  const logout = () => {
    setUserInfo(prev => ({
      ...prev,
      isLoggedIn: false
    }));
  };

  // Add new order
  const addOrder = (newOrder) => {
    const orderWithId = {
      ...newOrder,
      id: `ORD-${String(orders.length + 1).padStart(3, '0')}`,
      date: new Date().toISOString().split('T')[0],
      status: 'processing'
    };
    setOrders(prev => [orderWithId, ...prev]);
  };

  // Update order status
  const updateOrderStatus = (orderId, newStatus) => {
    setOrders(prev => 
      prev.map(order => 
        order.id === orderId 
          ? { ...order, status: newStatus }
          : order
      )
    );
  };

  // Get order statistics
  const getOrderStats = () => {
    const totalOrders = orders.length;
    const completedOrders = orders.filter(order => order.status === 'delivered').length;
    const processingOrders = orders.filter(order => order.status === 'processing').length;
    const shippedOrders = orders.filter(order => order.status === 'shipped').length;
    const totalItems = orders.reduce((total, order) => total + order.items.length, 0);
    const totalSpent = orders.reduce((total, order) => total + order.total, 0);

    return {
      totalOrders,
      completedOrders,
      processingOrders,
      shippedOrders,
      totalItems,
      totalSpent
    };
  };

  const value = {
    userInfo,
    orders,
    updateUserInfo,
    login,
    logout,
    addOrder,
    updateOrderStatus,
    getOrderStats
  };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};
