import React from 'react';
import Image from 'next/image';

interface ProductBoxProps {
  id: number;
  name: string;
  description: string;
  price: number;
  image_url: string;
  category: "ceramics" | "fibers" | "home-goods" | "jewelery";
  user_id: number;
  onAddToCart?: () => void; // Add this property
}

const ProductBox: React.FC<ProductBoxProps> = ({
  name,
  description,
  price,
  image_url,
  category,
}) => {
  return (
    <div className="box">
      <figure className="image is-4by3">
        <Image src={image_url} alt={name} />
      </figure>
      <div className="content">
        <h3 className="title is-4">{name}</h3>
        <p className="subtitle is-6">{category}</p>
        <p>{description}</p>
        <p className="has-text-weight-bold">Price: ${price}</p>
      </div>
    </div>
  );
};

export default ProductBox;