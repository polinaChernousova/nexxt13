import { Metadata } from "next";
import React from "react";

type Props = {
  params: {
    id: string;
  };
};

async function getOnePost(id: string) {
  const reaponse = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${id}`,
    {
      next: {
        revalidate: 60,
      },
    }
  );
  return reaponse.json();
}

export async function generateMetadata({
  params: { id },
}: Props): Promise<Metadata> {
  const post = await getOnePost(id);

  return {
    title: post.title,
  };
}

const Post = async ({ params: { id } }: Props) => {
  const post = await getOnePost(id);
  return (
    <>
      <h1>Заголовок: {post.title}</h1>
      <h1>{post.id}</h1>
    </>
  );
};

export default Post;
