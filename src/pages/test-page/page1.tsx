import Link from "next/link";
import Image from "next/image";
import Head from "next/head";

export default function FirstPost() {
  // document.documentElement.style.setProperty('--background', 'white');
  return (
    <>
      <Head>
        <title>First Post</title>
      </Head>
      <h1>
        First Post. Go to <Link href={"/test-page/page2"}>Second Post</Link>
      </h1>
      <Image
        src="/images/profile.jpg" // Route of the image file
        height={144} // Desired size with correct aspect ratio
        width={144} // Desired size with correct aspect ratio
        alt="Your Name"
      />
      <br />
      <h2>
        <Link href="/">Back to home</Link>
      </h2>
    </>
  );
}
