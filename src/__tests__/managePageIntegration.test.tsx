import { render, screen } from '@testing-library/react'
import React from 'react'
import { BrowserRouter } from 'react-router-dom';
import ManagePage from '../public/infernode/views/Manage/ManagePage'

describe('Manage page unit tests', () => {

  beforeEach(() => {
    const page = render(
      <BrowserRouter>
        <ManagePage />
      </BrowserRouter>
    )
  })

  describe('the buttons work as intended', () => {
    test('the submit button will call the API', async () => {
      //this will be an integration test
    })
  })

})