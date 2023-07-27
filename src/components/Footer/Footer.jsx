import { useState } from "react"
import "./footer.scss"
import { FaFacebookF, FaInstagram, FaTwitter, FaLinkedin } from "react-icons/fa"
import { createPortal } from "react-dom"

function Footer() {
  const [modalIsShown, setModalIsShown] = useState(false)
  const [modalText, setModalText] = useState("")

  function showModal() {
    document.body.classList.add("hide-overflow")
    setModalIsShown(true)
  }

  function hideModal() {
    document.body.classList.remove("hide-overflow")
    setModalIsShown(false)
  }

  function handleClick(iconName) {
    setModalText(iconName)
    showModal()
  }

  return (
    <footer className="footer">
      <div className="footer-wrapper">
        <ul className="menuItems">
          <li className="menuItem">Terms Of Use</li>
          <li className="menuItem">Privacy-Policy</li>
          <li className="menuItem">About</li>
          <li className="menuItem">Blog</li>
          <li className="menuItem">FAQ</li>
        </ul>
        <div className="infoText">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur.
        </div>
        <div className="socialIcons">
          <span className="icon" onClick={() => handleClick("Facebook")}>
            <FaFacebookF />
          </span>
          <span className="icon" onClick={() => handleClick("Instagram")}>
            <FaInstagram />
          </span>
          <span className="icon" onClick={() => handleClick("Twitter")}>
            <FaTwitter />
          </span>
          <span className="icon" onClick={() => handleClick("LinkedIn")}>
            <FaLinkedin />
          </span>
        </div>
      </div>
      {modalIsShown
        ? createPortal(
            <div className="modal">
              <div className="opacity-layer-modal" onClick={hideModal}></div>
              <div className="modal-content">
                <div>Currently, {modalText} link is just for show!</div>
                <button className="close-modal" onClick={hideModal}>
                  Close Modal
                </button>
              </div>
            </div>,
            document.querySelector(".modal-container")
          )
        : ""}
    </footer>
  )
}

export default Footer
