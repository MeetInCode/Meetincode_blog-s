/* eslint-disable react/prop-types */
import React, { useCallback } from "react";
import { useForm } from "react-hook-form";
import { Button, Input, RTE, Select } from "../index";
import service from "../../appwrite/config";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

// `register` links form fields to `react-hook-form` for handling form state.
// `handleSubmit` handles the form submission event and processes the data.
// `watch` allows monitoring the values of specific form fields in real-time.
// `setValue` manually sets a form field value, useful for dynamically changing fields.
// `control` is used to work with controlled components like `<Controller />`.
// `getValues` retrieves the current values of specific fields or the entire form.

export default function PostForm({ post }) {
  const { register, handleSubmit, watch, setValue, control, getValues } =
    useForm({
      defaultValues: {
        title: post?.title || "", //if post is there then use post.title or else ""
        slug: post?.$id || "",
        content: post?.content || "",
        status: post?.status || "active",
      },
    });

  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userdata);
  console.log("this is ", userData);

  const submit = async (data) => {
    console.log("Form data:", data);
    if (post) {
      //this is update case i.e when post exists .. post will have all values
      const file = data.image[0]
        ? await service.uploadFile(data.image[0])
        : null;

      if (file) {
        service.deleteFile(post.featuredImage);
      }

      const dbPost = await service.updatepost(post.$id, {
        ...data,
        featuredImage: file ? file.$id : undefined,
      });

      if (dbPost) {
        navigate(`/post/${dbPost.$id}`);
      }
    } else {
      // this is for new post
      const file = data.image[0]
        ? await service.uploadFile(data.image[0])
        : null;

      if (file) {
        const fileId = file.$id;
        data.featuredImage = fileId;
        //userdata is fetched from store
        const dbPost = await service.createBlogPost({
          ...data,
          userId: userData.$id,
        });
        console.log("654321", dbPost);

        if (dbPost) {
          navigate(`/all-posts`);
        }
      }
    }
  };

  const slugTransform = useCallback((value) => {
    if (value && typeof value === "string")
      return value
        .trim()
        .toLowerCase()
        .replace(/[^a-zA-Z\d\s]+/g, "-")
        .replace(/\s/g, "-");

    return "";
  }, []);

  React.useEffect(() => {
    // Subscribe to changes in form values using 'watch', which listens to form inputs.
    const subscription = watch((value, { name }) => {
      // Check if the changed field is "title".
      if (name === "title") {
        // If "title" changes, transform its value using 'slugTransform' and update the "slug" field.
        // 'setValue' is used to update the "slug" field with the transformed value.
        // The third argument { shouldValidate: true } ensures the new value is validated.
        setValue("slug", slugTransform(value.title), { shouldValidate: true });
      }
    });
    // Clean up the subscription when the component unmounts or dependencies change.
    return () => subscription.unsubscribe();
  }, [watch, slugTransform, setValue]);
  return (
    <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
      <div className="w-2/3 px-2">
        <Input
          label="Title :"
          placeholder="Title"
          className="mb-4"
          {...register("title", { required: true })}
        />
        <Input
          label="Slug :"
          placeholder="Slug"
          className="mb-4"
          {...register("slug", { required: true })}
          onInput={(e) => {
            setValue("slug", slugTransform(e.currentTarget.value), {
              shouldValidate: true,
            });
          }}
        />
        <RTE
          label="Content :"
          name="content"
          control={control}
          defaultValue={getValues("content")}
        />
      </div>
      <div className="w-1/3 px-2">
        <Input
          label="Featured Image :"
          type="file"
          className="mb-4"
          accept="image/png, image/jpg, image/jpeg, image/gif"
          {...register("image", { required: !post })}
        />
        {post && (
          <div className="w-full mb-4">
            <img
              src={service.getfilepreview(post.featuredImage)}
              alt={post.title}
              className="rounded-lg"
            />
          </div>
        )}
        <Select
          options={["active", "inactive"]}
          label="Status"
          className="mb-4"
          {...register("status", { required: true })}
        />
        <Button
          type="submit"
          bgcolor={post ? "bg-green-500" : undefined}
          className="w-full  bg-green-500 h-9 rounded-lg"
        >
          {post ? "Update" : "Submit"}
        </Button>
      </div>
    </form>
  );
}
