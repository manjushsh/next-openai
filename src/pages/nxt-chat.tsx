import type { NextPage } from "next";
import { useRouter } from "next/router";
import Chat from "./chat";

const NextChat: NextPage = () => {
  const { query }: any = useRouter();

  return (
    <div>
      <main>
        <Chat model={query?.engine} />
      </main>
    </div>
  );
};

export default NextChat;
