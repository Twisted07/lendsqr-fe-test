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
      value: user?.phone ?? 'N/A'
    },
    {
      label: 'Email Address',
      value: user?.email ?? 'N/A'
    },
    {
      label: 'Bvn',
      value: user?.personalDetails?.bvn ?? 'N/A'
    },
    {
      label: 'Gender',
      value: user?.personalDetails?.gender ?? 'N/A'
    },
    {
      label: 'Marital Status',
      value: user?.personalDetails?.maritalStatus ?? 'N/A'
    },
    {
      label: 'Children',
      value: user?.personalDetails?.children === 0 ? "None" : (user?.personalDetails?.children ?? 'N/A')
    },
    {
      label: 'Type of Residence',
      value: user?.personalDetails?.typeOfResidence ?? 'N/A'
    }
  ];

  const educationAndEmploymentList = [
    {
      label: 'Level of Education',
      value: user?.educationAndEmployment?.level ?? 'N/A'
    },
    {
      label: 'Employment Status',
      value: user?.educationAndEmployment?.employmentStatus ?? 'N/A'
    },
    {
      label: 'Sector of Employment',
      value: user?.educationAndEmployment?.sector ?? 'N/A'
    },
    {
      label: 'Duration of Employment',
      value: user?.educationAndEmployment?.duration ?? 'N/A'
    },
    {
      label: 'Office Email',
      value: user?.educationAndEmployment?.officeEmail ?? 'N/A'
    },
    {
      label: 'Monthly Income',
      value: `${_currencyFormatter(user?.educationAndEmployment?.monthlyIncome?.[0] ?? '0')} - ${_currencyFormatter(user?.educationAndEmployment?.monthlyIncome?.[1] ?? '0')}`
    },
    {
      label: 'Loan Repayment',
      value: _currencyFormatter(user?.educationAndEmployment?.loanRepayment ?? '0')
    }
  ];
  const socialsList = [
    {
      label: 'Twitter',
      value: user?.socials?.twitter ?? 'N/A'
    },
    {
      label: 'Facebook',
      value: user?.socials?.facebook ?? 'N/A'
    },
    {
      label: 'Instagram',
      value: user?.socials?.instagram ?? 'N/A'
    }
  ];
  const guarantorList = [
    {
      label: 'Full Name',
      value: `${user?.guarantor?.firstName} ${user?.guarantor?.lastName}`
    },
    {
      label: 'Phone Number',
      value: user?.guarantor?.phone ?? 'N/A'
    },
    {
      label: 'Email Address',
      value: user?.guarantor?.email ?? 'N/A'
    },
    {
      label: 'Relationship',
      value: user?.guarantor?.relationship ?? 'N/A'
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
          <ActionButton text='Blacklist User' className='blacklist' onClick={() => {}} />
          <ActionButton text='Activate User' className='activate' onClick={() => {}} />
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

