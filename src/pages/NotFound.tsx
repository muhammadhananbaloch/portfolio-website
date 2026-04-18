import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    document.documentElement.classList.add("portfolio");
    document.body.classList.add("portfolio");
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
    return () => {
      document.documentElement.classList.remove("portfolio");
      document.body.classList.remove("portfolio");
    };
  }, [location.pathname]);

  return (
    <div className="notfound">
      <div>
        <div className="notfound-kicker">Error · 404</div>
        <h1 className="notfound-title">
          Page <em>not found.</em>
        </h1>
        <p className="notfound-lede">
          The page you're looking for has wandered off. Try the front page instead.
        </p>
        <a className="btn primary" href="/">
          Return home →
        </a>
      </div>
    </div>
  );
};

export default NotFound;
