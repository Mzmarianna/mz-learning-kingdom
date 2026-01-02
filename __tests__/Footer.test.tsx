import { render, screen } from '@testing-library/react';
import Footer from '../app/components/layout/Footer';
 
describe('Footer', () => {
  it('renders copyright text', () => {
    render(<Footer />);
 
    const copyrightText = screen.getByText(/Mz. Marianna's Tutoring/i);
 
    expect(copyrightText).toBeInTheDocument();
  });
});
