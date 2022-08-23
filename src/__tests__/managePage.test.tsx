// //this 
// import { render, screen } from '@testing-library/react'
// import React from 'react'
// import { BrowserRouter } from 'react-router-dom';
// import CapturePage from '../public/infernode/views/Capture/CapturePage'
// import ManagePage from '../public/infernode/views/Manage/ManagePage'

// describe('Capture page unit tests', () => {

//   beforeEach(() => {
//     const page = render(
//       <BrowserRouter>
//         <ManagePage />
//       </BrowserRouter>
//     )
//   })

//   describe('Manage page tests', () => {
    
//     test('Manage button will render Manage page', () => {
      
//     })
    
//     test('Manage page renders two buttons to upload and submit .perf', () => {
//       render(<ManagePage />)
//       expect(screen.getByRole('button', { name: 'Choose File'})).toBeInTheDocument()
//       expect(screen.getByRole('button', { name: 'Submit'})).toBeInTheDocument()
//     })
    
//   })
// })