import { BrowserRouter, Routes, Route } from 'react-router-dom';
import GlobalStyles from './styles/global.js';
import { ThemeProvider } from 'styled-components';
import theme from './styles/theme.js';
import Main from './pages/Main';
import ZipDetail from './pages/ZipDetail';
import Search from './pages/Search';
import NotFound from './pages/NotFound';
import Login from './pages/Login';
import FeeCalculator from './pages/FeeCalculator';
import Mypage from './pages/Mypage';
import NewReview from './pages/NewReview';
import ViewReview from './pages/ViewReview';
import EditReview from './pages/EditReview';
import { useState } from 'react';

function App() {
  function CheckloggedIn() {
    const isloggedIn = JSON.parse(window.localStorage.getItem('user'));
    const returnloggedIn = isloggedIn ? (
      <Routes>
        <Route path="/*" element={<Main />} />
        <Route path="/detail" element={<ZipDetail />} />
        <Route path="/fee" element={<FeeCalculator />} />
        <Route path="/mypage/*" element={<Mypage />} />
        <Route path="/viewreview" element={<ViewReview />} />
        <Route path="/newreview" element={<NewReview />} />
        <Route path="/editreview" element={<EditReview />} />
      </Routes>
    ) : (
      <Routes>
        <Route path="/" element={<Login />} />
      </Routes>
    );
    return returnloggedIn;
  }

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <BrowserRouter>
        <CheckloggedIn />
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
