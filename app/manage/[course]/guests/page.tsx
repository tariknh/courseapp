import { getCourseById } from "@/lib/actions/course.actions";
import { CourseTypes } from "@/types";

export default async function Page({
    params,
    ...props
  }: {
    params: Promise<{ course: number }>
  }) {
    await console.log(props, "nyeste")
    if(props){
        console.log(props)
    }
    const courseId = (await params).course
    const { data } = await getCourseById(courseId); // Extract 'data'

    const course = data as CourseTypes | null; // Explicitly assert the type
  
    if (!course) {
      return <div>Course not found</div>;
    }
    return <div>My Post: {course.id}</div>
  }