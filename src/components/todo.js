import React, { useState,useEffect } from 'react'
import "./style.css"

    
// -----------------------------------Retrieve local store data ------------------------------------
    const getLocalData = () =>
    {
        const lists = localStorage.getItem("mytodolist");
        if(lists){
            return JSON.parse(lists);
        }
        else
        {
            return []
        }
    }


const Todo = () =>
    {
        const [inputData, setInputData] = useState("");
        const [items, setItems] = useState(getLocalData());
        const [isEditItem,setIsEditItem] = useState("");
        const [toggleButton, setToggleButton] = useState(false);



    //-------------------------- Add Item function---------------------------
    const addItem = () =>
    {
        if(!inputData)
        {
            alert("plz fill the data")
        }
        else if(inputData && toggleButton)
        {
            setItems( items.map((curElem)=>
            {
                if(curElem.id === isEditItem)
                {
                    return {...curElem,name: inputData}
                }
                return curElem;
            }))

            setInputData ("")
            setIsEditItem(null)
            setToggleButton(false)

        }
        else
        {
            const myNewInputData = 
            {
                id :new Date().getTime().toString(),
                name: inputData
            }

            setItems([...items, myNewInputData])
            setInputData("")
        }
    }



    //----------------------------Edit item---------------------------
    const editItem = (index) =>
    {
        const item_todo_edited = items.find((curElem)=>
        {
            return curElem.id === index;
        })

        setInputData (item_todo_edited.name)
        setIsEditItem(index)
        setToggleButton(true)
    }




    //----------------------------How to delete item function----------------------------
    const deleteItem =(index)=>
    {
        const updatedItems = items.filter((curElem)=>
        {
            return curElem.id !==index;
        })
        setItems(updatedItems)
    }



    //--------------------------Remove all-----------------------------------
    const removeAll = ()=>
    {
        setItems([]);
    }


    //------------------------use local store---------------------------------
    useEffect(() => 
    {
      localStorage.setItem("mytodolist", JSON.stringify(items))
    }, [items])
    

 
 
    return (
    <>
    <div className='main-div'>
        <div className='child-div'>


            {/* -------------------Heading name and logo Start ---------------------- */}
            <figure>
                <img src="./images/icons8-notes.svg" alt="todologo" />
                <figcaption> Add Your List Here</figcaption>
            </figure>
            {/* -------------------- Heading name and logo End  ----------------------*/}



            {/* ------------------------Text Box Code Start -------------------------- */}
            <div className='addItems'>
                <input type="text" placeholder='Add Item' className='form-control' value ={inputData } onChange ={(event)=> setInputData(event.target.value)} />

                {/* ------------------turnery operator for change edit button ------------------------*/}
                {toggleButton ? (<i className='far fa-edit add-btn' onClick={addItem}></i>) : (<i className='fa fa-plus add-btn' onClick={addItem}></i>)}
            </div>
            {/*  ------------------------Text Box Code End  ----------------------------*/}



            {/* -------------------------------- Show Our List Here Start -----------------------------*/}
            <div className='showItems'>
                {items.map((curElem)=>{
                    return(
                            <div className='eachItem' key={curElem.id}>
                                <h3>{curElem.name}</h3>
                                <div className='todo-btn'>
                                    <i className='far fa-edit add-btn' onClick={()=> editItem(curElem.id)}></i>
                                    <i className='fas fa-trash-alt add-btn' onClick={()=> deleteItem(curElem.id)}></i>
                                </div>
                            </div>
                        )
                        })}
            </div>
            {/*  --------------------------------Show Our List Here End  ------------------------------*/}



            {/* ----------------------------------Remove all button code Start* --------------------------------*/}
            <div className='showItems'>
                <button className='btn effect04' data-sm-link-text="Remove All" onClick={removeAll}>
                    <span>CHECK LIST</span>
                </button>
            </div>
            {/* ---------------------------------- Remove all button code End  ----------------------------------*/}


        </div>
    </div>
    </>
  )
}

export default Todo;