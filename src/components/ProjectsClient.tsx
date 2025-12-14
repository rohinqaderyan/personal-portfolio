'use client';

/**
 * ProjectsClient Component
 * @description Client-side projects page with filtering
 */
import { useState, useMemo } from 'react';
import { ProjectGrid } from './ProjectGrid';
import { ProjectFilters } from './ProjectFilters';
import type { Project } from '@/lib/content';

interface ProjectsClientProps {
  allProjects: Project[];
  allTags: string[];
}

export function ProjectsClient({ allProjects, allTags }: ProjectsClientProps) {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProjects = useMemo(() => {
    return allProjects.filter((project) => {
      // Filter by tags
      const matchesTags =
        selectedTags.length === 0 || selectedTags.some((tag) => project.tags.includes(tag));

      // Filter by search query
      const matchesSearch =
        searchQuery === '' ||
        project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()));

      return matchesTags && matchesSearch;
    });
  }, [allProjects, selectedTags, searchQuery]);

  const handleTagToggle = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const handleClearAll = () => {
    setSelectedTags([]);
    setSearchQuery('');
  };

  return (
    <>
      <div className="mb-8">
        <ProjectFilters
          tags={allTags}
          selectedTags={selectedTags}
          searchQuery={searchQuery}
          onTagToggle={handleTagToggle}
          onSearchChange={setSearchQuery}
          onClearAll={handleClearAll}
        />
      </div>

      <div className="mb-6 text-sm text-muted-foreground">
        Showing {filteredProjects.length} of {allProjects.length} projects
      </div>

      <ProjectGrid projects={filteredProjects} />
    </>
  );
}
