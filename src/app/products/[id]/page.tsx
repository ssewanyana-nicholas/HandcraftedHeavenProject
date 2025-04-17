import { getProductById } from "@app/services/productsService";
import { getReviewsByProductId } from "@app/services/reviewsService";
import { getProductIdsByUserId } from "@app/services/productsService"; // Import the function to check product ownership
import Navbar from "@app/components/Navbar";
import Footer from "@app/components/Footer";
import ReviewForm from "./ReviewForm"; // Import the client component
import { cookies } from "next/headers"; // Import cookies for server-side cookie access
import jwt from "jsonwebtoken"; // Import jsonwebtoken for decoding and verifying JWT
import { Row } from "postgres";
<<<<<<< HEAD
import Image from 'next/image';
=======
import EditButton from "@app/components/EditButton"; // Import the EditButton component
>>>>>>> f598412ddc46164554d3dc5b20f22126a1b2c7a8

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const data = await params
  const id= data.id // Access `params.id` directly as a string

  try {
    const product = await getProductById(Number(id));
    const reviews = await getReviewsByProductId(Number(id));

    if (!product) {
      return (
        <div className="product-page">
          <Navbar />
          <section className="section">
            <div className="container has-text-centered">
              <h1 className="title is-4">Product not found</h1>
              <p className="is-size-6">The product you are looking for does not exist.</p>
            </div>
          </section>
          <Footer />
        </div>
      );
    }

    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    let isOwner = false;

    if (token) {
      try {
        const decodedToken = jwt.decode(token) as { id: number };
        const userId = decodedToken.id;

        const userProductIds = await getProductIdsByUserId(userId);
        for (const productId of userProductIds) {
          if (productId === product.id) {
            isOwner = true;
            break;
          }
        }
        console.log("User ID:", userId);
        console.log("Product IDs owned by user:", userProductIds);
        console.log("Is owner:", isOwner);
      } catch (error) {
        console.error("Invalid or expired token:", error);
      }
    }

    return (
      <div className="product-page">
        <Navbar />
        <section className="section">
          <div className="container">
            {/* Product Details */}
            <div className="columns is-centered is-vcentered">
              <div className="column is-half has-text-centered">
                <figure
                  className="image is-inline-block"
                  style={{
                    maxWidth: "250px",
                    maxHeight: "250px",
                    borderRadius: "8px",
                    overflow: "hidden",
                  }}
                >
                  <Image src={product.image_url} alt={product.name} />
                </figure>
                <p className="is-size-7 mt-4 has-text-centered">{product.description}</p>
              </div>
              <div className="column is-half has-text-centered">
                <div className="box" style={{ padding: "20px" }}>
                  <h1 className="title is-4 has-text-centered">{product.name}</h1>
                  <p className="subtitle is-6 has-text-weight-bold has-text-primary has-text-centered">
                    ${product.price}
                  </p>
                </div>
              </div>
            </div>

            {/* Reviews Section */}
            <div className="section">
              <h2 className="title is-4 has-text-centered">Reviews</h2>
              <div className="columns is-centered">
                {reviews.length > 0 ? (
                  reviews.slice(0, 3).map((review: Row) => (
                    <div
                      key={review.id}
                      className={`column is-one-third has-text-centered`}
                      style={{
                        maxHeight: "400px",
                        overflow: "hidden",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                        border: "1px solid #ddd",
                        borderRadius: "8px",
                        padding: "20px",
                        margin: "10px",
                      }}
                    >
                      <p className="has-text-weight-bold">{review.username}</p>
                      <p className="is-size-7">{`"${review.description}"`}</p>
                    </div>
                  ))
                ) : (
                  <p className="has-text-centered">No reviews yet. Be the first to review this product!</p>
                )}
              </div>
              <ReviewForm productId={Number(id)} />
            </div>

            {/* Edit Button */}
            {isOwner && <EditButton productId={id} />}
          </div>
        </section>
        <Footer />
      </div>
    );
  } catch (error) {
    console.error("Error fetching product or reviews:", error);
    return (
      <div className="product-page">
        <Navbar />
        <section className="section">
          <div className="container has-text-centered">
            <h1 className="title is-4">Error</h1>
            <p className="is-size-6">There was an error fetching the product details or reviews. Please try again later.</p>
          </div>
        </section>
        <Footer />
      </div>
    );
  }
}