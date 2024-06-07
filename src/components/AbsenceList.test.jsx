import { render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import AbsenceList from './AbsenceList'; 
import * as absenceSlice from '../services/absenceSlice';

// Mock the store
const store = configureStore({
    reducer: {
      [absenceSlice.absenceApi.reducerPath]: () => ({})
    }
  });
  
  // Mock the useGetAbsencesQuery function
  jest.mock('../services/absenceSlice', () => ({
    ...jest.requireActual('../services/absenceSlice'),
    useGetAbsencesQuery: jest.fn(),
    useGetConflictQuery: jest.fn(),
    useGetUserAbsencesQuery: jest.fn()
  }));
  
  test('renders absence items after loading', async () => {
    // Mock the absences data
    const mockAbsences = [
      { id: 1, startDate: '2022-05-28T04:39:06.470Z', days: 9, absenceType: 'SICKNESS', employee: { firstName: 'Johnny', lastName: 'Bravo', id: '123' }, approved: true },
      { id: 2, startDate: '2022-06-15T04:39:06.470Z', days: 5, absenceType: 'VACATION', employee: { firstName: 'Judy', lastName: 'Smith', id: '456' }, approved: false },
    ];
  
    // Mock the response of useGetAbsencesQuery
    absenceSlice.useGetAbsencesQuery.mockReturnValue({
      data: mockAbsences,
      error: undefined,
      isLoading: false,
    });
  
    // Mock the response of useGetConflictQuery
    absenceSlice.useGetConflictQuery.mockReturnValue({
      data: { hasConflict: false }, // Mock response data
      error: undefined,
      isLoading: false,
    });
  
    // Mock the response of useGetUserAbsencesQuery
    absenceSlice.useGetUserAbsencesQuery.mockReturnValue({
      data: { hasAbsences: false }, // Mock response data
      error: undefined,
      isLoading: false,
    });
  
    render(
      <Provider store={store}>
        <AbsenceList />
      </Provider>
    );
  
    // Wait for loading to disappear
    await waitFor(() => {
      expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
    });
  
    // Ensure absence items are rendered
    mockAbsences.forEach(absence => {
      expect(screen.getByText(absence.employee.firstName + " " + absence.employee.lastName )).toBeInTheDocument();
      expect(screen.getByText(absence.absenceType)).toBeInTheDocument();
    });
  });
