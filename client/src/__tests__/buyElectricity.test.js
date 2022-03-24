import { render, screen } from '@testing-library/react';
import Buying from '../pages/Buying';

test('Buy Electricty page', () => {
    render(<>
        <Buying/>
    </>);
    
    const buttonlement = screen.getByText(/Buy Token/i);
    expect(buttonlement).toBeInTheDocument();
});