import { Database, FileText, MoreVertical, Users as UsersIcon, UsersRound } from 'lucide-react';
import { useEffect, useState } from 'react';
import { IoChevronBackOutline, IoChevronForward, IoFilter } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';
import { fetchUsers, type User } from '../services/userService';
import '../styles/pages/users.scss';

const Users = () => {
  const [users, setUsers] = useState<{ users: User[], total: number }>({ users: [], total: 0 });
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const navigate = useNavigate();
  const tableHeader = ['organization', 'username', 'email', 'phone number', 'date joined', 'status'];

  useEffect(() => {
    setLoading(true);
    const loadUsers = async () => {
      const data = await fetchUsers(page);
      setUsers(data);
      setLoading(false);
    };
    // imitate a delay
    setTimeout(() => {
      loadUsers();
    }, 1000);
  }, [page]);

  const totalPages = Math.ceil(users.total / 10);
  const visiblePages = 3;
  let startPage = Math.max(1, page);

  // Adjust start page if it pushes past the near-end pages
  if (startPage > totalPages - visiblePages) {
    startPage = Math.max(1, totalPages - visiblePages - 1);
  }

  // Generate the array of sliding page numbers
  const pagesArray = Array.from(
    { length: Math.min(visiblePages, totalPages) },
    (_, i) => startPage + i
  );

  const showEllipsis = startPage + visiblePages < totalPages - 1;



  function cleanDate(dateString: string) {
    const splitDate = dateString.split('at');
    const concatString = splitDate.join(" ");
    return concatString;
  }

  function incrementPage() {
    if (page < totalPages) setPage(prev => prev + 1);
  }

  function decrementPage() {
    if (page > 1) setPage(prev => prev - 1);
  }


  function goToPage(page: number) {
    if (page < 1 || page > totalPages) return;
    setPage(page);
  }




  return (
    <div className="users-page">
      <h2 className="page-title">Users</h2>

      <div className="stats-cards">
        <div className="stat-card">
          <div className="icon users"><UsersIcon size={20} /></div>
          <h3>Users</h3>
          <div className="value">{loading ? 0 : users?.total}</div>
        </div>
        <div className="stat-card">
          <div className="icon active"><UsersRound size={20} /></div>
          <h3>Active Users</h3>
          <div className="value">2,453</div>
        </div>
        <div className="stat-card">
          <div className="icon loans"><FileText size={20} /></div>
          <h3>Users with Loans</h3>
          <div className="value">12,453</div>
        </div>
        <div className="stat-card">
          <div className="icon savings"><Database size={20} /></div>
          <h3>Users with Savings</h3>
          <div className="value">102,453</div>
        </div>
      </div>

      <div className="table__container">
        <table>
          <thead>
            <tr>
              {tableHeader.map(item => (<th key={item}><div className="th-content">{item.toUpperCase()} <IoFilter className='table__filter--icon' /></div></th>))}
            </tr>
          </thead>
          <tbody>
            {loading ? <tr className='loader'><td colSpan={6}>Loading...</td></tr> : users?.users?.map(user => (
              <tr key={user.id}>
                <td>{user.organization}</td>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>{user.phone}</td>
                <td>{cleanDate(new Date(user.dateJoined).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric' }))}</td>
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

      <div className="pagination">
        <div className="pagination__info">
          Showing
          <select><option>{page * 10}</option></select>
          out of {users.total}
        </div>
        <div className="pagination__controls">
          <button disabled={page === 1} onClick={decrementPage}><IoChevronBackOutline className='pagination__controls--chevron' /></button>
          <div className="pagination__controls--pages">
            {pagesArray.map(pageNum => (
              <span
                key={pageNum}
                className={pageNum === page ? 'active' : ''}
                role='button'
                onClick={() => goToPage(pageNum)}
              >
                {pageNum}
              </span>
            ))}

            {/* Render ellipsis if there is a gap before the final pages */}
            {showEllipsis && <span>...</span>}

            {/* Render second to last page if it isn't already visible */}
            {totalPages - 1 > pagesArray[pagesArray.length - 1] && (
              <span role='button' onClick={() => goToPage(totalPages - 1)} className={totalPages - 1 === page ? 'active' : ''}>{totalPages - 1}</span>
            )}

            {/* Render last page if it isn't already visible */}
            {totalPages > pagesArray[pagesArray.length - 1] && (
              <span role='button' onClick={() => goToPage(totalPages)} className={totalPages === page ? 'active' : ''}>{totalPages}</span>
            )}
          </div>
          <button disabled={page >= Math.ceil(users.total / 10)} onClick={incrementPage}><IoChevronForward className='pagination__controls--chevron' /></button>
        </div>
      </div>
    </div>
  );
};

export default Users;
