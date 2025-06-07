import { useNavigate, useLocation } from 'react-router-dom';
import { useLoading } from '../../context/LoadingContext';

function Sidebar({ items }) {
    const navigate = useNavigate();
    const location = useLocation();
    const { setIsLoading } = useLoading();

    const handleClick = (path) => {
        setIsLoading(true);
        navigate(path);
    };

    return (
        <div className="w-64 h-screen bg-white shadow-lg">
            <div className="p-4">
                <h2 className="text-2xl font-bold text-primary mb-8">PetCare</h2>
                <nav>
                    <ul className="space-y-2">
                        {items.map((item, index) => (
                            <li key={index}>
                                <button
                                    onClick={() => handleClick(item.path)}
                                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                                        location.pathname === item.path
                                            ? 'bg-primary text-white'
                                            : 'text-gray-600 hover:bg-gray-100'
                                    }`}
                                >
                                    <span className="text-xl">{item.icon}</span>
                                    {item.text}
                                </button>
                            </li>
                        ))}
                    </ul>
                </nav>
            </div>
        </div>
    );
}

export default Sidebar; 