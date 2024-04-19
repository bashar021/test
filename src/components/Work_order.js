import React,{useState} from 'react'
import '../styles/Work_order.css'
import Work_order_overview from './Work_order_overview'
import Overlay from './Overlay'
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
            {overview === true?<Work_order_overview></Work_order_overview>:<p>Hello world</p>}
            
            {overlay === true?<Overlay setOverlay={setOverlay}></Overlay>:''}

          


        </div>
    )
}
