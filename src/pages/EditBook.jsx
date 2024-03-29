import React,{useState,useEffect} from 'react'
import BackButton from '../components/BackButton'
import Spinner from '../components/Spinner'
import axios from 'axios'
import {useNavigate,useParams} from 'react-router-dom'

const EditBook = () => {
  const [title,setTitle] = useState('')
  const [author,setAuthor] = useState('')
  const [publishYear,setPublishYear] = useState('')
  const [loading,setLoading] = useState(false)
  const navigate = useNavigate()
  const {id} = useParams();
  useEffect(()=>{
    setLoading(true)
    axios.get(`https://bookstore-backend-eta.vercel.app/books/${id}`)
    .then((response)=>{
      setAuthor(response.data.author)
      setTitle(response.data.title)
      setPublishYear(response.data.publishYear)
      setLoading(false)
    })
    .catch((error)=>{
      setLoading(false)
      alert("an error happende please check console")
      console.log(error)
    })
  },[])
  const handleEditBook = ()=>{
    const data = {
      title,
      author,
      publishYear,
    };
    setLoading(true)
    axios
    .put(`https://bookstore-backend-eta.vercel.app/books/${id}`,data)
    .then((response)=>{
      setLoading(false)
      navigate('/')
    })
    .catch((error)=>{
      console.log(error);
      setLoading(false);
      alert("please check at console , error occured");
    })
  };
  return (
    <div className='p-4'>
      <BackButton/>
      <h1 className='text-3xl my-4'>Edit book</h1>
      {loading?<Spinner/>:''}
      <div className='flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto'>
        <div className='my-4'>
          <label htmlFor="" className='text-xl mr-4 text-gray-500 '>Title</label>
          <input type="text" 
          value={title} 
          onChange={(e)=>setTitle(e.target.value)}
          className='border-2 border-gray-500 px-4 py-2 w-full' />
        </div>
        <div className='my-4'>
          <label htmlFor="" className='text-xl mr-4 text-gray-500 '>Author</label>
          <input type="text" 
          value={author} 
          onChange={(e)=>setAuthor(e.target.value)}
          className='border-2 border-gray-500 px-4 py-2 w-full' />
        </div>
        <div className='my-4'>
          <label htmlFor="" className='text-xl mr-4 text-gray-500 '>Publish Year</label>
          <input type="number" 
          value={publishYear} 
          onChange={(e)=>setPublishYear(e.target.value)}
          className='border-2 border-gray-500 px-4 py-2 w-full' />
        </div>
        <button className='p-2 bg-sky-200 m-8' onClick={handleEditBook}>
          save
        </button>
      </div>
    </div>
  )
}

export default EditBook
