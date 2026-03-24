import CandidateNavbar from "./CandidateNavbar";

function CandidateLayout({ children }) {
  return (
    <div className="candidate-layout">
      <CandidateNavbar />
      
      {/* This is where your page content will automatically be injected */}
      <main className="candidate-content">
        <div className="content-container">
          {children}
        </div>
      </main>
    </div>
  );
}

export default CandidateLayout;