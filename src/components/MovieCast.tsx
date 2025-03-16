interface MovieCastProps {
  cast: any[];
}

const MovieCast: React.FC<MovieCastProps> = ({ cast }) => {
  if (!cast || cast.length === 0) return <p></p>;

  return (
    <div className="cast-list">
      <h1>Cast</h1>
      <div className="cast-container">
        {cast.map((member) => (
          <div key={member.id} className="cast-card">
            <img
              src={member.profile_path ? `https://image.tmdb.org/t/p/w200${member.profile_path}` : "/no-movie.jpg"}
              alt={member.name}
              className="cast-image"
            />
            <p>{member.name} as <strong>{member.character}</strong></p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MovieCast;
