import React from "react";
import "./FilterSortBar.css";

export default function FilterSortBar({ searchTerm, onSearchChange }) {
    return (
        <div className="filter-bar">
            <input
                type="text"
                placeholder="Search by title or label…"
                value={searchTerm}
                onChange={(e) => onSearchChange(e.target.value)}
            />
        </div>
    );
}
