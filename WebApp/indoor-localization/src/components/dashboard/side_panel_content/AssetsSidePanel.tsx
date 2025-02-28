import { SynInput } from "@synergy-design-system/react";
import AssetsSidePaneList from "./AssetsSidePanelList";
import { SynInputEvent } from "@synergy-design-system/react/components/checkbox.js";
import { useEffect, useState } from "react";
import SelectedFacilityService from "../../../services/SelectedFacilityService";
import { Asset } from "../../../entities/Asset";
import Spinner from "../../common/Spinner";

function AssetsSidePanel() {
	const [assets, setAssets] = useState<Asset[]>([]);
	const [searchTerm, setSearchTerm] = useState("");
	const [filteredAssets, setFilteredAssets] = useState<Asset[]>([]);
	const [isLoading, setIsLoading] = useState(false);

	const fetchAssets = async () => {
		setIsLoading(true);
		const facility = await SelectedFacilityService.getSelectedFacility();
		if (facility) {
			const fetchedAssets = facility.containedAssets;
			setAssets(fetchedAssets);
		}
		setIsLoading(false);
	};

	useEffect(() => {
		fetchAssets();
	}, []);

	const handleSearch = (event: SynInputEvent) => {
		const term = (event.target as HTMLInputElement).value;
		setSearchTerm(term);
	};

	useEffect(() => {
		if (!assets) {
			setFilteredAssets([]);
			return;
		}

		let filtered = assets.filter((asset) =>
			asset.name.toLowerCase().includes(searchTerm.toLowerCase())
		);

		filtered = filtered.sort((a, b) => a.name.localeCompare(b.name));

		setFilteredAssets(filtered);
	}, [searchTerm, assets]);

	return (
		<>
			<SynInput
				className="side-panel-search"
				placeholder="Search"
				value={searchTerm}
				onSynInput={handleSearch}
			/>
			{isLoading ? (
				<Spinner text="Loading assets." />
			) : (
				<div className="scrollable-list">
					<AssetsSidePaneList assets={filteredAssets} />
				</div>
			)}
		</>
	);
}

export default AssetsSidePanel;
