import { MoreVertical } from 'lucide-react';
import React, { useState, useEffect } from 'react'
import { IoFilter } from 'react-icons/io5';
import { _cleanDate } from '../utilities/_cleanDate';
import type { User } from '../services/userService';
import TableFilter from './TableFilter';
import TableActionMenu from './TableActionMenu';

interface TableProps {
  loading: boolean;
  users: User[]
}

const Table : React.FC<TableProps> = ({loading, users}) => {
  const tableHeader = ['organization', 'username', 'email', 'phone number', 'date joined', 'status'];
  const [openFilter, setOpenFilter] = useState<string | null>(null);
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);

  useEffect(() => {
    const handleClickOutside = () => {
      setOpenFilter(null);
      setOpenMenuId(null);
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  const toggleFilter = (e: React.MouseEvent, header: string) => {
    e.stopPropagation();
    setOpenFilter(openFilter === header ? null : header);
    setOpenMenuId(null);
  };

  const toggleMenu = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    setOpenMenuId(openMenuId === id ? null : id);
    setOpenFilter(null);
  };

  return (
    <div className="table__container">
      <table>
        <thead>
          <tr>
            {tableHeader.map(item => (
              <th key={item} style={{ position: 'relative' }}>
                <div className="th-content" onClick={(e) => toggleFilter(e, item)}>
                  {item.toUpperCase()} <IoFilter className='table__filter--icon' />
                </div>
                {openFilter === item && <TableFilter onClose={() => setOpenFilter(null)} />}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {loading ? <tr className='loader'><td colSpan={6}>Loading...</td></tr> : users?.map(user => (
            <tr key={user.id}>
              <td>{user.organization}</td>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>{user.phone}</td>
              <td>{_cleanDate(new Date(user.dateJoined).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric' }))}</td>
              <td className='table__cta' style={{ position: 'relative' }}>
                <span className={`status-badge ${user.status.toLowerCase()}`}>
                  {user.status}
                </span>
                <button className="action-btn" onClick={(e) => toggleMenu(e, user.id)}>
                  <MoreVertical className='action-btn__icon' />
                </button>
                {openMenuId === user.id && (
                  <TableActionMenu userId={user.id} onClose={() => setOpenMenuId(null)} />
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Table