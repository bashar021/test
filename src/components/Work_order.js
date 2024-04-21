import React,{useState} from 'react'
import '../styles/Work_order.css'
import Overlay from './Overlay'
import New_work_order from './New_work_order'
export default function Work_order({ activeTab, onClick }) {
    const [overview,setOverview] = useState(true)
    const [overlay,setOverlay]  = useState(false)
    
    return (
        <div id='Work_order_cont'>
            <div id='work_order_top_bar'>
                <h5>Create Workorder</h5>
                <button onClick={()=>{setOverlay(true)}} className='btn btn-primary btn-lg '>Save</button>
            </div>

            <div id='tab_option_box'>
                
               /* These buttons are part of a tab navigation system in the `Work_order` component. */
                <button
                    className={`tab-button   ${overview === true ?'active_tab_button':''}`}
                    onClick={() => setOverview(true)}
                >
                   Overview
                </button>
                <button
                    className={`tab-button  ${overview === false ?'active_tab_button':''} ` }
                    onClick={() => setOverview(false)}
                >
                    More
                </button>
            </div>
          /* This part of the code is conditionally rendering components based on the values of the
          `overview` and `overlay` states. */
            {overview === true?<New_work_order></New_work_order>:<p>Hello world</p>}
            
            {overlay === true?<Overlay setOverlay={setOverlay}></Overlay>:''}

          


        </div>
    )
}
