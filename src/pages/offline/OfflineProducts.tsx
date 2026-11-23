import { useCallback, useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { FaArrowLeft, FaPen, FaPlus, FaTrash } from "react-icons/fa6";
import { DataTable, type DataTableColumn } from "../../components/DataTable";
import { Pagination } from "../../components/Pagination";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  deleteOfflineProduct,
  fetchOfflineProducts,
  getOfflineScope,
} from "../../redux/offline/action";
import type { OfflineProduct } from "../../redux/offline/reducer";
import {
  ConfirmDialog,
  MerchantSelect,
  NOT_SET,
  inputClass,
  primaryButton,
} from "../manage-merchant/OfflineHelpers";

const PAGE_SIZE = 25;

const OfflineProducts = () => {
  const dispatch = useAppDispatch();
  const [params, setParams] = useSearchParams();
  const isMerchant = getOfflineScope() === "merchant";

  const businessId = isMerchant ? "" : (params.get("businessId") ?? "");
  const search = params.get("search") ?? "";
  const page = Number(params.get("page") ?? 1);
  const canLoad = isMerchant || businessId !== "";

  const [searchInput, setSearchInput] = useState(search);
  const [toDelete, setToDelete] = useState<OfflineProduct | null>(null);

  const {
    allProducts,
    fetchProductsLoading,
    fetchProductsError,
    deleteProductLoading,
  } = useAppSelector((state) => state.offlinePoints);

  const updateParams = (next: {
    businessId?: string;
    search?: string;
    page?: number;
  }) => {
    const merged = { businessId, search, page, ...next };
    const query = new URLSearchParams();

    if (merged.businessId) query.set("businessId", merged.businessId);
    if (merged.search) query.set("search", merged.search);
    if (merged.page > 1) query.set("page", String(merged.page));

    setParams(query);
  };

  const load = useCallback(() => {
    if (!canLoad) return;

    dispatch(
      fetchOfflineProducts({ businessId, search, page, pageSize: PAGE_SIZE }),
    );
  }, [dispatch, canLoad, businessId, search, page]);

  useEffect(() => {
    load();
  }, [load]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchInput.trim() !== search) {
        updateParams({ search: searchInput.trim(), page: 1 });
      }
    }, 400);

    return () => clearTimeout(timer);
  }, [searchInput]);

  const items = allProducts.items.filter(
    (product) => isMerchant || product.businessId === businessId,
  );
  const totalPages = Math.max(1, Math.ceil(allProducts.totalCount / PAGE_SIZE));
  const showSkeleton = fetchProductsLoading && items.length === 0;
  const query = businessId ? `?businessId=${businessId}` : "";

  const handleDelete = async () => {
    if (!toDelete) return;

    const result = await dispatch(
      deleteOfflineProduct({ id: toDelete.id, businessId }),
    );

    if (deleteOfflineProduct.fulfilled.match(result)) {
      setToDelete(null);

      if (items.length === 1 && page > 1) {
        updateParams({ page: page - 1 });
      } else {
        load();
      }
    }
  };

  const columns: DataTableColumn<OfflineProduct>[] = [
    {
      key: "product",
      header: "Product",
      maxWidth: 260,
      skeletonWidth: "w-32",
      tooltip: (product) => product.name,
      render: (product) => (
        <span className="font-medium text-[#1E293B]">{product.name}</span>
      ),
    },
    {
      key: "brand",
      header: "Brand",
      maxWidth: 180,
      skeletonWidth: "w-24",
      render: (product) => product.brand?.trim() || NOT_SET,
    },
    {
      key: "variants",
      header: "Variants",
      maxWidth: 320,
      skeletonWidth: "w-40",
      tooltip: (product) =>
        (product.variants ?? []).map((variant) => variant.name).join(" · "),
      render: (product) =>
        (product.variants ?? []).map((variant) => variant.name).join(" · ") ||
        NOT_SET,
    },
    {
      key: "action",
      header: "Action",
      align: "right",
      pinRight: true,
      skeleton: <div className="ml-auto h-8 w-20 rounded bg-[#E2E8F0]" />,
      render: (product) => (
        <div className="flex justify-end gap-2">
          <Link
            to={`/offline-points/products/${product.id}${query}`}
            aria-label={`Edit ${product.name}`}
            className="p-2 rounded border border-[#4A148C] text-[#4A148C] text-xs hover:bg-[#4A148C] hover:text-white transition-colors"
          >
            <FaPen />
          </Link>
          <button
            type="button"
            aria-label={`Delete ${product.name}`}
            onClick={() => setToDelete(product)}
            className="p-2 rounded border border-[#B91C1C] text-[#B91C1C] text-xs hover:bg-[#B91C1C] hover:text-white transition-colors"
          >
            <FaTrash />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="mt-2 flex flex-col gap-5">
      <div className="flex items-center gap-3">
        <Link
          to={`/offline-points${query}`}
          aria-label="Back to offline points"
          className="bg-white text-primary-purple text-lg p-1.5 rounded"
        >
          <FaArrowLeft />
        </Link>
        <div>
          <h4 className="font-semibold text-[#1E293B]">Offline points</h4>
          <p className="text-sm text-[#64748B]">Products</p>
        </div>
      </div>

      <section className="rounded-xl bg-white p-4 lg:p-5 flex flex-col gap-4">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <div>
            <h4 className="font-semibold text-[#1E293B]">Products</h4>
            <p className="text-sm text-[#64748B]">
              What your labels point to when a customer scans them.
            </p>
          </div>

          <div className="flex items-center gap-3 flex-wrap">
            {!isMerchant && (
              <MerchantSelect
                value={businessId}
                onChange={(value) => updateParams({ businessId: value, page: 1 })}
                className="w-[220px]"
              />
            )}

            <input
              type="search"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="Search products"
              aria-label="Search products"
              disabled={!canLoad}
              className={`${inputClass} w-[220px]`}
            />

            {canLoad ? (
              <Link
                to={`/offline-points/products/new${query}`}
                className={primaryButton}
              >
                <FaPlus size={12} />
                New product
              </Link>
            ) : (
              <button type="button" disabled className={primaryButton}>
                <FaPlus size={12} />
                New product
              </button>
            )}
          </div>
        </div>

        {!canLoad ? (
          <p className="rounded-lg bg-[#F5F6FF] px-4 py-3 text-sm text-[#475569]">
            Select a merchant to see its products.
          </p>
        ) : (
          <DataTable
            className="mt-3"
            minWidth={760}
            columns={columns}
            rows={items}
            getRowKey={(product) => product.id}
            isLoading={showSkeleton}
            error={fetchProductsError}
            onRetry={load}
            emptyMessage={
              search ? "No products match your search" : "No products yet"
            }
          />
        )}

        {canLoad && !fetchProductsError && allProducts.totalCount > PAGE_SIZE && (
          <Pagination
            className="mt-2"
            currentPage={page}
            totalPages={totalPages}
            totalCount={allProducts.totalCount}
            pageSize={PAGE_SIZE}
            onPageChange={(nextPage) => updateParams({ page: nextPage })}
          />
        )}
      </section>

      {toDelete && (
        <ConfirmDialog
          title="Delete product?"
          message={`"${toDelete.name}" and its variants will be removed. Labels already printed still show them when scanned.`}
          confirmText="Delete product"
          isLoading={deleteProductLoading}
          onConfirm={handleDelete}
          onClose={() => setToDelete(null)}
        />
      )}
    </div>
  );
};

export default OfflineProducts;