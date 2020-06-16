import React from "react";

// grab the test library
import { render, fireEvent, waitFor } from "@testing-library/react";

// grab our checout form
import CheckoutForm from "./CheckoutForm";

// Write up the two tests here and make sure they are testing what the title shows
test("form header renders", () => {
    const {getByTestId} = render(<CheckoutForm />);
    const formHeader = getByTestId(/form-header/i);
    expect(formHeader).toBeInTheDocument();
});

test("form shows success message on submit with form details", async () => {
    // grab the CheckoutForm
    const {getByTestId} = render(<CheckoutForm />);
    
    // grab the page elements
    const firstname = getByTestId(/firstname/i);
    const lastname = getByTestId(/lastname/i);
    const address = getByTestId(/address/i);
    const city = getByTestId(/city/i);
    const state = getByTestId(/state/i);
    const zip = getByTestId(/zip/i);
    const button = getByTestId(/button/i);

    // fire the event on eact page element
    fireEvent.change(firstname, { target: { value: 'paul' } });
    fireEvent.change(lastname, { target: { value: 'menard' } });
    fireEvent.change(address, { target: { value: '101 react Street' } });
    fireEvent.change(city, { target: { value: 'boston' } });
    fireEvent.change(state, { target: { value: 'mass' } });
    fireEvent.change(zip, { target: { value: '02720' } });
    
    //submit the form
    fireEvent.submit(button); // submit the form
    
    // wait to complete
    await waitFor(() => {
      const {getByTestId} = render(<CheckoutForm />);  
      const successMessage = getByTestId(/message/i);
      expect(successMessage).toBeInTheDocument();
    });
  
});
