import Body from "../components/Body"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Profile from "../components/Profile"
import Requests from "../components/Requests"
import Connections from "../components/Connections"
import Feed from "../components/Feed"
import Chat from "../components/Chat"
import HeaderElement from "../components/HeaderElement"
import Login from "../components/Login"
import ForgotPassword from "../components/ForgotPassword"
import Premium from "../components/Premium"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Body />}>
          <Route index element={<HeaderElement />} />
          <Route path="/feed" element={<Feed />}></Route>
          <Route path="/profile" element={<Profile />}></Route>
          <Route path="/requests" element={<Requests />}></Route>
          <Route path="/connections" element={<Connections />}></Route>
          <Route path="/premium" element={<Premium />}></Route>
          <Route path="/chat" element={<Chat />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/forgot/password" element={<ForgotPassword />}></Route>
        </Route>
      </Routes>
    </BrowserRouter >
  )
}

export default App
