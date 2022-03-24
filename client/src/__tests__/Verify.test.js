import { render, screen } from '@testing-library/react';
import VerifyToken from '../pages/verifyToken';

test('Check purcahse', () => {
    render(<>
        <VerifyToken/>
    </>);
    
    const text = screen.getByText(/Verify Token/i);
    expect(text).toBeInTheDocument();
});


test("Passing electricity check", () => {
    render(<>
        <VerifyToken/>
    </>);
    
    const inputElement = screen.getByTestId("meter_number")
    inputElement.value = "1000"
    
    const text = screen.getByText("Verify Token")
    text.click()
    
    const errorMessage = screen.getByTitle("Error")
    
    expect(errorMessage).toBeInTheDocument();
})