"use client";
import Image from "next/image";
import { useCart } from "@/context/CartContext";
import { useProducts } from "@/context/ProductsContext";
import Link from "next/link";

function Promo() {
  const { addToCart, setCartOpen } = useCart();
  const { firstProduct }: any = useProducts();

  const promoProduct = firstProduct
    ? {
        id: firstProduct.id,
        name: firstProduct.name,
        price: firstProduct.price ?? 5999,
        discountedPrice: firstProduct.discountedPrice ?? 2999,
        image: firstProduct.images?.[0] ?? "/images/product-lumi-secondary.png",
      }
    : {
        id: "promo-lumi",
        name: "Lumi Promo",
        price: 5999,
        discountedPrice: 2999,
        image: "/images/product-lumi-secondary.png",
      };

  return (
    <div className="fixed z-10 w-full bottom-10 px-6 flex">
      <div className="lg:w-350 w-[90vw] bg-sky-blue flex mx-auto h-16 rounded-2xl  items-center p-0 lg:px-2 text-white font-bold">
        <div className="hidden lg:flex absolute bottom-0 items-center gap-4">
          <Link href={firstProduct?.id ? `/product/${firstProduct.id}` : ""}>
            <Image
              src="/images/product-lumi-secondary.png"
              alt="Lumi"
              width={400}
              height={400}
              className="w-30 lg:w-40 h-30 lg:h-40 object-contain"
            />
          </Link>
        </div>
        <div className="flex items-center justify-between w-full px-2 sm:px-10 lg:px-45">
          <h3 className="text-[24px] lg:text-[40px] h-4 lg:h-9 ml-0 lg:ml-4 ">
            LUMI{" "}
            <span className="hidden sm:inline text-[20px] lg:text-[34px] line-through decoration-tangerine ml-10">
              &nbsp;Rs {firstProduct?.price ?? 5999}&nbsp;
            </span>{" "}
            <span className="text-[24px] hidden sm:inline lg:text-[40px] ml-5">
              Rs {firstProduct?.discountedPrice ?? 2999}
            </span>
          </h3>
          <div className="block sm:hidden font-heading h-6">
            <p className="text-[18px] line-through decoration-tangerine leading-1">
              &nbsp;Rs {firstProduct?.price ?? 5999}&nbsp;
            </p>{" "}
            <p className="text-[24px]">Rs {firstProduct?.discountedPrice ?? 2999}</p>
          </div>
          <button
            aria-label={`Pre-order ${promoProduct.name} for Rs ${promoProduct.discountedPrice}`}
            className="my-auto  font-heading rounded-xl button-secondary whitespace-nowrap px-3 pb-1.5 pt-3 lg:pb-0.5 lg:pt-2 lg:px-10 lg:text-[24px] "
            onClick={() => {
              addToCart(promoProduct as any);
              setCartOpen(true);
            }}
          >
            PRE-ORDER
          </button>
        </div>
      </div>
    </div>
  );
}

export default Promo;
