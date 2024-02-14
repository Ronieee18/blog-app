import React, { useCallback, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import dbservice from '../appwrite/DBservice'
import Button from './Button'
import Input from './Input'
import Select from './Select'
import RTE from './RTE'
import { ID } from 'appwrite'
        
export default function Postform({post}) {
    const {register,handleSubmit,getValues,control,setValue,watch}=useForm({
        defaultValues:{
            title:post?.title ||"",
            slug:post?.slug||"",
            content:post?.content||"",
            status:post?.status||"active"
        }
    })

    const navigate=useNavigate();
    const userdata=useSelector((state)=>state.auth.userdata);


    const submit=async(data)=>{
        if(post){
            const file= data.image && data.image[0] ?await dbservice.uploadFile(data.image[0]):null;
            if(file){
                post.featuredImage && dbservice.deleteFile(post.featuredImage)
            }
            const dbpost=await dbservice.updatePost(post.$id,{...data,
                featuredImage:file?file.$id:undefined,
            })
            if(dbpost){
                navigate(`/post/${dbpost.$id}`)
            }
        }
        else {
            const file = await dbservice.uploadFile(data.image[0]);

            if (file) {
                const fileId = file.$id;
                data.featuredImage = fileId;
                const dbPost = await dbservice.createPost({ ...data, userID: userdata.$id });

                if (dbPost) {
                    alert('post created successfully');
                    navigate(`/post/${dbPost.$id}`);
                }
            }
        }
    }

    const slugTransform=useCallback((value)=>{
        if(value && typeof value==="string"){
            return value
                .trim()
                .toLowerCase()
                .replace(/[^a-zA-Z\d\s]+/g, "-")
                .replace(/\s/g, "-");
        }
        return "";
    },[])

    useEffect(()=>{
        const subscription=watch((value,{name})=>{
            if(name==='title'){
                setValue('slug',slugTransform(value.title),{shouldValidate:true});
            }
        })
        return ()=> subscription.unsubscribe()
        
    },[watch,setValue,slugTransform ])

  return (
    <form onSubmit={handleSubmit(submit)} className="flex  max-[600px]:flex-col  mt-5 flex-wrap">
    <div className=" max-[600px]:w-full w-2/3 max-[600px]:ml-10 px-2">
        <Input
            label="Title :"
            placeholder="Title"
            className="mb-4 mr-6 border border-gray-900"
            {...register("title", { required: true })}
        />
        <Input
            label="Slug :"
            placeholder="Slug"
            className="mb-4 border border-gray-900"
            {...register("slug", { required: true })}
            onInput={(e) => {
                setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
            }}
        />
        <RTE label="Content :" className='border border-black' name="content" control={control} defaultValue={getValues("content")} />
    </div>
    <div className="w-1/3 max-[600px]:w-full max-[600px]:mt-5 px-2">
        <Input
            label="Featured Image :"
            type="file"
            className="mb-4 border border-gray-900"
            accept="image/png, image/jpg, image/jpeg, image/gif"
            {...register("image", { required: !post })}
        />
        {post && (
            <div className="w-full mb-4">
                <img
                    src={dbservice.getFilePreview(post.featuredImage)}
                    alt={post.title}
                    className="rounded-lg"
                />
            </div>
        )}
        <Select
            options={["active", "inactive"]}
            label="Status"
            className="mb-4 border border-gray-900"
            {...register("status", { required: true })}
        />
        <Button type="submit" bgColor={post ? "bg-green-500" : undefined} className="w-full hover:bg-blue-500">
            {post ? "Update" : "Submit"}
        </Button>
    </div>
</form>
  )
}

