"use client"

import { ProjectInterface, SessionInterface } from '@/common.types'
import Image from 'next/image';
import { ChangeEvent, FormEvent, useState } from 'react';
import  FormField  from './FormField';
import { categoryFilters } from '@/constants';
import CustomMenu from './CustomMenu';
import Button from './Button';

type Props = {
  type: string,
  session: SessionInterface,
  project?: ProjectInterface,
}
const image = null;

const ProjectForm = ({type, session}: Props) => {



  const handleFormsubmit = async (e: FormEvent) => {
    e.preventDefault();

        setSubmitting(true)

        const { token } = await fetchToken()

        try {
            if (type === "create") {
                await createNewProject(form, session?.user?.id, token)

                router.push("/")
            }
            
            if (type === "edit") {
                await updateProject(form, project?.id as string, token)

                router.push("/")
            }

        } catch (error) {
            alert(`Failed to ${type === "create" ? "create" : "edit"} a project. Try again!`);
        } finally {
            setSubmitting(false)
        }

  };

  //uploading images to cloudinary to serve and host the images
  const handleChangeImage = (e:ChangeEvent<HTMLInputElement>) => {

    e.preventDefault();
    const file = e.target.files?.[0];
    
    if (!file) {
      return;
    }

    if (!file.type.includes('image')) {
      return alert('Please upload an image file')
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = () =>{
      const result = reader.result as string;
      //update the image to the result
      handleStateChange('image', result);
    }
  };


  // Update the form
  const handleStateChange = (fieldName: string, value: string) => {

    setform((prevState) => (
      {...prevState, [fieldName]: value } )
    )
  };

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [form, setform] = useState({
    title: '',
    description: '',
    image: '',
    liveSiteUrl: '',
    githubUrl: '',
    category: '',

  })

  return (
    <form onSubmit={handleFormsubmit} className='flexStart form'>
      <div className="flexStart form_image-container">
        <label htmlFor="poster" className='flexCenter form_image-label'>
          {!form.image && 'Choose a poster for your project'}
        </label>
        <input 
          id='image' 
          type="file" 
          accept='image/*' 
          required={type === 'create'}
          className='form_image-input'
          onChange={handleChangeImage}
        />
        {form.image && (
          <Image
            src={form?.image}
            className="sm:p-10 object-contain z-20"
            alt="Project poster"
            fill
          />
        )}
      </div>

          <FormField 
            title="title"
            state= {form.title}
            placeholder="Flexibble"
            setState={(value) => handleStateChange('title', value)}
          />

          <FormField 
            title="Description"
            state= {form.description}
            placeholder="Showcase and discover remakable developper projects."
            setState={(value) => handleStateChange('description', value)}
          />

          <FormField 
            type='url'
            title="Website URL"
            state= {form.liveSiteUrl}
            placeholder="https://yourwebsite.com"
            setState={(value) => handleStateChange('liveSiteUrl', value)}
          />

          <FormField 
            type='url'
            title="GitHub URL"
            state= {form.githubUrl}
            placeholder="https://github.com/fadhelgaaloul"
            setState={(value) => handleStateChange('githubUrl', value)}
          />


          <CustomMenu
            title= "Category"
            state= {form.title}
            filters= {categoryFilters}
            setState= {(value) => handleStateChange('title',value)}
          />

          <div className="flexStart w-full">
              <Button 
                title={
                  isSubmitting ? `${type === 'create' ? 'Creating' : 'Editing'}` : 
                                  `${type === 'create' ? 'Create' : 'Edit'}`}
                type='submit'
                leftIcon={isSubmitting ? "" : '/plus.svg'} submitting = {isSubmitting}
              />
          </div>



    </form>
  )
}

export default ProjectForm