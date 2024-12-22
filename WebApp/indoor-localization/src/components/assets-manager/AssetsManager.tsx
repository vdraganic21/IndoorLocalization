import {
  SynButton,
  SynDivider,
  SynInput,
  SynOption,
  SynSelect,
} from "@synergy-design-system/react";
import Footer from "../Footer";
import "../Manager.css";
import { AssetService } from "../../services/AssetService";
import AssetsTable from "./AssetsTable";
import { useEffect, useState } from "react";
import {
  SynChangeEvent,
  SynInputEvent,
} from "@synergy-design-system/react/components/checkbox.js";

const assets = AssetService.GetAll();

const sortOptions = [
  { name: "Name - asc", value: "nameAsc" },
  { name: "Name - desc", value: "nameDesc" },
  { name: "Facility - asc", value: "facilityAsc" },
  { name: "Facility - desc", value: "facilityDesc" },
  { name: "Zone - asc", value: "zoneAsc" },
  { name: "Zone - desc", value: "zoneDesc" },
];

function AssetsManager() {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortedAssets, setSortedAssets] = useState(assets);
  const [filterIndex, setFilterIndex] = useState(0);

  const handleSearch = (event: SynInputEvent) => {
    const term = (event.target as HTMLInputElement).value;
    setSearchTerm(term);

    applyFilterAndSort(term, filterIndex);
  };

  const handleAddButtonClick = () => {
    //TODO implement asset add page loading
    console.log("Add button clicked");
  };

  const handleDeleteButtonClick = () => {
    console.log("Delete button clicked");
  };

  const handleFilterChange = (event: SynChangeEvent) => {
    const selectedValue = (event.target as HTMLInputElement).value;

    const selectedIndex = sortOptions.findIndex(
      (option) => option.value === selectedValue
    );
    setFilterIndex(selectedIndex);

    applyFilterAndSort(searchTerm, selectedIndex);
  };

  const applyFilterAndSort = (term: string, sortIndex: number) => {
    let filteredAssets = assets.filter((asset) =>
      asset.name.toLowerCase().includes(term.toLowerCase())
    );

    switch (sortOptions[sortIndex]?.value) {
      case "nameAsc":
        filteredAssets.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "nameDesc":
        filteredAssets.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case "facilityAsc":
        filteredAssets.sort(
          (a, b) =>
            a
              .GetCurrentFacility()
              ?.name?.localeCompare(b.GetCurrentFacility()?.name || "") || 0
        );
        break;
      case "facilityDesc":
        filteredAssets.sort(
          (a, b) =>
            b
              .GetCurrentFacility()
              ?.name?.localeCompare(a.GetCurrentFacility()?.name || "") || 0
        );
        break;
      case "zoneAsc":
        filteredAssets.sort(
          (a, b) =>
            a
              .GetCurrentFacility()
              ?.name?.localeCompare(b.GetCurrentFacility()?.name || "") || 0
        );
        break;
      case "zoneDesc":
        filteredAssets.sort(
          (a, b) =>
            b
              .GetCurrentFacility()
              ?.name?.localeCompare(a.GetCurrentFacility()?.name || "") || 0
        );
        break;
      default:
        break;
    }

    setSortedAssets(filteredAssets);
  };

  useEffect(() => {
    applyFilterAndSort(searchTerm, filterIndex);
  }, []);

  return (
    <>
      <div className="content content-border">
        <div className="header-row">
          <span className="syn-heading--3x-large">Assets</span>
          <div className="button-group">
            <SynButton variant="outline" onClick={handleDeleteButtonClick}>
              Delete
            </SynButton>
            <SynButton
              variant="filled"
              className="syn-border-radius-medium"
              onClick={handleAddButtonClick}
            >
              Add
            </SynButton>
          </div>
        </div>
        <SynDivider className="content-divider" />
        <div className="search-row">
          <SynInput
            className="search-input"
            placeholder="Search"
            value={searchTerm}
            onSynInput={handleSearch}
          />
          <p>Sort by:</p>
          <SynSelect
            value={sortOptions[filterIndex]?.value}
            onSynChange={handleFilterChange}
            className="sort-select"
          >
            {sortOptions.map((sortOption, index) => (
              <SynOption
                key={index}
                tabIndex={index}
                selected={index == filterIndex}
                value={sortOption.value}
              >
                {sortOption.name}
              </SynOption>
            ))}
          </SynSelect>
        </div>
        <SynDivider className="content-divider" />
        <AssetsTable assets={sortedAssets}></AssetsTable>
      </div>
      <Footer></Footer>
    </>
  );
}

export default AssetsManager;
