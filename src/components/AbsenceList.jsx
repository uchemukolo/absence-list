import React, { useState, useMemo } from 'react';
import { useGetAbsencesQuery } from '../services/absenceSlice';
import AbsenceItem from './AbsenceItem';

const AbsenceList = () => {
  // Fetch absences data
  const { data: absences = [], error, isLoading } = useGetAbsencesQuery();

  // State for sorting configuration, current page, items per page, and search term
  const [sortConfig, setSortConfig] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');

  // Handler for search input
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1); // Reset to first page on search
  };

  // Memoized filtered absences based on search term
  const filteredAbsences = useMemo(() => {
    return absences.filter(absence =>
      `${absence.employee.firstName} ${absence.employee.lastName}`
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    );
  }, [absences, searchTerm]);

  // Memoized sorted absences based on sorting configuration
  const sortedAbsences = useMemo(() => {
    if (!sortConfig) return filteredAbsences;

    return [...filteredAbsences].sort((a, b) => {
      const aValue = sortConfig.key.split('.').reduce((obj, key) => obj[key], a);
      const bValue = sortConfig.key.split('.').reduce((obj, key) => obj[key], b);

      if (aValue < bValue) {
        return sortConfig.direction === 'ascending' ? -1 : 1;
      }
      if (aValue > bValue) {
        return sortConfig.direction === 'ascending' ? 1 : -1;
      }
      return 0;
    });
  }, [filteredAbsences, sortConfig]);

  // Calculate pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = sortedAbsences.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(sortedAbsences.length / itemsPerPage);

  // Handler for sorting request
  const requestSort = (key) => {
    let direction = 'ascending';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  // Handler for page change
  const changePage = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Show loading state
  if (isLoading) return <div>Loading...</div>;

  // Show error if data fetching failed
  if (error) return <div>Error loading absences</div>;

  return (
    <div className="container mx-auto p-4">
      {/* Sorting and search controls */}
      <div className="flex flex-col sm:flex-row justify-between mb-4">
        <button className="border border-indigo-300" onClick={() => requestSort('startDate')}>Sort by Start Date</button>
        <button className="border border-indigo-300" onClick={() => requestSort('endDate')}>Sort by End Date</button>
        <button className="border border-indigo-300" onClick={() => requestSort('absenceType')}>Sort by Type</button>
        <button className="border border-indigo-300" onClick={() => requestSort('employee.firstName')}>Sort by Name</button>
      </div>
      {/* Search input */}
      <div className="mb-4">
        <input 
          type="text" 
          placeholder="Search by employee name" 
          value={searchTerm}
          onChange={handleSearch}
          className="w-full p-2 border border-gray-300 rounded"
        />
      </div>
      {/* List of absences */}
      <div className="grid gap-4">
        {currentItems.map(absence => (
          <AbsenceItem key={absence.id} absence={absence} />
        ))}
      </div>
      {/* Pagination */}
      <div className="flex justify-center mt-4">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => changePage(index + 1)}
            className={`mx-1 px-3 py-1 border ${currentPage === index + 1 ? 'bg-indigo-500 text-white' : 'bg-white text-indigo-500'}`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default AbsenceList;
