import React, { useEffect, useState } from 'react';
import { useGetConflictQuery, useGetUserAbsencesQuery } from '../services/absenceSlice';

const AbsenceItem = ({ absence }) => {
  // Destructure the absence object for easier access to its properties
  const { id, startDate, days, absenceType, employee, approved } = absence;

  // Format start and end dates
  const startDateFormat = new Date(startDate).toLocaleDateString('en-GB');
  const endDateFormat = new Date(new Date(startDate).getTime() + days * 24 * 60 * 60 * 1000).toLocaleDateString('en-GB');

  // Fetch conflict and user absences data using RTK Query hooks
  const { data: conflictData } = useGetConflictQuery(id);
  const { data: userAbsencesData } = useGetUserAbsencesQuery(id);

  // State to track conflict status, user absences status, and details visibility
  const [hasConflict, setHasConflict] = useState(false);
  const [hasAbsences, setHasAbsences] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  // Toggle the visibility of the details section
  const toggleDetails = () => setShowDetails(!showDetails);

  // Update the conflict and user absences states when the respective data changes
  useEffect(() => {
    if (conflictData) {
      setHasConflict(conflictData.hasConflict);
    }
    if (userAbsencesData) {
      setHasAbsences(userAbsencesData.hasAbsences);
    }
  }, [conflictData, userAbsencesData]);

  return (
    <>
      <div className={`flex flex-col lg:flex-row items-center justify-between p-4 border rounded shadow ${hasConflict ? 'border-red-500' : 'border-indigo-500'}`}>
        <div className="grow-2 mb-2 lg:mb-0">
          <div className="text-center font-semibold">Start Date </div>
          <div>{startDateFormat}</div>
        </div>
        <div className="grow-2 mb-2 lg:mb-0">
          <div className="text-center font-semibold">End Date </div>
          <div>{endDateFormat}</div>
        </div>
        <div className="grow-4 mb-2 lg:mb-0">
          <div className="text-center font-semibold">Employee Name </div>
          <button className="text-indigo-500 underline bg-transparent hover:border-transparent hover:bg-transparent py-0" onClick={toggleDetails}>
            {employee.firstName} {employee.lastName}
          </button>
        </div>
        <div className="grow-2 mb-2 lg:mb-0">
          <div className="text-center font-semibold">Status </div>
          <div>{approved ? 'Approved' : 'Pending Approval'}</div>
        </div>
        <div className="grow-2 mb-2 lg:mb-0">
          <div className="text-center font-semibold">Type </div>
          <div>{absenceType}</div>
        </div>
        {hasConflict && (
          <div className="grow-1 mb-2 lg:mb-0 text-red-500 font-semibold">
            Conflict
          </div>
        )}
      </div>
      {showDetails && (
        <div className="mt-2 text-center">
          {hasAbsences ? hasAbsences : `No more Absences for ${employee.firstName} ${employee.lastName}`}
        </div>
      )}
    </>
  );
};

export default AbsenceItem;
