import { redirect } from "next/navigation";

import { createClient } from "@/app/utils/supabase/server";

import Image from "next/image";
import getProfile from "@/actions/getProfile";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import Course from "@/components/Course";

import Link from "next/link";
import Collection from "@/components/Collection";
import { getOrganizedCourses } from "@/lib/actions/course.actions";

const ProfilePage = async () => {
  const supabase = createClient();

  const { data: sessionData, error: sessionError } =
    await supabase.auth.getUser();
  if (sessionError || !sessionData?.user) {
    redirect("/login2");
  }
  const memberSince = new Date(sessionData.user.created_at).toLocaleDateString(
    "en-US",
    {
      year: "numeric",
      month: "long",
      day: "numeric",
    }
  );

  let { data: user, error } = await supabase
    .from("users")
    .select("*")
    .eq("id", sessionData.user.id);

  const userOwnedCourses = await getOrganizedCourses({
    user: sessionData.user.id,
    query: "",
    limit: 3,
    page: 1,
  });

  const userTickets = await getOrganizedCourses({
    user: sessionData.user.id,
    query: "",
    limit: 3,
    page: 1,
  });

  //console.log((await userOwnedCourses).data, "userowned courses");
  return (
    <div className="min-h-screen grid px-2 text-offblack pt-[12vh]">
      <div className="pt-8 px-4">
        <h1 className="text-3xl font-extrabold">My Profile</h1>
        <div className="flex  gap-1 py-3">
          <Image
            width={50}
            className="rounded-3xl"
            height={50}
            src={"/drink.png"}
            alt={""}
          />
          <div className="flex px-4 flex-col">
            <span className="font-bold">{`${user && user[0].full_name}`}</span>
            <span className="text-gray-500">Member Since {memberSince}</span>
          </div>
        </div>
      </div>
      <hr />
      <div className="text-offblack p-4 gap-2 flex flex-col">
        <h2 className="font-extrabold">My Courses</h2>
        <Collection
          data={userOwnedCourses?.data}
          emptyTitle="No courses yet"
          emptyStateSubText="You have not created any courses yet."
          collectionType="Courses_Organized"
          limit={3}
          page={1}
          totalPages={2}
          urlParamName={undefined}
        />
        <hr />
        {/* <div className="aspect-square h-fit bg-white ">
          <Link href={`/courses/${courses[0].id}`}>
            <Course
              course={courses[0]}
              capacity={courses[0].capacity}
              rating={courses[0].capacity}
              title={courses[0].title}
            />
          </Link>
        </div> */}
      </div>
      <div className="text-offblack p-4 gap-2 flex flex-col">
        <h2 className="font-extrabold">My Tickets</h2>
        <Collection
          data={[]}
          emptyTitle="No tickets yet"
          emptyStateSubText="You have not signed up for any courses, check some out!"
          collectionType="Courses_Organized"
          limit={3}
          page={1}
          totalPages={2}
          urlParamName={undefined}
        />
      </div>
    </div>
  );
};

export default ProfilePage;
