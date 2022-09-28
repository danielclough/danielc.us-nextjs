import Image from "next/image";
import useSWR from "swr";

//Write a fetcher function to wrap the native fetch function and return the result of a call to url in json format
const fetcher = (url) => fetch(url).then((res) => res.json());

export default function Index() {
  //There are 3 possible states: (1) loading when data is null (2) ready when the data is returned (3) error when there was an error fetching the data
  const { data, error } = useSWR("/api/data", fetcher);

  //Handle the error state
  if (error) return <div>Failed to load</div>;
  //Handle the loading state
  if (!data) return <div>Loading...</div>;

  return (
    <div className="imggallery">
      {data.map((image, index) => {
        const { src, height, width } = image.default;
        // make filename from _next directory src
        const fileName = src.split("/").pop().split(".");
        const file = `/images/${fileName[0]}.${fileName[2]}`;
        return (
          <div key={src}>
            <div className="img">
              <div className="overlay"></div>
            </div>
            <style jsx>{`
              .img {
                background-image: url(${file});
                height: 20vh;
                aspect-ratio: ${width} / ${height};
                background-position: center;
                background-size: cover;
                background-repeat: no-repeat;
              }
              .overlay {
                width: 100%;
                height: 100%;
                background-image: url("/DCPwatermark.png");
                background-size: contain;
                mix-blend-mode: overlay;
              }
            `}</style>
          </div>
        );
      })}
    </div>
  );
}
