"use client";
import { useState } from "react";
import { motion } from "framer-motion";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { CreatorFormDataSchema } from "@/utils/validations";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import { creatorFormAction } from "@/actions/creatorActions";

type Inputs = z.infer<typeof CreatorFormDataSchema>;

const steps = [
  {
    id: "Step 1",
    name: "Company Information",
    fields: ["fullName", "contentNiche", "description"],
  },
  {
    id: "Step 2",
    name: "Address",
    fields: ["country", "state", "city", "address", "zip"],
  },
  { id: "Step 3", name: "Complete" },
];

function MultiStepCreatorForm() {
  const [previousStep, setPreviousStep] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  const delta = currentStep - previousStep;

  const form = useForm<Inputs>({
    resolver: zodResolver(CreatorFormDataSchema),
  });

  const {
    handleSubmit,
    trigger,
    formState: { errors },
  } = form;

  const processForm: SubmitHandler<Inputs> = async (data) => {
    await creatorFormAction(data);
    form.reset();
  };

  type FieldName = keyof Inputs;

  const next = async () => {
    const fields = steps[currentStep].fields;
    const output = await trigger(fields as FieldName[], { shouldFocus: true });

    if (!output) return;

    if (currentStep < steps.length - 1) {
      if (currentStep === steps.length - 2) {
        await handleSubmit(processForm)();
      }
      setPreviousStep(currentStep);
      setCurrentStep((step) => step + 1);
    }
  };

  const prev = () => {
    if (currentStep > 0) {
      setPreviousStep(currentStep);
      setCurrentStep((step) => step - 1);
    }
  };

  return (
    <section className="absolute inset-0 my-14 flex flex-col justify-between p-20 max-md:px-5">
      {/* steps */}
      <nav aria-label="Progress">
        <ol role="list" className="space-y-4 md:flex md:space-x-8 md:space-y-0">
          {steps.map((step, index) => (
            <li key={step.name} className="md:flex-1">
              {currentStep > index ? (
                <div className="group flex w-full flex-col border-l-4 border-black py-2 pl-4 transition-colors dark:border-neutral-700 md:border-l-0 md:border-t-4 md:pb-0 md:pl-0 md:pt-4">
                  <span className="text-sm font-medium text-black transition-colors dark:text-white">
                    {step.id}
                  </span>
                  <span className="text-sm font-medium">{step.name}</span>
                </div>
              ) : currentStep === index ? (
                <div
                  className="flex w-full flex-col border-l-4 border-black py-2 pl-4 dark:border-neutral-700 md:border-l-0 md:border-t-4 md:pb-0 md:pl-0 md:pt-4"
                  aria-current="step"
                >
                  <span className="text-sm font-medium text-black dark:text-white">
                    {step.id}
                  </span>
                  <span className="text-sm font-medium">{step.name}</span>
                </div>
              ) : (
                <div className="group flex w-full flex-col border-l-4 border-gray-200 py-2 pl-4 transition-colors md:border-l-0 md:border-t-4 md:pb-0 md:pl-0 md:pt-4">
                  <span className="text-sm font-medium text-gray-500 transition-colors">
                    {step.id}
                  </span>
                  <span className="text-sm font-medium">{step.name}</span>
                </div>
              )}
            </li>
          ))}
        </ol>
      </nav>

      {/* Form */}
      <Form {...form}>
        <form className="mt-12 py-12" onSubmit={handleSubmit(processForm)}>
          {currentStep === 0 && (
            <motion.div
              initial={{ x: delta >= 0 ? "50%" : "-50%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <h2 className="text-base font-semibold leading-7 text-gray-900 dark:text-white">
                User Information
              </h2>
              <p className="mt-1 text-sm leading-6 text-gray-600 dark:text-white">
                Provide your details.
              </p>
              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="sm:col-span-3">
                  <FormField
                    name="fullName"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel
                          htmlFor="fullName"
                          className="block text-sm font-medium leading-6 text-gray-900 dark:text-white"
                        >
                          Full name
                        </FormLabel>
                        <div className="mt-2">
                          <Input
                            type="text"
                            id="fullName"
                            {...field}
                            className="bg-gray-200 dark:bg-neutral-900"
                          />
                          {errors.fullName?.message && (
                            <p className="mt-2 text-sm text-red-400">
                              {errors.fullName.message}
                            </p>
                          )}
                        </div>
                      </FormItem>
                    )}
                  />
                </div>

                <div className="sm:col-span-3">
                  <FormField
                    name="contentNiche"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel
                          htmlFor="contentNiche"
                          className="block text-sm font-medium leading-6 text-gray-900 dark:text-white"
                        >
                          Type of content
                        </FormLabel>
                        <div className="mt-2">
                          <Input
                            type="text"
                            id="contentNiche"
                            {...field}
                            className="bg-gray-200 dark:bg-neutral-900"
                          />
                          {errors.contentNiche?.message && (
                            <p className="mt-2 text-sm text-red-400">
                              {errors.contentNiche.message}
                            </p>
                          )}
                        </div>
                      </FormItem>
                    )}
                  />
                </div>

                <div className="sm:col-span-full">
                  <FormField
                    name="description"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel
                          htmlFor="description"
                          className="block text-sm font-medium leading-6 text-gray-900 dark:text-white"
                        >
                          Description
                        </FormLabel>
                        <div className="mt-2">
                          <FormControl>
                            <Textarea
                              id="description"
                              {...field}
                              className="bg-gray-200 dark:bg-neutral-900"
                            />
                          </FormControl>
                          {errors.description?.message && (
                            <p className="mt-2 text-sm text-red-400">
                              {errors.description.message}
                            </p>
                          )}
                        </div>
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </motion.div>
          )}

          {currentStep === 1 && (
            <motion.div
              initial={{ x: delta >= 0 ? "50%" : "-50%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <h2 className="text-base font-semibold leading-7 text-gray-900 dark:text-white">
                Address
              </h2>
              <p className="mt-1 text-sm leading-6 text-gray-600 dark:text-white">
                Address where the company resides.
              </p>

              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="sm:col-span-3">
                  <FormField
                    name="country"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel
                          htmlFor="country"
                          className="block text-sm font-medium leading-6 text-gray-900 dark:text-white"
                        >
                          Country
                        </FormLabel>
                        <div className="mt-2">
                          <Select onValueChange={field.onChange}>
                            <FormControl>
                              <SelectTrigger className="bg-gray-200 dark:bg-neutral-900">
                                <SelectValue
                                  id="country"
                                  {...field}
                                  className="bg-gray-200 dark:bg-neutral-900"
                                />
                              </SelectTrigger>
                            </FormControl>

                            <SelectContent className="bg-gray-200 dark:bg-neutral-900">
                              <SelectItem value="india">India</SelectItem>
                              <SelectItem value="United Kingdom">
                                United Kingdom
                              </SelectItem>
                              <SelectItem value="USA">USA</SelectItem>
                            </SelectContent>
                          </Select>
                          {errors.country?.message && (
                            <p className="mt-2 text-sm text-red-400">
                              {errors.country.message}
                            </p>
                          )}
                        </div>
                      </FormItem>
                    )}
                  />
                </div>

                <div className="col-span-full">
                  <FormField
                    name="address"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel
                          htmlFor="address"
                          className="block text-sm font-medium leading-6 text-gray-900 dark:text-white"
                        >
                          Address
                        </FormLabel>
                        <div className="mt-2">
                          <Input
                            type="text"
                            id="address"
                            {...field}
                            className="bg-gray-200 dark:bg-neutral-900"
                          />
                          {errors.address?.message && (
                            <p className="mt-2 text-sm text-red-400">
                              {errors.address.message}
                            </p>
                          )}
                        </div>
                      </FormItem>
                    )}
                  />
                </div>

                <div className="sm:col-span-2">
                  <FormField
                    name="state"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel
                          htmlFor="state"
                          className="block text-sm font-medium leading-6 text-gray-900 dark:text-white"
                        >
                          State / Province
                        </FormLabel>
                        <div className="mt-2">
                          <Select onValueChange={field.onChange}>
                            <FormControl>
                              <SelectTrigger className="bg-gray-200 dark:bg-neutral-900">
                                <SelectValue
                                  id="state"
                                  {...field}
                                  className="bg-gray-200 dark:bg-neutral-900"
                                />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent className="bg-gray-200 dark:bg-neutral-900">
                              <SelectItem value="delhi">Delhi</SelectItem>
                              <SelectItem value="mumbai">Mumbai</SelectItem>
                              <SelectItem value="bangalore">
                                Bangalore
                              </SelectItem>
                              <SelectItem value="england">England</SelectItem>
                              <SelectItem value="scotland">Scotland</SelectItem>
                              <SelectItem value="florida">Florida</SelectItem>
                              <SelectItem value="texas">Texas</SelectItem>
                            </SelectContent>
                          </Select>
                          {errors.state?.message && (
                            <p className="mt-2 text-sm text-red-400">
                              {errors.state.message}
                            </p>
                          )}
                        </div>
                      </FormItem>
                    )}
                  />
                </div>

                <div className="sm:col-span-2 sm:col-start-1">
                  <FormField
                    name="city"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel
                          htmlFor="city"
                          className="block text-sm font-medium leading-6 text-gray-900 dark:text-white"
                        >
                          City
                        </FormLabel>
                        <div className="mt-2">
                          <Input
                            type="text"
                            id="city"
                            {...field}
                            className="bg-gray-200 dark:bg-neutral-900"
                          />
                          {errors.city?.message && (
                            <p className="mt-2 text-sm text-red-400">
                              {errors.city.message}
                            </p>
                          )}
                        </div>
                      </FormItem>
                    )}
                  />
                </div>

                <div className="sm:col-span-2">
                  <FormField
                    name="zip"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel
                          htmlFor="zip"
                          className="block text-sm font-medium leading-6 text-gray-900 dark:text-white"
                        >
                          ZIP / Postal code
                        </FormLabel>
                        <div className="mt-2">
                          <Input
                            type="text"
                            id="zip"
                            {...field}
                            className="bg-gray-200 dark:bg-neutral-900"
                          />
                          {errors.zip?.message && (
                            <p className="mt-2 text-sm text-red-400">
                              {errors.zip.message}
                            </p>
                          )}
                        </div>
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </motion.div>
          )}

          {currentStep === 2 && (
            <>
              <h2 className="text-base font-semibold leading-7 text-gray-900 dark:text-white">
                Complete
              </h2>
              <p className="mt-1 text-sm leading-6 text-green-500">
                Thank you for your submission.
              </p>
            </>
          )}
        </form>
      </Form>

      {/* Navigation */}
      <div className="mt-8 pb-20 pt-5">
        <div className="flex justify-between">
          <Button
            type="button"
            onClick={prev}
            variant={"default"}
            disabled={currentStep === 0}
            className="rounded px-2 py-1 text-sm font-semibold text-white shadow-sm disabled:cursor-not-allowed disabled:opacity-50 dark:text-black"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="h-6 w-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 19.5L8.25 12l7.5-7.5"
              />
            </svg>
          </Button>
          <Button
            type="button"
            onClick={next}
            disabled={currentStep === steps.length - 1}
            className="rounded px-2 py-1 text-sm font-semibold text-white shadow-sm disabled:cursor-not-allowed disabled:opacity-50 dark:text-black"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="h-6 w-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.25 4.5l7.5 7.5-7.5 7.5"
              />
            </svg>
          </Button>
        </div>
      </div>
    </section>
  );
}

export default MultiStepCreatorForm;
