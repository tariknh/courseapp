import Link from "next/link";
import Image from "next/image";

const Course: React.FC  = ({
    post
}:any) => {
  console.log(post)
  return (
    <main className="w-full flex min-h-screen flex-col items-left justify-start p-8 md:p-24 ">
      <article className="min-h-screen large:mt-12">
        <h1>test</h1>
      </article>
    </main>
  );
};

export default Course;
