import { useNavigate } from 'react-router-dom';

const SidebarFooter = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    navigate('/login');
  };

  return (
    <div className='sidebar__footer'>
      <button type="button" className='sidebar__footer--btn' onClick={handleLogout}>
        <img src="/icons/logout.svg" alt="logout icon" className="sidebar__icon"/>
        Logout
      </button>
      <span className="sidebar__footer--small-text">v1.2.0</span>

    </div>
  )
}

export default SidebarFooter