import { footerLinks } from "../constants"
const Footer = () => {
  return (
    <footer>
      <div className="info">
       <p>More ways to shop: Find an apple store or other retailer. Or call 000800 040 1966</p>
       <img src="/logo.svg" alt="apple logo" />
      </div>
        <hr />
      <div className="links">
        <p>Copyright © 2024 Apple Inc. All right reserved.</p>

        <ul>
          {
           footerLinks.map(({label,link})=>(
            <li key={label}>
              <a href={link}>{label}</a>
            </li>
           ))
          }
        </ul>
      </div>

    </footer>
  )
}

export default Footer