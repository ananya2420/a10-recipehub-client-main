"use client";

import { useEffect, useState } from "react";
import { getAllRecips } from "@/lib/api/recipe";
import { Button, Input } from "@heroui/react";
import { useRouter, useSearchParams } from "next/navigation";

const SearchRecipe = () => {
  const router = useRouter();
  const filters = useSearchParams();
  const [recips, setRecips] = useState([]);

  const quantityParam = filters.get("quantity");

  
  const filterObj = {
    ...Object.fromEntries(filters.entries()),
    quantity: quantityParam === 'true' 
  };

  const querySearch = new URLSearchParams(filterObj);
  const queryString = querySearch.toString();

  useEffect(() => {
    const fetchData = async () => {
      try {
        
        const data = await getAllRecips("", "", queryString);
        setRecips(data);
        console.log('Fetched recipes:', data);
      } catch (error) {
        console.error("Failed to fetch recipes:", error);
      }
    };
    
    fetchData();
  }, [queryString]); 

  const currentSearch = filters.get("search") || "";

  const onSubmit = (e) => {
    e.preventDefault();
    const searchValue = e.target.search.value;
    router.push(`/recips?search=${encodeURIComponent(searchValue)}`);
  };

  return (
    <div>
      <form onSubmit={onSubmit} className="flex items-center">
        <Input
          name="search"
          type="search"
          placeholder="Search recipe"
          defaultValue={currentSearch}
        />
        <Button
          type="submit"
          size="sm"
          className="ml-2 bg-green-600 hover:bg-green-700 text-white"
        >
          Search
        </Button>
      </form>
    </div>
  );
};

export default SearchRecipe;