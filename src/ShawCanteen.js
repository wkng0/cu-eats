import React from 'react';
import './canteen.css';

function ShawCanteen() {
    return(
        <>
        <section class="Shawheader">
            <div class="text-box">
                    <h1>Shaw Canteen</h1>
                    <p>SeeYou@Shaw是一個結合良朋好友和優質餐飲，並使你足以自豪的理想社群。

                        SeeYou@Shaw也是一個建基於友情的品牌。

                        2016年初，我們獲得投標經營逸夫書院學生飯堂的機會，而這次投標剛好出現於各人事業生涯中的合適時機，因緣際會之下，成就了SeeYou@Shaw的誕生。 </p>
                    <a href="https://www.shaw.cuhk.edu.hk/zh/content/shaw-college-seeyoushaw-resuming-lunch-dine-services" class="hero-btn">Visit Us To Know More</a>
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

export default ShawCanteen;
