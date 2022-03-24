import React from 'react';
import './canteen.css';
import Shawmenu from './Shawmeun';

function ShowShawDishes({Shawmenu}) {


    return(
        <>
        <div style={{margin: '70px'}} className='shadow-lg p-3 mb-5 bg-white rounded'>

            <div>
                <h1>{Shawmenu.name}</h1>
                <img src={Shawmenu.image} className="img-fluid" style={{height: '200px' , width: '200px'}}/>
            </div>

        </div>
        </> 
    );
}


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
        <div>
            <div className="row">
                {Shawmenu.map(Shawmenu =>{
                    return(
                        <div>
                            <ShowShawDishes Shawmenu={Shawmenu}/>
                        </div>
                    );
                })}
            </div>
        </div>
        </>
    )
}

export default ShawCanteen;
