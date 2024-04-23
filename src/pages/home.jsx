import { BiEditAlt } from "react-icons/bi"; 
import { BsFillTrashFill } from "react-icons/bs"; 
import { BsFileEarmarkPlusFill } from "react-icons/bs"; 
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import toastr from 'toastr';
import 'toastr/build/toastr.min.css';
import { createNew, deleteNews, fetchNews, updateNews } from "../store/newsSlice";
import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table";

import {  Select, SelectContent,  SelectItem, SelectTrigger, SelectValue,} from "./../components/ui/select"


import { Button } from "./../components/ui/button"

import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import Loader from '../component/loading/loading';
import { getCategories } from '../api/getcategories';
import FormSearch from '../component/formsearch/FormSearch';

const Home =  () => {



  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [openCreate, setOpenCreate] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);
  
 

   const [categories , setCategories] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getCategories();
        setCategories(response.data); // Assuming the categories are in the response data
        console.log(response.data); // Logging the categories
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchData();
  }, []); 

  

  const[ newsCategorie_id , setnewsCategorie_id]  = useState(0);

 const[ newsTitre , setnewsTitre]  = useState("");
  const[ newsContent , setnewsContent]  = useState("");
  const [newsStart_Date , setnewsStart_Date]= useState("");
  const [newsExpiration_Date , setnewsExpiration_Date] = useState("");

  const[ newsupdateCategorie_id , setnewsupdateCategorie_id]  = useState(0);
  const [ newsIdUpdate , setnewsIdUpdate]  = useState("");
  const [ newsTitreUpdate , setnewsTitreUpdate]  = useState("");
  const [ newsContentUpdate , setnewsContentUpdate]  = useState("");
  const [newsStart_DateUpdate , setnewsStart_DateUpdate]= useState("");
  const [newsExpiration_DateUpdate , setnewsExpiration_DateUpdate] = useState("");

  const onUpdateNews=(newUpdate)=>{
     setnewsIdUpdate(newUpdate.id)
     setnewsTitreUpdate(newUpdate.Titre)
     setnewsContentUpdate(newUpdate.Contenu)
     setnewsStart_DateUpdate(newUpdate.Date_debut)
     setnewsExpiration_DateUpdate(newUpdate.Date_expiration)
     setOpenUpdate(true)
  }

   

  useEffect(() => {
    dispatch(fetchNews())
  }, [dispatch]);

  const { isAuthenticated } = useSelector(state => state.loginslice);
  const { news, msg,loading,error } = useSelector(state => state.newsSlice);

  useEffect(() => {
    if(error){
      toastr.error(error)

      }
    }, [error]);


    useEffect(() => {
      if(msg){
      toastr.success(msg)

      }
      }, [msg]);

  useEffect(() => {
    if (!isAuthenticated) {
      toastr.error("You are Unauthenticated");
      navigate("/login");
    }
  }, [isAuthenticated, navigate,dispatch]);

  const { isDarkMode } = useSelector(state => state.themeSlice);
  const themeClass = isDarkMode === 'dark' ? 'welcomdark' : 'welcomlligth';

  const deleteNewsclick = (newsid) => {
    dispatch(deleteNews(newsid))
  };

  const updateNewsclick = () => {

    const news= {
      Titre:newsTitreUpdate, 
      Contenu:newsTitreUpdate,
      Categorie_id:newsupdateCategorie_id,
      Date_debut:newsStart_DateUpdate,
      Date_expiration :newsExpiration_DateUpdate
    }
    dispatch(updateNews({id:newsIdUpdate,news}))
  };

  const createNewsclick = () => {

    const news= {
       Titre:newsTitre, 
      Contenu:newsContent,
      Categorie_id:newsCategorie_id,
      Date_debut:newsStart_Date,
      Date_expiration :newsExpiration_Date
    }
    // Implement create functionality, e.g., dispatch an action to create new news
      dispatch(createNew(news))
  };

  return (
    <div className="p-12">
    
    <FormSearch/>


           <section>
            {loading  ? (<Loader/>) : (
              <div>
                  <Button className=" flex gap-1 items-center mt-2 " onClick={() => setOpenCreate(true)}>Create News  <BsFileEarmarkPlusFill /></Button>
                <article className={`${themeClass} flex flex-col`}>
                  <Table>
                    <TableCaption>A list of your recent news.</TableCaption>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[100px]">ID</TableHead>
                        <TableHead className="w-[100px]">Titre</TableHead>
                        <TableHead className="w-[100px]">Contenu</TableHead>
                        <TableHead className="w-[100px]">Date_debut</TableHead>
                        <TableHead className="w-[100px]">Date_expiration</TableHead>
                        <TableHead className="w-[100px]">Action</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {news && news.map((newsItem) => (
                        <TableRow key={newsItem.id}>
                            <TableCell>{newsItem.id}</TableCell>
                          <TableCell>{newsItem.Titre}</TableCell>
                          <TableCell>{newsItem.Contenu}</TableCell>
                          <TableCell>{newsItem.Date_debut}</TableCell>
                          <TableCell>{newsItem.Date_expiration}</TableCell>
                          <TableCell>
                            <Button className=" flex gap-1 items-center mt-2 bg-red-800 " onClick={() => deleteNewsclick(newsItem.id)}>Delete <BsFillTrashFill /></Button>
                            <Button className=" flex gap-1 items-center mt-2 bg-green-600" onClick={() => onUpdateNews(newsItem)}>Update  <BiEditAlt /></Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                    <TableFooter>
                      <TableRow>
                        <TableCell colSpan={3}>Total</TableCell>
                        <TableCell className="text-right">{news && news.length} news</TableCell>
                      </TableRow>
                    </TableFooter>
                  </Table>
                </article>
              </div>
            )}
           </section>

      {/* Modal for creating news */}
      <Modal open={openCreate} onClose={() => setOpenCreate(false)} center>
        <div className="flex flex-col items-center justify-center p-4">
          <h3 className="text-2xl font-bold mb-4">Create News</h3>
          <input value={newsTitre} onChange={(e)=>{setnewsTitre(e.target.value)}} type="text" placeholder="Content" />
          <input value={newsContent} onChange={(e)=>{setnewsContent(e.target.value)}} type="text" placeholder="Content" />
                    <Select value={newsCategorie_id} onValueChange={(value)=>{setnewsCategorie_id(value)}}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Theme" />
            </SelectTrigger>
            <SelectContent className=" z-[999999]">
              <SelectItem value="unselected">select category</SelectItem>
              {categories && categories.map((category) => (
                <SelectItem key={category.id} value={category.id}>
                  {category.nom}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <input value={newsStart_Date} onChange={(e)=>{setnewsStart_Date(e.target.value)}} type="date" placeholder="Start Date" />
          <input value={newsExpiration_Date} onChange={(e)=>{setnewsExpiration_Date(e.target.value)}}  type="date" placeholder="Expiration Date" />
          <button onClick={createNewsclick} className="flex items-center gap-4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300" >
            <span>Create</span> {loading ? <AiOutlineLoading3Quarters className="w-4 h-4 animate-spin" /> : null}
          </button>
        </div>
      </Modal>

      {/* Modal for updating news */}
      <Modal open={openUpdate} onClose={() => setOpenUpdate(false)} center>
        <div className="flex flex-col items-center justify-center p-4">
          <h3 className="text-2xl font-bold mb-4">Update News</h3>
          <input type="text" value={newsTitreUpdate} onChange={(e) => {setnewsTitreUpdate(e.target.value)}} />

          <Select   value={newsupdateCategorie_id} onValueChange={(value)=>{setnewsupdateCategorie_id(value)}}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Theme" />
                </SelectTrigger>
                <SelectContent className=" z-[999999]">
                  <SelectItem value="unselected">select category</SelectItem>
                  {categories && categories.map((category) => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.nom}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
          <input type="text" value={newsContentUpdate} onChange={(e) => {setnewsContentUpdate(e.target.value)}} />
          <input type="text" value={newsStart_DateUpdate}  onChange={(e) => {setnewsStart_DateUpdate(e.target.value)}} />
          <input type="text" value={newsExpiration_DateUpdate}   onChange={(e) => {setnewsExpiration_DateUpdate(e.target.value)}}/>
          <button onClick={updateNewsclick} className="flex items-center gap-4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300" >
            <span>Update</span> {loading ? <AiOutlineLoading3Quarters className="w-4 h-4 animate-spin" /> : null}
          </button>
        </div>
      </Modal>
    </div>
  );
}

export default Home;