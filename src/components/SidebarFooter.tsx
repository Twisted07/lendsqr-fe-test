const SidebarFooter = () => {
  return (
    <div className='sidebar__footer'>
      <button className='sidebar__footer--btn'>
        <img src="/icons/logout.svg" alt="logout icon" className="sidebar__icon"/>
        Logout
      </button>
      <span className="sidebar__footer--small-text">v1.2.0</span>

    </div>
  )
}

export default SidebarFooter