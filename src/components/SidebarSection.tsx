import React from 'react';
import { NavLink } from 'react-router-dom';

interface SidebarItem {
  name: string;
  link: string;
  icon: string;
}

interface SidebarSectionProps {
  title: string;
  items: SidebarItem[];
}

const SidebarSection: React.FC<SidebarSectionProps> = ({ title, items }) => (
  <div className="sidebar__section">
    <div className="sidebar__section--title">{title.toUpperCase()}</div>
    <ul>
      {items.map((item) => {        
        return (
          <li key={item.name+item.link}>
            <NavLink
              to={item.link}
              className={({ isActive }) => `sidebar__link ${isActive ? 'active' : ''}`}
            >
              <img src={item.icon} alt="logout icon" className="sidebar__icon"/>
              <span>{item.name}</span>
            </NavLink>
          </li>
        );
      })}
    </ul>
  </div>
);


export default SidebarSection