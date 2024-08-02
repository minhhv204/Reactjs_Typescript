import Banner from './_component/Banner'
import Services from './_component/Services'
import ProductBestDispensary from './_component/ProductBestDispensary'
import Comment from './_component/Comment'
import ChooseYourWeed from './_component/ChooseYourWeed'
import HowToOrder from './_component/HowToOrder'
import WhatMake from './_component/WhatMake'
import Recenty from './_component/Recenty'
import Indica from './_component/Indica'
import WeedEducation from './_component/WeedEducation'
const HomePage = () => {
    // const { data } = useProductQuery({ _limit: 4 })
    // const featuredProducts = data?.data.filter((product: IProduct) => product.featured === false)
    return (
        <>
            <Banner />
            <Services />
            <ProductBestDispensary />
            <Comment />
            <ChooseYourWeed/>
            <HowToOrder/>
            <WhatMake/>
            <Recenty/>
            <Indica/>
            <WeedEducation/>
            {/* <ProductList products={featuredProducts} />
            <div className='container'>
                <hr />
            </div> */}
            
        </>
    )
}
export default HomePage
