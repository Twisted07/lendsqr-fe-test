import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ActionButton, BackButton } from '../components/Button';
import { ProfileCard } from '../components/Card';
import { ProfileCardSection } from '../components/CardSection';
import { fetchUserById, type User } from '../services/userService';
import '../styles/pages/user-details.scss';
import { _currencyFormatter } from '../utilities/_currencyFormatter';

const UserDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const personalInfoList = [
    {
      label: 'Full Name',
      value: `${user?.personalDetails?.firstName} ${user?.personalDetails?.lastName}`
    },
    {
      label: 'Phone Number',
      value: user?.phone
    },
    {
      label: 'Email Address',
      value: user?.email
    },
    {
      label: 'Bvn',
      value: user?.personalDetails?.bvn
    },
    {
      label: 'Gender',
      value: user?.personalDetails?.gender
    },
    {
      label: 'Marital Status',
      value: user?.personalDetails?.maritalStatus
    },
    {
      label: 'Children',
      value: user?.personalDetails?.children === 0 ? "None" : user?.personalDetails?.children
    },
    {
      label: 'Type of Residence',
      value: user?.personalDetails?.typeOfResidence
    }
  ];

  const educationAndEmploymentList = [
    {
      label: 'Level of Education',
      value: user?.educationAndEmployment?.level
    },
    {
      label: 'Employment Status',
      value: user?.educationAndEmployment?.employmentStatus
    },
    {
      label: 'Sector of Employment',
      value: user?.educationAndEmployment?.sector
    },
    {
      label: 'Duration of Employment',
      value: user?.educationAndEmployment?.duration
    },
    {
      label: 'Office Email',
      value: user?.educationAndEmployment?.officeEmail
    },
    {
      label: 'Monthly Income',
      value: `${_currencyFormatter(user?.educationAndEmployment?.monthlyIncome[0])} - ${_currencyFormatter(user?.educationAndEmployment?.monthlyIncome[1])}`
    },
    {
      label: 'Loan Repayment',
      value: _currencyFormatter(user?.educationAndEmployment?.loanRepayment)
    }
  ];
  const socialsList = [
    {
      label: 'Twitter',
      value: user?.socials?.twitter
    },
    {
      label: 'Facebook',
      value: user?.socials?.facebook
    },
    {
      label: 'Instagram',
      value: user?.socials?.instagram
    }
  ];
  const guarantorList = [
    {
      label: 'Full Name',
      value: `${user?.guarantor?.firstName} ${user?.guarantor?.lastName}`
    },
    {
      label: 'Phone Number',
      value: user?.guarantor?.phone
    },
    {
      label: 'Email Address',
      value: user?.guarantor?.email
    },
    {
      label: 'Relationship',
      value: user?.guarantor?.relationship
    }
  ];

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
      <BackButton link='/users' text='Back to Users' />

      <div className='header'>
        <h2 className="header__title">User Details</h2>
        <div className="header__buttons">
          <ActionButton text='Blacklist User' className='blacklist' onClick={null} />
          <ActionButton text='Activate User' className='activate' onClick={null} />
        </div>
      </div>
      <ProfileCard user={user} />

      <div className="details-card">
        <ProfileCardSection
          itemList={personalInfoList}
          title="Personal Information" 
          full  
        />
        <ProfileCardSection
          itemList={educationAndEmploymentList}
          title="Education and Employment" 
        />
        <ProfileCardSection
          itemList={socialsList}
          title="Socials" 
        />
        <ProfileCardSection
          itemList={guarantorList}
          title="Guarantor" 
          full  
        />
      </div>
    </div>
  );
};

export default UserDetails;

