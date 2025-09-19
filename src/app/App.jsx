import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from '@/layouts/MainLayout';
import { ToastContainer } from 'react-toastify';
import { APP_ROUTES } from './routes';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          {APP_ROUTES.map(({ path, element }, key) => (
            <Route key={key} path={path} element={element} />
          ))}
        </Route>
        <Route path='*' element={<Navigate to='/not-found' />} />
      </Routes>
      <ToastContainer />
    </BrowserRouter>
  );
}

export default App;
