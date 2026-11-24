import { Link } from "react-router-dom";
import { FaRegPenToSquare, FaTrash } from "react-icons/fa6";
import type { OfflineProduct } from "../../redux/offline/reducer";
import { NOT_SET } from "../manage-merchant/OfflineHelpers";

const VISIBLE_VARIANTS = 3;

export const ProductThumb = ({
  url,
  name,
  size,
}: {
  url: string | null;
  name: string;
  size: string;
}) =>
  url ? (
    <img
      src={url}
      alt={name}
      loading="lazy"
      className={`${size} shrink-0 rounded-lg border border-[#E2E8F0] bg-[#F8FAFC] object-cover`}
    />
  ) : (
    <div
      className={`${size} flex shrink-0 items-center justify-center rounded-lg border border-[#E2E8F0] bg-[#EDE7F6] text-sm font-semibold text-[#4A148C]`}
    >
      {name.trim().charAt(0).toUpperCase() || "?"}
    </div>
  );

export const VariantChips = ({ product }: { product: OfflineProduct }) => {
  const variants = product.variants ?? [];

  if (variants.length === 0) {
    return <span className="text-[#64748B]">{NOT_SET}</span>;
  }

  const visible = variants.slice(0, VISIBLE_VARIANTS);
  const extra = variants.length - visible.length;

  return (
    <div className="flex flex-wrap gap-1.5">
      {visible.map((variant) => (
        <span
          key={variant.id}
          className="rounded-full bg-[#EDE7F6] px-2.5 py-0.5 text-xs font-medium text-[#4A148C]"
        >
          {variant.name}
        </span>
      ))}
      {extra > 0 && (
        <span className="rounded-full bg-[#F1F5F9] px-2.5 py-0.5 text-xs font-medium text-[#475569]">
          +{extra} more
        </span>
      )}
    </div>
  );
};

export const ProductActions = ({
  product,
  query,
  onDelete,
  fullWidth,
}: {
  product: OfflineProduct;
  query: string;
  onDelete: (product: OfflineProduct) => void;
  fullWidth?: boolean;
}) => (
  <div className={`flex gap-2 ${fullWidth ? "" : "justify-end"}`}>
    <Link
      to={`/offline-points/products/${product.id}${query}`}
      aria-label={`Edit ${product.name}`}
      className={`flex items-center justify-center gap-2 rounded border border-[#4A148C] text-[#4A148C] text-xs hover:bg-[#4A148C] hover:text-white transition-colors ${
        fullWidth ? "flex-1 py-2.5 font-semibold" : "p-2"
      }`}
    >
      <FaRegPenToSquare />
      {fullWidth && "Edit"}
    </Link>
    <button
      type="button"
      aria-label={`Delete ${product.name}`}
      onClick={() => onDelete(product)}
      className={`flex items-center justify-center gap-2 rounded border border-[#B91C1C] text-[#B91C1C] text-xs hover:bg-[#B91C1C] hover:text-white transition-colors ${
        fullWidth ? "flex-1 py-2.5 font-semibold" : "p-2"
      }`}
    >
      <FaTrash />
      {fullWidth && "Delete"}
    </button>
  </div>
);

const DetailItem = ({ label, value }: { label: string; value: string }) => (
  <div className="min-w-0">
    <p className="text-[11px] uppercase tracking-wide text-[#94A3B8]">{label}</p>
    <p className="truncate text-sm text-[#1E293B]">{value}</p>
  </div>
);

export const ProductCard = ({
  product,
  query,
  onDelete,
}: {
  product: OfflineProduct;
  query: string;
  onDelete: (product: OfflineProduct) => void;
}) => (
  <div className="flex flex-col gap-4 rounded-xl border border-[#E2E8F0] bg-white p-4">
    <div className="flex items-start gap-3">
      <ProductThumb url={product.imageUrl} name={product.name} size="size-16" />
      <div className="min-w-0 flex-1">
        <h5 className="truncate font-semibold text-[#1E293B]">{product.name}</h5>
        <p className="truncate text-sm text-[#64748B]">
          {product.brand?.trim() || NOT_SET}
        </p>
        {product.description?.trim() && (
          <p className="mt-1 line-clamp-2 text-xs text-[#64748B]">
            {product.description}
          </p>
        )}
      </div>
    </div>

    <div className="grid grid-cols-2 gap-3 rounded-lg bg-[#F8FAFC] p-3">
      <DetailItem
        label="Reg. no"
        value={product.registrationNumber?.trim() || NOT_SET}
      />
      <DetailItem
        label="Origin"
        value={product.countryOfOrigin?.trim() || NOT_SET}
      />
      <div className="col-span-2">
        <DetailItem
          label="Manufacturer"
          value={product.manufacturer?.trim() || NOT_SET}
        />
      </div>
    </div>

    <div className="flex flex-col gap-2">
      <p className="text-[11px] uppercase tracking-wide text-[#94A3B8]">
        Variants ({(product.variants ?? []).length})
      </p>
      <VariantChips product={product} />
    </div>

    <ProductActions product={product} query={query} onDelete={onDelete} fullWidth />
  </div>
);

export const CardSkeleton = () => (
  <div className="flex animate-pulse flex-col gap-4 rounded-xl border border-[#E2E8F0] bg-white p-4">
    <div className="flex items-start gap-3">
      <div className="size-16 rounded-lg bg-[#E2E8F0]" />
      <div className="flex flex-1 flex-col gap-2">
        <div className="h-4 w-32 rounded bg-[#E2E8F0]" />
        <div className="h-3 w-20 rounded bg-[#E2E8F0]" />
      </div>
    </div>
    <div className="h-20 rounded-lg bg-[#F1F5F9]" />
    <div className="h-10 rounded bg-[#E2E8F0]" />
  </div>
);