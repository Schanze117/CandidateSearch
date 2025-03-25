// interface for the Candidate objects returned by the API
interface Candidate {
    name: string;
    userName: string;
    location: string;
    avatar_url: string;
    email: string;
    html_url: string;
    company: string;
    login: string;
}
export default Candidate;