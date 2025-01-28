import Link from 'next/link'
import React from 'react'
import { ModeToggle } from '../mode-toggle'
import ButtonLogout from '../button-logout'

function Header() {
  return (
    <div>
      <ul>
        <li>
          <Link href="/login">Đăng nhập</Link>
        </li>
        <li>
          <Link href="/register">Đăng ký</Link>
        </li>
        <li>
          <ButtonLogout />
        </li>
      </ul>
      <ModeToggle />
    </div>
  )
}

export default Header
