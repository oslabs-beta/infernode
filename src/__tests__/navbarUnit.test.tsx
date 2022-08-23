//this 
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import NavBar from '../public/infernode/components/layout/NavBar/NavBar'
import React from 'react'
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux'
import { store } from '../public/infernode/store/store'

describe('Navbar unit tests', () => {

  beforeEach(() => {
    const page = render(
      <Provider store={store}>
        <BrowserRouter>
          <NavBar />
        </BrowserRouter>
      </Provider>
    )
    const history = screen.getByRole('link', { name: /history/i })
    // refactor later to use variables like this to make it dryer
    //its having issues atm
  })
  
  describe('Navbar has links to 4 pages', () => {
    test('The correct buttons render as links', () => {
      // using regex instead of strings will prevent tests failing due to capitalization
      expect(screen.getByRole('link', { name: /history/i })).toBeInTheDocument()
      expect(screen.getByRole('link', { name: /capture/i })).toBeInTheDocument()
      expect(screen.getByRole('link', { name: /manage/i })).toBeInTheDocument()
      expect(screen.getByRole('link', { name: /help/i })).toBeInTheDocument()
    })

  })
  
  describe('Navbar has the correct styling', () => {
    test('the links have nav-link class from bootstrap', () => {
      expect(screen.getByRole('link', { name: /history/i })).toHaveClass('nav-link')
      expect(screen.getByRole('link', { name: /capture/i })).toHaveClass('nav-link')
      expect(screen.getByRole('link', { name: /manage/i })).toHaveClass('nav-link')
      expect(screen.getByRole('link', { name: /help/i })).toHaveClass('nav-link')
    })
  })
  
  describe('Each link routes to the proper page', () => {
    test('history button routes to the History page', () => {
      expect(screen.getByRole('link', { name: /history/i })).toHaveAttribute('href', '/history')
    })
    test('capture button routes to the capture page', () => {
      expect(screen.getByRole('link', { name: /capture/i })).toHaveAttribute('href', '/capture')
    })
    test('manage button routes to the manage page', () => {
      expect(screen.getByRole('link', { name: /manage/i })).toHaveAttribute('href', '/manage')
    })
    test('help button routes to the help page', () => {
      expect(screen.getByRole('link', { name: /help/i })).toHaveAttribute('href', '/help')
    })
    
  })
})