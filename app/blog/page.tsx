import Link from "next/link";
import React from "react";

// ! так как  у некста есть кэш данных, то они подргрузились один раз и остались здесь

async function getData() {
  const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
    // todo и чтобы данные были актульные можно указать revalidate и они будут кэшироваться каждую минуту
    next: {
      revalidate: 60,
    },
  });
  if (!response.ok) throw new Error("Unable to fetch posts!");
  return response.json();
}

const Blog = async () => {
  const posts = await getData();

  return (
    <>
      <h1>Blog Page</h1>
      <ul>
        {posts.map((post: any) => (
          <li key={post.id}>
            <Link href={`/blog/${post.id}`}>{post.title}</Link>
          </li>
        ))}
      </ul>
    </>
  );
};

export default Blog;
