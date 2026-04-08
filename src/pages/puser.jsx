import React, { useState, useEffect } from 'react';
import Header from '../components/header';
import Footer from '../components/footer';
import { FaUser, FaShoppingBag, FaClock, FaCheckCircle, FaTruck, FaBox, FaEdit, FaCamera } from 'react-icons/fa';
import { useUser } from '../context/UserContext';
import '../style/user.css';
import '../style/layout.css';

function User() {
  const { userInfo, orders, updateUserInfo, getOrderStats } = useUser();
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState(userInfo);

  useEffect(() => {
    setEditForm(userInfo);
  }, [userInfo]);

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
    if (isEditing) {
      // Save changes
      updateUserInfo(editForm);
    }
  };

  const handleInputChange = (e) => {
    setEditForm({
      ...editForm,
      [e.target.name]: e.target.value
    });
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'delivered':
        return <FaCheckCircle className="status-icon delivered" />;
      case 'processing':
        return <FaClock className="status-icon processing" />;
      case 'shipped':
        return <FaTruck className="status-icon shipped" />;
      default:
        return <FaBox className="status-icon pending" />;
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'delivered':
        return 'Delivered';
      case 'processing':
        return 'Processing';
      case 'shipped':
        return 'Shipped';
      default:
        return 'Pending';
    }
  };

  const stats = getOrderStats();

  return (
    <>
      <div className='container1'></div>
      <div className='container'>
        <Header />
        <div className="user-page">
          <div className="user-profile-section">
            <div className="profile-header">
              <div className="avatar-container">
                <img src={userInfo.avatar} alt="Profile" className="user-avatar" />
                <button className="avatar-edit-btn">
                  <FaCamera />
                </button>
              </div>
              <div className="user-info">
                {isEditing ? (
                  <div className="edit-form">
                    <input
                      type="text"
                      name="name"
                      value={editForm.name}
                      onChange={handleInputChange}
                      className="edit-input"
                    />
                    <input
                      type="email"
                      name="email"
                      value={editForm.email}
                      onChange={handleInputChange}
                      className="edit-input"
                    />
                    <input
                      type="tel"
                      name="phone"
                      value={editForm.phone}
                      onChange={handleInputChange}
                      className="edit-input"
                    />
                    <textarea
                      name="address"
                      value={editForm.address}
                      onChange={handleInputChange}
                      className="edit-textarea"
                      rows="2"
                    />
                  </div>
                ) : (
                  <>
                    <h1 className="user-name">{userInfo.name}</h1>
                    <p className="user-email">{userInfo.email}</p>
                    <p className="user-phone">{userInfo.phone}</p>
                    <p className="user-address">{userInfo.address}</p>
                    <p className="member-since">Member since {userInfo.memberSince}</p>
                  </>
                )}
                <button className="edit-btn" onClick={handleEditToggle}>
                  <FaEdit />
                  {isEditing ? 'Save' : 'Edit Profile'}
                </button>
              </div>
            </div>
          </div>

          <div className="orders-section">
            <h2 className="section-title">
              <FaShoppingBag />
              Order History
            </h2>
            <div className="orders-grid">
              {orders.map((order) => (
                <div key={order.id} className="order-card">
                  <div className="order-header">
                    <div className="order-info">
                      <h3 className="order-id">{order.id}</h3>
                      <p className="order-date">{new Date(order.date).toLocaleDateString()}</p>
                    </div>
                    <div className="order-status">
                      {getStatusIcon(order.status)}
                      <span className="status-text">{getStatusText(order.status)}</span>
                    </div>
                  </div>
                  <div className="order-items">
                    {order.items.map((item, index) => (
                      <div key={index} className="order-item">
                        <span className="item-name">{item.name}</span>
                        <span className="item-details">
                          {item.quantity} × ₱{item.price}
                        </span>
                      </div>
                    ))}
                  </div>
                  <div className="order-footer">
                    <div className="order-total">
                      <span className="total-label">Total:</span>
                      <span className="total-amount">₱{order.total.toFixed(2)}</span>
                    </div>
                    <button className="view-order-btn">View Details</button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="stats-section">
            <h2 className="section-title">Account Statistics</h2>
            <div className="stats-grid">
              <div className="stat-card">
                <div className="stat-icon">
                  <FaShoppingBag />
                </div>
                <div className="stat-info">
                  <h3 className="stat-number">{stats.totalOrders}</h3>
                  <p className="stat-label">Total Orders</p>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-icon">
                  <FaCheckCircle />
                </div>
                <div className="stat-info">
                  <h3 className="stat-number">{stats.completedOrders}</h3>
                  <p className="stat-label">Completed Orders</p>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-icon">
                  <FaBox />
                </div>
                <div className="stat-info">
                  <h3 className="stat-number">{stats.totalItems}</h3>
                  <p className="stat-label">Items Purchased</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default User;
