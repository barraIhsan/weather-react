import SearchBar from "./components/SearchBar";
import type { Option } from "./types";

export default function App() {
  const handleOnSearchChange = (searchData: Option | null) => {
    console.log(searchData);
  };

  return (
    <main className="container max-w-5xl mx-auto mt-12 md:mt-24 px-5 sm:px-12 font-display">
      <SearchBar onSearchChange={handleOnSearchChange} />
    </main>
  );
}
