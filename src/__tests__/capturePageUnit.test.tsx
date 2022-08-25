import { render, screen } from '@testing-library/react'
import React from 'react'
import { BrowserRouter } from 'react-router-dom';
import CapturePage from '../public/infernode/views/Capture/CapturePage'

describe('Capture page unit tests', () => {

  beforeEach(() => {
    const page = render(
      <BrowserRouter>
        <CapturePage />
      </BrowserRouter>
    )
  })

  describe('Capture page will render correct buttons', () => {
    
    test('Capture button will render capture page', () => {
      expect(true).toBe(true)
    })
    
    test('Capture page renders correct content', () => {
      
    })
    
  })

})