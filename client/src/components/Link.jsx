import { Link as RouterLink } from 'react-router-dom';

export default function Link({ title, to = '' }) {
  return (
    <RouterLink className="link" to={to}>
      {title}
    </RouterLink>
  );
}

