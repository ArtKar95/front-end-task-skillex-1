import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import MainLayout from '@/layouts/MainLayout';
import { APP_ROUTES } from './routes';

//! I have used this file structure (FSD) for the project as i am using last version RTK and React
//! and it recomends to have Feautures with own components API calls and so on, if somthing wrong here
//! please let me know or share the best FSD for current versions

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
