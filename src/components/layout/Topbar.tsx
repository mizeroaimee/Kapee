const TopBar = () => {
  return (
    <div className="bg-primary text-white text-sm">
      <div className="max-w-7xl mx-auto flex justify-between px-4 py-2">
        <div className="flex gap-4">
          <span>ENGLISH</span>
          <span>$ DOLLAR (US)</span>
        </div>
        <div className="flex gap-4">
          <span>WELCOME TO OUR STORE!</span>
          <span>Blog</span>
          <span>FAQ</span>
          <span>Contact Us</span>
        </div>
      </div>
    </div>
  );
};

export default TopBar;

