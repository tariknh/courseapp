"use client";
import { useEffect, useMemo, useState } from "react";
import Modal from "./Modal";
import useCourseModal from "@/hooks/useCourseModal";
import Heading from "./Heading";
import { categories } from "./Categories";
import Image from "next/image";
import CategoryInput from "./CategoryInput";
import { FieldValues, useForm } from "react-hook-form";
import CountrySelect from "./Inputs/CountrySelect";
import Map from "./Map";

enum STEPS {
  CATEGORY = 0,
  LOCATION = 1,
  INFO = 2,
  IMAGES = 3,
  DESCRIPTION = 4,
  PRICE = 5,
}

type StepConfig = {
  content: JSX.Element;
};

const CourseModal = () => {
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
      capacity: 0,
      imageSrc: "",
      price: 1,
      title: "",
      description: "",
    },
  });

  const category = watch("category");
  const location = watch("location");
  useEffect(() => {
    console.log(category);
  }, [category]);

  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });
  };

  const { onClose, isOpen } = useCourseModal();

  const [step, setStep] = useState(STEPS.CATEGORY);

  const onBack = () => {
    setStep((value) => value - 1);
  };

  const onNext = () => {
    setStep((value) => value + 1);
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
          <Map />
        </div>
      ),
    },
    [STEPS.INFO]: {
      content: (
        <div className="flex flex-col gap-8">
          <Heading
            title="What will it be called?"
            subTitle="Tell others what you want to teach"
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
    [STEPS.IMAGES]: {
      content: (
        <div className="flex flex-col gap-8">
          <Heading
            title="Add some images"
            subTitle="Show people what they can learn"
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
    [STEPS.DESCRIPTION]: {
      content: (
        <div className="flex flex-col gap-8">
          <Heading
            title="Where about are you having the course?"
            subTitle="Let people know!"
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
    [STEPS.PRICE]: {
      content: (
        <div className="flex flex-col gap-8">
          <Heading
            title="Where about are you having the course?"
            subTitle="Let people know!"
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
      onSubmit={onNext}
      onClose={onClose}
    >
      {bodyContent.content}
    </Modal>
  );
};

export default CourseModal;
