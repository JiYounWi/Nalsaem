import { BrowserRouter,Routes, Route,  Navigate } from 'react-router-dom';
import './App.css';
import Main from './pages/Main';
import Login from './pages/Login';
import Nav from './component/Nav';
import MyPage from './pages/MyPage';
import Findaccount from './pages/Findaccount';
import SignUp from './pages/SignUp';
import NotFound from './pages/NotFound';

function App() {

  const isLogin = false;

  return (
    <BrowserRouter>
    <div className="App">
      
      <Nav/>
     
      <Routes>
        {/* 초기 경로를 Login 컴포넌트로 설정 */}
        <Route path="/" element={<Login />} />

        {/* 다른 경로들 */}
        <Route path="/main" element={<Main />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/findaccount" element={<Findaccount />} />
        <Route path='/mypage' element={<MyPage />}/>
        <Route path="*" element={<NotFound />} />
      </Routes>

      {/* {isLogin ? (
        <Routes>
          <Route exact path = "/" component={Main}/>
          <Route path='/mypage' component={MyPage} />
          <Route path='/404' component={NotFound} />
        </Routes>
      ) : (
        <Routes>
          <Route exact path = "/" component={Login}/>
          <Route path='/signup' component={SignUp}/>
          <Route path='/404' component={NotFound} />
        </Routes>
      )} */}
    </div>
    </BrowserRouter>
  );
}

export default App;
