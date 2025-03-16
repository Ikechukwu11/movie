const Search = ({ searchTerm, setSearchTerm }: any) => {

	return (
		<div className="search">
			<div>
				<img src="search.svg" alt="search" />
				<input
					type="text"
					placeholder="Search for thousands of movie"
					value={searchTerm}
					onChange={(e) => setSearchTerm(e.target.value)}
				/>
			</div>
		</div>
	)
}
export default Search