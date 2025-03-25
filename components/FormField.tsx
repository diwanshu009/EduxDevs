import { Control, Controller, FieldValues, Path, ControllerFieldState } from "react-hook-form";
import { FormControl, FormItem, FormLabel, FormMessage } from "./ui/form";
import { Input } from "./ui/input";

interface FormFieldProps<T extends FieldValues> {
    control: Control<T>;
    name: Path<T>;
    label: string;
    placeholder?: string;
    type?: 'text' | 'email' | 'password' | 'file';
}

export default function FormField<T extends FieldValues>({
    control,
    name,
    label,
    placeholder,
    type = 'text',
}: FormFieldProps<T>) {
    return (
        <div>
            <Controller
                name={name}
                control={control}
                render={({ field, fieldState }: { field: any; fieldState: ControllerFieldState }) => (
                    <FormItem>
                        <FormLabel className="label">{label}</FormLabel>
                        <FormControl>
                            <Input
                                className="input"
                                placeholder={placeholder}
                                type={type}
                                {...field} 
                            />
                        </FormControl>
                        {fieldState?.error && (
                            <FormMessage className="text-red-500">{fieldState.error.message}</FormMessage>
                        )}
                    </FormItem>
                )}
            />
        </div>
    );
}
