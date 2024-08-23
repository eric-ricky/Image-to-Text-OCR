import Logo from "@/components/brand/logo";
import LoginButton from "@/components/login-button";

const Navbar = () => {
  return (
    <header className="bg-slate-900">
      <div className="max-w-screen-2xl mx-auto flex items-center justify-between gap-8 h-16 px-4 sm:px-6 lg:px-8">
        <Logo dark />
        <LoginButton />
      </div>
    </header>
  );
};

export default Navbar;
