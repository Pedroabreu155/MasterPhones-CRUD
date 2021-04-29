import React from 'react'
import "./Header.css"
import { Link } from 'react-router-dom'

export default function Header() {
  return (
    <div className="header">
      <Link className="nav-link" to="/"><h2 className="logo">MasterPhones</h2></Link>
      <img className="logo-image" src="/smartphones.png" alt="smartphone"/>
    </div>
  )
}
