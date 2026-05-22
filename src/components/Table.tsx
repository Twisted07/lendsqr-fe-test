import { MoreVertical } from 'lucide-react';
import React from 'react'
import { IoFilter } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';
import { _cleanDate } from '../utilities/_cleanDate';
import type { User } from '../services/userService';

interface TableProps {
  loading: boolean;
  users: User[]
}

const Table : React.FC<TableProps> = ({loading, users}) => {
  const tableHeader = ['organization', 'username', 'email', 'phone number', 'date joined', 'status'];
  const navigate = useNavigate();

  return (
    <div className="table__container">
      <table>
        <thead>
          <tr>
            {tableHeader.map(item => (<th key={item}><div className="th-content">{item.toUpperCase()} <IoFilter className='table__filter--icon' /></div></th>))}
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
              <td className='table__cta'>
                <span className={`status-badge ${user.status.toLowerCase()}`}>
                  {user.status}
                </span>
                <button className="action-btn" onClick={() => navigate(`/users/${user.id}`)}>
                  <MoreVertical className='action-btn__icon' />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Table