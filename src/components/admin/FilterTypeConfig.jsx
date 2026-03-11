import { useEffect, useState } from "react";
import { getShop, updateFilterType } from "../../services/shopService";

function FilterTypeConfig() {

  const shopId = 1;

  const [filterType, setFilterType] = useState("");

  useEffect(() => {
    loadShop();
  }, []);

  const loadShop = async () => {

    try {

      const response = await getShop(shopId);

      setFilterType(response.data.filterType);

    } catch (error) {

      console.error("Filter config load error:", error);

    }

  };

  const handleChange = async (e) => {

    const value = e.target.value;

    setFilterType(value);

    try {

      await updateFilterType(shopId, value);

    } catch (error) {

      console.error("Filter update error:", error);

    }

  };

  return (

    <select
      value={filterType}
      onChange={handleChange}
      className="settings-select"
    >

      <option value="PRICE">
        Price Filter
      </option>

      <option value="SUB_PRODUCT">
        Sub Product Filter
      </option>

    </select>

  );

}

export default FilterTypeConfig;