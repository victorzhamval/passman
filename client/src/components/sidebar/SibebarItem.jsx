import { Link, useMatch, useResolvedPath } from 'react-router-dom';

export default function SidebarItem({ title, Icon, to }) {
  const path = useResolvedPath(to);
  const matchsPath = useMatch({ path: path.pathname, end: true });

  return (
    <Link
      className={`sidebar__item sidebar__item--${matchsPath ? "active" : "inactive"}`} to={to}>
      {Icon !== undefined && <Icon />}
      {title}
    </Link>
  );
}

