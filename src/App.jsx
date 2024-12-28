import React, { useState } from "react";
import popcorn from "./assets/popcorn-icon.png";
import music from "./assets/music icon.png";

function Spotify() {
  const [tracks, setTracks] = useState([]);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState(""); // Start with an empty query
  const [loading, setLoading] = useState(false); // Track loading state

  // Fetch songs based on the query
  const fetchTracks = async () => {
    if (query.trim() === "") return; // Prevent fetching if the query is empty

    setLoading(true); // Set loading to true when request starts
    setError(null);

    const url = `https://spotify23.p.rapidapi.com/search/?q=${query}&type=multi&offset=0&limit=10&numberOfTopResults=5`;
    const options = {
      method: "GET",
      headers: {
        "x-rapidapi-key": "32418508e6msh33d910408cd9950p1c8debjsnc19ba4f202e7", // Replace with your actual RapidAPI key
        "x-rapidapi-host": "spotify23.p.rapidapi.com",
      },
    };

    try {
      const response = await fetch(url, options);
      const result = await response.json();
      console.log(result); // Debugging: Log the full response
      const fetchedTracks = result.tracks?.items || [];
      setTracks(fetchedTracks);
    } catch (err) {
      console.error(err); // Debugging: Log the error
      setError("Failed to fetch tracks.");
    } finally {
      setLoading(false); // Set loading to false when request completes
    }
  };

  // Handle search input changes
  const handleSearchChange = (e) => {
    setQuery(e.target.value); // Update the query state with the user's input
  };

  // Handle form submission
  const handleSearchSubmit = (e) => {
    e.preventDefault(); // Prevent page reload on form submission
    fetchTracks(); // Trigger the song fetch
  };

  return (
    <div className="container mx-auto p-6  rounded-xl">
      <div className="header flex items-center justify-center space-x-4 mb-5">
        <img
          src={music}
          alt="App Icon"
          className="w-14 h-14" // Adjusted size and added border radius
        />
        <h1 className="text-4xl font-bold text-primary text-center drop-shadow-lg">
          Song Search
        </h1>
      </div>

      {/* Search Input Form */}
      <form onSubmit={handleSearchSubmit} className="mb-8 text-center">
        <input
          type="text"
          placeholder="Search by title..."
          value={query}
          onChange={handleSearchChange}
          className="input input-bordered w-full max-w-md mr-4"
        />
        <button type="submit" className="btn btn-neutral mt-2">
          Search
        </button>
      </form>

      {/* Display loading spinner while fetching data */}
      {loading && (
        <div className="text-center mb-6">
          <span className="loading loading-dots loading-xs text-secondary"></span>
        </div>
      )}

      {/* Display error message */}
      {error && (
        <p className="text-red-500 text-center font-semibold">{error}</p>
      )}

      {/* Display no tracks message */}
      {!loading && !error && tracks.length === 0 && query && (
        <p className="text-center text-lg text-secondary">
          No tracks found for "{query}".
        </p>
      )}

      {/* Song List */}
      <ul className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {tracks.map((track, index) => {
          const albumCoverUrl =
            track.data.albumOfTrack?.coverArt?.sources[0]?.url || null; // Correct location for coverArt URL
          const artists =
            track.data.artists?.items
              ?.map((artist) => artist.profile.name)
              .join(", ") || "Unknown Artist"; // Corrected artist names
          const trackName = track.data.name || "Unknown Track";

          return (
            <li
              key={index}
              className="card  shadow-lg rounded-2xl overflow-hidden hover:scale-105 transition-all duration-300"
            >
              <figure>
                {albumCoverUrl ? (
                  <img
                    src={albumCoverUrl}
                    alt={track.albumOfTrack?.name || "Album Cover"}
                    className="w-full h-64 object-cover rounded-t-2xl"
                  />
                ) : (
                  <div className="bg-gray-300 w-full h-64 flex items-center justify-center rounded-t-2xl">
                    <p className="text-center text-xl font-bold text-gray-700">
                      No Cover Available
                    </p>
                  </div>
                )}
              </figure>
              <div className="card-body p-4 text-center">
                <h2 className="card-title text-xl font-semibold text-gray-900">
                  {trackName}
                </h2>
                <p className="text-sm text-accent">{artists}</p>
                <div className="card-actions justify-center mt-4">
                  <button className="btn btn-neutral py-2 px-6 rounded-full  text-white hover:scale-105 transition-all duration-200">
                    Buy Now
                  </button>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Spotify;
