// lib/getBlogById.ts
import { unstable_noStore as noStore } from "next/cache";
import { wixClient } from "../client";

export const getBlogById = async (postId: string) => {
  noStore();

  const post = await wixClient.posts.getPost(postId, {
    fieldsets: ["RICH_CONTENT"] as any,
  } as any);

  return post;
};
