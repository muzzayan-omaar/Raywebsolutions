const Navbar = () => {
  return (
    <header className="h-16 flex items-center justify-between px-6 bg-white/5 border-b border-white/10">
      <h1 className="text-white font-bold text-lg">Admin Dashboard</h1>
      <div>
        <button className="bg-primary text-black px-4 py-1 rounded-lg">Logout</button>
      </div>
    </header>
  );
};

export default Navbar;
