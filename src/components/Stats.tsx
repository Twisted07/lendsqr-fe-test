import React from 'react'

interface StatsProps {
  totalUsers: number;
}

const Stats : React.FC<StatsProps> = ({totalUsers}) => {
  const statsList = [
    {
      title: 'Users',
      icon: '/icons/card-users.svg',
      alt: 'users icon',
      value: totalUsers
    },
    {
      title: 'Active Users',
      icon: '/icons/active.svg',
      alt: 'active users icon',
      value: 2453
    },
    {
      title: 'Users with Loans',
      icon: '/icons/loan-users.svg',
      alt: 'users with loans icon',
      value: 12453
    },
    {
      title: 'Users with Savings',
      icon: '/icons/savings-users.svg',
      alt: 'users with savings icon',
      value: 102453
    }
  ]
  return (
    <div className="stats">
      {
        statsList.map(stat => (
          <div className="stats__card" key={stat.alt+stat.title}>
            <img src={stat.icon} alt={stat.alt} className='stats__icon' />
            <h3 className="stats__title">{stat.title}</h3>
            <span className="stats__value">{new Intl.NumberFormat('en-NG').format(stat.value)}</span>
          </div>
        ))
      }
    </div>
  )
}

export default Stats