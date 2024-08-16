import WarehousePopup from "@/components/warehouseViewComps/WarehousePopup";

function Page({ params}) {
    const warehouse_code = params.code;
    return (
        <div>
            <WarehousePopup warehouseCode={warehouse_code} />
        </div>
    );
}

export default Page;