import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import {
  FaArrowLeft,
  FaCircleExclamation,
  FaCloudArrowUp,
  FaImage,
  FaPlus,
  FaSpinner,
  FaTrashCan,
} from "react-icons/fa6";
import { CustomTextInput } from "../../components/CustomInput";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  createOfflineProduct,
  fetchOfflineProductDetail,
  getOfflineScope,
  updateOfflineProduct,
  uploadOfflineProductImage,
  type OfflineProductBody,
} from "../../redux/offline/action";
import { clearProductDetail } from "../../redux/offline/reducer";
import {
  MerchantSelect,
  inputClass,
  outlineButton,
  primaryButton,
} from "../manage-merchant/OfflineHelpers";

const MAX_VARIANTS = 50;
const FOCUS_COLOR = "#4A148C";
const IMAGE_ACCEPT = "image/jpeg,image/png,image/webp";

const cardClass =
  "bg-white rounded-2xl border border-[#E2E8F0] shadow-[0_1px_2px_rgba(15,23,42,0.04)] p-5 md:p-6 flex flex-col gap-5";
const labelClass = "text-sm md:text-[14.5px] text-[#334155]";
const addButtonClass =
  "inline-flex w-fit items-center gap-2 rounded-lg border border-dashed border-[#4A148C]/40 bg-[#F5F0FA]/60 px-4 py-2.5 text-sm font-semibold text-[#4A148C] transition-colors hover:border-[#4A148C]/70 hover:bg-[#EDE7F6] disabled:cursor-not-allowed disabled:opacity-40";
const iconButtonClass =
  "inline-flex shrink-0 items-center justify-center rounded-lg text-[#94A3B8] transition-colors hover:bg-[#FEF2F2] hover:text-[#DC2626] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#DC2626]/30 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-transparent disabled:hover:text-[#94A3B8]";

type SpecRow = { key: number; label: string; value: string };

type VariantRow = {
  key: number;
  id: string | null;
  name: string;
  sku: string;
  imageUrl: string;
  specs: SpecRow[];
};

const SectionHeader = ({
  title,
  description,
  aside,
}: {
  title: string;
  description: string;
  aside?: React.ReactNode;
}) => (
  <div className="flex items-start gap-3">
    <div className="min-w-0 flex-1">
      <h5 className="font-semibold text-[#0F172A]">{title}</h5>
      <p className="text-sm text-[#64748B]">{description}</p>
    </div>
    {aside}
  </div>
);

type SpecEditorProps = {
  rows: SpecRow[];
  disabled: boolean;
  nextKey: () => number;
  onChange: (rows: SpecRow[]) => void;
};

const SpecEditor = ({ rows, disabled, nextKey, onChange }: SpecEditorProps) => (
  <div className="flex flex-col gap-3">
    {rows.length === 0 && (
      <p className="rounded-xl border border-dashed border-[#CBD5E1] bg-[#F8FAFC] px-4 py-3 text-sm text-[#64748B]">
        No details yet.
      </p>
    )}

    {rows.map((row) => (
      <div key={row.key} className="flex items-start gap-2">
        <div className="grid flex-1 gap-2 md:grid-cols-[minmax(0,1fr)_minmax(0,2fr)]">
          <input
            type="text"
            aria-label="Detail label"
            placeholder="Storage"
            value={row.label}
            disabled={disabled}
            onChange={(e) =>
              onChange(
                rows.map((r) =>
                  r.key === row.key ? { ...r, label: e.target.value } : r,
                ),
              )
            }
            className={`${inputClass} py-2.5`}
          />
          <input
            type="text"
            aria-label="Detail value"
            placeholder="Cool, dry place"
            value={row.value}
            disabled={disabled}
            onChange={(e) =>
              onChange(
                rows.map((r) =>
                  r.key === row.key ? { ...r, value: e.target.value } : r,
                ),
              )
            }
            className={`${inputClass} py-2.5`}
          />
        </div>
        <button
          type="button"
          aria-label="Remove detail"
          title="Remove detail"
          disabled={disabled}
          onClick={() => onChange(rows.filter((r) => r.key !== row.key))}
          className={`${iconButtonClass} size-10`}
        >
          <FaTrashCan size={14} />
        </button>
      </div>
    ))}

    <button
      type="button"
      disabled={disabled}
      onClick={() =>
        onChange([...rows, { key: nextKey(), label: "", value: "" }])
      }
      className={addButtonClass}
    >
      <FaPlus size={11} />
      Add detail
    </button>
  </div>
);

type ImageFieldProps = {
  label: string;
  url: string;
  isUploading: boolean;
  disabled: boolean;
  onPick: (file: File) => void;
  onClear: () => void;
};

const ImageField = ({
  label,
  url,
  isUploading,
  disabled,
  onPick,
  onClear,
}: ImageFieldProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const locked = disabled || isUploading;

  return (
    <div className="flex flex-col gap-2">
      <span className={labelClass}>{label}</span>
      <div className="flex items-center gap-4 flex-wrap">
        <button
          type="button"
          aria-label={url ? "Replace image" : "Upload image"}
          disabled={locked}
          onClick={() => inputRef.current?.click()}
          className="group relative size-24 shrink-0 overflow-hidden rounded-2xl border border-dashed border-[#CBD5E1] bg-[#F8FAFC] transition-colors hover:border-[#4A148C]/60 hover:bg-[#F5F0FA] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {url ? (
            <img src={url} alt="" className="size-full object-cover" />
          ) : (
            <span className="flex size-full flex-col items-center justify-center gap-1 text-[#94A3B8] transition-colors group-hover:text-[#4A148C]">
              <FaImage size={20} />
              <span className="text-[11px] font-medium">Add image</span>
            </span>
          )}

          {url && !isUploading && (
            <span className="absolute inset-0 flex items-center justify-center bg-black/45 text-white opacity-0 transition-opacity group-hover:opacity-100">
              <FaCloudArrowUp size={18} />
            </span>
          )}

          {isUploading && (
            <span className="absolute inset-0 flex items-center justify-center bg-white/75 text-[#4A148C]">
              <FaSpinner className="animate-spin" size={18} />
            </span>
          )}
        </button>

        <div className="flex flex-col gap-2">
          <div className="flex gap-2 flex-wrap">
            <button
              type="button"
              disabled={locked}
              onClick={() => inputRef.current?.click()}
              className={outlineButton}
            >
              {isUploading ? (
                <FaSpinner className="animate-spin" />
              ) : (
                <FaCloudArrowUp />
              )}
              {isUploading ? "Uploading..." : url ? "Replace" : "Upload"}
            </button>
            {url && (
              <button
                type="button"
                disabled={locked}
                onClick={onClear}
                className={outlineButton}
              >
                <FaTrashCan size={13} />
                Remove
              </button>
            )}
          </div>
          <span className="text-xs text-[#64748B]">
            JPG, PNG or WebP, up to 5 MB.
          </span>
        </div>

        <input
          ref={inputRef}
          type="file"
          accept={IMAGE_ACCEPT}
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0];
            e.target.value = "";

            if (file) onPick(file);
          }}
        />
      </div>
    </div>
  );
};

const OfflineProductForm = () => {
  const { id = "" } = useParams();
  const isEdit = id !== "";
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const isMerchant = getOfflineScope() === "merchant";
  const keyCounter = useRef(1);
  const hydrated = useRef(false);

  const nextKey = () => keyCounter.current++;

  const {
    productDetail,
    fetchProductDetailLoading,
    fetchProductDetailError,
    createProductLoading,
    updateProductLoading,
  } = useAppSelector((state) => state.offlinePoints);

  const paramBusinessId = isMerchant ? "" : (params.get("businessId") ?? "");

  const [selectedBusinessId, setSelectedBusinessId] = useState(paramBusinessId);
  const [name, setName] = useState("");
  const [brand, setBrand] = useState("");
  const [registrationNumber, setRegistrationNumber] = useState("");
  const [manufacturer, setManufacturer] = useState("");
  const [countryOfOrigin, setCountryOfOrigin] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [specs, setSpecs] = useState<SpecRow[]>([]);
  const [variants, setVariants] = useState<VariantRow[]>([
    { key: 0, id: null, name: "Standard", sku: "", imageUrl: "", specs: [] },
  ]);
  const [uploadingTarget, setUploadingTarget] = useState<string | null>(null);

  const detail =
    productDetail && productDetail.id === id ? productDetail : null;

  const businessId = isMerchant
    ? ""
    : isEdit
      ? (detail?.businessId ?? paramBusinessId)
      : selectedBusinessId;
  const hasTarget = isMerchant || businessId !== "";
  const isSaving = createProductLoading || updateProductLoading;
  const isBusy = isSaving || uploadingTarget !== null;
  const listQuery = businessId ? `?businessId=${businessId}` : "";

  const loadDetail = () => {
    dispatch(fetchOfflineProductDetail({ id, businessId: paramBusinessId }));
  };

  useEffect(() => {
    if (isEdit) {
      loadDetail();
    }

    return () => {
      dispatch(clearProductDetail());
    };
  }, [dispatch, id]);

  useEffect(() => {
    if (!detail || hydrated.current) return;

    hydrated.current = true;
    setName(detail.name ?? "");
    setBrand(detail.brand ?? "");
    setRegistrationNumber(detail.registrationNumber ?? "");
    setManufacturer(detail.manufacturer ?? "");
    setCountryOfOrigin(detail.countryOfOrigin ?? "");
    setDescription(detail.description ?? "");
    setImageUrl(detail.imageUrl ?? "");
    setSpecs(
      (detail.specifications ?? []).map((spec) => ({
        key: nextKey(),
        label: spec.label,
        value: spec.value,
      })),
    );
    setVariants(
      (detail.variants ?? []).map((variant) => ({
        key: nextKey(),
        id: variant.id,
        name: variant.name,
        sku: variant.sku ?? "",
        imageUrl: variant.imageUrl ?? "",
        specs: (variant.specifications ?? []).map((spec) => ({
          key: nextKey(),
          label: spec.label,
          value: spec.value,
        })),
      })),
    );
  }, [detail]);

  const normalizedNames = variants.map((variant) =>
    variant.name.trim().toLowerCase(),
  );
  const hasEmptyVariantName = normalizedNames.some((value) => value === "");
  const hasDuplicateVariantName =
    new Set(normalizedNames).size !== normalizedNames.length;
  const variantsValid =
    variants.length >= 1 &&
    variants.length <= MAX_VARIANTS &&
    !hasEmptyVariantName &&
    !hasDuplicateVariantName;
  const canSubmit = hasTarget && name.trim() !== "" && variantsValid && !isBusy;

  const updateVariant = (key: number, patch: Partial<VariantRow>) => {
    setVariants((prev) =>
      prev.map((variant) =>
        variant.key === key ? { ...variant, ...patch } : variant,
      ),
    );
  };

  const addVariant = () => {
    setVariants((prev) => [
      ...prev,
      { key: nextKey(), id: null, name: "", sku: "", imageUrl: "", specs: [] },
    ]);
  };

  const removeVariant = (key: number) => {
    setVariants((prev) => prev.filter((variant) => variant.key !== key));
  };

  const uploadImage = async (
    file: File,
    target: string,
    apply: (url: string) => void,
  ) => {
    setUploadingTarget(target);

    const result = await dispatch(
      uploadOfflineProductImage({ file, businessId }),
    );

    setUploadingTarget(null);

    if (uploadOfflineProductImage.fulfilled.match(result)) {
      const url = result.payload?.url;

      if (url) apply(url);
    }
  };

  const cleanSpecs = (rows: SpecRow[]) =>
    rows
      .filter((row) => row.label.trim() !== "" && row.value.trim() !== "")
      .map((row) => ({ label: row.label.trim(), value: row.value.trim() }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!canSubmit) return;

    const body: OfflineProductBody = {
      businessId,
      name: name.trim(),
      brand: brand.trim(),
      description: description.trim(),
      imageUrl: imageUrl || null,
      manufacturer: manufacturer.trim(),
      countryOfOrigin: countryOfOrigin.trim(),
      registrationNumber: registrationNumber.trim(),
      specifications: cleanSpecs(specs),
      variants: variants.map((variant) => ({
        id: variant.id,
        name: variant.name.trim(),
        sku: variant.sku.trim(),
        imageUrl: variant.imageUrl || null,
        specifications: cleanSpecs(variant.specs),
      })),
    };

    const result = isEdit
      ? await dispatch(updateOfflineProduct({ ...body, id }))
      : await dispatch(createOfflineProduct(body));

    if (
      createOfflineProduct.fulfilled.match(result) ||
      updateOfflineProduct.fulfilled.match(result)
    ) {
      navigate(`/offline-points/products${listQuery}`, { replace: true });
    }
  };

  const showSkeleton = isEdit && !detail && fetchProductDetailLoading;
  const showError = isEdit && !detail && !fetchProductDetailLoading;

  return (
    <div className="flex flex-col gap-5 mt-2 pb-4">
      <div className="flex items-center gap-3">
        <button
          type="button"
          aria-label="Go back"
          onClick={() => navigate(`/offline-points/products${listQuery}`)}
          className="flex size-10 items-center justify-center rounded-xl border border-[#E2E8F0] bg-white text-primary-purple shadow-[0_1px_2px_rgba(15,23,42,0.04)] transition-colors hover:bg-[#F5F0FA]"
        >
          <FaArrowLeft size={14} />
        </button>
        <div>
          <h4 className="font-semibold text-[#0F172A]">
            {isEdit ? "Edit product" : "New product"}
          </h4>
          <p className="text-sm text-[#64748B]">Offline  Products</p>
        </div>
      </div>

      {showSkeleton && (
        <div className="flex flex-col gap-5">
          {[0, 1, 2].map((item) => (
            <div
              key={item}
              className="bg-white rounded-2xl border border-[#E2E8F0] p-6 flex flex-col gap-4 animate-pulse"
            >
              <div className="flex items-center gap-3">
                <div className="flex flex-col gap-2">
                  <div className="h-4 w-40 bg-[#E2E8F0] rounded" />
                  <div className="h-3 w-64 max-w-full bg-[#E2E8F0] rounded" />
                </div>
              </div>
              <div className="h-12 bg-[#E2E8F0] rounded-lg" />
              <div className="h-12 bg-[#E2E8F0] rounded-lg" />
            </div>
          ))}
        </div>
      )}

      {showError && (
        <div className="bg-white rounded-2xl border border-[#E2E8F0] p-8 text-center flex flex-col items-center gap-4">
          <span className="flex size-12 items-center justify-center rounded-full bg-[#FEF2F2] text-[#DC2626]">
            <FaCircleExclamation size={20} />
          </span>
          <p className="text-sm text-[#475569]">
            {fetchProductDetailError || "Unable to load this product."}
          </p>
          <button
            type="button"
            onClick={loadDetail}
            className={outlineButton}
          >
            Try again
          </button>
        </div>
      )}

      {!showSkeleton && !showError && (
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <section className={cardClass}>
            <SectionHeader
              title="Product details"
              description="Shown to anyone who scans a label for this product."
            />

            <div className="grid gap-5 md:grid-cols-2">
              {!isMerchant && !isEdit && (
                <div className="flex flex-col gap-1 md:col-span-2">
                  <label className={labelClass}>Merchant</label>
                  <MerchantSelect
                    value={selectedBusinessId}
                    onChange={setSelectedBusinessId}
                    disabled={isBusy}
                  />
                </div>
              )}

              <CustomTextInput
                id="name"
                label="Name"
                placeholder="Peak Milk"
                value={name}
                handleChange={(e) => setName(e.target.value)}
                focusBorderColor={FOCUS_COLOR}
                otherInputProps={{ disabled: isBusy }}
              />

              <CustomTextInput
                id="brand"
                label="Brand"
                placeholder="Peak"
                value={brand}
                handleChange={(e) => setBrand(e.target.value)}
                focusBorderColor={FOCUS_COLOR}
                otherInputProps={{ disabled: isBusy }}
              />

              <CustomTextInput
                id="registrationNumber"
                label="Reg. no (NAFDAC)"
                placeholder="01-2345"
                value={registrationNumber}
                handleChange={(e) => setRegistrationNumber(e.target.value)}
                focusBorderColor={FOCUS_COLOR}
                otherInputProps={{ disabled: isBusy }}
              />

              <CustomTextInput
                id="manufacturer"
                label="Manufacturer"
                placeholder="FrieslandCampina WAMCO"
                value={manufacturer}
                handleChange={(e) => setManufacturer(e.target.value)}
                focusBorderColor={FOCUS_COLOR}
                otherInputProps={{ disabled: isBusy }}
              />

              <CustomTextInput
                id="countryOfOrigin"
                label="Country of origin"
                placeholder="Nigeria"
                value={countryOfOrigin}
                handleChange={(e) => setCountryOfOrigin(e.target.value)}
                focusBorderColor={FOCUS_COLOR}
                otherInputProps={{ disabled: isBusy }}
              />

              <div className="md:col-span-2">
                <ImageField
                  label="Product image"
                  url={imageUrl}
                  isUploading={uploadingTarget === "product"}
                  disabled={!hasTarget || isSaving}
                  onPick={(file) => uploadImage(file, "product", setImageUrl)}
                  onClear={() => setImageUrl("")}
                />
              </div>

              <div className="flex flex-col gap-1 md:col-span-2">
                <label htmlFor="description" className={labelClass}>
                  Description
                </label>
                <textarea
                  id="description"
                  rows={3}
                  value={description}
                  disabled={isBusy}
                  onChange={(e) => setDescription(e.target.value)}
                  className={inputClass}
                />
              </div>
            </div>
          </section>

          <section className={cardClass}>
            <SectionHeader
              title="Details"
              description="Any label and value, such as Storage or Ingredients."
              aside={
                specs.length > 0 ? (
                  <span className="rounded-full bg-[#F1F5F9] px-2.5 py-1 text-xs font-medium text-[#475569]">
                    {specs.length}
                  </span>
                ) : null
              }
            />
            <SpecEditor
              rows={specs}
              disabled={isBusy}
              nextKey={nextKey}
              onChange={setSpecs}
            />
          </section>

          <section className={cardClass}>
            <SectionHeader
              title="Variants"
              description='Each size, flavour or pack. If it has no sizes, keep one variant called "Standard".'
              aside={
                <span className="rounded-full bg-[#F1F5F9] px-2.5 py-1 text-xs font-medium text-[#475569]">
                  {variants.length}/{MAX_VARIANTS}
                </span>
              }
            />

            <div className="flex flex-col gap-4">
              {variants.map((variant, index) => (
                <div
                  key={variant.key}
                  className="flex flex-col gap-5 rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] p-4 md:p-5"
                >
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2.5">
                      <span className="flex size-7 items-center justify-center rounded-full bg-[#4A148C] text-xs font-semibold text-white">
                        {index + 1}
                      </span>
                      <span className="text-sm font-semibold text-[#0F172A]">
                        {variant.name.trim() || `Variant ${index + 1}`}
                      </span>
                    </div>

                    <button
                      type="button"
                      disabled={variants.length === 1 || isBusy}
                      onClick={() => removeVariant(variant.key)}
                      className={`${iconButtonClass} h-9 gap-2 px-3 text-sm font-medium`}
                    >
                      <FaTrashCan size={13} />
                      Remove
                    </button>
                  </div>

                  <div className="grid items-start gap-4 md:grid-cols-2">
                    <CustomTextInput
                      id={`variant-name-${variant.key}`}
                      label="Variant name"
                      placeholder="400g tin"
                      value={variant.name}
                      handleChange={(e) =>
                        updateVariant(variant.key, { name: e.target.value })
                      }
                      focusBorderColor={FOCUS_COLOR}
                      otherInputProps={{ disabled: isBusy }}
                    />

                    <CustomTextInput
                      id={`variant-sku-${variant.key}`}
                      label="SKU (optional)"
                      placeholder="PK-400"
                      value={variant.sku}
                      handleChange={(e) =>
                        updateVariant(variant.key, { sku: e.target.value })
                      }
                      focusBorderColor={FOCUS_COLOR}
                      otherInputProps={{ disabled: isBusy }}
                    />
                  </div>

                  <ImageField
                    label="Variant image (replaces the product image on the scan page)"
                    url={variant.imageUrl}
                    isUploading={uploadingTarget === `variant-${variant.key}`}
                    disabled={!hasTarget || isSaving}
                    onPick={(file) =>
                      uploadImage(file, `variant-${variant.key}`, (url) =>
                        updateVariant(variant.key, { imageUrl: url }),
                      )
                    }
                    onClear={() => updateVariant(variant.key, { imageUrl: "" })}
                  />

                  <div className="flex flex-col gap-2">
                    <span className={labelClass}>Variant details</span>
                    <SpecEditor
                      rows={variant.specs}
                      disabled={isBusy}
                      nextKey={nextKey}
                      onChange={(rows) =>
                        updateVariant(variant.key, { specs: rows })
                      }
                    />
                  </div>
                </div>
              ))}

              {hasEmptyVariantName && (
                <p
                  role="alert"
                  className="flex items-center gap-2 text-xs text-[#B91C1C]"
                >
                  <FaCircleExclamation size={12} />
                  Every variant needs a name.
                </p>
              )}

              {hasDuplicateVariantName && (
                <p
                  role="alert"
                  className="flex items-center gap-2 text-xs text-[#B91C1C]"
                >
                  <FaCircleExclamation size={12} />
                  Variant names must be different.
                </p>
              )}

              <button
                type="button"
                disabled={variants.length >= MAX_VARIANTS || isBusy}
                onClick={addVariant}
                className={addButtonClass}
              >
                <FaPlus size={11} />
                Add variant
              </button>

              {isEdit && (
                <p className="text-xs text-[#64748B]">
                  Removing a variant here removes it from the product. Labels
                  already printed still show it.
                </p>
              )}
            </div>
          </section>

          <div className="sticky bottom-4 z-10 ml-auto flex w-fit items-center gap-2 rounded-2xl border border-[#E2E8F0] bg-white/95 p-2 shadow-[0_8px_24px_rgba(15,23,42,0.12)] backdrop-blur">
            <button
              type="button"
              disabled={isSaving}
              onClick={() => navigate(`/offline-points/products${listQuery}`)}
              className={outlineButton}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!canSubmit}
              className={primaryButton}
            >
              {isSaving && <FaSpinner className="animate-spin" />}
              {isSaving ? "Saving..." : "Save product"}
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default OfflineProductForm;