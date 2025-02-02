import { Layer } from "react-konva";
import { Asset } from "../../../entities/Asset";
import AssetDot from "./AssetDot";
import AssetDotNameBox from "./AssetDotNameBox";
import HiddenAssetsService from "../../../services/HiddenAssetsService";

function AssetDisplayLayer({
	scale,
	assets,
	x,
	y,
}: {
	scale: number;
	assets: Asset[];
	x: number;
	y: number;
}) {
	return (
		<>
			<Layer scale={{ x: scale, y: scale }}>
				{assets.map((asset, index) => {
					if (HiddenAssetsService.IsAssetHidden(asset.id)) return <></>;

					const assetPosition = asset.position;
					return (
						<AssetDot
							key={index}
							scale={scale}
							x={assetPosition.x + x}
							y={y - assetPosition.y}
							id={asset.id}
						/>
					);
				})}
			</Layer>
			<Layer scale={{ x: scale, y: scale }}>
				{assets.map((asset, index) => {
					if (HiddenAssetsService.IsAssetHidden(asset.id)) return <></>;

					const assetPosition = asset.position;
					return (
						<AssetDotNameBox
							key={index}
							scale={scale}
							x={assetPosition.x + x}
							y={y - assetPosition.y}
							name={asset.name}
							id={asset.id}
						/>
					);
				})}
			</Layer>
		</>
	);
}

export default AssetDisplayLayer;
