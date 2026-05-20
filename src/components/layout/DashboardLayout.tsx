import React, { useState } from 'react';
import { Outlet, NavLink, Link } from 'react-router-dom';
import { 
  Briefcase, Home, Users as UsersIcon, UserCheck, 
  UserX, Handshake, PiggyBank, HandCoins, 
  UserCog, ScrollText, BarChart3, SlidersHorizontal, 
  BadgePercent, ClipboardList, Bell, Search,
  ChevronDown,
  MoreVertical,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import '../../styles/components/layout.scss';
import { IoIosSearch, IoMdArrowDropdown } from 'react-icons/io';

const DashboardLayout : React.FC = () => {

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const toggleUserMenu = () => setIsUserMenuOpen(!isUserMenuOpen);
  
  return (
    <div className="dashboard-layout">
      <nav className="topbar">
        <div className="search">
          <Link to="/" className="search__logo">
            <img src="/logo.svg" alt="Lendsqr logo" />
          </Link>
          <div className="search__box">
            <input type="text" placeholder="Search for anything" />
            <button aria-label="Search"><IoIosSearch size={20} /></button>
          </div>
        </div>

        <button className="user__menu-btn" onClick={toggleUserMenu}>
          <MoreVertical className='user__menu-btn--icon' color="#213F7D" />
        </button>
        
        <div className={`user__actions ${isUserMenuOpen ? 'open' : ''}`}>
          <a href="#" className="docs-link">Docs</a>
          <div className="notifications">
            <img src='/notification_bell.svg' alt="Notification bell" />
          </div>
          <div className="user__profile">
            <img src={`https://ui-avatars.com/api/?name=Adedeji+A&background=random`} alt="User" />
            <span className="name">Adedeji</span>
            <IoMdArrowDropdown className='user__profile--icon' />
          </div>
        </div>
      </nav>
      
      <div className="dashboard-body">
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
              <li>
                <button>
                  <Briefcase size={16} /> Switch Organization <ChevronDown size={14} />
                </button>
              </li>
              <li>
                <NavLink to="/dashboard" className={({isActive}) => isActive ? 'active' : ''}>
                  <Home size={16} /> Dashboard
                </NavLink>
              </li>
            </ul>
          </div>

          <div className="sidebar__section">
            <div className="sidebar__section--title">Customers</div>
            <ul>
              <li>
                <NavLink to="/users" className={({isActive}) => isActive ? 'active' : ''}>
                  <UsersIcon size={16} /> Users
                </NavLink>
              </li>
              <li><button><UsersIcon size={16} /> Guarantors</button></li>
              <li><button><Handshake size={16} /> Loans</button></li>
              <li><button><HandCoins size={16} /> Decision Models</button></li>
              <li><button><PiggyBank size={16} /> Savings</button></li>
              <li><button><HandCoins size={16} /> Loan Requests</button></li>
              <li><button><UserCheck size={16} /> Whitelist</button></li>
              <li><button><UserX size={16} /> Karma</button></li>
            </ul>
          </div>

          <div className="sidebar__section">
            <div className="sidebar__section--title">Businesses</div>
            <ul>
              <li><button><Briefcase size={16} /> Organization</button></li>
              <li><button><HandCoins size={16} /> Loan Products</button></li>
              <li><button><PiggyBank size={16} /> Savings Products</button></li>
              <li><button><HandCoins size={16} /> Fees and Charges</button></li>
              <li><button><ScrollText size={16} /> Transactions</button></li>
              <li><button><SlidersHorizontal size={16} /> Services</button></li>
              <li><button><UserCog size={16} /> Service Account</button></li>
              <li><button><ScrollText size={16} /> Settlements</button></li>
              <li><button><BarChart3 size={16} /> Reports</button></li>
            </ul>
          </div>

          <div className="sidebar-section">
            <div className="sidebar__section--title">Settings</div>
            <ul>
              <li><button><SlidersHorizontal size={16} /> Preferences</button></li>
              <li><button><BadgePercent size={16} /> Fees and Pricing</button></li>
              <li><button><ClipboardList size={16} /> Audit Logs</button></li>
            </ul>
          </div>
        </aside>
        
        <main className="main-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
