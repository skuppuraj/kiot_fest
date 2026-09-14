'use client';

import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  setDepartment,
  setCategory,
  setSearchQuery,
  resetFilters,
  selectDepartmentFilter,
  selectCategoryFilter,
  selectSearchQuery
} from '../redux/slices/eventSlice';
import { Search, RotateCcw, Filter, Sparkles } from 'lucide-react';

const DEPARTMENTS = ['ALL', 'CSE', 'AI&DS', 'ECE', 'MECH', 'CIVIL', 'IT'];
const CATEGORIES = ['ALL', 'Hackathon', 'Technical', 'Workshop', 'Non-Technical'];

export default function EventFilters({ onFilterChange }) {
  const dispatch = useDispatch();
  const selectedDept = useSelector(selectDepartmentFilter);
  const selectedCat = useSelector(selectCategoryFilter);
  const searchQuery = useSelector(selectSearchQuery);

  const handleDeptSelect = (dept) => {
    dispatch(setDepartment(dept));
    if (onFilterChange) onFilterChange();
  };

  const handleCatSelect = (cat) => {
    dispatch(setCategory(cat));
    if (onFilterChange) onFilterChange();
  };

  const handleSearchChange = (e) => {
    dispatch(setSearchQuery(e.target.value));
    if (onFilterChange) onFilterChange();
  };

  const handleReset = () => {
    dispatch(resetFilters());
    if (onFilterChange) onFilterChange();
  };

  const isFiltered = selectedDept !== 'ALL' || selectedCat !== 'ALL' || searchQuery !== '';

  return (
    <div className="w-full space-y-4 mb-8">
      {/* Top Row: Search Bar & Reset */}
      <div className="flex flex-col sm:flex-row items-center gap-3">
        {/* Search Bar */}
        <div className="relative flex-1 w-full">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Search events by title or keyword (e.g. Hackathon, CAD, AI)..."
            className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-900/90 border border-slate-800 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 text-white placeholder-slate-500 text-sm transition"
          />
          {searchQuery && (
            <button
              onClick={() => dispatch(setSearchQuery(''))}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-semibold text-slate-400 hover:text-white"
            >
              Clear
            </button>
          )}
        </div>

        {/* Reset Filters Button */}
        {isFiltered && (
          <button
            onClick={handleReset}
            className="flex items-center space-x-1.5 px-4 py-3 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 text-xs font-semibold transition touch-target w-full sm:w-auto justify-center"
          >
            <RotateCcw className="w-3.5 h-3.5 text-indigo-400" />
            <span>Reset Filters</span>
          </button>
        )}
      </div>

      {/* Middle Row: Department Filter Pills (Mobile-Scrollable) */}
      <div>
        <div className="flex items-center space-x-2 overflow-x-auto no-scrollbar py-1">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center space-x-1 mr-1 flex-shrink-0">
            <Filter className="w-3.5 h-3.5 text-indigo-400" />
            <span>Dept:</span>
          </span>

          {DEPARTMENTS.map((dept) => {
            const active = selectedDept === dept;
            return (
              <button
                key={dept}
                onClick={() => handleDeptSelect(dept)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all touch-target ${
                  active
                    ? 'bg-indigo-600 text-white shadow-glow-primary'
                    : 'bg-slate-900/80 text-slate-400 hover:text-slate-200 hover:bg-slate-800 border border-slate-800'
                }`}
              >
                {dept === 'ALL' ? 'All Departments' : dept}
              </button>
            );
          })}
        </div>
      </div>

      {/* Bottom Row: Category Filter Tabs */}
      <div>
        <div className="flex items-center space-x-2 overflow-x-auto no-scrollbar py-1">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center space-x-1 mr-1 flex-shrink-0">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Category:</span>
          </span>

          {CATEGORIES.map((cat) => {
            const active = selectedCat === cat;
            return (
              <button
                key={cat}
                onClick={() => handleCatSelect(cat)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all touch-target ${
                  active
                    ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 shadow-sm'
                    : 'bg-slate-900/80 text-slate-400 hover:text-slate-200 hover:bg-slate-800 border border-slate-800'
                }`}
              >
                {cat === 'ALL' ? 'All Categories' : cat}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
