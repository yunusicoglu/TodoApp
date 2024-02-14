import ClearIcon from '@mui/icons-material/Clear';
import { Box, Divider, Grid, IconButton, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { selectTodos } from '../../redux/todosSlice';
import { useEffect, useState } from 'react';
import { collection, doc, getDoc, getDocs } from 'firebase/firestore';
import { db } from '../../firebase';

const collectionName = import.meta.env.VITE_COLLECTION_TODOS
const collectionRef = collection(db, collectionName)

//takes all todos

const TodoList = () => {
  const [shownTodos, setShownTodos] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      const querySnapshot = await getDocs(collectionRef);
      const receivedTodos = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        name: doc.data().name,
        createdBy: doc.data().created_by,
        createdAt: doc.data().created_at,
      }));
      setShownTodos(receivedTodos);
    };
    fetchData();
  }, []);
  

  //takes todos from redux
  // const todos = useSelector(selectTodos)
  // console.log('todos: ',todos)

  //for taking one todo
  // const [documentData, setDocumentData] = useState(null);
  // const [error, setError] = useState(null);
  // const [loading, setLoading] = useState(true);


  //takes one todo
  // useEffect(() => {
  //   const getDocument = async () => {
  //     try {
  //       const docRef = doc(db, collectionName, slug);
  //       const docSnap = await getDoc(docRef);

  //       if (docSnap.exists()) {
  //         setDocumentData(docSnap.data());
  //         console.log("Document data:", docSnap.data());
  //       } else {
  //         setError("No such document!");
  //       }
  //     } catch (error) {
  //       setError(error.message);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   getDocument();
  // }, []);


  return (
    <>
      <Grid className='todo_list_section_main_grid'>
        <Box className='todo_list_section_main_box' >
          <Box sx={{ height:"50px", mb:"10px", pt:"15px", borderTopRightRadius:"25px", borderTopLeftRadius:"25px", display:"flex", flexDirection:"column", justifyContent:"space-between"}}>
            <Typography sx={{fontSize:"25px", fontWeight:600, ml:"20px"}} >Yapılacaklar Listesi</Typography>
            <Divider sx={{bgcolor:"#ffdede",borderBottomWidth: 2}}/>
          </Box>
          <Box sx={{overflowY:"auto", width:"100%", height:"505px"}}>
            {/* {isLoading&&<Typography>Yükleniyor</Typography>} */}
            {shownTodos.map((todo) => (
              <Box key={todo.id} sx={{ width:"100%", height:"40px", pt:"10px", pb:"0px", display:"flex", flexDirection:"column", justifyContent:"space-between",
                ":hover":{bgcolor:"rgb(255, 255, 255, 0.3)"}}}>
                <Box sx={{width:"100%" ,display:'flex',}}>
                  <Typography sx={{ml:"20px",fontSize:"20px", width:"95%"}}>
                    {todo.name}
                  </Typography>
                  <IconButton sx={{mt:"-6px", mr:"12px"}}>
                    <ClearIcon/>
                  </IconButton>
                </Box>
                <Divider sx={{mx:"15px"}}/>
              </Box>
            ))}
          </Box>
        </Box>
      </Grid>
    </>
  )
}

export default TodoList