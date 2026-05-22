import React from 'react'
import { IoChevronBackOutline, IoChevronForward } from 'react-icons/io5';

interface PaginationProps {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  showEllipsis: boolean;
  pagesArray: number[];
}

const Pagination: React.FC<PaginationProps> = ({ page, totalPages, onPageChange, showEllipsis, pagesArray }) => {

  return (
    <div className="pagination">
      <div className="pagination__info">
        Showing
        <select><option>{page * 10}</option></select>
        out of {totalPages * 10}
      </div>
      <div className="pagination__controls">
        <button disabled={page === 1} onClick={() => onPageChange(page - 1)}><IoChevronBackOutline className='pagination__controls--chevron' /></button>
        <div className="pagination__controls--pages">
          {pagesArray.map(pageNum => (
            <span
              key={pageNum}
              className={pageNum === page ? 'active' : ''}
              role='button'
              onClick={() => onPageChange(pageNum)}
            >
              {pageNum}
            </span>
          ))}

          {/* Render ellipsis if there is a gap before the final pages */}
          {showEllipsis && <span>...</span>}

          {/* Render second to last page if it isn't already visible */}
            {totalPages - 1 > pagesArray[pagesArray.length - 1] && (
              <span role='button' onClick={() => onPageChange(totalPages - 1)} className={totalPages - 1 === page ? 'active' : ''}>{totalPages - 1}</span>
            )}

          {/* Render last page if it isn't already visible */}
          {totalPages > pagesArray[pagesArray.length - 1] && (
            <span role='button' onClick={() => onPageChange(totalPages)} className={totalPages === page ? 'active' : ''}>{totalPages}</span>
          )}

        </div>
        <button disabled={page >= totalPages} onClick={() => onPageChange(page + 1)}><IoChevronForward className='pagination__controls--chevron' /></button>
      </div>
    </div>
  )
}

export default Pagination