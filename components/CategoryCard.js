import Image from "next/image";
import Link from "next/link";

export default function CategoryCard({ category }) {
  return (
    <li className="category-card">
      <article>
        <div className="category-card__image-wrap">
          <Image
            className="category-card__image"
            src={category.image}
            alt={category.imageAlt}
            width={800}
            height={600}
          />
        </div>
        <div className="category-card__content">
          <h3>{category.name}</h3>
          <p>{category.description}</p>
          <Link className="text-link" href="#featured-products">
            View featured pieces
            <span className="sr-only"> in {category.name}</span>
            <span aria-hidden="true"> →</span>
          </Link>
        </div>
      </article>
    </li>
  );
}
