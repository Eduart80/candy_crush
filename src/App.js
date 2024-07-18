import React, {useEffect, useState} from "react";
import ScoreBord from './Components/ScoreBord.js'
import './index.css';
import red from "./images/red.png"
import blue from "./images/blue.png"
import green from "./images/green.png"
import orange from "./images/orange.png"
import purple from "./images/purpule.png"
import yellow from "./images/yellow.png"
import empty from "./images/empty.png"

const width = 8
const candyColor = [
        blue,
        green,
        orange,
        purple,
        red,
        yellow
]

function App() {
const [currentColorArr, setCurrentColorArr]= useState([])
    const [squareBeingDrugged, setSquareBeingDrugged ] = useState(null)
    const [squareBeingReplaced, setSquareBeingReplaced ] = useState(null)
    const [scoreBord, setScoreBord]= useState(0)

    let checkColumnOfThree;
    checkColumnOfThree = () => {
        for (let i = 0; i <= 47; i++) {
            const columnOfThree = [i, i + width, i + width * 2]
            const decidedColor = currentColorArr[i]
            const isEmpty = currentColorArr[i] === empty

            if (columnOfThree.every(square => currentColorArr[square] === decidedColor && !isEmpty)) {
                setScoreBord((score) => score + 1)
                columnOfThree.forEach(square => currentColorArr[square] = empty )
                return true
            }

        }
    }
    let checkRowOfThree;
    checkRowOfThree = () => {
        for (let i = 0; i < 64; i++) {
            const rowOfThree = [i, i + 1, i + 2]
            const decidedColor = currentColorArr[i]
            const notValid = [6, 7, 14, 15, 22, 23, 30, 31, 38, 39, 46, 47, 54, 55, 63, 64]
            const isEmpty = currentColorArr[i] === empty

            if (notValid.includes(i)) continue
            if (rowOfThree.every(square => currentColorArr[square] === decidedColor && !isEmpty)) {
                setScoreBord((score) => score + 1)
                rowOfThree.forEach(square => currentColorArr[square] = empty )
                return true
            }

        }
    }
    let checkColumnOfFour;
    checkColumnOfFour = () => {
        for (let i = 0; i <= 39; i++) {
            const columnOfFour = [i, i + width, i + width * 2, i + width * 3]
            const decidedColor = currentColorArr[i]
            const isEmpty = currentColorArr[i] === empty

            if (columnOfFour.every(square => currentColorArr[square] === decidedColor && !isEmpty)) {
                setScoreBord((score) => score + 2)
                columnOfFour.forEach(square => currentColorArr[square] = empty )
                return true
            }

        }
    }
    let checkRowOfFour;
    checkRowOfFour = () => {
        for (let i = 0; i < 64; i++) {
            const rowOfFour = [i, i + 1, i + 2, i + 3]
            const decidedColor = currentColorArr[i]
            const notValid = [5, 6, 7, 13, 14, 15, 21, 22, 23, 29, 30, 31, 37, 38, 39, 45, 46, 47, 53, 54, 55, 62, 63, 64]
            const isEmpty = currentColorArr[i] === empty

            if (notValid.includes(i)) continue
            if (rowOfFour.every(square => currentColorArr[square] === decidedColor && !isEmpty)) {
                setScoreBord((score) => score + 2)
                rowOfFour.forEach(square => currentColorArr[square] = empty )
                return true
            }

        }
    }

    let moveDown;
    moveDown = () => {
        for (let i = 0; i <=55 ; i++) {
            const firstRow = [0, 1, 2, 3, 4, 5, 6, 7]
            const isFirstRow = firstRow.includes(i)

            if (isFirstRow && currentColorArr[i] === empty ) {
                let randomNumber = Math.floor(Math.random() * candyColor.length)
                currentColorArr[i] = candyColor[randomNumber]
            }

            if ((currentColorArr[i + width]) === empty ) {
                currentColorArr[i + width] = currentColorArr[i]
                currentColorArr[i] = empty
            }
        }
    }


      const createBord =()=>{
        const randomColorArrange = []
        for(let i=0; i <width * width; i++){
          const randomColor = candyColor[Math.floor(Math.random() * candyColor.length)]
          randomColorArrange.push(randomColor)
        }
          setCurrentColorArr(randomColorArrange)
      }
      useEffect(()=>{
          createBord()
      },[])

      useEffect(()=>{
         const timer = setInterval(()=>{
            checkColumnOfFour()
            checkRowOfFour()
            checkColumnOfThree()
            checkRowOfThree()
            moveDown()
            setCurrentColorArr([...currentColorArr])
          },700)
          return ()=>{clearInterval(timer)}
      },[checkColumnOfFour, checkColumnOfThree, checkRowOfThree, checkRowOfFour, moveDown, currentColorArr])

        const dragStart = (e)=>{
            setSquareBeingDrugged(e.target)
        }
        const dragDrop = (e)=>{
            setSquareBeingReplaced(e.target)
        }
    const dragEnd = ()=>{
        const squareBeingDruggedId = parseInt(squareBeingDrugged.getAttribute("data-id"))
        const squareBeingReplacedId = parseInt(squareBeingReplaced.getAttribute("data-id"))

        currentColorArr[squareBeingReplacedId]= squareBeingDrugged.getAttribute('src')
        currentColorArr[squareBeingDruggedId]= squareBeingReplaced.getAttribute('src')

        const validMoves =[
            squareBeingDruggedId -1,
            squareBeingDruggedId - width,
            squareBeingDruggedId + 1,
            squareBeingDruggedId + width
        ]
        const validMove = validMoves.includes(squareBeingReplacedId)


        const isAColumnOfThree = checkColumnOfThree()
        const isARowOfThree = checkRowOfThree()
        const isARowOfFour = checkRowOfFour()
        const isAColumnOfFour = checkColumnOfFour()

        if(squareBeingReplacedId && validMove && (isAColumnOfThree || isARowOfThree || isAColumnOfFour || isARowOfFour)){
            setSquareBeingDrugged(null)
            setSquareBeingReplaced(null)
        }else{
            currentColorArr[squareBeingReplacedId] = squareBeingReplaced.getAttribute('src')
            currentColorArr[squareBeingDruggedId] = squareBeingDrugged.getAttribute('src')
            setCurrentColorArr([...currentColorArr])
        }

    }

  return (
    <div className='grid-container'>
    <div className="app">
        <div className="game">
            {
                currentColorArr.map((candyColor, index) => {
                    return  <img key={index}
                                src={candyColor}
                                alt={candyColor}
                                data-id={index}
                                draggable={"true"}
                                onDragStart={dragStart}
                                onDragOver={(e) => e.preventDefault()}
                                onDragEnter={(e) => e.preventDefault()}
                                onDragLeave={(e) => e.preventDefault()}
                                onDrop={dragDrop}
                                onDragEnd={dragEnd}
                    />
                })
            }
        </div>
        <ScoreBord score={scoreBord}/>
    </div>
   </div>
  )
}

export default App;
