import allPostUrl from "../services/post";
import Image from "next/image";
import Link from "next/link";
import NavBar from "../components/navbar";
import Banner from "../components/title-img";
import Footer from "../components/footer";
import ImgGallery from "../components/image-gallery";

export default ({ posts }) => {
  return (
    <>
      <NavBar />
      <br />
      <br />

      <Banner />
      <ImgGallery />
      <br />
      <ul>
        <div className="basic-grid">
          {posts.posts.map((post) => (
            <li key={post.id}>
              {/* dynamic routing to make slug easily avalible */}
              {/* {   post.primary_tag ?  post.primary_tag : "name: none"} */}
              {/* {post.primary_tag && console.log(post.primary_tag.name)} */}

              <Link
                href={`/post/${post.slug}`}
                as={`/post/${encodeURIComponent(post.slug)}`}
                className="post-card"
              >
                <a>
                  <>
                    <div className="card">
                      <div className="card-header">
                        <Image
                          src={post.feature_image}
                          width={480}
                          height={320}
                          quality="25"
                        />
                      </div>
                      <div className="card-body">
                        {post.primary_tag && (
                          <span className="tag tag-teal">
                            {post.primary_tag.name}
                          </span>
                        )}
                        <h4>{post.title}</h4>
                        <p>{post.slug}</p>
                        <div className="card-user">
                          <Image
                            src={post.primary_author.profile_image}
                            alt={post.primary_author.name}
                            width={50}
                            height={50}
                            className="author-profile"
                          />{" "}
                          <div className="user-info">
                            <h5>{post.primary_author.name}</h5>
                            <small>{post.reading_time} minutes read</small>
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                </a>
              </Link>
            </li>
          ))}
        </div>
      </ul>
      <Footer />
    </>
  );
};

// This function gets called at build time on server-side.
export async function getStaticProps() {
  const res = await fetch(allPostUrl);
  const posts = await res.json();

  // will receive `posts` as a prop at build time
  return {
    props: {
      posts,
      revalidate: 60 * 60, // In seconds
    },
  };
}
