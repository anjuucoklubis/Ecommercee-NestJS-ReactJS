import { useSelector } from "react-redux";

function useIsAuth() {
  const { isAuth } = useSelector((state) => state.auth);
  console.log("Auth state", isAuth);
  return {
    isAuth,
  };
}

export default useIsAuth;
