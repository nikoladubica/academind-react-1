import React from 'react'

export default function Navigation() {
  return (
    <div className="navigation">
        <div className="navigation__logo">
            <img src="/logo192.png" alt="Logo" />
        </div>

        <div className="navigation__items">
            <div className="navigation__item">Home</div>
            <div className="navigation__item">Technologies</div>
            <div className="navigation__item">Portfolio</div>
            <div className="navigation__item">About</div>
        </div>
    </div>
  )
}
