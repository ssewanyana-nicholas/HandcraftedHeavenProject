"use client";

import { useRouter } from "next/navigation";

export default function EditButton({ productId }: { productId: string }) {
  const router = useRouter();

  const handleEditClick = () => {
    router.push(`/products/${productId}/edit`);
  };

  return (
    <div className="has-text-centered mt-4">
      <button className="button is-primary" onClick={handleEditClick}>
        Edit Product
      </button>
    </div>
  );
}