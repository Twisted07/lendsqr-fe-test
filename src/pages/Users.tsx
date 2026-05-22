import { useEffect, useState } from 'react';
import Pagination from '../components/Pagination';
import Stats from '../components/Stats';
import Table from '../components/Table';
import { fetchUsers, type User } from '../services/userService';
import '../styles/pages/users.scss';

const Users = () => {
  const [users, setUsers] = useState<{ users: User[], total: number }>({ users: [], total: 0 });
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const totalPages = Math.ceil(users.total / 10);
  const visiblePages = 3;
  let startPage = Math.max(1, page);

  if (startPage > totalPages - visiblePages) {
    startPage = Math.max(1, totalPages - visiblePages - 1);
  }

  // Generate the array of sliding page numbers
  const pagesArray = Array.from(
    { length: Math.min(visiblePages, totalPages) },
    (_, i) => startPage + i
  );
  const showEllipsis = startPage + visiblePages < totalPages - 1;

  function handlePage(page: number) {
    if (page < 1 || page > totalPages) return;
    setPage(page);
  }

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



  return (
    <div className="users-page">
      <h2 className="page-title">Users</h2>

      <Stats totalUsers={users?.total ?? 0} />
      <Table users={users?.users ?? []} loading={loading} />
      <Pagination
        page={page}
        totalPages={totalPages}
        onPageChange={handlePage}
        showEllipsis={showEllipsis}
        pagesArray={pagesArray}
      />
    </div>
  );
};

export default Users;
