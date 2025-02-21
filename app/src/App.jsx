import styled from 'styled-components'
import logo from './assets/logo.svg';
import bgImage from './assets/bg.png';
import { useEffect, useState } from 'react';
import SearchResult from './components/SearchResult';
// import './App.css'

export const BASE_URL = "http://localhost:9000"; 

const App = () => {

  const [data,setData] = useState(null)
  const [filteredData, setfilteredData] = useState(null)
  const [loading , setLoading] = useState(false)
  const [error , setError] = useState(null)
  const [selectedBtn , setSelectedBtn] = useState("all")


  useEffect(()=>{
    const fetchFoodData = async() =>{
      setLoading(true)
      try{
        const response = await fetch(BASE_URL);
  
        const json = await response.json()
  
        setData(json)
        setfilteredData(json)
        setLoading(false)
      }catch(error){
        setError("Unable to fetch data")
      }
    };
    fetchFoodData();
  },[])

  const searchFood = (e) => {
    const searchValue = e.target.value;
    
    if(searchValue === ""){
      setfilteredData(null);
    }

    const filter = data?.filter((food)=> food.name.toLowerCase().includes(searchValue.toLowerCase())) 

    setfilteredData(filter)
  }

  const filteredFood = (type) => {
    if(type === "all"){
      setfilteredData(data)
      setSelectedBtn("all");
      return ;
    }

    const filter = data?.filter((food)=>food.type.toLowerCase().includes(type.toLowerCase()))
    setfilteredData(filter)
    setSelectedBtn(type)
  }

  if(error) return <div>{error}</div>
  if(loading) return <div>loading...</div>
  return(
    <>
  <Container>

    <TopContainer>
      <div className='logo'>
       <img src={logo} alt="logo" />
      </div>

      <div className='search'>
        <input onChange={searchFood} placeholder='Search Food '/>
      </div>
    </TopContainer>

    <FilterContainer>
      <Button onClick={()=>filteredFood("all") } isSelected = {selectedBtn === "all"}>All</Button>
      <Button onClick={()=>filteredFood("breakfast")} isSelected = {selectedBtn === "breakfast"}>Breakfast</Button>
      <Button onClick={()=>filteredFood("lunch")} isSelected = {selectedBtn === "lunch"}>Lunch</Button>
      <Button onClick={()=>filteredFood("dinner")} isSelected = {selectedBtn === "dinner"}>Dinner</Button>
    </FilterContainer>
  </Container>
  <SearchResult data = {filteredData}/>
  </>
  )
}


export default App

export const  Container = styled.div`
  max-width : 1200px;
  margin : 0 auto; 
`;
const TopContainer = styled.section`
  min-height : 140px;
  display : flex;
  justify-content : space-between;
  padding : 16px;
  align-items : center;

  .search{
    input{
      background-color : transparent;
      border : 1px solid red;
      color : white;
      border-radius : 5px;
      height : 40px;
      font-size : 16px;
      padding : 0px 10px;
      
    } 
  }

  @media (0 < width < 600px){
    flex-direction : column;
    height : 120px;
  }
`;
const FilterContainer = styled.section`
  display : flex;
  justify-content : center;
  gap : 12px;
  padding-bottom : 40px;
`;
export const Button = styled.button`
  background : ${({isSelected}) => (isSelected ? "rgb(200, 50, 50)" : "rgb(242, 77, 77)") };
  outline : 1px solid ${({isSelected})=>(isSelected ? "white" : "rgb(242, 77, 77)" )};
  border-radius : 5px;
  padding : 6px 12px;
  border : none;
  color : white;
  cursor : pointer;
  &:hover{
   background-color:rgb(236, 25, 25);
  }
`;

