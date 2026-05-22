import React from 'react';
import '../styles/components/tableFilter.scss';

interface TableFilterProps {
  onClose: () => void;
}

const TableFilter: React.FC<TableFilterProps> = ({ onClose }) => {
  return (
    <div className="table-filter" onClick={(e) => e.stopPropagation()}>
      <form onSubmit={(e) => { e.preventDefault(); onClose(); }}>
        <div className="form-group">
          <label>Organization</label>
          <select defaultValue="">
            <option value="" disabled>Select</option>
            <option value="lendsqr">Lendsqr</option>
            <option value="irorun">Irorun</option>
            <option value="lendstar">Lendstar</option>
          </select>
        </div>
        
        <div className="form-group">
          <label>Username</label>
          <input type="text" placeholder="User" />
        </div>

        <div className="form-group">
          <label>Email</label>
          <input type="email" placeholder="Email" />
        </div>

        <div className="form-group">
          <label>Date</label>
          <input type="date" placeholder="Date" />
        </div>

        <div className="form-group">
          <label>Phone Number</label>
          <input type="tel" placeholder="Phone Number" />
        </div>

        <div className="form-group">
          <label>Status</label>
          <select defaultValue="">
            <option value="" disabled>Select</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="pending">Pending</option>
            <option value="blacklisted">Blacklisted</option>
          </select>
        </div>

        <div className="table-filter__actions">
          <button type="button" className="btn-reset" onClick={onClose}>Reset</button>
          <button type="submit" className="btn-filter">Filter</button>
        </div>
      </form>
    </div>
  );
};

export default TableFilter;
