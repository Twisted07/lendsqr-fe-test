import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Star } from 'lucide-react';
import { fetchUserById, type User } from '../services/userService';
import '../styles/pages/user-details.scss';
import { _currencyFormatter } from '../utilities/_currencyFormatter';

const UserDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      if (id) {
        const data = await fetchUserById(id);
        setUser(data);
      }
      setLoading(false);
    };
    loadUser();
  }, [id]);

  if (loading) return <div style={{ padding: '40px' }}>Loading user details...</div>;
  if (!user) return <div style={{ padding: '40px' }}>User not found</div>;

  return (
    <div className="user-details-page">
      <button className="back-btn" onClick={() => navigate('/users')}>
        <img src="/backArrow.svg" alt='back arrow' className='back-arrow'/> Back to Users
      </button>

      <div className='header'>
        <h2 className="header__title">User Details</h2>
        <div className="header__buttons">
          <button className="blacklist">Blacklist User</button>
          <button className="activate">Activate User</button>
        </div>
      </div>
        

      <div className="profile-header-card">
        <div className="profile-info">
          <div className="avatar-section">
            <img src="/avatar.svg" alt="User" className='avatar' />
            <div className="name-id">
              <h2>{user.personalDetails.firstName} {user.personalDetails.lastName}</h2>
              <p>{user.id}</p>
            </div>
          </div>

          <div className="tier-section">
            <p>User's Tier</p>
            <div className="stars">
              <Star size={16} fill="#E9B200" />
              <Star size={16} />
              <Star size={16} />
            </div>
          </div>

          <div className="balance-section">
            <h2>{_currencyFormatter(user.bankDetails.accountBalance)}</h2>
            <p>{user.bankDetails.accountNumber}/Providus Bank</p>
          </div>
        </div>

        <div className="tabs">
          <div className="tab active">General Details</div>
          <div className="tab">Documents</div>
          <div className="tab">Bank Details</div>
          <div className="tab">Loans</div>
          <div className="tab">Savings</div>
          <div className="tab">App and System</div>
        </div>
      </div>

      <div className="details-card">
        <div className="section">
          <h3>Personal Information</h3>
          <div className="grid">
            <div className="detail-item"><div className="label">Full Name</div><div className="value">{user.personalDetails.firstName} {user.personalDetails.lastName}</div></div>
            <div className="detail-item"><div className="label">Phone Number</div><div className="value">{user.phone}</div></div>
            <div className="detail-item"><div className="label">Email Address</div><div className="value">{user.email}</div></div>
            <div className="detail-item"><div className="label">Bvn</div><div className="value">{user.personalDetails.bvn}</div></div>
            <div className="detail-item"><div className="label">Gender</div><div className="value">{user.personalDetails.gender}</div></div>
            <div className="detail-item"><div className="label">Marital Status</div><div className="value">{user.personalDetails.maritalStatus}</div></div>
            <div className="detail-item"><div className="label">Children</div><div className="value">{user.personalDetails.children === 0 ? "None" : user.personalDetails.children}</div></div>
            <div className="detail-item small"><div className="label">Type of Residence</div><div className="value">{user.personalDetails.typeOfResidence}</div></div>
          </div>
        </div>

        <div className="section">
          <h3>Education and Employment</h3>
          <div className="grid__4">
            <div className="detail-item"><div className="label">Level of Education</div><div className="value">{user.educationAndEmployment.level}</div></div>
            <div className="detail-item"><div className="label">Employment Status</div><div className="value">{user.educationAndEmployment.employmentStatus}</div></div>
            <div className="detail-item"><div className="label">Sector of Employment</div><div className="value">{user.educationAndEmployment.sector}</div></div>
            <div className="detail-item"><div className="label">Duration of Employment</div><div className="value">{user.educationAndEmployment.duration}</div></div>
            <div className="detail-item"><div className="label">Office Email</div><div className="value">{user.educationAndEmployment.officeEmail}</div></div>
            <div className="detail-item"><div className="label">Monthly Income</div><div className="value">{_currencyFormatter(user.educationAndEmployment.monthlyIncome[0])} - {_currencyFormatter(user.educationAndEmployment.monthlyIncome[1])}</div></div>
            <div className="detail-item"><div className="label">Loan Repayment</div><div className="value">{_currencyFormatter(user.educationAndEmployment.loanRepayment)}</div></div>
          </div>
        </div>

        <div className="section">
          <h3>Socials</h3>
          <div className="grid">
            <div className="detail-item"><div className="label">Twitter</div><div className="value">{user.socials.twitter}</div></div>
            <div className="detail-item"><div className="label">Facebook</div><div className="value">{user.socials.facebook}</div></div>
            <div className="detail-item"><div className="label">Instagram</div><div className="value">{user.socials.instagram}</div></div>
          </div>
        </div>

        <div className="section">
          <h3>Guarantor</h3>
          <div className="grid">
            <div className="detail-item"><div className="label">Full Name</div><div className="value">{user.guarantor.firstName} {user.guarantor.lastName}</div></div>
            <div className="detail-item"><div className="label">Phone Number</div><div className="value">{user.guarantor.phone}</div></div>
            <div className="detail-item"><div className="label">Email Address</div><div className="value">{user.guarantor.email}</div></div>
            <div className="detail-item"><div className="label">Relationship</div><div className="value">{user.guarantor.relationship}</div></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetails;
