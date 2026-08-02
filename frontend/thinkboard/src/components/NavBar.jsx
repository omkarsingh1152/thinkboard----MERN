import {Link} from 'react-router-dom';
import {PlusIcon} from "lucide-react";

const NavBar = () => {
  return (
   <header className="bg-base-300 border-base-content/10">
    <div className="mx-auto max-w-6xl px-4">
        <div className="flex items-center justify-between ">
            <h1 className="text-3xl font-mono tracking-tight text-primary">ThinkBoard</h1>
            <Link to="/create" className="btn btn-primary">
                <PlusIcon className="size-5" />
                <span className="ml-2">Create Note</span>
            </Link>
        </div>
    </div>
   </header>
  )
}

export default NavBar