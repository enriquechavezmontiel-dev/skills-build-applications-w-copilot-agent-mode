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

export default function Teams() {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const codespaceName = import.meta.env.VITE_CODESPACE_NAME;
    const endpoint = codespaceName
      ? `https://${codespaceName}-8000.app.github.dev/api/teams/`
      : 'http://localhost:8000/api/teams/';

    async function loadTeams() {
      try {
        setLoading(true);
        setError('');
        const response = await fetch(endpoint);
        if (!response.ok) throw new Error(`Request failed: ${response.status}`);
        const payload = await response.json();
        setTeams(getCollection(payload));
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unable to load teams');
      } finally {
        setLoading(false);
      }
    }

    loadTeams();
  }, []);

  return (
    <section className="container py-4">
      <h2 className="mb-3">Teams</h2>
      {loading && <p>Loading teams...</p>}
      {error && <p className="text-danger">{error}</p>}
      {!loading && !error && (
        <div className="table-responsive">
          <table className="table table-striped table-bordered align-middle">
            <thead className="table-light">
              <tr>
                <th>Name</th>
                <th>City</th>
                <th>Points</th>
                <th>Members</th>
              </tr>
            </thead>
            <tbody>
              {teams.map((team) => (
                <tr key={team._id ?? team.name}>
                  <td>{team.name ?? 'N/A'}</td>
                  <td>{team.city ?? 'N/A'}</td>
                  <td>{team.totalPoints ?? 0}</td>
                  <td>{Array.isArray(team.members) ? team.members.length : 0}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}
