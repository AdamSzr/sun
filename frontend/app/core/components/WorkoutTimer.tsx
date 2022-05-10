import { Router, Routes } from "blitz"
import { useState } from "react"



export function WorkoutTimerComponent(props:any) {
    const [seconds,setSeconds] = useState('')



    function TimerSettingsComponent(){
        return (
            <div>"TimerSettingsComponent 
set workout seconds "
                <div>
                    
                <form>
                 <input type={'number'} min={0} onChange={ trySetSec} />
                 <input type={'submit'} onClick={() => console.log(seconds)} />
                </form>
                </div>
               
            </div>
            
        )
    }
    
    
    function TimerViewComponent(){
        return (
            <div>TimerViewComponent </div>
        )
    }

  return (
    <div className="workoutTimerComponent">
     WorkoutTimerComponent
     <TimerSettingsComponent/>
     <TimerViewComponent/>
    </div>
  )
}

export default WorkoutTimerComponent
