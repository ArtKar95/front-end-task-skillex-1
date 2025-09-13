import { useNavigate } from 'react-router-dom';
import './notFoundPage.scss';

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div className='notfound-page'>
      <h1 className='notfound-page__title'>404</h1>
      <p className='notfound-page__message'>Page not found.</p>
      <button className='notfound-page__button' onClick={() => navigate('/')}>
        Home Page
      </button>
    </div>
  );
};

export default NotFoundPage;
