import { useState } from 'react';

interface ListFilterOptions<T> {
  /** Text the search box matches against (case-insensitive substring). */
  searchText: (item: T) => string;
  /** Whether the item belongs to the selected filter; 'All' always matches. */
  matchesFilter: (item: T, filter: string) => boolean;
}

/** Search + single-select filter state for a list, as used with the admin <Toolbar>. */
export function useListFilter<T>(items: T[], { searchText, matchesFilter }: ListFilterOptions<T>) {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('All');

  const query = search.toLowerCase();
  const filtered = items.filter(
    (item) =>
      (filter === 'All' || matchesFilter(item, filter)) &&
      searchText(item).toLowerCase().includes(query)
  );

  return { search, setSearch, filter, setFilter, filtered };
}
