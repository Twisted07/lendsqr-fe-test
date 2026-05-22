interface ProfileCardSectionProps {
  full?: boolean;
  itemList: { label: string; value: string | number }[];
  title: string;
}

export const ProfileCardSection: React.FC<ProfileCardSectionProps> = ({full = false, itemList, title}) => (
  <div className="section">
    <h3>{title}</h3>
    <div className={full ? "grid" : "grid__4"}>
      {itemList.map(item => (
        <div className="section__detail" key={item.label+item.value}>
          <div className="section__detail--label">{item.label}</div>
          <div className="section__detail--value">{item.value}</div>
        </div>
      ))}
    </div>
  </div>
)