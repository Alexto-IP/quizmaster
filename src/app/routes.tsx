import { createBrowserRouter } from 'react-router';
import Home from './pages/Home';
import Quiz from './pages/Quiz';
import Results from './pages/Results';
import NotFound from './pages/NotFound';

export const router = createBrowserRouter([
  { path: '/', Component: Home },
  { path: '/quiz', Component: Quiz },
  { path: '/quiz/:shareId', Component: Quiz },  
  { path: '/results', Component: Results },
  { path: '*', Component: NotFound },
], {
  basename: '/quizmaster',
});