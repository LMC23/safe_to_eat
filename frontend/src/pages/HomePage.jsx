import { Link } from "react-router-dom";
import { useAuth } from "../contexts/Auth";

export default function Dashboard() {
  const { user, signOut } = useAuth();
  return (
    <div className="text-gray-900">
      <h1>Homepage</h1>
      <button onClick={() => signOut()}>Sign Out</button>
      {/* <nav
        style={{
          borderBottom: "solid 1px",
          paddingBottom: "1rem",
        }}
      >
        <Link to="/login">Login</Link> | <Link to="/signup">Signup</Link>
      </nav> */}
      {/* <pre>{JSON.stringify(user, null, 2)}</pre> */}
    </div>
  );
}
