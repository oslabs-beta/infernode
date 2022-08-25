import { render, screen } from '@testing-library/react'
import React from 'react'
import { BrowserRouter } from 'react-router-dom';
import ManagePage from '../public/infernode/views/Manage/ManagePage'
import { Provider } from 'react-redux'
import { store } from '../public/infernode/store/store'

describe('Manage page unit tests', () => {

  beforeEach(() => {
    const page = render(
      <Provider store={store}>
      <BrowserRouter>
        <ManagePage />
      </BrowserRouter>
      </Provider>
    )
  })

  describe('page displays the correct content', () => {
    test('Manage page renders submit button to submit a .perf', () => {
      // expect(screen.getByRole('input', { name: 'capture'})).toBeInTheDocument()
      expect(screen.getByRole('button', { name: /submit/i })).toBeInTheDocument()
    })
    xtest('Manage page renders a user submitted flamegraph', () => {
      //
    })
    xtest('Manage page renders a sidebar', () => {
      //
    })
  })

  xdescribe('sidebar renders and functions correctly', () => {
    test('sidebar contains buttons', () => {
      //
    })
    test('sidebar buttons do...', () => {
      //
    })
    test('sidebar contains list of previous files', () => {
      //
    })
  })
})