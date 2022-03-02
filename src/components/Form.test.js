/*
  We are rendering `<Application />` down below, so we need React.createElement
*/
import React from 'react';

/*
  We import our helper functions from the react-testing-library
  The render function allows us to render Components
*/
import { render, cleanup, fireEvent } from '@testing-library/react';

/*
  We import the component that we are testing
*/
import Form from 'components/Appointment/Form';

/*
  A test that renders a React Component
*/
afterEach(cleanup);

describe('Form', () => {
  const interviewers = [
    {
      id: 1,
      name: 'Sylvia Palmer',
      avatar: 'https://i.imgur.com/LpaY82x.png',
    },
  ];

  it('renders without student name if not provided', () => {
    const { getByPlaceholderText } = render(
      <Form interviewers={interviewers} />
    );
    expect(getByPlaceholderText('Enter Student Name')).toHaveValue('');
  });

  it('renders with initial student name', () => {
    const { getByTestId } = render(
      <Form interviewers={interviewers} students="Lydia Miller-Jones" />
    );
    expect(getByTestId('student-name-input')).toHaveValue('Lydia Miller-Jones');
  });
});

it('validates that the student name is not blank', () => {
  const onSave = jest.fn();
  const { getByText } = render(
    <Form interviewers={interviewers} onSave={onSave} />
  );
  fireEvent.click(getByText('Save'));
  expect(getByText(/student name cannot be blank/i)).toBeInTheDocument();
  expect(onSave).not.toHaveBeenCalled();
});

it('calls onSave function when the name is defined', () => {
  const onSave = jest.fn();
  const { queryByText, getByText } = render(
    <Form
      student="Lydia Miller-Jones"
      interviewers={interviewers}
      onSave={onSave}
    />
  );
  fireEvent.click(getByText('Save'));
  expect(queryByText(/student name cannot be blank/i)).toBeNull();

  expect(onSave).toHaveBeenCalledTimes(1);

  expect(onSave).toHaveBeenCalledWith('Lydia Miller-Jones', null);
});
