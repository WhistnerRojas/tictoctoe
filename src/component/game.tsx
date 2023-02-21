import React, {useState, useEffect} from 'react'
import Box from './Box'
import 'bootstrap/dist/css/bootstrap.min.css';

function Game() {

    // setting the initial value for reset usage
    const initialBox = {
        b1: null,
        b2: null,
        b3: null,
        b4: null,
        b5: null,
        b6: null,
        b7: null,
        b8: null,
        b9: null,
    }

    const [player, setPlayer] = useState(false)
    const [winner, setWinner] = useState('')
    const [box, setBox] = useState(initialBox);

    const clickHandler = (e:any) =>{
        setPlayer(!player)//changing of player
        setBox((oldState)=>({
            ...oldState,
            [e.target.name] : player
        }))//updating the value of each box to player's turn
        e.target.setAttribute("disabled", "true") //to disable the clicked button
        e.target.value = player === false ? 'X' : 'O' //setting the value/filling the button with indicator as to who click it.
    }

    const {b1, b2, b3, b4, b5, b6, b7, b8, b9} = box
    //setting up winning combination
    const winCombo:any= [
        [b1,b2,b3],
        [b4,b5,b6],
        [b7,b8,b9],
        [b1,b4,b7],
        [b2,b5,b8],
        [b3,b6,b9],
        [b1,b5,b9],
        [b3,b5,b7]
    ]

    useEffect(()=>{

        const disable = ()=>{
            document.querySelectorAll("input[type='button']").forEach(input =>{
                input.setAttribute("disabled", "true")
            })
        }

        const CheckWin = () =>{
            //checking if the winning combination is meet and who wins
            for(let i=0; i < winCombo.length; i++){
                const [x,y,z] = winCombo[i]
                if(x ===false && y===false && z===false){
                    setWinner(()=> "Player X win's. Play again!")
                    disable()
                }if(x ===true && y===true && z===true){
                    setWinner(()=> "Player O win's. Play again!")
                    disable()
                }else {

                }
            }
            
        }
        if (Object.values(box).every(value => value !== null)) {//if everything is filled and no one wins
                    setWinner(()=> "It's a draw. Play again")
                    disable()
        }
        CheckWin()

    },[box])//this will check evertime click event occured to boxes

    const handleReset = ()=>{
        //reseting back to initial state.
        setBox(initialBox)
        setPlayer(false)
        setWinner('')
        document.querySelectorAll("input[type='button']").forEach(input =>{
            input.setAttribute("value", "")
            input.removeAttribute("disabled")
        })
    }

    return (
        <div className='container-fluid col-12 mx-auto pt-5 pb-3 d-flex align-items-center flex-column flex-wrap'>
            <h1>TicTacToe Game</h1>
            <p>Player <mark className={`fs-4 fw-bold ${player === false ? "text-danger":"text-info"}`}>{player === false ? "X's" : "O's"}</mark> Turn</p>
            {winner!=='' && <p className='fs-4'>{winner}</p>}
            <div className="grid pb-5">
                {//looping using map to object box and assigning props to the component
                    Object.keys(box).map((keys, index)=>{
                        return <Box key={keys} id={index} click={clickHandler} box={Object.values(box)[index]} name={keys}/>
                    })
                }
            </div>
            <input type="reset" className='btn btn-outline-danger' value="Play Again!" onClick={handleReset}/>
        </div>
    )
}

export default Game;
