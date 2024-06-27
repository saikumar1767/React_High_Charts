// import React, { useState, useEffect } from "react";
// import SummaryPage from "./components/SummaryPage";
// import TeamStatsPage from "./components/TeamStatsPage";
// import { URL } from "./Utils.js";
// import CircularProgress from "@mui/material/CircularProgress";

// const App = () => {
// const [loading, setLoading] = useState(false);
// const [teams, setTeams] = useState([]);
// const [selectedTeam, setSelectedTeam] = useState({});
// const [selectedTeamId, setSelectedTeamId] = useState(
//   localStorage.getItem("selectedTeamId")
//     ? localStorage.getItem("selectedTeamId")
//     : null
// );
// useEffect(() => {
//   const fetchData = async () => {
//     try {
//       setLoading(true);
//       const response = await fetch(`${URL}/api/teams`);
//       const data = await response.json();
//       const resp = await fetch(`${URL}/api/getAbbrevations`);
//       const abbr = await resp.json();
//       const modifiedData =
//         data &&
//         data.length > 0 &&
//         data.map((team) => {
//           return {
//             ...team,
//             teamAbbrevation:
//               abbr &&
//               abbr.length > 0 &&
//               abbr.filter((item) => item.id === team.teamId)[0]["triCode"],
//           };
//         });
//       setTeams(modifiedData);
//       if (modifiedData && modifiedData.length > 0) {
//         const selectTeam = modifiedData.filter(
//           (team) => team.teamId === Number(selectedTeamId)
//         )[0];
//         setSelectedTeam(selectTeam);
//       }
//       setLoading(false);
//     } catch (error) {
//       setLoading(false);
//       console.log("error is:", error);
//     }
//   };
//   fetchData();
// }, [selectedTeamId]);
// const handleSelectTeam = (team) => {
//   setSelectedTeam(team);
//   setSelectedTeamId(team.teamId);
//   localStorage.setItem("selectedTeamId", team.teamId);
// };
// const handleBackToSummary = () => {
//   setSelectedTeam({});
//   setSelectedTeamId(null);
//   localStorage.removeItem("selectedTeamId");
// };
// if (loading) {
//   return (
//     <div className="flex items-center justify-center h-[100vh] m-auto">
//       <CircularProgress />
//     </div>
//   );
// }
// return (
//   <div>
//     {teams && teams.length > 0 && selectedTeamId !== null ? (
//       <TeamStatsPage team={selectedTeam} onBack={handleBackToSummary} />
//     ) : (
//       <SummaryPage teams={teams} onSelectTeam={handleSelectTeam} />
//     )}
//   </div>
// );

// };

// export default App;

import React, { useState, useEffect } from "react";
import "./App.css";
import StarRating from "./components/StarRating";
import {
  FormControl,
  InputLabel,
  Select,
  OutlinedInput,
  MenuItem,
  Checkbox,
  ListItemText,
  IconButton,
  Box,
  TextField,
  Autocomplete,
} from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";

const moviesData = [
  { title: "The Matrix", rating: 7.5, category: "Action" },
  { title: "Focus", rating: 6.9, category: "Comedy" },
  { title: "The Lazarus Effect", rating: 6.4, category: "Thriller" },
  { title: "Everly", rating: 5.0, category: "Action" },
  { title: "Maps to the Stars", rating: 7.5, category: "Drama" },
];

const App = () => {
  const movies = moviesData;
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredMovies, setFilteredMovies] = useState(moviesData);
  const [selectedRatings, setSelectedRatings] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const categoryList = ["Any Genre", "Action", "Comedy", "Thriller", "Drama"];
  const ratingList = ["Any Rating", 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: 650,
        width: 210,
      },
    },
    anchorOrigin: {
      vertical: "bottom",
      horizontal: "left",
    },
    transformOrigin: {
      vertical: "top",
      horizontal: "left",
    },
  };

  useEffect(() => {
    filterMovies();
  }, [searchTerm, selectedRatings, selectedCategories]);

  const handleGenreClearSelection = (event) => {
    event.stopPropagation();
    event.preventDefault();
    setSelectedCategories([]);
  };

  const handleRatingClearSelection = (event) => {
    event.stopPropagation();
    event.preventDefault();
    setSelectedRatings([]);
  };

  const handleRatingFilter = (event) => {
    const {
      target: { value },
    } = event;

    if (value.includes("Any Rating")) {
      setSelectedRatings(ratingList);
    } else {
      setSelectedRatings(typeof value === "string" ? value.split(",") : value);
    }
  };

  const handleCategoryFilter = (event) => {
    const {
      target: { value },
    } = event;

    if (value.includes("Any Genre")) {
      setSelectedCategories(categoryList);
    } else {
      setSelectedCategories(
        typeof value === "string" ? value.split(",") : value
      );
    }
  };

  const filterMovies = () => {
    let filtered = movies.filter((movie) =>
      movie.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (selectedRatings.length > 0) {
      filtered = filtered.filter((movie) =>
        selectedRatings.some(
          (rating) => movie.rating >= rating && movie.rating < rating + 1
        )
      );
    }

    if (selectedCategories.length > 0) {
      filtered = filtered.filter((movie) =>
        selectedCategories.includes(movie.category)
      );
    }

    setFilteredMovies(filtered);
  };

  const renderStars = (rating) => {
    return (
      <div>
        <StarRating rating={rating} />
      </div>
    );
  };

  return (
    <div className="App">
      <div className="filter-container">
        <div>
          <Autocomplete
            id="movie-select"
            sx={{ width: 750 }}
            options={filteredMovies}
            autoHighlight
            onInputChange={(event, newInputValue) => {
              setSearchTerm(newInputValue);
            }}
            getOptionLabel={(option) => option.title}
            renderOption={(props, option) => (
              <Box
                component="li"
                key={option}
                sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
                {...props}
              >
                <Box
                  display={"flex"}
                  flexDirection={"row"}
                  alignItems={"flex-start"}
                  justifyContent={"space-between"}
                  width={"100%"}
                >
                  <Box display={"flex"} flexDirection={"column"} py={1}>
                    <div className="option-title">{option.title}</div>
                    <div className="option-cards-rating">
                      {renderStars(option.rating)}
                    </div>
                  </Box>
                  <Box className="option-category">{option.category}</Box>
                </Box>
              </Box>
            )}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Enter movie name"
                inputProps={{
                  ...params.inputProps,
                  autoComplete: "new-password",
                }}
              />
            )}
          />
        </div>
        <div className="dropdown">
          <FormControl sx={{ m: 1, width: 200 }}>
            <InputLabel id="demo-multiple-checkbox-label">Rating</InputLabel>
            <Select
              labelId="demo-multiple-checkbox-label"
              id="demo-multiple-checkbox"
              multiple
              value={selectedRatings}
              onChange={handleRatingFilter}
              input={<OutlinedInput label="Rating" />}
              renderValue={(selected) => (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    width: "100%",
                  }}
                >
                  <div
                    style={{
                      maxWidth: "120px",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {selected.join(", ")}
                  </div>
                  {selected.length > 0 && (
                    <IconButton
                      aria-label="clear selection"
                      onMouseDown={handleRatingClearSelection}
                      edge="end"
                      size="small"
                      style={{ marginLeft: "auto" }}
                    >
                      <ClearIcon fontSize="small" />
                    </IconButton>
                  )}
                </div>
              )}
              MenuProps={MenuProps}
            >
              {ratingList.map((rating) => (
                <MenuItem
                  key={rating}
                  value={rating}
                  style={{
                    padding: "0 4px",
                    margin: "auto",
                    justifyContent: "flex-start",
                  }}
                >
                  <Checkbox checked={selectedRatings.indexOf(rating) > -1} />
                  <div className="star-rating">
                    {rating === "Any Rating" ? (
                      "Any Rating"
                    ) : (
                      <StarRating rating={rating} size={14} />
                    )}
                  </div>
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <div className="dropdown">
          <FormControl sx={{ m: 1, width: 200 }}>
            <InputLabel id="demo-multiple-checkbox-label">Genre</InputLabel>
            <Select
              labelId="demo-multiple-checkbox-label"
              id="demo-multiple-checkbox"
              multiple
              value={selectedCategories}
              onChange={handleCategoryFilter}
              input={<OutlinedInput label="Genre" />}
              renderValue={(selected) => (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    width: "100%",
                  }}
                >
                  <div
                    style={{
                      maxWidth: "120px",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {selected.join(", ")}
                  </div>
                  {selected.length > 0 && (
                    <IconButton
                      aria-label="clear selection"
                      onMouseDown={handleGenreClearSelection}
                      edge="end"
                      size="small"
                      style={{ marginLeft: "auto" }}
                    >
                      <ClearIcon fontSize="small" />
                    </IconButton>
                  )}
                </div>
              )}
              MenuProps={MenuProps}
            >
              {categoryList.map((genre) => (
                <MenuItem
                  key={genre}
                  value={genre}
                  style={{
                    padding: "0 4px",
                    margin: "auto",
                    justifyContent: "flex-start",
                  }}
                >
                  <Checkbox checked={selectedCategories.indexOf(genre) > -1} />
                  <ListItemText primary={genre} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
      </div>
      <div className="movie-list">
        {filteredMovies.map((movie) => (
          <div key={movie.title} className="movie-item">
            <h2>{movie.title}</h2>
            <div className="display-cards-rating">
              {renderStars(movie.rating)}
            </div>
            <p>{movie.category}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
