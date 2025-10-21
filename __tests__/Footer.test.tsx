import { render, screen } from '@testing-library/react';
import Footer from '../app/components/layout/Footer';
 
describe('Footer', () => {
  it('renders a heading', () => {
    render(<Footer />);
 
    const heading = screen.getByRole('heading', { level: 1 });
 
    expect(heading).toBeInTheDocument();
  });
});
