import { useState, useEffect } from 'react';

const SavedCandidates = () => {
  const [savedCandidates, setSavedCandidates] = useState<any[]>([]);
  const [isSortedAscending, setIsSortedAscending] = useState(true);
  const [isUserSorted, setIsUserSorted] = useState(true);

  // Retrieve saved candidates from local storage
  useEffect(() => {
    const savedCandidatesInStorage = localStorage.getItem('savedCandidates');
    if (savedCandidatesInStorage) {
      setSavedCandidates(JSON.parse(savedCandidatesInStorage));
    }
  }
    , []);

  // Delete candidate from saved candidates
  const handleDeleteCandidate = (index: number) => {
    const updatedSavedCandidates = [...savedCandidates];
    updatedSavedCandidates.splice(index, 1);
    setSavedCandidates(updatedSavedCandidates);
    localStorage.setItem('savedCandidates', JSON.stringify(updatedSavedCandidates));
    alert('Candidate deleted successfully!');
  };

  // Sort candidates by username
  const handleSortByUser = () => {
    const sortedCandidates = [...savedCandidates].sort((a, b) => {
      if (isUserSorted) {
        return a.userName.localeCompare(b.userName);
      } else {
        return b.userName.localeCompare(a.userName);
      }
    }
    );
    setSavedCandidates(sortedCandidates);
    setIsUserSorted(!isUserSorted);
  };

  // Sort candidates by name
  const handleSortByName = () => {
    const sortedCandidates = [...savedCandidates].sort((a, b) => {
      if (isSortedAscending) {
        return a.name.localeCompare(b.name);
      } else {
        return b.name.localeCompare(a.name);
      }
    }
    );
    setSavedCandidates(sortedCandidates);
    setIsSortedAscending(!isSortedAscending);
  };

  // Render the saved candidates page


  return (
    <>
      <h1>Potential Candidates</h1>
      {savedCandidates.length > 0 ? (
        <table className="candidate-table">
          <thead>
            <tr>
              <th>Image</th>
              <th onClick={handleSortByName} style={{ cursor: 'pointer' }}>
                Name {isSortedAscending ? '' : ''}
              </th>
              <th onClick={handleSortByUser} style={{ cursor: 'pointer' }}>
                User Name {isUserSorted ? '' : ''}
              </th>
              <th>Location</th>
              <th>Company</th>
              <th>Profile</th>
              <th>Reject Candidate</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {savedCandidates.map((Candidate, index) => (
              <tr key={index}>
                <td>
                  <div className='flex-container'>
                    <img src={Candidate.avatar} alt={`${Candidate.name || 'null'}'s avatar`} className='img' />
                  </div>
                </td>
                <td>
                  <div className='flex-container'> {Candidate.userName || 'null'}</div>
                </td>
                <td>
                  <div className='flex-container'> {Candidate.name || 'null'}</div>
                </td>
                <td>
                  <div className='flex-container'> {Candidate.location || 'null'}</div>
                </td>
                <td>
                  <div className='flex-container'> {Candidate.email || 'null'}</div>
                </td>
                <td>
                  <div className='flex-container'> {Candidate.company || 'null'}</div>
                </td>
                <td>
                  <div className='flex-container'>
                    <a href={Candidate.html_url || '#'} target='_blank' rel="noopener noreferrer">
                      {Candidate.html_url || 'null'}
                    </a>
                  </div>
                </td>
                <td>
                  <div className='flex-container'>
                    <button onClick={() => handleDeleteCandidate(index)} className='red'>-</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No saved candidates found.</p>
      )}
    </>
  );
};
export default SavedCandidates;
