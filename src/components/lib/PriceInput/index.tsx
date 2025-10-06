import { Input } from "@components/ui/input";

interface PriceInputProps {
    value?: string,
    onChange: (value: string) => void,
    disabled?: boolean,
    className?: string,
    id?: string,
    type?: string,
    placeholder?: string,
}

export default function PriceInput({ value = "0", onChange, className, id, placeholder, type, disabled = false }: PriceInputProps) {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const numericValue = e.target.value.replace(/\D/g, "");
        onChange(numericValue);
    };

    const formatPrice = (value: string) => {
        if (!value) return "";
        return parseInt(value).toLocaleString("vi-VN");
    };

    return (
        <Input
            disabled={disabled}
            className={className}
            id={id}
            placeholder={placeholder}
            type={type}
            value={formatPrice(value)}
            onChange={handleChange}
        />
    );
}
