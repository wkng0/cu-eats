import React, {useState} from 'react';
import './canteen.css';
import Shawmenu from './Shawmeun';


function ShowShawDishes({Shawmenu}) {

    const [varientsh, setvarientsh] = useState('small');
    const [quantitysh, setquantityshsh] = useState(1);

    return(
        <>
        <div style={{margin: '70px'}} className='shadow-lg p-3 mb-5 bg-white rounded'>

            <div>
                <h1>{Shawmenu.name}</h1>
                <img src={Shawmenu.image} className="img-fluid" style={{height: '200px' , width: '200px'}}/>
                {/* <h3>${NAmenu.prices}</h3> */}
                <div className='w-100 m-1'>
                    <p>Varients</p>
                        <select className='form-control' value={varientsh} onChange={(e)=> {setvarientsh(e.target.value)}}>
                            {Shawmenu.varients.map(varientsh=>{
                                return <option value={varientsh}>{varientsh}</option>
                            })} 
                        </select>
                </div>

                <div className='w-100 m-1'>
                    <p>Quality</p>
                    <select className='form-control' value={quantitysh} onChange={(e)=>{setquantityshsh(e.target.value)}}>
                        {[...Array(10).keys()].map((x, i)=> {
                            return <option value={i+1}>{i}</option>
                        })}
                    </select>
                </div>

                <div className='flex-container'>
                    <div className='m-1 w-100'>
                        <h1 className='mt-1'>Price: ${Shawmenu.prices[0][varientsh]*(quantitysh-1)}</h1>
                    </div>

                    <div className='m-1 w-100'>
                        <button className='btn'>ADD TO CART</button>
                    </div>
                </div>

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
