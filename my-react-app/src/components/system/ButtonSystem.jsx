import { useNavigate } from 'react-router-dom';

function ButtonSystem({ text, click, logo, variant = "blue", disabled = false, className = "", type = "button" }) {
    const navigate = useNavigate();

    const handleClick = async () => {
        if (click) {
            try {
                await click();
            } catch (error) {
                console.error('Erro ao executar ação:', error);
            }
        }
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
                return "bg-red-100 text-red-600 hover:bg-red-200";
            default:
                return "bg-primary text-white hover:bg-primary/90";
        }
    };

    return (
        <button
            type={type}
            onClick={handleClick}
            disabled={disabled}
            className={`flex items-center gap-2 px-4 py-2 rounded-md transition-colors ${getVariantClasses()} ${className} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
            {logo && <span className="text-xl">{logo}</span>}
            {text}
        </button>
    );
}

export default ButtonSystem;