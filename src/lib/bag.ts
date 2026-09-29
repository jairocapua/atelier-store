"use server";

import { getProduct } from "./catalog";

export type AddToBagState = {
  status: "idle" | "success" | "error";
  message: string;
};

export async function addToBag(
  _previous: AddToBagState,
  formData: FormData,
): Promise<AddToBagState> {
  const product = getProduct(String(formData.get("product") ?? ""));
  const size = String(formData.get("size") ?? "");

  if (!product) {
    return { status: "error", message: "This product is no longer available." };
  }
  if (!size) {
    return { status: "error", message: "Select a size." };
  }

  const variant = product.variants.find((candidate) => candidate.size === size);
  if (!variant || variant.stock <= 0) {
    return { status: "error", message: `Size ${size} is sold out. Choose another size.` };
  }

  // Stock is checked against the catalogue, but there is no bag to add to
  // yet: persist the line (session or user) here once a cart exists.
  return { status: "success", message: `Added to your bag: ${product.name}, ${size}.` };
}
