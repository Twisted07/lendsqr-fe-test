import { Link } from 'react-router-dom'
import React from 'react'
import { IoIosSearch } from 'react-icons/io'
import { MoreVertical } from 'lucide-react'
import { IoMdArrowDropdown } from 'react-icons/io'

interface HeaderProps {
  toggleUserMenu: () => void;
  isUserMenuOpen: boolean;
}

const Header : React.FC<HeaderProps> = ({toggleUserMenu, isUserMenuOpen}) => (
  <nav className="topbar">
    <div className="search">
      <Link to="/" className="search__logo">
        <img src="/logo.svg" alt="Lendsqr logo" />
      </Link>

      <div className="search__box big-screen">
        <input type="text" placeholder="Search for anything" />
        <button aria-label="Search"><IoIosSearch className='search__icon' /></button>
      </div>

    </div>

    <button className="user__menu-btn" onClick={toggleUserMenu}>
      <MoreVertical className='user__menu-btn--icon' color="#213F7D" />
    </button>

    <div className={`user__actions ${isUserMenuOpen ? 'open' : ''}`}>
      <div className="search__box full-width">
        <input type="text" placeholder="Search for anything" />
        <button aria-label="Search"><IoIosSearch className='search__icon' /></button>
      </div>

      <a href="#" className="docs-link">Docs</a>
      <div className="notifications">
        {
          isUserMenuOpen ?
            (<span className='notifications__text'>Notifications</span>) :
            <img src='/notification_bell.svg' alt="Notification bell" className='notifications__icon' />
        }
      </div>
      <div className="user__profile">
        <img src={`https://ui-avatars.com/api/?name=Adedeji+A&background=random`} alt="User" />
        <span className="name">Adedeji</span>
        <IoMdArrowDropdown className='user__profile--icon' />
      </div>
    </div>
  </nav>
)

export default Header