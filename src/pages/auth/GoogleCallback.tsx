  import { useEffect, useRef, useState } from "react";
  import { Link, useNavigate } from "react-router-dom";
  import { useAppDispatch, useAppSelector } from "../../redux/hooks";
  import { googleLogin } from "../../redux/auth/authActions";
  import { getPostAuthPath } from "../claim/ClaimRedirect";

  const GENERIC_ERROR = "Google sign-in could not be completed. Please try again.";

  const GoogleCallback = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { currentUser } = useAppSelector((state) => state.auth);

    const started = useRef(false);
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
      if (started.current) return;
      started.current = true;

      const params = new URLSearchParams(window.location.search);
      window.history.replaceState(null, "", window.location.pathname);

      const verifier = sessionStorage.getItem("reech.google.verifier");
      const rememberMe =
        sessionStorage.getItem("reech.google.rememberMe") === "true";
      sessionStorage.removeItem("reech.google.verifier");
      sessionStorage.removeItem("reech.google.rememberMe");

      const code = params.get("code");

      if (params.has("error") || !code || !verifier) {
        setErrorMessage(GENERIC_ERROR);
        return;
      }

      dispatch(googleLogin({ code, codeVerifier: verifier, rememberMe }))
        .unwrap()
        .catch((message) => setErrorMessage(message || GENERIC_ERROR));
    }, []);

    useEffect(() => {
      if (currentUser) {
        // navigate(getPostAuthPath(), { replace: true });
        navigate(getPostAuthPath(currentUser.roles[0]), { replace: true })
      }
    }, [currentUser]);

    return (
      <main className="min-h-screen flex flex-col items-center justify-center gap-4 px-5 text-center">
        {errorMessage ? (
          <>
            <p className="text-base">{errorMessage}</p>
            <Link to="/sign-in" className="text-[#4A148C] text-lg">
              Back to Sign In
            </Link>
          </>
        ) : (
          <p className="text-base">Signing you in with Google...</p>
        )}
      </main>
    );
  };

  export default GoogleCallback;