"use client";
import { CourseInfo } from "@/app/lib/definitions";
import { createClient } from "@/app/utils/supabase/client";
import useCourseModal from "@/hooks/useCourseModal";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import type { UploadFile } from "antd/es/upload/interface";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import { categories } from "./Categories";
import CategoryInput from "./CategoryInput";
import Heading from "./Heading";
import ImageWall from "./Inputs/Imagewall";
import { GMap } from "./Inputs/PlacesAutoComplete";
import Modal from "./Modal";
import { DatePicker } from "./ui/DatePicker";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";

enum STEPS {
  CATEGORY = 0,
  LOCATION = 1,
  INFO = 2,
  IMAGES = 3,
  PRICE = 4,
}

type StepConfig = {
  content: JSX.Element;
};

const CourseModal = () => {
  const [mysession, setMySession] = useState<any>(null);
  const supabaseClient = useSupabaseClient();
  const supabase = createClientComponentClient();
  const supabase2 = createClient();
  //console.log(supabase2, "SUPABASE2");
  //const { user } = useUser();

  useEffect(() => {
    supabase2.auth.getUser().then((response) => {
      const user = response.data.user;
      if (user) {
        console.log(user, "USERUSER");
        setMySession(user);
        console.log("mysession", mysession);
        console.log("mysession?.id", mysession?.id);
      } else {
        console.error("No user found:", response.error);
      }
    });

    return () => {};
  }, []);

  // const {
  //   data: { user },
  // } = supabase2.auth.getUser();
  //await console.log(user, "USER");
  const [inputErrors, setinputErrors] = useState<any>({});

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm<FieldValues>({
    defaultValues: {
      category: [],
      location: null,
      date: null,
      capacity: 0,
      imageSrc: null,
      price: 0,
      title: "",
      description: "",
      user: mysession?.id,
    },
  });

  const category = watch("category");
  const location = watch("location");
  const date = watch("date");
  const title = watch("title");
  const description = watch("description");
  const capacity = watch("capacity");
  const image = watch("imageSrc");
  const price = watch("price");

  const Map = useMemo(
    () =>
      dynamic(() => import("./Map"), {
        ssr: false,
      }),
    [location]
  );

  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });
  };

  const { onClose, isOpen } = useCourseModal();

  const [step, setStep] = useState(STEPS.CATEGORY);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const onBack = () => {
    setStep((value) => value - 1);
  };

  const verifyFields = (data: FieldValues) => {
    console.log(data);
    // Validate form fields
    // const validatedFields = CourseInfo.safeParse({
    //   title: data.title,
    //   description: data.description,
    //   date: data.date,
    //   capacity: data.capacity,
    //   category: data.category,
    // });

    let validatedFields;
    let pickedValidations;
    switch (step) {
      case STEPS.CATEGORY:
        pickedValidations = CourseInfo.pick({
          category: true,
        });
        validatedFields = pickedValidations.safeParse({
          category: data.category,
        });
        break;
      case STEPS.LOCATION:
        const { formatted_address } = data.location;
        pickedValidations = CourseInfo.pick({
          location: true,
        });
        validatedFields = pickedValidations.safeParse({
          location: formatted_address,
        });
        break;
      case STEPS.INFO:
        pickedValidations = CourseInfo.pick({
          title: true,
          description: true,
          date: true,
          capacity: true,
        });
        validatedFields = pickedValidations.safeParse({
          title: data.title,
          description: data.description,
          date: data.date,
          capacity: Number(data.capacity),
        });
        break;
      case STEPS.IMAGES:
        pickedValidations = CourseInfo.pick({
          imageSrc: true,
        });
        validatedFields = pickedValidations.safeParse({
          imageSrc: data.imageSrc,
        });
        break;
      case STEPS.PRICE:
        pickedValidations = CourseInfo.pick({
          price: true,
        });
        validatedFields = pickedValidations.safeParse({
          price: Number(data.price),
        });
        break;
    }

    // If any form fields are invalid, return early
    if (validatedFields && !validatedFields.success) {
      setinputErrors(validatedFields.error.flatten().fieldErrors);
      return {
        errors: validatedFields.error.flatten().fieldErrors,
      };
    }
  };

  const onNext = async (data: FieldValues) => {
    const validFields = await verifyFields(data);
    //let errors: any[] = [];

    if (!validFields?.errors) {
      setStep((value) => value + 1);
    } else {
      Object.entries(validFields.errors).forEach(([category, messages]) => {
        //console.log(`Errors for ${category}:`);
        //errors.push({ category, messages });

        messages.forEach((message) => {
          toast.error(message);
        });
      });
      console.log(inputErrors, "ERRRRRORS");

      return errors;
    }
  };

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    if (step !== STEPS.PRICE) {
      //returns input errors if any
      const errors = await onNext(data);
      //console.log(errors, "ERRRRRORS");

      //console.log(inputErrors, "ERRRRRORS");
      return errors;
    }
    const verify = await verifyFields(data);
    if (verify?.errors) {
      return console.log(verify);
    }

    setIsLoading(true);

    const imageFile = image.map(async (item: UploadFile) => {
      if (item.originFileObj) {
        const { data: imageData, error: imageError } = await supabase.storage
          .from("images")
          .upload(`${item.uid}`, item.originFileObj, {
            cacheControl: "3600",
            upsert: false,
          });
        if (imageError) {
          setIsLoading(false);
          return toast("Failed to upload images");
        }
      }
    });

    const { error } = await supabase.from("courses").insert({
      title: data?.title,
      description: data.description,
      price: data.price,
      capacity: data.capacity,
      date: data.date,
      category: data.category,
      location: data.location,
      imageSrc: data.imageSrc,
      user: mysession?.id,
    });
    if (error) {
      console.log(error);
    }
    router.refresh();
    toast("Course has been created.");

    setIsLoading(false);
    onClose();
  };

  const actionLabel = useMemo(() => {
    if (step === STEPS.PRICE) {
      return "Create";
    }
    return "Next";
  }, [step]);

  const secondaryActionLabel = useMemo(() => {
    if (step === STEPS.CATEGORY) {
      return undefined;
    }
    return "Back";
  }, [step]);

  const categoryPage = (
    <div className="flex flex-col gap-8">
      <Heading
        title="What fits your course the best?"
        subTitle="Choose one or more categories"
      />
      <div
        className="
      grid
      grid-cols-1
      md:grid-cols-2
      gap-3
      max-h-[50vh]
      overflow-y-auto
      mb-12
      "
      >
        {categories.map((item) => (
          <div key={item.name} className="col-span-1">
            <CategoryInput
              onClick={(category) => setCustomValue("category", category)}
              label={item.name}
              description={item.name}
              selected={category === item.name}
              icon={item.icon}
            />
          </div>
        ))}
      </div>
    </div>
  );

  const [previewImage, setPreviewImage] = useState("");
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewTitle, setPreviewTitle] = useState("");
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  useEffect(() => {
    setCustomValue("imageSrc", fileList);
  }, [fileList]);

  const [selectedPlace, setSelectedPlace] =
    useState<google.maps.places.PlaceResult | null>(null);

  const stepConfigs: Record<STEPS, StepConfig> = {
    [STEPS.CATEGORY]: {
      content: (
        <div className="flex flex-col gap-8">
          <Heading
            title="What fits your course the best?"
            subTitle="Choose one or more categories"
          />
          <div
            className="
          grid
          grid-cols-1
          md:grid-cols-2
          gap-3
          max-h-[50vh]
          overflow-y-auto
          mb-12
          "
          >
            {categories.map((item) => (
              <div key={item.name} className="col-span-1">
                <CategoryInput
                  onClick={(category) => setCustomValue("category", category)}
                  label={item.name}
                  description={"Description"}
                  selected={category === item.name}
                  icon={item.icon}
                />
              </div>
            ))}
          </div>
        </div>
      ),
    },
    [STEPS.LOCATION]: {
      content: (
        <div className="flex flex-col gap-8 mb-12">
          <Heading
            title="Where about are you having the course?"
            subTitle="Let people know!"
          />
          {/* <Input
            onChange={(e) => setCustomValue("location", e.target.value)}
            value={location}
            id="location"
          /> */}
          <GMap
            value={location}
            onChange={(value: any) => setCustomValue("location", value)}
          />

          {/* <PlacesAutoComplete /> */}
          {/* <Map center={location?.latlng} /> */}
        </div>
      ),
    },
    [STEPS.INFO]: {
      content: (
        <div className="flex flex-col gap-8">
          <Heading
            title="Tell us more about your course"
            subTitle="Start and end date, capacity"
          />
          <div
            className="
          grid
          grid-cols-1
          gap-3
          max-h-[50vh]
          mb-12
          "
          >
            <div>
              <Label htmlFor="title">Title</Label>
              <Input
                onChange={(e) => setCustomValue("title", e.target.value)}
                value={title}
                id="title"
              />
              <span className="text-destructive">{inputErrors?.title}</span>
            </div>
            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                onChange={(e) => setCustomValue("description", e.target.value)}
                minLength={10}
                maxLength={600}
                placeholder="Tell people what the course will be about, what they can learn and more..."
                value={description}
              />
              <span className="text-destructive">
                {inputErrors?.description}
              </span>
            </div>
            <div>
              <Label htmlFor="date">Choose the length of your course</Label>
              <DatePicker
                id="date"
                value={date}
                onChange={(value) => setCustomValue("date", value)}
                disabled={(date) => date < new Date()}
              />
              <span className="text-destructive">{inputErrors?.date}</span>
            </div>
            <div>
              <Label htmlFor="date">Max amount of people?</Label>
              <Input
                min={2}
                max={10000}
                type="number"
                value={capacity}
                onChange={(e) => setCustomValue("capacity", e.target.value)}
              />
              <span className="text-destructive">{inputErrors?.capacity}</span>
            </div>
          </div>
        </div>
      ),
    },
    [STEPS.IMAGES]: {
      content: (
        <div className="flex flex-col gap-8">
          <Heading
            title="Add some images"
            subTitle="Show people what your course looks like"
          />
          <div
            className="
          grid
          grid-cols-1
          gap-3
          max-h-[50vh]
          overflow-y-auto
          mb-12
          "
          >
            <div className="grid w-full  items-center gap-1.5">
              <ImageWall
                previewImage={previewImage}
                setPreviewImage={setPreviewImage}
                previewOpen={previewOpen}
                setPreviewOpen={setPreviewOpen}
                previewTitle={previewTitle}
                setPreviewTitle={setPreviewTitle}
                fileList={fileList}
                setFileList={setFileList}
                onChange={(value) => setCustomValue("imageSrc", value)}
              />
            </div>
          </div>
        </div>
      ),
    },
    [STEPS.PRICE]: {
      content: (
        <div className="flex flex-col gap-8">
          <Heading title="How much is a ticket?" subTitle="Let people know!" />
          <div
            className="
          grid
          grid-cols-1
          gap-3
          max-h-[50vh]
          mb-12
          "
          >
            <Label htmlFor="price">Price</Label>
            <Input
              id="price"
              placeholder="Ticket Price"
              name="Price"
              disabled={isLoading}
              required
              type="number"
              value={price}
              onChange={(e) => setCustomValue("price", e.target.value)}
            />
          </div>
        </div>
      ),
    },
  };

  let bodyContent = stepConfigs[step];
  return (
    <Modal
      isOpen={isOpen}
      title="List your course"
      description=""
      onChange={() => {}}
      actionLabel={actionLabel}
      secondaryAction={step === STEPS.CATEGORY ? undefined : onBack}
      secondaryActionLabel={secondaryActionLabel}
      onSubmit={handleSubmit(onSubmit)}
      onClose={onClose}
    >
      {bodyContent.content}
    </Modal>
  );
};

export default CourseModal;
