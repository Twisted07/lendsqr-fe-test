import { Star } from "lucide-react";
import { _currencyFormatter } from "../utilities/_currencyFormatter";
import type { User } from "../services/userService";

interface ProfileCardProps {
  user: User;
}

export const ProfileCard: React.FC<ProfileCardProps> = ({user}) => (
  <div className="profile-header-card">
    <div className="profile-info">
      <div className="avatar-section">
        <img src="/avatar.svg" alt="User" className='avatar' />
        <div className="name-id">
          <h2>{user.personalDetails.firstName} {user.personalDetails.lastName}</h2>
          <p>{user.id}</p>
        </div>
      </div>

      <div className="tier-section">
        <p>User's Tier</p>
        <div className="stars">
          <Star size={16} fill="#E9B200" />
          <Star size={16} />
          <Star size={16} />
        </div>
      </div>

      <div className="balance-section">
        <h2>{_currencyFormatter(user.bankDetails.accountBalance)}</h2>
        <p>{user.bankDetails.accountNumber}/Providus Bank</p>
      </div>
    </div>

    <div className="tabs">
      <div className="tab active">General Details</div>
      <div className="tab">Documents</div>
      <div className="tab">Bank Details</div>
      <div className="tab">Loans</div>
      <div className="tab">Savings</div>
      <div className="tab">App and System</div>
    </div>
  </div>
)