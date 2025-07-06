import NavLink from "@/components/NavLink";
import getAuthUser from "@/lib/getAuthUser";

export default async function Navigation() {
    const authUser = await getAuthUser();

    return (
        <nav>
            <NavLink label="Home" href="/" />

            {authUser ? (
                <div className="flex items-center">
                    <NavLink label="Dashboard" href="/dashboard" />
                    <form action={logout}>
                        <button className="nav-link">Logout</button>
                    </form>
                </div>
            ) : (
                <div>
                    <NavLink label="Register" href="/register" />
                    <NavLink label="Login" href="/login" />
                </div>
            )}
        </nav>
    );
}