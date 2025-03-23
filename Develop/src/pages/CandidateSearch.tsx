import { useState, useEffect } from 'react';
import { searchGithub, searchGithubUser } from '../api/API';
import Candidate from '../interfaces/Candidate.interface';

const CandidateSearch = () => {
  // When the candidate search page loads then the information for one candidate should be displayed, including the candidate's name, username, location, avatar, email, html_url, and company
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [candidate, setCandidate] = useState<Candidate | null>(null);
  const [savedCandidates, setSavedCandidates] = useState<Candidate[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
        searchGithubUser('octocat');
        setCandidate(data);
      } catch (error) {
        setError(error);
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  if (!candidate) return <p>No candidate found</p>;
  if (candidate) {
    return (
      <div>
        <h1>CCandidateSearch</h1>
        <p>Name: {candidate.name}</p>
        <p>Username: {candidate.login}</p>
        <p>Location: {candidate.location}</p>
        <img src={candidate.avatar_url} alt="Avatar" />
        <p>Email: {candidate.email}</p>
        <p>Profile URL: <a href={candidate.html_url}>{candidate.html_url}</a></p>
        <p>Company: {candidate.company}</p>
      </div>
    );
  };
}
export default CandidateSearch;
