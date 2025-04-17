import { getAllProducts } from "@app/services/productsService";
import Image from 'next/image';

export default async function Features() {
  const products = await getAllProducts();

  // Shuffle the products array
  const shuffledProducts = products.sort(() => Math.random() - 0.5);

  return (
    <section className="section">
      <div className="container">
        <h2 className="title">Featured Products</h2>
        <div className="columns is-multiline">
          {shuffledProducts.slice(0, 3).map((product) => (
            <div key={product.id} className="column is-one-third">
              <div className="box">
                <figure className="image is-4by3">
                  <Image src={product.image_url} alt={product.name} />
                </figure>
                <h3 className="title is-4">{product.name}</h3>
                <p>{product.description}</p>
                <p className="has-text-weight-bold">Price: ${product.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}