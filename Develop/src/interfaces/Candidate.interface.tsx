// interface for the Candidate objects returned by the API
interface Candidate {
    name: string;
    userName: string;
    location: string;
    avatar: string;
    email: string;
    html_url: string;
    company: string;
}
export default Candidate;