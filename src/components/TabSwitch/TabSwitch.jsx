/* eslint-disable react/prop-types */
import "./tab-switch.scss"
import { useState } from "react"

function TabSwitch({ data, onTabChange }) {
  const [selectedTab, setSelectedTab] = useState(0)
  const [left, setLeft] = useState(0)

  function activeTab(tab, index) {
    setLeft(index * 100)
    setTimeout(() => {
      setSelectedTab(index)
    }, 300)
    onTabChange(tab, index)
  }

  return (
    <div className="tab-switch">
      <div className="tab-items">
        {data.map((tab, index) => {
          return (
            <span
              key={index}
              className={`tab-item ${selectedTab === index ? "active" : ""}`}
              onClick={() => activeTab(tab, index)}
            >
              {tab}
            </span>
          )
        })}
        <span className="moving-background" style={{ left }}></span>
      </div>
    </div>
  )
}

export default TabSwitch
