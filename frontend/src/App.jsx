import Body from "../components/Body/Body.jsx"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Profile from "../components/Profile/Profile.jsx"
import Requests from "../components/Requests/Requests.jsx"
import Connections from "../components/Connections/Connections.jsx"
import Feed from "../components/Feed/Feed.jsx"
import Chat from "../components/Chat/Chat.jsx"
import HeaderElement from "../components/Utilities/HeaderElement.jsx"
import Login from "../components/Login/Login.jsx"
import ForgotPassword from "../components//ForgotPassword/ForgotPassword.jsx"
import Premium from "../components//Premium/Premium.jsx"
import NoPageFound from "../components/Utilities/NoPageFound.jsx"

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
          <Route path="*" element={<NoPageFound />}></Route>
        </Route>
      </Routes>
    </BrowserRouter >
  )
}

export default App
