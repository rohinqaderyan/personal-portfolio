'use client';

/**
 * ProjectFilters Component
 * @description Filter and search controls for projects
 */
import { useState } from 'react';
import { Search, X } from 'lucide-react';
import { m as motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

interface ProjectFiltersProps {
  tags: string[]; 
  selectedTags: string[];
  searchQuery: string;
  onTagToggle: (tag: string) => void;
  onSearchChange: (query: string) => void;
  onClearAll: () => void;
}

export function ProjectFilters({
  tags,
  selectedTags,
  searchQuery,
  onTagToggle,
  onSearchChange,
  onClearAll,
}: ProjectFiltersProps) {
  const [showAllTags, setShowAllTags] = useState(false);
  const visibleTags = showAllTags ? tags : tags.slice(0, 10);
  const hasActiveFilters = selectedTags.length > 0 || searchQuery.length > 0;

  return (
    <div className="space-y-4">
      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search projects..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="focus-ring w-full rounded-lg border border-border bg-background py-2 pl-10 pr-10 text-sm focus:border-primary"
        />
        {searchQuery && (
          <button
            onClick={() => onSearchChange('')}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            aria-label="Clear search"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {/* Tags */}
      <div>
        <div className="mb-2 flex items-center justify-between">
          <span className="text-sm font-medium">Filter by technology</span>
          {hasActiveFilters && (
            <button
              onClick={onClearAll}
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              Clear all
            </button>
          )}
        </div>
        <div className="flex flex-wrap gap-2">
          <AnimatePresence>
            {visibleTags.map((tag) => {
              const isSelected = selectedTags.includes(tag);
              return (
                <motion.button
                  key={tag}
                  onClick={() => onTagToggle(tag)}
                  className={cn(
                    'focus-ring rounded-full px-4 py-2 text-sm font-medium transition-colors',
                    isSelected
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted text-muted-foreground hover:bg-accent hover:text-accent-foreground'
                  )}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {tag}
                </motion.button>
              );
            })}
          </AnimatePresence>
          {tags.length > 10 && (
            <button
              onClick={() => setShowAllTags(!showAllTags)}
              className="focus-ring rounded-full bg-muted px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
            >
              {showAllTags ? 'Show less' : `+${tags.length - 10} more`}
            </button>
          )}
        </div>
      </div>

      {/* Active filters count */}
      {hasActiveFilters && (
        <motion.p
          className="text-sm text-muted-foreground"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {selectedTags.length > 0 &&
            `${selectedTags.length} tag${selectedTags.length > 1 ? 's' : ''} selected`}
          {selectedTags.length > 0 && searchQuery && ' • '}
          {searchQuery && `Searching for "${searchQuery}"`}
        </motion.p>
      )}
    </div>
  );
}
