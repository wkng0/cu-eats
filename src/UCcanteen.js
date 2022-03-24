import React from 'react';
import './canteen.css';

function UCCanteen() {
    return(
        <>
        <section class="UCheader">
            <div class="text-box">
                    <h1>UC Canteen</h1>
                    <p>The College Staff and Student Canteens are located on the G/F of the Cheung Chuk Shan Amenities Building.  <br/>
                        The total floor area is about 570 square metres and it can serve up to 360 people. <br/>
                         The College canteens are now operated by Joyful Inn Limited.  </p>
                    <a href="https://www.uc.cuhk.edu.hk/canteen/" class="hero-btn">Visit Us To Know More</a>
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

export default UCCanteen;
