import { StarFilledIcon } from "@radix-ui/react-icons"
import { StarIcon } from "lucide-react"
import { AiFillContacts} from "react-icons/ai"

interface CourseProps {
    title: string
    rating: string
    capacity: string
    post:any
  }

const AllCourses: React.FC<CourseProps>  = ({
    title,
    rating,
    capacity,
    post,
}) => {
    let stars = [1,1,1,1,1]
    const starAmount = +rating
    for (let index = 0; index < starAmount; index++) {
        
    }
  return (
    <div className=" grid-rows-6 grid grid-cols-1 justify-center  aspect-[16/10] h-60 mt-4">
          <div className="
            bg-slate-200
            h-40
            row-span-4
          ">
          </div>
          <div className="flex flex-col gap-2 mt-2">

          <h2 className="font-semibold">
            {title}
          </h2>
          <div className="flex gap-1 items-center">
            <AiFillContacts/>
            <span className="text-slate-600">{capacity}</span>
            <div className="flex ml-2">
            {
                stars.map((star)=>(
                    <StarFilledIcon key={star}/>
                ))
            }
            </div>
          </div>
          
          </div>
    </div>
  )
}

export default AllCourses