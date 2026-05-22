import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/components/tableActionMenu.scss';

interface TableActionMenuProps {
  userId: string;
  onClose: () => void;
}

const TableActionMenu: React.FC<TableActionMenuProps> = ({ userId, onClose }) => {
  const navigate = useNavigate();

  return (
    <div className="action__menu" onClick={(e) => e.stopPropagation()}>
      <button className='action__menu--btn' onClick={() => { navigate(`/users/${userId}`); onClose(); }}>
        <img src="/icons/view.svg" alt="View Details" className='action__menu--icon' />
        View Details
      </button>
      <button className='action__menu--btn' onClick={onClose}>
        <img src="/icons/delete_user.svg" alt="Blacklist User" className='action__menu--icon' />
        Blacklist User
      </button>
      <button className='action__menu--btn' onClick={onClose}>
        <img src="/icons/activate_user.svg" alt="Activate User" className='action__menu--icon' />
        Activate User
      </button>
    </div>
  );
};

export default TableActionMenu;
