import { useNavigate } from 'react-router-dom';
import { useLoading } from '../../context/LoadingContext';

function Navbar({ text, logo, variant = "blue", className = "" }) {
    const navigate = useNavigate();
    const { setIsLoading } = useLoading();

    const handleClick = () => {
        setIsLoading(true);
        navigate(-1);
    };

    const getVariantClasses = () => {
        switch (variant) {
            case "blue":
                return "bg-primary text-white hover:bg-primary/90";
            case "red":
                return "bg-red-600 text-white hover:bg-red-700";
            case "white":
                return "bg-white text-primary hover:bg-gray-50";
            case "whiteTransp":
                return "bg-white/10 text-white hover:bg-white/20";
            case "redTransp":
                return "bg-red-600/10 text-red-600 hover:bg-red-600/20";
            default:
                return "bg-primary text-white hover:bg-primary/90";
        }
    };

    return (
        <div className={`flex items-center justify-between p-4 ${className}`}>
            <button
                onClick={handleClick}
                className={`flex items-center gap-2 px-4 py-2 rounded-md transition-colors ${getVariantClasses()}`}
            >
                {logo && <span className="text-xl">{logo}</span>}
                {text}
            </button>
        </div>
    );
}

export default Navbar; 