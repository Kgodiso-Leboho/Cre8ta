import { Icon } from './Icon';

export const Badge = ({ children, variant = "gray", icon }) => (
  <span className={`badge badge-${variant}`}>
    {icon && <Icon name={icon} size={12} />}
    {children}
  </span>
);