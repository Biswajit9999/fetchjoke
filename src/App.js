import { useState } from "react";
import "./App.css";

const API_URL = "https://official-joke-api.appspot.com/random_joke";

function App() {
  const [joke, setJoke] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchJoke = async () => {
    // clear previous joke/error and start loading
    setJoke(null);
    setError("");
    setLoading(true);

    try {
      const response = await fetch(API_URL);
      if (!response.ok) {
        throw new Error("Request failed");
      }
      const data = await response.json();
      setJoke({ setup: data.setup, punchline: data.punchline });
    } catch (err) {
      setError("Could not fetch a joke. Try again.");
    } finally {
      setLoading(false);
    }
  };

  // const handleRetry = (e) => {
  //   e.preventDefault();
  //   fetchJoke();
  // };

  return (
    <div className="page">
      <div className="card">
        <h1>Random Joke</h1>
        <p className="subtitle">Click the button to fetch a fresh one.</p>

        <button onClick={fetchJoke} disabled={loading}>
          {loading ? "Fetching..." : "Fetch joke"}
        </button>

        <div className="result">
          {!joke && !error && !loading && <p className="empty">No joke yet.</p>}

          {joke && (
            <>
              <p className="setup">{joke.setup}</p>
              <p className="punchline">{joke.punchline}</p>
            </>
          )}

          {error && (
            <>
              <p className="error">{error}</p>
              <button type="button" className="retry" onClick={fetchJoke}>
                Try again
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
