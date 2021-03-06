import React from "react";

import { render, cleanup, waitForElement, fireEvent, queryByAltText, getByText, prettyDOM, getAllByTestId, getByAltText, getByPlaceholderText, queryByText } from "@testing-library/react";

import Application from "components/Application";
import axios from "axios";

afterEach(cleanup);

describe("Application", () => {
  it("changes the schedule when a new day is selected", async () => {
    const { getByText } = render(<Application />);
  
    await waitForElement(() => getByText("Monday"));
  
    fireEvent.click(getByText("Tuesday"));
  
    expect(getByText("Leopold Silvers")).toBeInTheDocument();
  });
  
  it("loads data, books an interview and reduces the spots remaining for Monday by 1", async () => {
    const { container } = render(<Application />);
  
    await waitForElement(() => getByText(container, "Archie Cohen"));
  
    const appointments = getAllByTestId(container, "appointment");
    const appointment = appointments[0];
  
    fireEvent.click(getByAltText(appointment, "Add"));
    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: "Lydia Miller-Jones" }
    });
    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));
    fireEvent.click(getByText(appointment, "Save"));

    expect(getByText(appointment, "Saving")).toBeInTheDocument();

    await waitForElement(() => getByText(appointment, "Lydia Miller-Jones"));
  
    const day = getAllByTestId(container, "day").find(day =>
      queryByText(day, "Monday")
    );

    expect(getByText(day, "no spots remaining")).toBeInTheDocument();
  });

  it("loads data, cancels an interview and increases the spots remaining for Monday by 1", async () => {
    // 1. Render the Application.
    const { container } = render(<Application />);
  
    // 2. Wait until the text "Archie Cohen" is displayed.
    await waitForElement(() => getByText(container, "Archie Cohen"));
  
    // 3. Click the "Delete" button on the booked appointment.
    const appointment = getAllByTestId(container, "appointment").find(
      appointment => queryByText(appointment, "Archie Cohen")
    );
  
    fireEvent.click(queryByAltText(appointment, "Delete"));
  
    // 4. Check that the confirmation message is shown.
    expect(
      getByText(appointment, "Are you sure?")
    ).toBeInTheDocument();
  
    // 5. Click the "Confirm" button on the confirmation.
    fireEvent.click(queryByText(appointment, "Confirm"));
  
    // 6. Check that the element with the text "Deleting" is displayed.
    expect(getByText(appointment, "Deleting")).toBeInTheDocument();
  
    // 7. Wait until the element with the "Add" button is displayed.
    await waitForElement(() => getByAltText(appointment, "Add"));
  
    // 8. Check that the DayListItem with the text "Monday" also has the text "2 spots remaining".
    const day = getAllByTestId(container, "day").find(day =>
      queryByText(day, "Monday")
    );
  
    expect(getByText(day, "2 spots remaining")).toBeInTheDocument();
  });
  
  it("loads data, edits an interview and keeps the spots remaining for Monday the same", async () => {
    //1. Render the Application
    const { container } = render(<Application />);

    //2. Wait until "Archie Cohen" is displayed
    await waitForElement(() => getByText(container, "Archie Cohen"));
    //3. Click the "Edit" Button
    const appointment = getAllByTestId(container, "appointment").find(
      appointment => queryByText(appointment, "Archie Cohen")
    );
    fireEvent.click(getByAltText(appointment, "Edit"));
    //4. Change the name and interviewer
    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: "Placeholder Name"}
    });
    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));
    //5. Click save
    fireEvent.click(getByText(appointment, "Save"))
    //6. Check that the saving happens
    expect(getByText(appointment, "Saving")).toBeInTheDocument();

    //7.  Wait for appointment with new name shows
    await waitForElement(() => getByText(appointment, "Placeholder Name"));

  })

  it("shows the save error when failing to save an appointment", async () => {
    axios.put.mockRejectedValueOnce();
    //Renders application
    const { container } = render(<Application />);

    //Waits until Archie Cohen is displayed
    await waitForElement(() => getByText(container, "Archie Cohen"));

    //Clicks on the add button
    const appointments = getAllByTestId(container, "appointment");
    const appointment = appointments[0];
  
    fireEvent.click(getByAltText(appointment, "Add"));

    //Enters student name, clicks interviewer
    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: "Lydia Miller-Jones" }
    });
    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));
    //Clicks save
    fireEvent.click(getByText(appointment, "Save"));

    //Checks that saving happens
    expect(getByText(appointment, "Saving")).toBeInTheDocument();

    //Checks that we get save error
    await waitForElement(() => getByText(appointment, "Error saving!"));

  });

  it("shows the delete error when failing to delete an existing appointment", async () => {
    axios.delete.mockRejectedValueOnce();

    //Render Application
    const { container } = render(<Application />);
    //Wait until Archie Cohen is displayed
    await waitForElement(() => getByText(container, "Archie Cohen"));

    //Press the delete button
    const appointment = getAllByTestId(container, "appointment").find(
      appointment => queryByText(appointment, "Archie Cohen")
    );

    fireEvent.click(queryByAltText(appointment, "Delete"));

    //Expect confirmation prompt
    expect(
      getByText(appointment, "Are you sure?")
    ).toBeInTheDocument();
  
    //Click the "Confirm" button on the confirmation.
    fireEvent.click(queryByText(appointment, "Confirm"));
  
    //Check that the element with the text "Deleting" is displayed.
    expect(getByText(appointment, "Deleting")).toBeInTheDocument();

    //Check that deletion error shows
    await waitForElement(() => queryByText(appointment, "Error deleting!"));
  })
  
})
