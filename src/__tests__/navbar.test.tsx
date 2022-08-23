//this 
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
// import { describe, test, beforeEach } from ''

import HistoryPage from '../public/infernode/views/History/HistoryPage'
import NavBar from '../public/infernode/components/layout/NavBar/NavBar'
import ManagePage from '../public/infernode/views/Manage/ManagePage'
import React from 'react'
import { BrowserRouter, Router } from 'react-router-dom';
// eliminate the need for this import
// by altering tsconfig jsx compiling option to react - jsx

describe('Navbar unit tests', () => {

  beforeEach(() => {
    const page = render(
      <BrowserRouter>
        <NavBar />
      </BrowserRouter>
    )
  })

  describe('Navbar will have correct links', () => {
    
    test('History link', () => {
      expect(true).toBe(true)
    })
    
    test('Capture page renders correct content', () => {
      
    })
    
  })

  describe('Capture page tests', () => {
    
    test('Capture button will render capture page', () => {
      expect(true).toBe(true)
    })
    
    test('Capture page renders correct content', () => {
      
    })
    
  })

  describe('Manage page tests', () => {
    
    test('Manage button will render Manage page', () => {
      
    })
    
    test('Manage page renders two buttons to upload and submit .perf', () => {
      render(<ManagePage />)
      expect(screen.getByRole('button', { name: 'Choose File'})).toBeInTheDocument()
      expect(screen.getByRole('button', { name: 'Submit'})).toBeInTheDocument()
    })
    
  })
})