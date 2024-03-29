// components
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import React from "react";

// sections
import Hero from "./hero";
// import Comments from "./comments";
// import BlogPosts from "./blog-posts";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      {/* <Content /> */}
      {/* <Comments />
      <BlogPosts /> */}
      <Footer />
    </>
  );
}