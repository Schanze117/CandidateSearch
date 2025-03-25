import { useState, useEffect } from 'react';
import { searchGithub, searchGithubUser } from '../api/API';
import Candidate from '../interfaces/Candidate.interface';

const CandidateSearch = () => {
  // When the candidate search page loads then the information for one candidate should be displayed, including the candidate's name, username, location, avatar, email, html_url, and company
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [candidate, setCandidate] = useState<Candidate | null>(null);
  const [savedCandidates, setSavedCandidates] = useState<Candidate[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);

  //function to fetch candidates from the API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await searchGithub();
        setCandidates(data);

        //get the first candidates information
        if (data.length > 0) {
          const loggedData = await searchGithubUser(data[0].login);
          setCandidate(loggedData);
        }
      } catch (error) {
        setError('Error fetching candidates. Please try again later.');
        console.error(error);
      }
    };


    // Retrieve saved candidates from local storage
    const savedCandidatesInStorage = localStorage.getItem('savedCandidates');
    if (savedCandidatesInStorage) {
      setSavedCandidates(JSON.parse(savedCandidatesInStorage));
    }
    fetchData();
  }, []);

  // function to save candidate 
  const handleSaveCandidate = async () => {
    if (candidate) {
      const updatedSavedCandidates = [...savedCandidates, candidate];
      setSavedCandidates(updatedSavedCandidates);
      localStorage.setItem('savedCandidates', JSON.stringify(updatedSavedCandidates));
      alert('Candidate saved successfully!');
      loadNext();
    }
  };
  //function to skip candidate
  const handleSkipCandidate = () => {
    loadNext();
  };
  //function to load next candidate
  const loadNext = async () => {
    const nextIndex = currentIndex + 1;
    if (nextIndex < candidates.length) {
      const nextCandidate = await searchGithubUser(candidates[nextIndex].login);
      setCandidate(nextCandidate);
      setCurrentIndex(nextIndex);
    } else {
      setCandidate(null);
      alert('No more candidates to display.');
    }
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  // Render the candidate search page
  return (
    <div>
      <h1>Candidate Search</h1>
      {candidate ? (
        <div className="candidate">
          <img src={candidate.avatar_url || 'null'} alt={`${candidate.name || 'null'}'s avatar`} />
          <h2>{candidate.name}</h2>
            <p>Name: {candidate.name || 'null'}</p>
            <p>Username: {candidate.login || 'null'}</p>
            <p>Location: {candidate.location || 'null'}</p>
            <p>Email: {candidate.email || 'null'}</p>
            <a href={candidate.html_url}>GitHub Profile</a>
            <p>Company: {candidate.company || 'null'}</p>
            <p>Profile: <a href={candidate.html_url || '#'}>{candidate.html_url || 'null'}</a></p>
          <div className="candidate-buttons">
            <button onClick={handleSaveCandidate}>Save Candidate</button>
            <button onClick={handleSkipCandidate}>Skip Candidate</button>
          </div>
        </div>
      ) : (
        <p>No candidate information available.</p>
      )}
    </div>
  );
};

export default CandidateSearch;
