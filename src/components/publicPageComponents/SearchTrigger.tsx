"use client";

import React, { useState } from "react";
import { Search } from "lucide-react";
import SearchModal from "./SearchModal";

const SearchTrigger: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="text-[white] cursor-pointer item-center py-10 justify-between rotate-350 hover:text-black"
      >
        <Search size={24} />
      </button>

      <SearchModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
};

export default SearchTrigger;
