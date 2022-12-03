import Link from "next/link";

export default function SecondPost() {
  return (
    <>
      <h1>
        Second Post. Go to <Link href={"/test-page/page1"}>First Post</Link>
      </h1>
      <h2>
        <Link href="/">Back to home</Link>
      </h2>
    </>
  );
}
