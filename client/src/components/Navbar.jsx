// eslint-disable-next-line react/prop-types
const Navbar = ({ setShowPending, showPending }) => {
  return (
    <div className="p-4 w-[70%]">
        <div className="flex gap-10 mb-2">
            <button 
              className={`font-bold text-zinc-700 text-4xl hover:text-indigo-700 focus:text-indigo-800 
              ${showPending ? 'text-indigo-800' : ''}`}
              onClick={() => setShowPending(true)}
            >
              Pending Task
            </button>
            <button className="font-bold text-zinc-700 text-4xl hover:text-green-700 focus:text-green-700">
              Completed Task
            </button>
        </div>
        <hr className="border-2 border-zinc-700"/>
    </div>
  );
};

export default Navbar;
