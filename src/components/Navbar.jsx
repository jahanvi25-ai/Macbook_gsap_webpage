import { navLinks } from "../constants"

const Navbar = () => {
  return (
    <header>
        <nav className="px-10">
            <img src="/logo.svg" alt="apple_logo" />
            <ul>
            {navLinks.map(({label})=>(
               <li key={label}>
                <a href={label}>{label}</a>
               </li>
            ))}
            </ul>
            <div>
                  <button>
             <img src="/search.svg" alt="search" />
           </button>

            <button>
             <img src="/cart.svg" alt="cart" />
           </button>
            </div>
        </nav>
    </header>
  )
}

export default Navbar