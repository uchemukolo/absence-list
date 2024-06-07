import React from 'react';
import { useParams } from 'react-router-dom';
import { useGetAbsencesQuery } from '../services/absenceSlice';
import { format, addDays } from 'date-fns';

const EmployeeAbsences = () => {
  // Extracting employee id from the URL params
  const { id } = useParams();

  // Fetching absences data for the employee using the useGetAbsencesQuery hook
  const { data: absences, error, isLoading } = useGetAbsencesQuery();

  // Filtering absences data for the specific employee id
  const employeeAbsences = absences?.filter((absence) => absence.employee.id === id);

  // Display loading state while data is being fetched
  if (isLoading) return <div>Loading...</div>;

  // Display error message if there's an error fetching data
  if (error) return <div>Error loading data</div>;

  // Render absences table once data is loaded
  return (
    <div className="container mx-auto p-4">
      <h2>Absences for Employee</h2>
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Absence Type</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {/* Mapping over employeeAbsences to render each absence */}
          {employeeAbsences.map((absence) => (
            <tr key={absence.id}>
              <td>{format(new Date(absence.startDate), 'dd-MM-yyyy')}</td>
              <td>{format(addDays(new Date(absence.startDate), absence.days), 'dd-MM-yyyy')}</td>
              <td>{absence.absenceType}</td>
              {/* Displaying 'Approved' or 'Pending Approval' based on absence.approved */}
              <td>{absence.approved ? 'Approved' : 'Pending Approval'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeAbsences;
