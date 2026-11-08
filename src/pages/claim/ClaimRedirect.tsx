import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useRole } from "../../hooks/useRole";

export const PENDING_CODE_KEY = "pendingOfflineCode";

export const getPostAuthPath = (role: string) => {
  if (role !== "User") {
    sessionStorage.removeItem(PENDING_CODE_KEY);
    return "/dashboard";
  }

  return sessionStorage.getItem(PENDING_CODE_KEY)
    ? "/ways-to-earn"
    : "/dashboard";
};

const readHashCode = () => {
  const raw = window.location.hash.replace(/^#/, "");

  if (!raw) return "";

  try {
    return decodeURIComponent(raw).trim();
  } catch {
    return raw.trim();
  }
};

const ClaimRedirect = () => {
  const navigate = useNavigate();
  const role = useRole();

  useEffect(() => {
    if (role && role !== "User") {
      navigate("/dashboard", { replace: true });
      return;
    }

    const code = readHashCode();

    if (code) {
      sessionStorage.setItem(PENDING_CODE_KEY, code);
    }

    navigate("/ways-to-earn", { replace: true });
  }, [navigate, role]);

  return null;
};

export default ClaimRedirect;