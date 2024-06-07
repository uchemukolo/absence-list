import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App';
import { useGetAbsencesQuery } from './services/absenceSlice';

// Mock the useGetAbsencesQuery hook
jest.mock('./services/absenceSlice', () => ({
  useGetAbsencesQuery: jest.fn(),
}));

// Mock AbsenceList component to simplify testing
jest.mock('./components/AbsenceList', () => () => <div>Mocked AbsenceList</div>);

describe('App Component', () => {
  test('renders the App component with header and AbsenceList', () => {
    // Mock the useGetAbsencesQuery hook to return an empty array for absences
    useGetAbsencesQuery.mockReturnValue({
      data: [],
      error: null,
      isLoading: false,
    });

    render(<App />);

    // Check if the header is rendered
    expect(screen.getByText('Absence List')).toBeInTheDocument();

    // Check if the AbsenceList component is rendered
    expect(screen.getByText('Mocked AbsenceList')).toBeInTheDocument();
  });
});
