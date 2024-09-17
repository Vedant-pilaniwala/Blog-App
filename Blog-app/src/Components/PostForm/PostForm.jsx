import React, { useCallback, useEffect, useState } from "react";
import { Container, Input, Button, Select, RTE } from "../index";
import { RiUpload2Line } from "react-icons/ri";
import { useForm } from "react-hook-form";
import "./PostForm.css";
import services from "../../appwrite/postServices";
import { updatePost, createPost } from "../../Redux/Slice/postSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import dbServices from "../../appwrite/postServices";

function PostForm({ post }) {
  const [image, setImage] = useState(null);
  const { register, handleSubmit, watch, setValue, getValues, control } =
    useForm({
      defaultValues: {
        title: post?.title || "",
        slug: post?.slug || "",
        content: post?.content || "",
        status: post?.status || "active",
      },
    });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);

  const slugTransform = useCallback((value) => {
    if (value && typeof value === "string") {
      return value
        .trim()
        .toLowerCase()
        .replace(/[^A-Za-z\d\s]+/g, "-")
        .replace(/\s/g, "-");
    }
    return "";
  }, []);

  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "title") {
        setValue("slug", slugTransform(value.title), { shouldValidate: true });
      }
    });

    return () => subscription.unsubscribe();
  }, [watch]);

  const formSubmitHandle = async (data) => {
    if (post) {
      const file = data.image[0]
        ? await services.uploadFile(data.image[0])
        : null;

      if (file) {
        services.deleteFile(post.featuredImg);
      }

      const dbPost = await services.updatePost(post.$id, {
        ...data,
        featuredImg: file ? file.$id : undefined,
      });

      if (dbPost) {
        dispatch(updatePost({ dbPost }));
        navigate(`/posts/${dbPost.$id}`);
      }
    } else {
      const file = await services.uploadFile(data.image[0])

      if (file) {
        const fileId = file.$id;
        data.featuredImg = fileId;
        const createdPost = await services.createPost({
          ...data,
          userId: userData && userData.userData.$id
        });

        if (createdPost) {
          dispatch(createPost( createdPost ));
          navigate(`/posts/${createdPost.$id}`);
        }
      }
    }
  };

  return (
    <Container className="h-full flex justify-center items-center">
      <form
        onSubmit={handleSubmit(formSubmitHandle)}
        className="mt-28 h-auto mb-28 p-5 flex justify-center w-full"
      >
        <div className="w-2/3 p-7">
          <Input
            label="Title: "
            placeholder="Enter your project title"
            type="text"
            {...register("title", {
              required: post ? false : true,
            })}
            onInput={(e) => {
              setValue("slug", slugTransform(e.currentTarget.value), {
                shouldValidate: true,
              });
            }}
          />
          <Input
            label="Slug: "
            placeholder="Slug"
            type="text"
            disabled={true}
            {...register("slug", {
              required: post ? false : true,
            })}
          />
          <RTE
            label="Content: "
            name="content"
            control={control}
            defaultValue={getValues("content")}
          />
        </div>
        <div className="w-1/3 pt-7">
          <Input
            label="Featured Image"
            icon={<RiUpload2Line />}
            labelClassName="image-button bg-gray-gradient"
            type="file"
            accept="image/png, image/jpg, image/jpeg, image/gif"
            {...register("image", {
              required: false,
            })}
            onInput={(e) => {
              if (e.currentTarget.files && e.currentTarget.files[0]) {
                setImage(URL.createObjectURL(e.currentTarget.files[0]));
              }
            }}
          />

          {image ? (
            <div className="imageContainer containerFit">
              <img src={image} className="rounded-xl" />
            </div>
          ) : post ? (
            <div className="imageContainer containerFit">
              <img
                src={dbServices.getFilePreview(post.featuredImg)}
                className="rounded-xl"
              />
            </div>
          ) : (
            <div className="imageContainer w-72 h-64">
              <h1 className="text-3xl font-semibold text-center">
                Upload an image
              </h1>
            </div>
          )}

          <Select
            label="Select your status: "
            className="bg-gray-200 outline-none w-48 pl-1 p-2 rounded-md text-lg font-medium mt-2"
            options={["active", "passive"]}
            {...register("status", {
              required: false,
            })}
          />

          <Button
            type="submit"
            className="w-full mx-2 my-8 text-xl font-medium bg-gray-gradient text-white py-3 p-2 rounded-md"
          >
            {post ? "Update" : "Upload"}
          </Button>
        </div>
      </form>
    </Container>
  );
}

export default PostForm;
