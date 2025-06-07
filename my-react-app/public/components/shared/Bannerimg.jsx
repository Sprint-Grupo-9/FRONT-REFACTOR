import bannerlink from '../../assets/banner-dog.svg'

const Bannerimg = ({ onLoad }) => {
    return <img src={bannerlink} alt="Banner Pet Columbia" onLoad={onLoad} className="w-full h-full object-cover" />
}

export default Bannerimg;