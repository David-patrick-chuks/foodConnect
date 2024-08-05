import React from 'react'
import { useParams } from 'react-router-dom'
import { FooterLinks } from '../utils/footerLinks';

export const FooterContent = () => {
const { id } = useParams();
const section = FooterLinks.find(section => section.links.some(link => link.id === id));
if (!section){
    return <div>content not found</div>
}
const link = section.links.find(link => link.id === id)
  return (
    <div>
        <div className=' relative bg-gradient-to-bl from-[#05380a] to-[#031605] w-full lg:h-52 overflow-hidden'>
        <img src="images/banner.jpeg" className='w-full opacity-20' alt="" />
        <h1 className=' bg-black bg-opacity-40 py-3 px-5 absolute top-1/2 -translate-x-1/2 -translate-y-1/2 text-white pop font-extrabold lg:text-5xl text-center left-1/2'>{link.label}</h1>
        </div>
     {/* <div dangerouslySetInnerHTML={{__html: link.content}}/> */}
    </div>
  )
}

