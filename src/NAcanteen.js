import React from 'react';
import './canteen.css';

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
        <section class="Salad">
            <h1>Salad We Offer</h1>
            <p>Lorem ipsum sit amet, consectetur adipiscine eilt.</p>

            <div class="row-1">
                <div class="Salad-col">
                    <h3>Salad</h3>
                    <p>The College Staff and Student Canteens are located on the G/F of the Cheung Chuk Shan Amenities Building. 
                        The total floor area is about 570 square metres and it can serve up to 360 people.  
                        The College canteens are now operated by Joyful Inn Limited.  
                    </p>
                </div>
            </div> 
        </section>
        </>
    )
}

export default NACanteen;
