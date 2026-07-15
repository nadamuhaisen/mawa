import { useState } from "react";
import { Search, MapPin, Home, Tag } from "lucide-react";
import Button from "./Button.jsx";
import "../Styles/SearchBar.css";

function SearchBar({
  onSearch,
  cities = [],
  propertyTypes = [],
  statuses = [],
}) {
  const [filters, setFilters] = useState({
    city: "",
    type: "",
    status: "",
    minPrice: "",
    maxPrice: "",
  });

  const handleChange = (field) => (e) => {
    setFilters((prev) => ({
      ...prev,
      [field]: e.target.value,
    }));
  };

  const handleSearch = () => {
    if (onSearch) {
      onSearch(filters);
    }
  };

  return (
    <div className="search-bar">
      {/* المدينة */}
      <div className="search-bar__field">
        <label htmlFor="city">
          <MapPin size={16} />
          المدينة
        </label>

        <select id="city" value={filters.city} onChange={handleChange("city")}>
          <option value="">اختر المدينة</option>

          {cities.map((city) => (
            <option key={city} value={city}>
              {city}
            </option>
          ))}
        </select>
      </div>

      <div className="search-bar__divider" />

      {/* نوع العقار */}
      <div className="search-bar__field">
        <label htmlFor="type">
          <Home size={16} />
          نوع العقار
        </label>

        <select id="type" value={filters.type} onChange={handleChange("type")}>
          <option value="">كل الأنواع</option>

          {propertyTypes.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>

      <div className="search-bar__divider" />

      {/* الحالة */}
      <div className="search-bar__field">
        <label htmlFor="status">
          <Tag size={16} />
          الحالة
        </label>

        <select
          id="status"
          value={filters.status}
          onChange={handleChange("status")}
        >
          <option value="">الكل</option>

          {statuses.map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>
      </div>

      <div className="search-bar__divider" />

      {/* السعر */}
      <div className="search-bar__field search-bar__field--range">
        <label>نطاق السعر (شيكل)</label>

        <div className="search-bar__range">
          <input
            type="number"
            placeholder="من"
            value={filters.minPrice}
            onChange={handleChange("minPrice")}
          />

          <span>-</span>

          <input
            type="number"
            placeholder="إلى"
            value={filters.maxPrice}
            onChange={handleChange("maxPrice")}
          />
        </div>
      </div>

      <Button
        variant="primary"
        size="lg"
        icon={<Search size={18} />}
        onClick={handleSearch}
      >
        بحث
      </Button>
    </div>
  );
}

export default SearchBar;
