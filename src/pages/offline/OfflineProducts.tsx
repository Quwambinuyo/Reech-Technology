import { useCallback, useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { FaPlus } from "react-icons/fa6";
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
import {
  CardSkeleton,
  ProductActions,
  ProductCard,
  ProductThumb,
  VariantChips,
} from "./OfflineProductHelpers";

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
  const emptyMessage = search
    ? "No products match your search"
    : "No products yet";

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
      maxWidth: 300,
      skeletonWidth: "w-40",
      tooltip: (product) => product.name,
      render: (product) => (
        <div className="flex items-center gap-3">
          <ProductThumb
            url={product.imageUrl}
            name={product.name}
            size="size-11"
          />
          <div className="min-w-0">
            <p className="truncate font-medium text-[#1E293B]">{product.name}</p>
            {product.description?.trim() && (
              <p className="truncate text-xs text-[#64748B]">
                {product.description}
              </p>
            )}
          </div>
        </div>
      ),
    },
    {
      key: "brand",
      header: "Brand",
      maxWidth: 160,
      skeletonWidth: "w-20",
      render: (product) => product.brand?.trim() || NOT_SET,
    },
    {
      key: "registrationNumber",
      header: "Reg. no",
      maxWidth: 140,
      skeletonWidth: "w-20",
      render: (product) => product.registrationNumber?.trim() || NOT_SET,
    },
    {
      key: "origin",
      header: "Manufacturer",
      maxWidth: 220,
      skeletonWidth: "w-28",
      tooltip: (product) =>
        [product.manufacturer, product.countryOfOrigin]
          .filter((value) => value?.trim())
          .join(" · "),
      render: (product) => (
        <div className="min-w-0">
          <p className="truncate">{product.manufacturer?.trim() || NOT_SET}</p>
          {product.countryOfOrigin?.trim() && (
            <p className="truncate text-xs text-[#64748B]">
              {product.countryOfOrigin}
            </p>
          )}
        </div>
      ),
    },
    {
      key: "variants",
      header: "Variants",
      maxWidth: 320,
      skeletonWidth: "w-40",
      render: (product) => <VariantChips product={product} />,
    },
    {
      key: "action",
      header: "Action",
      align: "right",
      pinRight: true,
      skeleton: <div className="ml-auto h-8 w-20 rounded bg-[#E2E8F0]" />,
      render: (product) => (
        <ProductActions
          product={product}
          query={query}
          onDelete={setToDelete}
        />
      ),
    },
  ];

  return (
    <div className="mt-2 flex flex-col gap-5">
  
      <section className="rounded-xl bg-white p-4 lg:p-5 flex flex-col gap-4">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <div>
            <h4 className="font-semibold text-[#1E293B]">Products</h4>
            <p className="text-sm text-[#64748B]">
              What your labels point to when a customer scans them.
            </p>
          </div>

          <div className="flex w-full items-center gap-3 flex-wrap md:w-auto">
            {!isMerchant && (
              <MerchantSelect
                value={businessId}
                onChange={(value) => updateParams({ businessId: value, page: 1 })}
                className="w-full md:w-[220px]"
              />
            )}

            <input
              type="search"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="Search products"
              aria-label="Search products"
              disabled={!canLoad}
              className={`${inputClass} w-full md:w-[220px]`}
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
          <>
            <div className="hidden md:block">
              <DataTable
                className="mt-3"
                minWidth={1040}
                columns={columns}
                rows={items}
                getRowKey={(product) => product.id}
                isLoading={showSkeleton}
                error={fetchProductsError}
                onRetry={load}
                emptyMessage={emptyMessage}
              />
            </div>

            <div className="flex flex-col gap-3 md:hidden">
              {showSkeleton ? (
                <>
                  <CardSkeleton />
                  <CardSkeleton />
                </>
              ) : fetchProductsError ? (
                <div className="flex flex-col items-center gap-3 rounded-xl border border-[#E2E8F0] p-6 text-center">
                  <p className="text-sm text-[#475569]">{fetchProductsError}</p>
                  <button
                    type="button"
                    onClick={load}
                    className="text-sm font-semibold text-[#4A148C]"
                  >
                    Try again
                  </button>
                </div>
              ) : items.length === 0 ? (
                <p className="rounded-xl border border-dashed border-[#CBD5E1] p-6 text-center text-sm text-[#64748B]">
                  {emptyMessage}
                </p>
              ) : (
                items.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    query={query}
                    onDelete={setToDelete}
                  />
                ))
              )}
            </div>
          </>
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