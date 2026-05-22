import { useNavigate } from "react-router-dom";


interface BackButtonProps {
  link: string
  text: string
}
export const BackButton : React.FC<BackButtonProps> = ({link, text}) => {
const navigate = useNavigate();
  return (
  <button className="btn__back" onClick={() => navigate(link)}>
    <img src="/backArrow.svg" alt='back arrow' className='btn__back--arrow' /> {text}
  </button>
);
}

interface ActionButtonProps {
  text: string
  onClick: () => void
  className?: string
}
export const ActionButton : React.FC<ActionButtonProps> = ({text, onClick, className}) => (
  <button className={`btn ${className}`} onClick={onClick}>
    {text}
  </button>
);