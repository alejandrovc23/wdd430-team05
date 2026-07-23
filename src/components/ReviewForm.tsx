"use client";

import { useState } from "react";

interface ReviewFormProps {
  productId: string;
}

export default function ReviewForm({
  productId,
}: ReviewFormProps) {
  const [name, setName] = useState("");
  const [rating, setRating] = useState("5");
  const [comment, setComment] = useState("");

  function handleSubmit(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    console.log({
      productId,
      name,
      rating,
      comment,
    });

    alert(
      "Thank you for your review! It will be available after approval."
    );

    setName("");
    setRating("5");
    setComment("");
  }

  return (
    <form
      className="review-form"
      onSubmit={handleSubmit}
      aria-labelledby="review-form-title"
    >
      <h3 id="review-form-title">
        Leave a review
      </h3>

      <label htmlFor="review-name">
        Your name
      </label>

      <input
        id="review-name"
        type="text"
        value={name}
        onChange={(event) =>
          setName(event.target.value)
        }
        placeholder="Enter your name"
        required
      />

      <label htmlFor="review-rating">
        Rating
      </label>

      <select
        id="review-rating"
        value={rating}
        onChange={(event) =>
          setRating(event.target.value)
        }
      >
        <option value="5">
          5 Stars
        </option>
        <option value="4">
          4 Stars
        </option>
        <option value="3">
          3 Stars
        </option>
        <option value="2">
          2 Stars
        </option>
        <option value="1">
          1 Star
        </option>
      </select>

      <label htmlFor="review-comment">
        Your review
      </label>

      <textarea
        id="review-comment"
        value={comment}
        onChange={(event) =>
          setComment(event.target.value)
        }
        placeholder="Share your experience with this product..."
        required
      />

      <button
        type="submit"
        className="button button--primary"
      >
        Submit review
      </button>
    </form>
  );
}