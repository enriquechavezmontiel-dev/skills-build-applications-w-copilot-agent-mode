import { useEffect, useState } from 'react';

function getCollection(payload) {
  if (Array.isArray(payload)) return payload;
  if (!payload || typeof payload !== 'object') return [];

  if (Array.isArray(payload.items)) return payload.items;
  if (Array.isArray(payload.results)) return payload.results;
  if (Array.isArray(payload.data)) return payload.data;
  if (payload.data && Array.isArray(payload.data.items)) return payload.data.items;

  return [];
}

export default function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const codespaceName = import.meta.env.VITE_CODESPACE_NAME;
    const endpoint = codespaceName
      ? `https://${codespaceName}-8000.app.github.dev/api/workouts/`
      : 'http://localhost:8000/api/workouts/';

    async function loadWorkouts() {
      try {
        setLoading(true);
        setError('');
        const response = await fetch(endpoint);
        if (!response.ok) throw new Error(`Request failed: ${response.status}`);
        const payload = await response.json();
        setWorkouts(getCollection(payload));
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unable to load workouts');
      } finally {
        setLoading(false);
      }
    }

    loadWorkouts();
  }, []);

  return (
    <section className="container py-4">
      <h2 className="mb-3">Workouts</h2>
      {loading && <p>Loading workouts...</p>}
      {error && <p className="text-danger">{error}</p>}
      {!loading && !error && (
        <div className="table-responsive">
          <table className="table table-striped table-bordered align-middle">
            <thead className="table-light">
              <tr>
                <th>Title</th>
                <th>Difficulty</th>
                <th>Focus</th>
                <th>Duration</th>
                <th>Coach</th>
              </tr>
            </thead>
            <tbody>
              {workouts.map((workout) => (
                <tr key={workout._id ?? workout.title}>
                  <td>{workout.title ?? 'N/A'}</td>
                  <td>{workout.difficulty ?? 'N/A'}</td>
                  <td>{workout.focusArea ?? 'N/A'}</td>
                  <td>{workout.durationMinutes ? `${workout.durationMinutes} min` : 'N/A'}</td>
                  <td>{workout.createdByCoach ?? 'N/A'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}
