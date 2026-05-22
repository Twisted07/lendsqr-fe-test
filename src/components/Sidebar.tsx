import { ChevronLeft, ChevronRight } from 'lucide-react'
import React, { useState } from 'react'
import { IoChevronDownOutline } from 'react-icons/io5'
import { NavLink } from 'react-router-dom'
import SidebarFooter from './SidebarFooter'
import SidebarSection from './SidebarSection'

const Sidebar : React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const customers = [
    {
      name:  'Users',
      link: '/users',
      icon: '/icons/users.svg'
    },
    {
      name: 'Guarantors',
      link: '/guarantors',
      icon: '/icons/guarantors.svg'
    },
    {
      name: 'Loans',
      link: '/loans',
      icon: '/icons/loans.svg'
    },
    {
      name: 'Decision Models',
      link: '/decision-models',
      icon: '/icons/decision.svg'
    },
    {
      name: 'Savings',
      link: '/savings',
      icon: '/icons/savings.svg'
    },
    {
      name: 'Loan Requests',
      link: '/loan-requests',
      icon: '/icons/request.svg'
    },
    {
      name: 'Whitelist',
      link: '/whitelist',
      icon: '/icons/whitelist.svg'
    },
    {
      name: 'Karma',
      link: '/karma',
      icon: '/icons/karma.svg'
    }
  ];

  const businesses = [
    {
      name: 'Organization',
      link: '/organization',
      icon: '/icons/organisation.svg'
    },
    {
      name: 'Loan Products',
      link: '/loan-products',
      icon: '/icons/request.svg'
    },
    {
      name: 'Savings Products',
      link: '/savings-products',
      icon: '/icons/savings_product.svg'
    },
    {
      name: 'Fees and Charges',
      link: '/fees-and-charges',
      icon: '/icons/fees.svg'
    },
    {
      name: 'Transactions',
      link: '/transactions',
      icon: '/icons/transaction.svg'
    },
    {
      name: 'Services',
      link: '/services',
      icon: '/icons/services.svg'
    },
    {
      name: 'Service Account',
      link: '/service-account',
      icon: '/icons/service_acc.svg'
    },
    {
      name: 'Settlements',
      link: '/settlements',
      icon: '/icons/settlement.svg'
    },
    {
      name: 'Reports',
      link: '/reports',
      icon: '/icons/report.svg'
    }
  ];

  const settings = [
    {
      name: 'Preferences',
      link: '/preferences',
      icon: '/icons/preferences.svg'
    },
    {
      name: 'Fees and Pricing',
      link: '/fees-pricing',
      icon: '/icons/pricing.svg'
    },
    {
      name: 'Audit Logs',
      link: '/audit',
      icon: '/icons/audit.svg'
    },
    {
      name: 'Systems Messages',
      link: '/systems-messages',
      icon: '/icons/systems_messages.svg'
    }
  ];

  return (
    <>
      {isSidebarOpen && (
        <div className="sidebar__overlay" onClick={() => setIsSidebarOpen(false)}></div>
      )}

      <button
        className={`sidebar__bookmark-btn ${isSidebarOpen ? 'open' : ''}`}
        onClick={toggleSidebar}
      >
        {isSidebarOpen ? <ChevronLeft size={20} color="#fff" /> : <ChevronRight size={20} color="#fff" />}
      </button>
      <aside className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
        <div className="sidebar__section">
          <ul>
            <li className="organisation">
              <button>
                <img src="/icons/organisation.svg" alt="organisation" className='sidebar__icon' />
                Switch Organization
                <IoChevronDownOutline style={{width: '1.4rem', height: '1.4rem'}} />
              </button>
            </li>
            <li>
              <NavLink to="/dashboard" className={({ isActive }) => isActive ? 'active' : ''}>
                <img src="/icons/home.svg" alt="home icon" className="sidebar__icon" />
                Dashboard
              </NavLink>
            </li>
          </ul>
        </div>

        <SidebarSection title='Customers' items={customers} />
        <SidebarSection title='Businesses' items={businesses} />
        <SidebarSection title='Settings' items={settings} />

        <SidebarFooter />
      </aside>
    </>
  )
}

export default Sidebar