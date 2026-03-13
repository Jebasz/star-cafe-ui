import PricePanel from "./PricePanel";
import SubProductPanel from "./SubProductPanel";

function FilterPanel({

    filterType,
    shopId,
    category,

    selectedPrice,
    onPriceSelect,

    selectedSubProduct,
    onSubProductSelect,

    resetSignal

}) {

    if (filterType === "SUB_PRODUCT") {
        return (
            <SubProductPanel
                shopId={shopId}
                category={category}
                selectedSubProduct={selectedSubProduct}
                onSubProductSelect={onSubProductSelect}
                resetSignal={resetSignal}
            />
        );
    }

    return (
        <PricePanel
            shopId={shopId}
            selectedPrice={selectedPrice}
            onPriceSelect={onPriceSelect}
            resetSignal={resetSignal}
        />
    );

}

export default FilterPanel;