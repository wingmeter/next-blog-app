// import { IBlogPost, IBlogPostFields } from "contentful";
import { Box } from "@chakra-ui/layout";
import { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import { Container } from "@chakra-ui/react";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { useRouter } from "next/router";
import React from "react";
import client from "../../../contentful-ts/index";

const Posts = ({ posts }: { posts: any }) => {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>{posts.fields.title}</title>
      </Head>
      <main>
        <div className="bg">
          <Container centerContent>
            <Box pt={10} pb={10} textAlign="center" fontSize={36} color="white">
              <h1>{posts.fields.title}</h1>
            </Box>
          </Container>
        </div>
        <Container maxW="650px" mt={5}>
          <button
            type="button"
            className="go-back"
            onClick={() => router.back()}
          >
            Click here to go back
          </button>
        </Container>

        <Container mt={8} fontSize="20px">
          <div>{documentToReactComponents(posts.fields.content)}</div>
        </Container>
      </main>

      <hr className="post_hr" />

      <footer className="post_footer">
        <div className="post-footer-container">
          <p className="footer-text">Copyright © All Rights Reserved</p>
        </div>
      </footer>
    </>
  );
};

export default Posts;

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = await client.getEntries({
    content_type: "blogPost",
  });

  return {
    paths: posts.items.map((item: any) => {
      return {
        params: {
          posts: item.fields.slug,
        },
      };
    }),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params!.post;

  const posts = await client.getEntries({
    content_type: "blogPost",
    limit: 1,
    "fields.slug": slug,
  });

  const [postData] = posts.items;

  return {
    props: { posts: postData },
  };
};
