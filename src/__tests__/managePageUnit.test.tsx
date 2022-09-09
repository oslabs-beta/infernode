import { render, screen } from '@testing-library/react';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import UploadPage from '../public/infernode/views/Upload/UploadPage';
import { Provider } from 'react-redux';
import { store } from '../public/infernode/store/store';

describe('Upload page unit tests', () => {
  beforeEach(() => {
    const page = render(
      <Provider store={store}>
        <BrowserRouter>
          <UploadPage />
        </BrowserRouter>
      </Provider>,
    );
  });

  describe('page displays the correct content', () => {
    test('Upload page renders submit button to submit a .perf', () => {
      // expect(screen.getByRole('input', { name: 'capture'})).toBeInTheDocument()
      expect(
        screen.getByRole('button', { name: /Upload/i }),
      ).toBeInTheDocument();
    });
    xtest('Upload page renders a user submitted flamegraph', () => {
      //
    });
    xtest('Upload page renders a sidebar', () => {
      //
    });
  });

  xdescribe('sidebar renders and functions correctly', () => {
    test('sidebar contains buttons', () => {
      //
    });
    test('sidebar buttons do...', () => {
      //
    });
    test('sidebar contains list of previous files', () => {
      //
    });
  });
});
