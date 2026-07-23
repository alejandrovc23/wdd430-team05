import Image from "next/image";
import type { Seller } from "../types/catalog";

interface SellerProfileProps {
  seller: Seller;
}

export default function SellerProfile({
  seller,
}: SellerProfileProps) {
  return (
    <article className="seller-profile">
      <div className="seller-profile__image">
        <Image
          src={seller.image}
          alt={seller.imageAlt}
          width={600}
          height={450}
        />
      </div>

      <div className="seller-profile__content">
        <p className="eyebrow">
          Artisan Profile
        </p>

        <h2>
          {seller.businessName}
        </h2>

        <p>
          {seller.story}
        </p>

        <div className="seller-profile__details">
          <p>
            <strong>Craftsmanship:</strong>
            <br />
            Handmade creations inspired by skill,
            creativity, and tradition.
          </p>

          <p>
            <strong>Products:</strong>
            <br />
            View this artisan&apos;s handcrafted
            collection.
          </p>
        </div>
      </div>
    </article>
  );
}