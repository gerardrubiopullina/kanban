import { ArrowBack } from "@mui/icons-material";


interface BackButtonProps {
    onBack: () => void;
    label: string;
}

const BackButton = ({ onBack, label }: BackButtonProps) => (
    <button
        onClick={onBack}
        className="menu-header w-full p-4 flex items-center gap-3 transition-colors group"
    >
        <ArrowBack className="h-5 w-5 group-hover:-translate-x-1 transition-transform" />
        <span className="font-medium">{label}</span>
    </button>
);

export default BackButton;