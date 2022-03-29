import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import { Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import styled from "styled-components";
import Login from "./components/Login";
import { auth } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "./app/slices/GeneralSlice";
import Loading from "./components/Loading";
const Wrapper = styled.section`
  height: 100vh;
  width: 100vw;
  padding-top: 64px;
  display: flex;
`;

function App() {
  const { user } = useSelector((state) => state.general);
  const [isLoading, setLoading] = useState(true);
  // get a user from firebase
  const dispatch = useDispatch();
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(
          setUser({
            uid: user.uid,
            displayName: user.displayName,
            photoURL: user.photoURL,
            email: user.email,
          })
        );
      } else {
        console.error("Error");
      }
      setLoading(false);
    });

    return unsub;
  }, [dispatch]);

  if (isLoading) return <Loading />;
  return (
    <>
      {!user ? (
        <Login />
      ) : (
        <>
          <Navbar />
          <Wrapper>
            <Sidebar />
            <Routes>
              <Route path="/rooms/:id" element={<Home />} />
            </Routes>
          </Wrapper>
        </>
      )}
    </>
  );
}

export default App;
