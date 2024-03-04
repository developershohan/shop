import { kurta } from '../../../faker/kurta/Kurta'
import { HomeSectionCardCarousel } from '../../components/HomeSectionCard/HomeSectionCardCarousel'
import { MainCarousel } from '../../components/MainCarousel/MainCarousel'

const Home = () => {
  return (
    <div>
        
         <MainCarousel /> 

        <div className="px-4 lg:px-5">

        <HomeSectionCardCarousel data={kurta} sectionName={"Men's Kurta"}/>

        </div>
    </div>
  )
}

export default Home