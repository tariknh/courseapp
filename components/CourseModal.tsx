"use client";
import { useEffect, useMemo, useState } from "react";
import Modal from "./Modal";
import useCourseModal from "@/hooks/useCourseModal";
import Heading from "./Heading";
import { categories } from "./Categories";
import Image from "next/image";
import CategoryInput from "./CategoryInput";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import CountrySelect from "./Inputs/CountrySelect";
import dynamic from "next/dynamic";
import { DatePicker } from "./ui/DatePicker";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";
import ImageUpload from "./Inputs/ImageUpload";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useUser } from "@/hooks/useUser";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import ImageWall from "./Inputs/Imagewall";
import type { UploadFile } from "antd/es/upload/interface";
import toast from "react-hot-toast";

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
  const supabaseClient = useSupabaseClient();
  const supabase = createClientComponentClient();
  const { user } = useUser();

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
      price: 1,
      title: "",
      description: "",
    },
  });

  const category = watch("category");
  const location = watch("location");
  const date = watch("date");
  const title = watch("title");
  const description = watch("description");
  const capacity = watch("capacity");
  const image = watch("imageSrc");

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

  const onBack = () => {
    setStep((value) => value - 1);
  };

  const onNext = () => {
    setStep((value) => value + 1);
  };

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    if (step !== STEPS.PRICE) {
      return onNext();
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
          return toast.error("Failed to upload image");
        }
      }
    });

    console.log(imageFile);

    const { error: supabaseError } = await supabase.from("courses").insert({
      title: data.title,
      description: data.description,
      price: data.price,
      capacity: data.capacity,
      date: data.date,
      category: data.category,
      location: data.location,
      imageSrc: data.imageSrc,
      user: user?.id,
    });

    setIsLoading(false);
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
          <div key={item.label} className="col-span-1">
            <CategoryInput
              onClick={(category) => setCustomValue("category", category)}
              label={item.label}
              description={item.description}
              selected={category === item.label}
              icon={<item.icon />}
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
              <div key={item.label} className="col-span-1">
                <CategoryInput
                  onClick={(category) => setCustomValue("category", category)}
                  label={item.label}
                  description={item.description}
                  selected={category === item.label}
                  icon={<item.icon />}
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
          <CountrySelect
            onChange={(value) => setCustomValue("location", value)}
            value={location}
          />
          <Map center={location?.latlng} />
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
            </div>
            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                onChange={(e) => setCustomValue("description", e.target.value)}
                minLength={10}
                maxLength={250}
                placeholder="Tell people what the course will be about, what they can learn and more..."
                value={description}
              />
            </div>
            <div>
              <Label htmlFor="date">Choose the length of your course</Label>
              <DatePicker
                id="date"
                value={date}
                onChange={(value) => setCustomValue("date", value)}
              />
            </div>
            <div>
              <Label htmlFor="date">Max amount of people?</Label>
              <Input
                type="number"
                value={capacity}
                onChange={(e) => setCustomValue("capacity", e.target.value)}
              />
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
              placeholder="price"
              name="Price"
              disabled={isLoading}
              required
              type="number"
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
