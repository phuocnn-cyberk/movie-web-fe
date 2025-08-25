"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useSearchMovies } from "@/hooks/movies/useSearchMovies";
import { ROUTES } from "@/lib/routes";
import { Loader2, Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ScrollArea } from "../ui/scroll-area";

export function SearchDialog({ children }: { children?: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState(query);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(query);
    }, 300);

    return () => {
      clearTimeout(handler);
    };
  }, [query]);

  const { data: movies, isLoading } = useSearchMovies(debouncedQuery);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children || (
          <div className="flex cursor-pointer items-center gap-2">
            <Search className="h-5 w-5 text-white" />
          </div>
        )}
      </DialogTrigger>
      <DialogContent className="border-gray-800 bg-[#141414] sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-white">Search Movies</DialogTitle>
        </DialogHeader>
        <div className="relative">
          <Input
            placeholder="Search for movies..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="border-gray-700 bg-[#0F0F0F] text-white"
          />
          {isLoading && (
            <Loader2 className="absolute top-1/2 right-3 h-5 w-5 -translate-y-1/2 animate-spin text-gray-400" />
          )}
        </div>
        <ScrollArea className="h-[400px]">
          <div className="space-y-4">
            {movies?.map((movie) => (
              <Link
                href={ROUTES.movieDetail(movie.movieID)}
                key={movie.movieID}
                className="flex items-center gap-4 rounded-lg p-2 transition-colors hover:bg-[#1F1F1F]"
                onClick={() => setOpen(false)}
              >
                <Image
                  src={movie.poster.trimEnd()}
                  alt={movie.title}
                  width={60}
                  height={90}
                  className="rounded-md object-cover"
                />
                <div className="flex flex-col">
                  <p className="font-semibold text-white">{movie.title}</p>
                  <p className="text-sm text-gray-400">{movie.year}</p>
                </div>
              </Link>
            ))}
            {!isLoading && debouncedQuery && movies?.length === 0 && (
              <p className="py-4 text-center text-gray-400">No movies found.</p>
            )}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
