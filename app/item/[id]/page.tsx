import AddToCartButton from "@/app/components/cards/addToCartButton";
import { products } from "@/app/constants/products";
import Image from "next/image";

interface ItemPageProps {
  params: Promise<{ id: string }>;
}

const ItemPage = async ({ params }: ItemPageProps) => {
  const { id } = await params;
  const item = products.find((p) => p.id === Number(id));

  if (!item) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-2xl text-gray-500">Product not found.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[url('/hero-bcg.jpeg')] bg-center bg-cover flex items-center justify-center px-6 py-16">
      <div className="bg-stone-200/90 max-w-7xl w-full flex flex-col min-[768px]:flex-row gap-16 items-center p-6">
        {/* Image */}
        <div className="w-full min-[768px]:w-1/2">
          <Image
            src={item.Image}
            alt={item.title}
            width={600}
            height={600}
            className="w-full h-auto object-cover"
          />
        </div>

        {/* Details */}
        <div className="w-full min-[768px]:w-1/2 flex flex-col gap-5">
          {/* Breadcrumb */}
          <p className="text-xs uppercase tracking-widest text-stone-800">
            Collections &nbsp;›&nbsp;{" "}
            <span className="font-bold text-stone-800">Furniture</span>
          </p>

          {/* Title */}
          <h1 className="text-5xl font-bold text-stone-800 leading-tight">
            {item.title}
          </h1>

          {/* Price */}
          <p className="text-2xl font-semibold text-[#F09D51]">
            TK {item.price.toLocaleString()}
          </p>

          {/* Divider */}
          <div className="w-10 h-px bg-gray-300" />

          {/* Description */}
          <p className="text-[15px] text-stone-800 leading-relaxed">
            {item.description}
          </p>

          {/* Availability */}
          <div className="flex items-center gap-3 border border-black rounded-full px-4 py-2 w-fit">
            <div className="w-5 h-5 rounded-full border-2 border-teal-400 flex items-center justify-center">
              <div className="w-2 h-2 rounded-full bg-teal-400" />
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-widest text-stone-800">
                Availability
              </p>
              <p className="text-sm font-bold text-stone-800">In Stock</p>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex flex-col gap-3 mt-2">
            <AddToCartButton item={item} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemPage;
