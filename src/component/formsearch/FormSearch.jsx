import { BiSearchAlt2 } from "react-icons/bi"; 
import React, { useRef } from 'react'
import { Input } from "../../components/ui/input"
import { Button } from "../../components/ui/button"
import { findcategories } from '../../store/newsSlice'
import { useDispatch } from 'react-redux'

export default function FormSearch() {
    const dispatch=useDispatch()
   const  Inputquery =useRef("")
    const searcharticls=()=>{
       dispatch(findcategories(Inputquery.current.value))

    }
  return (
    <div className=' w-1/4 m-auto'>
         <Input  ref={Inputquery} type="email" placeholder="search by name" />
         <Button className=" flex gap-1 items-center mt-2 bg-yellow-600" onClick={searcharticls}>search <BiSearchAlt2 className="w-5 h-5" /></Button>


    </div>
  )
}
