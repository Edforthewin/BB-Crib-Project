import { FiTrendingUp } from "react-icons/fi";
import { GrOverview } from "react-icons/gr";
import { FaUmbrellaBeach } from "react-icons/fa6";
import { MdOutlineCabin } from "react-icons/md";
import { HiHomeModern } from "react-icons/hi2";
import { FaWater } from "react-icons/fa6";
import { GiFamilyHouse } from "react-icons/gi";
import { GiTreehouse } from "react-icons/gi";
import { GiSpaceship } from "react-icons/gi";
import './index.css';
import FilterModal from './Filter';
import LabelledButton from '../../LabelledButton'


const SpotHead = ({dispatch}) => {
    return (
        <>
            <LabelledButton child={
                <div className="spothead-icon">
                    <img src={FaWater} className="spothead-img"></img>
                    <span>Lakefront Cribs</span>
                </div>
            }/>
            <LabelledButton child={
                <div className="spothead-icon">
                    <img src={GiTreehouse} className="spothead-img"></img>
                    <span>Tree Cribs</span>
                </div>
            }/>
            <LabelledButton child={
                <div className="spothead-icon">
                    <img src={HiHomeModern} className="spothead-img"></img>
                    <span>Design Cribs</span>
                </div>
            }/>
            <LabelledButton child={
                <div className="spothead-icon">
                    <img src={GiFamilyHouse} className="spothead-img"></img>
                    <span>Mansion Cribs</span>
                </div>
            }/>
            <LabelledButton child={
                <div className="spothead-icon">
                    <img src={MdOutlineCabin} className="spothead-img"></img>
                    <span>Cabins</span>
                </div>
            }/>
            <LabelledButton child={
                <div className="spothead-icon">
                    <img src={GrOverview} className="spothead-img"></img>
                    <span>Amazing</span>
                </div>
            }/>
            <LabelledButton child={
                <div className="spothead-icon">
                    <img src={GiSpaceship} className="spothead-img"></img>
                    <span>DANG</span>
                </div>
            }/>
            <LabelledButton child={
                <div className="spothead-icon">
                    <img src={FaUmbrellaBeach} className="spothead-img"></img>
                    <span>BeachFront</span>
                </div>
            }/>
            <LabelledButton child={
                <div className="spothead-icon">
                    <img src={FiTrendingUp} className="spothead-img"></img>
                    <span>Trending</span>
                </div>
            }/>
            <>
                <FilterModal dispatch={dispatch}/>
            </>
        </>

    )
}

export default SpotHead
