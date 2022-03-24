import React from 'react';
import './canteen.css';
import NAmenu from './NAmenu';

function ShowNADishes({NAmenu}) {


    return(
        <>
        <div style={{margin: '70px'}} className='shadow-lg p-3 mb-5 bg-white rounded'>

            <div>
                <h1>{NAmenu.name}</h1>
                <img src={NAmenu.image} className="img-fluid" style={{height: '200px' , width: '200px'}}/>
            </div>

        </div>
        </> 
    );
}

function NACanteen() {
    return(
        <>
        <section class="NAheader">
            <div class="text-box">
                    <h1>NA Canteen</h1>
                    <p>New Asia Canteen is operated by a local innovative catering service company, Fortune River Catering Ltd., 
                        which is established by a group of New Asia and CUHK alumni, 
                        with an aim to provide high quality food and dining environment for students and staff of New Asia College and the University.   </p>
                    <a href="http://www.na.cuhk.edu.hk/en-us/aboutnewasia/news.aspx?udt_1148_param_detail=14215" class="hero-btn">Visit Us To Know More</a>
            </div>
        </section>

        {/* <!-- ----- restaurant ------ --> */}
        <div>
            <div className="row">
                {NAmenu.map(NAmenu =>{
                    return(
                        <div>
                            <ShowNADishes NAmenu={NAmenu}/>
                        </div>
                    );
                })}
            </div>
        </div>
        </>
    )
}

export default NACanteen;
